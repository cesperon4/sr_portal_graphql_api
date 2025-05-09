import { PrismaClient } from "../../generated/prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
    users: () => prisma.user.findMany(),
    user: (_parent: unknown, args: { id: string }) => {
      return prisma.user.findUnique({
        where: {
          id: args.id,
        },
      });
    },
  },
  Mutation: {
    createUser: async (_parent: unknown, args: { data: CreateUserArgs }) => {
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
      args: { id: string; data: Partial<CreateUserArgs> }
    ) => {
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

    login: async (
      _parent: unknown,
      args: { data: { email: string; password: string } }
    ) => {
      const user = await prisma.user.findUnique({
        where: {
          email: args.data.email,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      console.log("password", args.data.password);
      console.log("user", user.password);
      const isValid = await bcrypt.compare(args.data.password, user.password);

      console.log("isValid", isValid);

      if (!isValid) {
        throw new Error("Invalid password");
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });

      return {
        token,
        user,
      };
    },

    deleteUser: (_parent: unknown, args: { id: string }) => {
      return prisma.user.delete({
        where: {
          id: args.id,
        },
      });
    },
  },
};
