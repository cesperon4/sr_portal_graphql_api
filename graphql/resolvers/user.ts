import bcrypt from "bcryptjs";
import { type GraphQLResolveInfo } from "graphql";
import jwt from "jsonwebtoken";
import {
  type Like,
  type Post,
  type PostComment,
  type User,
} from "../../generated/prisma/client";
import { requireAuth } from "../../helpers/auth";
import { sendVerificationEmail } from "../../helpers/mailer";
import { createVerificationToken, hashToken } from "../../helpers/verification";
import { sendResponse } from "../../lib/apiResponse";
import { HttpMessages, HttpStatus } from "../../lib/constants/http";
import { prisma } from "../../lib/prisma";
import { assertResendVerificationAllowed } from "../../lib/resend-verification-limits";
import { withRateLimit } from "../../lib/withRateLimit";
import { CreateUserSchema } from "../../schemas/user.schema";
import { getJSON, makeCacheKey, setJSON } from "../../services/cache";
import { RegisterUserService } from "../../services/user_service";
import { type ContextObject } from "../types/context";
import { type ApiResponse, type Page } from "../types/response";
import { scheduleEmailVerification } from "../../services/jobs/email-verification";
type CreateUserArgs = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  role: "USER" | "GUEST";
  password: string;
};

import {
  clearRefreshTokenCookie,
  setRefreshTokenCookie,
} from "../../helpers/cookie";
import {
  generateAccessToken,
  generateRefreshToken,
  invalidateRefreshToken,
} from "../../helpers/token";
import { logger } from "../../lib/logger";
import { isGuest } from "../types/context";

class EmailInUseError extends Error {
  code = "EMAIL_IN_USE";
}

type UpsertReturn = {
  user: User;
  token: string;
};

type UserPaginatedArgs = {
  id: number;
  limit: number;
  cursor: number;
};

const POSTS_TTL_MS = 60 * 60 * 1000; // 1 hour

export const userResolvers = {
  Query: {
    users: withRateLimit(
      async (
        _parent: unknown,
        args: {},
        context: ContextObject,
        info: GraphQLResolveInfo,
      ): Promise<ApiResponse<User[]>> => {
        const authenticated = requireAuth(context); // ⛔ block if not authenticated
        if (!authenticated) {
          logger.warn("invalid or expired JWT");
          return sendResponse(
            [],
            HttpStatus.UNAUTHORIZED,
            HttpMessages.UNAUTHORIZED,
          );
        }
        if (context.rateLimitError)
          return sendResponse(
            [],
            HttpStatus.INTERNAL_SERVER_ERROR,
            HttpMessages.RATE_LIMIT_ERROR,
          );
        const users = await prisma.user.findMany();
        return sendResponse(users, HttpStatus.OK, HttpMessages.OK);
      },
      "query",
    ),

    user: withRateLimit(
      async (
        _parent: unknown,
        args: { id: string },
        context: ContextObject,
      ): Promise<ApiResponse<User | null>> => {
        try {
          const authenticated = requireAuth(context); // ⛔ block if not authenticated
          if (!authenticated) {
            context.logger.warn("invalid or expired JWTs");
            return sendResponse(
              null,
              HttpStatus.UNAUTHORIZED,
              HttpMessages.UNAUTHORIZED,
            );
          }
          if (context.rateLimitError) {
            context.logger.warn("rate limit has been exceed");
            return sendResponse(
              null,
              HttpStatus.INTERNAL_SERVER_ERROR,
              HttpMessages.RATE_LIMIT_ERROR,
            );
          }

          const user = await prisma.user.findUnique({
            where: {
              id: args.id,
            },
          });

          return sendResponse(user);
        } catch (err) {
          console.log("error");
          return sendResponse(
            null,
            HttpStatus.INTERNAL_SERVER_ERROR,
            HttpMessages.INTERNAL_SERVER_ERROR,
          );
        }
      },
      "query",
    ),

    me: async (_parent: unknown, _args: {}, context: ContextObject) => {
      const authenticated = requireAuth(context); // ⛔ block if not authenticated

      if (!authenticated || !context.user || isGuest(context.user))
        throw new Error("Unauthorized");

      return await prisma.user.findUnique({
        where: { id: context.user.userId },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          email: true,
          username: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    },
  },
  Mutation: {
    registerUser: async (
      _parent: unknown,
      args: { data: CreateUserArgs },
      _context: ContextObject,
    ): Promise<ApiResponse<User | null>> => {
      try {
        const parsed = CreateUserSchema.parse(args.data);
        const user = await RegisterUserService(parsed);
        return sendResponse(user, HttpStatus.CREATED, HttpMessages.CREATED);
      } catch (err) {
        console.log("err", err);
        return sendResponse(
          null,
          HttpStatus.INTERNAL_SERVER_ERROR,
          HttpMessages.INTERNAL_SERVER_ERROR,
        );
      }
    },

    verifyEmail: async (_parent: unknown, args: { token: string }) => {
      const { token } = args;

      const emailVerificationToken =
        await prisma.emailVerificationToken.findUnique({
          where: { tokenHash: hashToken(token) },
          include: { user: true },
        });

      if (!emailVerificationToken) throw new Error("Invalid or expired token");
      if (emailVerificationToken.used) throw new Error("Token already used");
      if (emailVerificationToken.expires < new Date())
        throw new Error("Token expired");

      //$transaction allows multiple operations to be executed atomically.
      await prisma.$transaction([
        prisma.user.update({
          where: { id: emailVerificationToken.userId },
          data: { emailVerified: new Date() },
        }),
        prisma.emailVerificationToken.update({
          where: { id: emailVerificationToken.id },
          data: { used: true },
        }),
      ]);

      return true;
    },

    resendVerificationEmail: async (
      _parent: unknown,
      args: { email: string },
      context: ContextObject,
    ) => {
      const { email } = args;
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) throw new Error("No account for that email");
      if (user.emailVerified) return true;

      await assertResendVerificationAllowed(user.id);

      const { raw, hash } = createVerificationToken();
      const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h

      await prisma.emailVerificationToken.create({
        data: {
          tokenHash: hash,
          userId: user.id,
          expires,
        },
      });

      await scheduleEmailVerification({ email, raw }, context);

      return true;
    },

    upsertUser: withRateLimit(
      async (
        _parent: unknown,
        args: {
          data: CreateUserArgs & Partial<CreateUserArgs>;
        },
        context: ContextObject,
      ): Promise<ApiResponse<UpsertReturn | null>> => {
        try {
          const username = args.data.email.split("@")[0]; // simple default username
          const defaultRole = "USER"; // assuming Role enum has USER

          const user = await prisma.user.upsert({
            where: { email: args.data.email },
            update: {
              email: args.data.email,
            },
            create: {
              email: args.data.email,
              firstname: args.data.firstname,
              lastname: args.data.lastname,
              username,
              role: defaultRole,
              password: "", // or generate random hash if required
            },
          });

          const token = generateAccessToken(user.id, defaultRole);
          const refreshToken = generateRefreshToken(user.id, defaultRole);

          return sendResponse(
            { user, token, refreshToken },
            HttpStatus.OK,
            HttpMessages.OK,
          );
        } catch (err) {
          console.log(err);
          return sendResponse(
            null,
            HttpStatus.INTERNAL_SERVER_ERROR,
            HttpMessages.INTERNAL_SERVER_ERROR,
          );
        }
      },
      "mutation",
    ),
    updateUser: (
      _parent: unknown,
      args: { id: string; data: Partial<CreateUserArgs> },
      context: any,
    ) => {
      requireAuth(context); // ⛔ block if not authenticated
      return prisma.user.update({
        where: {
          id: args.id,
        },
        data: {
          ...args.data,
          updatedAt: new Date(),
        },
      });
    },

    deleteUser: (_parent: unknown, args: { id: string }) => {
      return prisma.user.delete({
        where: {
          id: args.id,
        },
      });
    },

    login: async (
      _parent: unknown,
      args: { data: { email: string; password: string } },
      context: ContextObject,
    ) => {
      // requireAuth(context); // ⛔ block if not authenticated

      const user = await prisma.user.findUnique({
        where: {
          email: args.data.email,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }
      if (!user.emailVerified) {
        throw new Error("Email not verified");
      }
      const isValid = await bcrypt.compare(args.data.password, user.password);
      if (!isValid) {
        throw new Error("Invalid password");
      }

      const refreshToken = await generateRefreshToken(user.id, "USER");
      const accessToken = generateAccessToken(user.id, "USER");

      setRefreshTokenCookie(context, refreshToken);

      return {
        user,
        accessToken,
      };
    },

    loginGuest: async (_parent: unknown, args: {}, context: ContextObject) => {
      const token = jwt.sign({ role: "GUEST" }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });

      return { token };
    },

    logout: async (_parent: any, _args: any, context: ContextObject) => {
      try {
        const invalidated = await invalidateRefreshToken(context);
        clearRefreshTokenCookie(context);
        return invalidated;
      } catch (err) {
        clearRefreshTokenCookie(context);
        return false;
      }
    },
  },

  User: {
    posts: async (
      parent: User,
      _args: { data: UserPaginatedArgs },
      context: ContextObject,
      info: GraphQLResolveInfo,
    ): Promise<ApiResponse<Page<Post[]> | null>> => {
      try {
        if (!_args.data)
          return sendResponse(
            null,
            HttpStatus.BAD_REQUEST,
            HttpMessages.BAD_REQUEST,
          );

        const { cursor, limit } = _args.data; //this is causing a key collision with regular fetch posts
        const key = `gql:user:${parent?.id}:${info.fieldName}:${makeCacheKey(info.fieldName, _args.data)}`;
        const cached = await getJSON<Page<Post[]>>(key); //get cached value as json

        if (cached) return sendResponse(cached);

        const posts = await prisma.post.findMany({
          where: { userId: parent?.id },
          take: limit + 1, // fetch one extra to check if there's a next page
          ...(cursor
            ? { cursor: { id: cursor }, skip: 1 } // skip the cursor itself
            : {}),
        });

        const hasNextPage = posts.length > limit;
        const slicedPosts = hasNextPage ? posts.slice(0, -1) : posts;

        const page = {
          data: slicedPosts,
          cursor: hasNextPage ? slicedPosts[slicedPosts.length - 1].id : null,
          hasNextPage,
        };

        await setJSON(key, page, POSTS_TTL_MS);

        return sendResponse(page);
      } catch (err) {
        console.log(err);
        return sendResponse(
          null,
          HttpStatus.BAD_REQUEST,
          HttpMessages.BAD_REQUEST,
        );
      }
    },
    comments: async (
      parent: User,
      _args: { data: UserPaginatedArgs },
      context: ContextObject,
      info: GraphQLResolveInfo,
    ): Promise<ApiResponse<Page<PostComment[]> | null>> => {
      try {
        if (!_args.data)
          return sendResponse(
            null,
            HttpStatus.BAD_REQUEST,
            HttpMessages.BAD_REQUEST,
          );

        const { limit, cursor } = _args.data;
        const key = `gql:user:${parent.id}:${info.fieldName}:${makeCacheKey(info.fieldName, _args.data)}`;

        const cached = await getJSON<Page<PostComment[]>>(key);
        if (cached) {
          return sendResponse(cached);
        }

        const comments = await prisma.postComment.findMany({
          take: limit + 1,
          where: { userId: parent?.id },

          ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
          include: {
            post: true,
          },
        });

        const hasNextPage = comments.length > limit;
        const slicedComments = hasNextPage ? comments.slice(0, -1) : comments;

        const pageData = {
          data: slicedComments,
          cursor: hasNextPage
            ? slicedComments[slicedComments.length - 1].id
            : null,
          hasNextPage,
        };

        await setJSON(key, pageData, POSTS_TTL_MS);

        return sendResponse(pageData);
      } catch (err) {
        console.log(err);
        return sendResponse(
          null,
          HttpStatus.INTERNAL_SERVER_ERROR,
          HttpMessages.INTERNAL_SERVER_ERROR,
        );
      }
    },
    likedPosts: async (
      parent: User,
      _args: { data: UserPaginatedArgs },
      context: ContextObject,
      info: GraphQLResolveInfo,
    ): Promise<ApiResponse<Page<Like[]> | null>> => {
      try {
        if (!_args)
          return sendResponse(
            null,
            HttpStatus.BAD_REQUEST,
            HttpMessages.BAD_REQUEST,
          );

        const { limit, cursor } = _args.data;
        const key = `gql:user${parent?.id}:${info.fieldName}:${makeCacheKey(info.fieldName, _args.data)}`;
        const cached = await getJSON<Page<Like[]>>(key);
        if (cached) return sendResponse(cached);

        const likes = await prisma.like.findMany({
          take: limit + 1,
          where: { userId: parent?.id, isActive: true },
          ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
          include: { post: true },
        });

        const hasNextPage = likes.length > limit;
        const slicedLikes = hasNextPage ? likes.slice(0, -1) : likes;
        const page = {
          data: slicedLikes,
          cursor: hasNextPage ? slicedLikes[slicedLikes.length - 1].id : null,
          hasNextPage,
        };

        setJSON(key, page, POSTS_TTL_MS);

        return sendResponse(page);
      } catch (err) {
        console.log(err);
        return sendResponse(
          null,
          HttpStatus.BAD_REQUEST,
          HttpMessages.BAD_REQUEST,
        );
      }
    },
  },
};
