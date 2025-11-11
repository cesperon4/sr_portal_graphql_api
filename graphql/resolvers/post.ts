import { PrismaClient, type Post } from "../../generated/prisma/client";
import { requireAuth } from "helpers/auth";
import { supabaseAdmin } from "../../lib/supabaseAdmin"; // server-side Supabase client
import { GraphQLResolveInfo } from "graphql";

import {
  makeCacheKey,
  getJSON,
  setJSON,
  invalidateByPrefix,
} from "services/cache";
import { HttpStatus, HttpMessages } from "lib/constants/http";
import { sendResponse } from "lib/apiResponse";

import { type PostsArgs } from "graphql/types/posts";
import { type ApiResponse } from "graphql/types/response";
import { type ContextObject } from "graphql/types/context";

const prisma = new PrismaClient();

type PostPage = {
  posts: Post[];
  cursor: number | null;
  hasNextPage: boolean;
};
// type Post = Awaited<ReturnType<typeof prisma.post.findUnique>>;

interface CreatePostArgs {
  title: string;
  body: string;
  userId: string;
  arrestLogId: number | null;
  imageBase64: string[]; // Optional field for base64 image data
  imageName: string[]; // Optional field for image name
}

// const POSTS_TTL_MS = 30 * 1000;
const POSTS_TTL_MS = 60 * 60 * 1000; // 1 hour

export const postResolvers = {
  Query: {
    posts: async (
      _parent: unknown,
      args: { data: PostsArgs },
      context: ContextObject,
      info: GraphQLResolveInfo
    ): Promise<ApiResponse<PostPage | null>> => {
      try {
        // const authenticated = requireAuth(context); // ⛔ block if not authenticated

        // if (!authenticated)
        //   return sendResponse(
        //     null,
        //     HttpStatus.UNAUTHORIZED,
        //     HttpMessages.UNAUTHORIZED
        //   );
        if (!args.data)
          return sendResponse(
            null,
            HttpStatus.BAD_REQUEST,
            HttpMessages.BAD_REQUEST
          );

        const { limit, cursor } = args.data;

        const key = `gql:${info.fieldName}:${makeCacheKey(
          info.fieldName,
          args.data
        )}`; //create key using field name and argumens
        const cached = await getJSON<PostPage>(key); //get cached value as json

        if (cached) return sendResponse(cached);
        //if it exists return cached value

        console.log("returning non cache");

        const posts = await prisma.post.findMany({
          take: limit + 1, // fetch one extra to check if there's a next page
          orderBy: { createdAt: "desc" },
          ...(cursor
            ? { cursor: { id: cursor }, skip: 1 } // skip the cursor itself
            : {}),
        });

        const hasNextPage = posts.length > limit;
        const slicedPosts = hasNextPage ? posts.slice(0, -1) : posts;

        const pageData = {
          posts: slicedPosts,
          cursor: hasNextPage ? slicedPosts[slicedPosts.length - 1].id : null,
          hasNextPage,
        };

        await setJSON(key, pageData, POSTS_TTL_MS);

        return sendResponse(pageData);
      } catch (err) {
        console.log(err);
        return sendResponse(
          null,
          HttpStatus.INTERNAL_SERVER_ERROR,
          HttpMessages.INTERNAL_SERVER_ERROR
        );
      }
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
      context: ContextObject
    ) => {
      // requireAuth(context); // ⛔ block if not authenticated
      let imageUrls: string[] = [];

      // 1️⃣ Upload image if provided
      // 1️⃣ Upload images if provided
      if (args.data.imageBase64?.length > 0) {
        const uploadPromises = args.data.imageBase64.map(
          async (base64, index) => {
            const fileName = `images/${Date.now()}-${
              args.data.imageName[index]
            }`;
            const base64String = base64.includes(",")
              ? base64.split(",")[1]
              : base64;

            const { error: uploadError } = await supabaseAdmin.storage
              .from("images")
              .upload(fileName, Buffer.from(base64String, "base64"), {
                contentType: "image/jpeg",
                upsert: false,
              });

            if (uploadError)
              throw new Error(`Image upload failed: ${uploadError.message}`);

            const { data: publicData } = supabaseAdmin.storage
              .from("images")
              .getPublicUrl(fileName);

            return publicData.publicUrl;
          }
        );

        // Wait for all uploads to complete
        imageUrls = await Promise.all(uploadPromises);
      }

      invalidateByPrefix("gql:posts");
      console.log("creating post");
      return prisma.post.create({
        data: {
          title: args.data.title,
          body: args.data.body,
          userId: args.data.userId,
          arrestLogId: args.data.arrestLogId,
          createdAt: new Date(),
          updatedAt: new Date(),
          imageUrls,
        },
      });
    },
    updatePost: (
      _parent: unknown,
      args: { id: number; data: Partial<CreatePostArgs> },
      context: any
    ) => {
      // requireAuth(context); // ⛔ block if not authenticated

      invalidateByPrefix("gql:posts");

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
      invalidateByPrefix("gql:posts");

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
