import { Prisma } from "../generated/prisma/client";
import {
  EmailVerificationTokenCreateInput,
  EmailVerificationTokenModel,
  UserCreateInput,
  UserModel,
} from "../generated/prisma/models";
import { prisma } from "../lib/prisma";

type DbClient = Prisma.TransactionClient | typeof prisma;

export async function GetUsers(client: DbClient = prisma): Promise<UserModel[]> {
  return client.user.findMany();
}

export async function CreateUser(
  args: UserCreateInput,
  client: DbClient = prisma,
): Promise<UserModel> {
  return client.user.create({ data: args });
}

export async function CreateEmailVerificationToken(
  args: EmailVerificationTokenCreateInput,
  client: DbClient = prisma,
): Promise<EmailVerificationTokenModel> {
  return client.emailVerificationToken.create({ data: args });
}
