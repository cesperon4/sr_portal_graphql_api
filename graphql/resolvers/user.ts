import bcrypt from "bcryptjs";
import { serialize } from "cookie";
import { type GraphQLResolveInfo } from "graphql";
import jwt from "jsonwebtoken";
import { NextApiResponse } from "next";
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
import { redis } from "../../lib/redis";
import { withRateLimit } from "../../lib/withRateLimit";
import { getJSON, makeCacheKey, setJSON } from "../../services/cache";
import { type ContextObject } from "../types/context";
import { type ApiResponse, type Page } from "../types/response";
type CreateUserArgs = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  role: "USER" | "GUEST";
  password: string;
};

// type PostPage = {
//   posts: Post[];
//   cursor: number | null;
//   hasNextPage: boolean;
// };

// type PostCommentPage = {
//   comments: PostComment[];
//   cursor: number | null;
//   hasNextPage: boolean;
// };

type UpsertReturn = {
  user: User;
  token: string;
};

type UserPaginatedArgs = {
  id: number;
  limit: number;
  cursor: number;
};

const COOLDOWN_SECONDS = 60;
const DAILY_LIMIT = 5;
const POSTS_TTL_MS = 60 * 60 * 1000; // 1 hour

export const userResolvers = {
  Query: {
    users: withRateLimit(
      async (
        _parent: unknown,
        args: {},
        context: ContextObject,
        info: GraphQLResolveInfo
      ): Promise<ApiResponse<User[]>> => {
        // const authenticated = requireAuth(context); // ⛔ block if not authenticated
        // if (!authenticated)
        //   return sendResponse(
        //     [],
        //     HttpStatus.UNAUTHORIZED,
        //     HttpMessages.UNAUTHORIZED
        //   );

        if (context.rateLimitError)
          return sendResponse(
            [],
            HttpStatus.INTERNAL_SERVER_ERROR,
            HttpMessages.RATE_LIMIT_ERROR
          );
        const users = await prisma.user.findMany();
        return sendResponse(users, HttpStatus.OK, HttpMessages.OK);
      },
      "query"
    ),

    user: withRateLimit(
      async (
        _parent: unknown,
        args: { id: string },
        context: ContextObject
      ): Promise<ApiResponse<User | null>> => {
        try {
          // const authenticated = requireAuth(context); // ⛔ block if not authenticated

          // if (!authenticated)
          //   return sendResponse(
          //     null,
          //     HttpStatus.UNAUTHORIZED,
          //     HttpMessages.UNAUTHORIZED
          //   );

          if (context.rateLimitError)
            return sendResponse(
              null,
              HttpStatus.INTERNAL_SERVER_ERROR,
              HttpMessages.RATE_LIMIT_ERROR
            );

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
            HttpMessages.INTERNAL_SERVER_ERROR
          );
        }
      },
      "query"
    ),

    me: async (_parent: unknown, _args: {}, context: any) => {
      requireAuth(context); // optional helper to throw if not authenticated
      const userId = context.user?.userId;

      return await prisma.user.findUnique({
        where: { id: userId },
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
      context: any
    ) => {
      // requireAuth(context); // ⛔ block if not authenticated
      try {
        const existing = await prisma.user.findUnique({
          where: { email: args.data.email },
        });
        if (existing) throw new Error("Email already in use");

        const hashedPassword = await bcrypt.hash(args.data.password, 10);

        const user = await prisma.user.create({
          data: {
            firstname: args.data.firstname,
            lastname: args.data.lastname,
            username: args.data.username,
            password: hashedPassword,
            role: args.data.role,
            createdAt: new Date(),
            updatedAt: new Date(),
            email: args.data.email,
          },
        });

        const { raw, hash } = createVerificationToken();
        const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h

        await prisma.emailVerificationToken.create({
          data: {
            tokenHash: hash,
            userId: user.id,
            expires,
          },
        });

        await sendVerificationEmail(args.data.email, raw);

        // return user;
        return true;
      } catch (error) {
        console.log("error: ", error);
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
      args: { email: string }
    ) => {
      const { email } = args;
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) throw new Error("No account for that email");
      if (user.emailVerified) return true;

      const cooldownKey = `resend:cooldown:${user.id}`;
      const dailyKey = `resend:daily:${user.id}:${new Date()
        .toISOString()
        .slice(0, 10)}`;

      // Check cooldown
      const ttl = await redis.ttl(cooldownKey);
      if (ttl > 0) {
        throw new Error(`Please wait ${ttl}s before requesting again`);
      }

      // Check daily limit
      const count = await redis.incr(dailyKey);
      if (count === 1) {
        await redis.expire(dailyKey, 24 * 60 * 60); // expire in 24h
      }
      if (count > DAILY_LIMIT) {
        throw new Error("Daily resend limit reached");
      }

      // Set cooldown
      await redis.set(cooldownKey, "1", "EX", COOLDOWN_SECONDS);

      const { raw, hash } = createVerificationToken();
      const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h

      await prisma.emailVerificationToken.create({
        data: {
          tokenHash: hash,
          userId: user.id,
          expires,
        },
      });

      await sendVerificationEmail(email, raw);

      return true;
    },

    upsertUser: withRateLimit(
      async (
        _parent: unknown,
        args: {
          data: CreateUserArgs & Partial<CreateUserArgs>;
        },
        context: any
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

          const token = jwt.sign(
            {
              userId: user.id,
              role: defaultRole, // distinguish guest from full user
            },
            process.env.JWT_SECRET!,
            {
              expiresIn: "1h",
            }
          );

          return sendResponse({ user, token }, HttpStatus.OK, HttpMessages.OK);
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
    updateUser: (
      _parent: unknown,
      args: { id: string; data: Partial<CreateUserArgs> },
      context: any
    ) => {
      requireAuth(context); // ⛔ block if not authenticated
      console.log("update user");
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
      context: { res: NextApiResponse }
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

      // if (!user.emailVerified) {
      //   throw new Error("Email not verified");
      // }

      const isValid = await bcrypt.compare(args.data.password, user.password);

      if (!isValid) {
        throw new Error("Invalid password");
      }

      const token = jwt.sign(
        {
          userId: user.id,
          role: "USER", // distinguish guest from full user
        },
        process.env.JWT_SECRET!,
        {
          expiresIn: "1h",
        }
      );

      // browser blocking
      context.res.setHeader(
        //previously commented
        "Set-Cookie",
        serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // true in production
          // sameSite: "lax", // or "Strict" if you prefer tighter CSRF protection
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // or "Strict" if you prefer tighter CSRF protection
          maxAge: 60 * 60, // 1 hour
          path: "/",
        })
      );

      return {
        user,
        token,
      };
    },

    loginGuest: async (
      _parent: unknown,
      args: {},
      context: { res: NextApiResponse }
    ) => {
      const token = jwt.sign({ role: "GUEST" }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });

      context.res.setHeader(
        //cookie header set
        "Set-Cookie",
        serialize("token", token, {
          httpOnly: true, // ✅ secure: hides cookie from JS
          secure: process.env.NODE_ENV === "production", // ✅ must be true in production (HTTPS only)
          // sameSite: "lax", // or "Strict" if you prefer tighter CSRF protection
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // ✅ required for cross-site cookies
          maxAge: 60 * 60, // 1 hour
          path: "/",
        })
      );

      return { token };
    },

    logout: async (_parent: any, _args: any, context: ContextObject) => {
      // context.res.setHeader("Set-Cookie", [
      //   //set cookie max age to expire
      //   `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax; Secure=${
      //     process.env.NODE_ENV === "production"
      //   }`,
      // ]);
      return true;
    },
  },

  User: {
    posts: async (
      parent: User,
      _args: { data: UserPaginatedArgs },
      context: ContextObject,
      info: GraphQLResolveInfo
    ): Promise<ApiResponse<Page<Post[]> | null>> => {
      try {
        if (!_args.data)
          return sendResponse(
            null,
            HttpStatus.BAD_REQUEST,
            HttpMessages.BAD_REQUEST
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
          HttpMessages.BAD_REQUEST
        );
      }
    },
    comments: async (
      parent: User,
      _args: { data: UserPaginatedArgs },
      context: ContextObject,
      info: GraphQLResolveInfo
    ): Promise<ApiResponse<Page<PostComment[]> | null>> => {
      try {
        if (!_args.data)
          return sendResponse(
            null,
            HttpStatus.BAD_REQUEST,
            HttpMessages.BAD_REQUEST
          );

        const { limit, cursor } = _args.data;
        const key = `gql:user:${parent.id}:${info.fieldName}:${makeCacheKey(info.fieldName, _args.data)}`;

        const cached = await getJSON<Page<PostComment[]>>(key);
        if (cached) return sendResponse(cached);

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
          HttpMessages.INTERNAL_SERVER_ERROR
        );
      }
    },
    likedPosts: async (
      parent: User,
      _args: { data: UserPaginatedArgs },
      context: ContextObject,
      info: GraphQLResolveInfo
    ): Promise<ApiResponse<Page<Like[]> | null>> => {
      try {
        console.log("liked posts");
        if (!_args)
          return sendResponse(
            null,
            HttpStatus.BAD_REQUEST,
            HttpMessages.BAD_REQUEST
          );

        const { limit, cursor } = _args.data;
        const key = `gql:user${parent?.id}:${info.fieldName}:${makeCacheKey(info.fieldName, _args.data)}`;
        const cached = await getJSON<Page<Like[]>>(key);
        // if (cached) return sendResponse(cached);

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
          HttpMessages.BAD_REQUEST
        );
      }
    },
  },
};
