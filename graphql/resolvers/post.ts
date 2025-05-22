import { PrismaClient } from "../../generated/prisma/client";
import { requireAuth } from "helpers/auth";
// import { Post } from "@prisma/client";

const prisma = new PrismaClient();
type Post = Awaited<ReturnType<typeof prisma.post.findUnique>>;

interface CreatePostArgs {
  title: string;
  body: string;
  userId: string;
  arrestLogId: number | null;
}
export const postResolvers = {
  Query: {
    posts: async (_parent: unknown, args: {}, context: any) => {
      return prisma.post.findMany();
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

      return prisma.post.create({
        data: {
          title: args.data.title,
          body: args.data.body,
          userId: args.data.userId,
          arrestLogId: args.data.arrestLogId,
          createdAt: new Date(),
          updatedAt: new Date(),
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
