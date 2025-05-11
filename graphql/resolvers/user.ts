import { PrismaClient } from "../../generated/prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { requireAuth } from "helpers/auth";
import { serialize } from "cookie";

import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

type CreateUserArgs = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
};

export const userResolvers = {
  Query: {
    users: (_parent: unknown, args: {}, context: any) => {
      console.log(context.user);
      requireAuth(context); // ⛔ block if not authenticated

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
  },
  Mutation: {
    createUser: async (
      _parent: unknown,
      args: { data: CreateUserArgs },
      context: any
    ) => {
      requireAuth(context); // ⛔ block if not authenticated

      const hashedPassword = await bcrypt.hash(args.data.password, 10);

      return prisma.user.create({
        data: {
          firstname: args.data.firstname,
          lastname: args.data.lastname,
          username: args.data.username,
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
          email: args.data.email,
        },
      });
    },
    updateUser: (
      _parent: unknown,
      args: { id: string; data: Partial<CreateUserArgs> },
      context: any
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
      context: { res: NextApiResponse }
    ) => {
      const user = await prisma.user.findUnique({
        where: {
          email: args.data.email,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const isValid = await bcrypt.compare(args.data.password, user.password);

      if (!isValid) {
        throw new Error("Invalid password");
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });

      context.res.setHeader(
        //cookie header set
        "Set-Cookie",
        serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // true in production
          sameSite: "lax", // or "Strict" if you prefer tighter CSRF protection
          maxAge: 60 * 60, // 1 hour
          path: "/",
        })
      );

      return {
        user,
      };
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
};
