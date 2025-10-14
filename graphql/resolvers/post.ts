import { PrismaClient } from "../../generated/prisma/client";
import { requireAuth } from "helpers/auth";
import { supabaseAdmin } from "../../lib/supabaseAdmin"; // server-side Supabase client

const prisma = new PrismaClient();
type Post = Awaited<ReturnType<typeof prisma.post.findUnique>>;

interface CreatePostArgs {
  title: string;
  body: string;
  userId: string;
  arrestLogId: number | null;
  imageBase64?: string; // Optional field for base64 image data
  imageName?: string; // Optional field for image name
}

interface PostsArgs {
  limit: number;
  cursor?: number;
}
export const postResolvers = {
  Query: {
    posts: async (
      _parent: unknown,
      args: { data: PostsArgs },
      context: any
    ) => {
      const { limit, cursor } = args.data;

      const posts = await prisma.post.findMany({
        take: limit + 1, // fetch one extra to check if there's a next page
        orderBy: { createdAt: "desc" },
        ...(cursor
          ? { cursor: { id: cursor }, skip: 1 } // skip the cursor itself
          : {}),
      });

      const hasNextPage = posts.length > limit;
      const slicedPosts = hasNextPage ? posts.slice(0, -1) : posts;

      return {
        posts: slicedPosts,
        cursor: hasNextPage ? slicedPosts[slicedPosts.length - 1].id : null,
        hasNextPage,
      };
      // return prisma.post.findMany({ orderBy: { createdAt: "desc" } });
    },
    post: async (_parent: unknown, args: { id: number }, context: any) => {
      // requireAuth(context); // ⛔ block if not authenticated

      return prisma.post.findUnique({
        where: {
          id: Number(args.id),
        },
      });
    },
  },
  Mutation: {
    createPost: async (
      _parent: unknown,
      args: { data: CreatePostArgs },
      context: any
    ) => {
      // requireAuth(context); // ⛔ block if not authenticated
      let imageUrl: string | null = null;

      // 1️⃣ Upload image if provided
      if (args.data.imageBase64 && args.data.imageName) {
        const fileName = `images/${Date.now()}-${args.data.imageName}`;
        const base64String = args.data.imageBase64.includes(",") //if comma, remove data:image/jpeg;base64,
          ? args.data.imageBase64.split(",")[1]
          : args.data.imageBase64;

        const { data: uploadData, error: uploadError } =
          await supabaseAdmin.storage
            .from("images") // your bucket name
            .upload(fileName, Buffer.from(base64String, "base64"), {
              contentType: "image/jpeg", // optionally use args.data.type if available
              upsert: false,
            });

        if (uploadError)
          throw new Error(`Image upload failed: ${uploadError.message}`);

        // 2️⃣ Get the public URL of the uploaded image
        const { data: publicData } = supabaseAdmin.storage
          .from("images")
          .getPublicUrl(fileName);
        imageUrl = publicData.publicUrl;
      }

      return prisma.post.create({
        data: {
          title: args.data.title,
          body: args.data.body,
          userId: args.data.userId,
          arrestLogId: args.data.arrestLogId,
          createdAt: new Date(),
          updatedAt: new Date(),
          imageUrl,
        },
      });
    },
    updatePost: (
      _parent: unknown,
      args: { id: number; data: Partial<CreatePostArgs> },
      context: any
    ) => {
      // requireAuth(context); // ⛔ block if not authenticated

      return prisma.post.update({
        where: {
          id: Number(args.id),
        },
        data: {
          ...args.data,
          updatedAt: new Date(),
        },
      });
    },
    deletePost: (_parent: unknown, args: { id: number }) => {
      return prisma.post.delete({
        where: {
          id: Number(args.id),
        },
      });
    },
  },

  Post: {
    postComments: (parent: Post, _args: {}) => {
      return prisma.postComment.findMany({
        where: { postId: parent?.id },
        orderBy: { updatedAt: "desc" },
      });
    },
    arrestLog: (parent: Post, _args: {}) => {
      return prisma.arrestLog.findUnique({
        where: { postId: parent?.id },
      });
    },

    user: (parent: Post, _args: {}) => {
      return prisma.user.findUnique({
        where: { id: parent?.userId },
      });
    },
  },
};
