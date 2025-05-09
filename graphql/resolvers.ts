import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient();

type CreateUserArgs = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export const resolvers = {
  Query: {
    users: () => prisma.user.findMany(),
  },
  Mutation: {
    createUser: (_parent: unknown, args: CreateUserArgs) => {
      return prisma.user.create({
        data: {
          firstname: args.firstname,
          lastname: args.lastname,
          username: args.username,
          password: args.password,
          createdAt: new Date(),
          updatedAt: new Date(),
          email: args.email,
        },
      });
    },
  },
};
