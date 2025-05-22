import { PrismaClient } from "../../generated/prisma/client";
import { requireAuth } from "helpers/auth";

const prisma = new PrismaClient();

type PostComment = Awaited<ReturnType<typeof prisma.postComment.findUnique>>;

interface CreatePostArgs {
  postId: number;
  body: string;
}
export const postCommentResolvers = {
  Query: {
    postComments: async (_parent: unknown, args: {}, context: any) => {
      return prisma.postComment.findMany();
    },
    postComment: async (
      _parent: unknown,
      args: { id: number },
      context: any
    ) => {
      // requireAuth(context); // ⛔ block if not authenticated

      return prisma.postComment.findUnique({
        where: {
          id: Number(args.id),
        },
      });
    },
  },
  Mutation: {
    createPostComment: async (
      _parent: unknown,
      args: { data: CreatePostArgs },
      context: any
    ) => {
      // requireAuth(context); // ⛔ block if not authenticated

      return prisma.postComment.create({
        data: {
          postId: Number(args.data.postId),
          body: args.data.body,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    },
    updatePostComment: (
      _parent: unknown,
      args: { id: number; data: Partial<CreatePostArgs> },
      context: any
    ) => {
      // requireAuth(context); // ⛔ block if not authenticated

      return prisma.postComment.update({
        where: {
          id: Number(args.id),
        },
        data: {
          ...args.data,
          updatedAt: new Date(),
        },
      });
    },
    deletePostComment: (_parent: unknown, args: { id: number }) => {
      return prisma.postComment.delete({
        where: {
          id: Number(args.id),
        },
      });
    },
  },
  PostComment: {
    post: (parent: PostComment, _args: {}) => {
      return prisma.post.findUnique({
        where: { id: Number(parent?.postId) },
      });
    },
  },
};
