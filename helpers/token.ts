import crypto from "crypto";
import jwt from "jsonwebtoken";
import { ContextObject } from "../graphql/types/context";
import { prisma } from "../lib/prisma";

export function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function generateRefreshToken(userId: string, role: string) {
  const refreshToken = jwt.sign(
    { userId, role },
    process.env.JWT_REFRESH_SECRET!,
    {
      expiresIn: "7d",
    },
  );

  const tokenHash = hashToken(refreshToken);

  await prisma.refreshToken.create({
    data: {
      tokenHash: tokenHash,
      userId: userId,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
    },
  });
  return refreshToken;
}

export function generateAccessToken(userId: string, role: string) {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET!, {
    expiresIn: "10s",
  });
}

export async function verifyRefreshToken(context: ContextObject) {
  const token = context.req.cookies.refreshToken;
  if (!token) return null;

  let payload: any;
  try {
    payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
  } catch {
    return null;
  }

  const hash = hashToken(token);

  return { userId: payload.userId, role: payload.role, hash: hash };
}

export async function invalidateRefreshToken(context: ContextObject) {
  const token = context.req.cookies.refreshToken;
  if (!token) return false;
  const hash = hashToken(token);
  const deleted = await prisma.refreshToken.delete({
    where: { tokenHash: hash },
  });

  if (!deleted) return false;
  return true;
}

export async function rotateRefreshToken(payload: {
  userId: string;
  role: string;
  hash: string;
}) {
  return await prisma.$transaction(async (tx) => {
    const existing = await tx.refreshToken.findUnique({
      where: { tokenHash: payload.hash },
    });
    if (!existing || existing.expires < new Date())
      throw new Error("Invalid refresh token");

    await tx.refreshToken.delete({
      where: { tokenHash: payload.hash },
    });

    const newRefreshToken = await generateRefreshToken(
      payload.userId,
      payload.role,
    );

    const newAccessToken = generateAccessToken(payload.userId, payload.role);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  });
}
