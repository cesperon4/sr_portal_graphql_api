import { type Like } from "generated/prisma/client";
import { type ContextObject } from "graphql/types/context";
import { ApiResponse } from "graphql/types/response";
import { requireAuth } from "helpers/auth";
import { sendResponse } from "lib/apiResponse";
import { HttpMessages, HttpStatus } from "lib/constants/http";
import { prisma } from "lib/prisma";
import { withRateLimit } from "lib/withRateLimit";

export const likeResolvers = {
  Query: {},
  Mutation: {
    createLike: withRateLimit(
      async (
        _parent: unknown,
        args: { data: Omit<Like, "id" | "isActive"> },
        context: ContextObject
      ): Promise<ApiResponse<Like | null>> => {
        try {
          const authenticated = requireAuth(context);
          if (!authenticated)
            return sendResponse(
              null,
              HttpStatus.UNAUTHORIZED,
              HttpMessages.UNAUTHORIZED
            );
          const like = await prisma.like.create({
            data: {
              isActive: true,
              userId: args.data.userId,
              postId: args.data.postId,
            },
          });
          return sendResponse(like, HttpStatus.OK, HttpMessages.OK);
        } catch (err) {
          console.log("err", err);
          return sendResponse(
            null,
            HttpStatus.INTERNAL_SERVER_ERROR,
            HttpMessages.INTERNAL_SERVER_ERROR
          );
        }
      },
      "mutation"
    ),

    updateLike: withRateLimit(
      async (
        parent: unknown,
        args: { data: Omit<Like, "userId" | "postId" | "createdAt"> },
        context: ContextObject
      ): Promise<ApiResponse<Like | null>> => {
        try {
          const authenticated = requireAuth(context);
          if (!authenticated)
            return sendResponse(
              null,
              HttpStatus.INTERNAL_SERVER_ERROR,
              HttpMessages.INTERNAL_SERVER_ERROR
            );

          const like = await prisma.like.update({
            where: { id: args.data.id },
            data: { ...args.data },
          });

          return sendResponse(like, HttpStatus.OK, HttpMessages.OK);
        } catch (err) {
          console.log(err);
          return sendResponse(
            null,
            HttpStatus.INTERNAL_SERVER_ERROR,
            HttpMessages.INTERNAL_SERVER_ERROR
          );
        }
      },
      "mutation"
    ),

    toggleLike: withRateLimit(
      async (
        parent: unknown,
        args: { data: Omit<Like, "id" | "createdAt"> },
        context: ContextObject
      ) => {
        try {
          const { userId, postId } = args.data;
          const existingLike = await prisma.like.findUnique({
            where: { userId_postId: { userId, postId } },
          });

          let like: Like;

          if (!existingLike) {
            like = await prisma.like.create({
              data: {
                userId,
                postId,
                isActive: true,
              },
            });
            return sendResponse(like, HttpStatus.OK, HttpMessages.OK);
          }

          like = await prisma.like.update({
            where: { userId_postId: { userId, postId } },
            data: { isActive: !existingLike.isActive },
          });

          return sendResponse(like, HttpStatus.OK, HttpMessages.OK);
        } catch (err) {
          console.log(err);
          sendResponse(
            null,
            HttpStatus.INTERNAL_SERVER_ERROR,
            HttpMessages.INTERNAL_SERVER_ERROR
          );
        }
      },
      "mutation"
    ),
  },
};
