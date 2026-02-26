import { User } from "../../generated/prisma/client";

export type AuthPayload = {
  user: User;
  accessToken: string;
};

export type GuestPayload = {
  token: string;
};
