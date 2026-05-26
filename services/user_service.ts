import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "../helpers/mailer";
import { createVerificationToken } from "../helpers/verification";
import { prisma } from "../lib/prisma";
import type { CreateUserInput } from "../schemas/user.schema";
import { scheduleEmailVerification } from "./jobs/email-verification";
import {
  CreateEmailVerificationToken,
  CreateUser,
  GetUsers,
} from "../store/user.store";

export async function GetUsersService() {
  return GetUsers();
}

export async function RegisterUserService(input: CreateUserInput) {
  const hashedPassword = await bcrypt.hash(input.password, 10);
  const { raw, hash } = createVerificationToken();
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h

  const user = await prisma.$transaction(async (tx) => {
    const created = await CreateUser(
      {
        firstname: input.firstname,
        lastname: input.lastname,
        username: input.username,
        email: input.email,
        role: "USER",
        password: hashedPassword,
      },
      tx,
    );
    await CreateEmailVerificationToken(
      {
        tokenHash: hash,
        expires,
        user: { connect: { id: created.id } },
      },
      tx,
    );
    return created;
  });

  await scheduleEmailVerification({ email: user.email, raw });

  return user;
}
