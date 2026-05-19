import { NextApiRequest, NextApiResponse } from "next";
import type { Logger } from "pino";

type SignedGuest = {
  role: "GUEST";
  iat: number;
  exp: number;
};

type SignedUser = {
  userId: string;
  role: "USER";
  iat: number;
  exp: number;
};

type RateLimitInfo = {
  remaining: number;
  resetAt: Date;
  limit: number;
};
export type ContextUser = SignedGuest | SignedUser;

export type ContextObject = {
  req: NextApiRequest;
  res: NextApiResponse;
  user: ContextUser | null;
  ip: string | null;
  requestId: string;
  logger: Logger;
  rateLimitInfo?: RateLimitInfo;
  rateLimitError?: boolean;
};

export function isUser(user: ContextUser): user is SignedUser {
  return user.role === "USER";
}

export function isGuest(user: ContextUser): user is SignedGuest {
  return user.role === "GUEST";
}
