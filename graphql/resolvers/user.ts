import { PrismaClient } from "../../generated/prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { requireAuth } from "helpers/auth";
import { serialize } from "cookie";

import { NextApiRequest, NextApiResponse } from "next";

import { hashToken, createVerificationToken } from "../../helpers/verification";
import { sendVerificationEmail } from "../../helpers/mailer";

import { redis } from "../../lib/redis";

const prisma = new PrismaClient();

type User = Awaited<ReturnType<typeof prisma.user.findUnique>>;

type CreateUserArgs = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  role: "USER" | "GUEST";
  password: string;
};

const COOLDOWN_SECONDS = 60;
const DAILY_LIMIT = 5;

export const userResolvers = {
  Query: {
    users: (_parent: unknown, args: {}, context: any) => {
      // requireAuth(context); // ⛔ block if not authenticated
      return prisma.user.findMany();
    },
    user: (_parent: unknown, args: { id: string }, context: any) => {
      requireAuth(context); // ⛔ block if not authenticated

      return prisma.user.findUnique({
        where: {
          id: args.id,
        },
      });
    },
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

    upsertUser: async (
      _parent: unknown,
      args: {
        data: CreateUserArgs &
          Omit<
            CreateUserArgs,
            | "password"
            | "lastname"
            | "username"
            | "role"
            | "createdAt"
            | "updatedAt"
          >;
      },
      context: any
    ) => {
      const username = args.data.email.split("@")[0]; // simple default username
      const defaultRole = "USER"; // assuming Role enum has USER

      const user = await prisma.user.upsert({
        where: { email: args.data.email },
        update: {
          // firstname: args.data.firstname,
          // lastname: args.data.lastname,
          email: args.data.email,
          // you might update other fields if needed
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
          role: "USER", // distinguish guest from full user
        },
        process.env.JWT_SECRET!,
        {
          expiresIn: "1h",
        }
      );

      return { user, token };
    },
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

    logout: async (_parent: any, _args: any, context: any) => {
      context.res.setHeader("Set-Cookie", [
        //set cookie max age to expire
        `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax; Secure=${
          process.env.NODE_ENV === "production"
        }`,
      ]);

      return true;
    },
  },

  User: {
    posts: (parent: User, _args: {}) => {
      return prisma.post.findMany({
        where: { userId: parent?.id },
      });
    },
  },
};
