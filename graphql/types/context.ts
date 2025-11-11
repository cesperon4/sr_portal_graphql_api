import { NextApiRequest, NextApiResponse } from "next";

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

export type ContextUser = SignedGuest | SignedUser;

export type ContextObject = {
  req: NextApiRequest;
  res: NextApiResponse;
  user: ContextUser | null;
};
