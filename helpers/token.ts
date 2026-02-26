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
      // expiresIn: "10s", // for testing: comment 7d above, uncomment this
    },
  );

  const tokenHash = hashToken(refreshToken);

  try {
    await prisma.refreshToken.create({
      data: {
        tokenHash: tokenHash,
        userId: userId,
        // expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
        expires: new Date(Date.now() + 10 * 1000), // 10 seconds - for testing
      },
    });
  } catch (err) {
    console.log("error in generateRefreshToken: ", err);
  }
  return refreshToken;
}

export function generateAccessToken(userId: string, role: string) {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET!, {
    expiresIn: "10s",
  });
}

export async function verifyRefreshToken(context: ContextObject) {
  const token = context.req.cookies.refreshToken;
  console.log("token in verifyRefreshToken: ", token);
  if (!token) return null;

  let payload: any;
  try {
    payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
    console.log("payload in verifyRefreshToken: ", payload);
  } catch {
    return null;
  }

  const hash = hashToken(token);

  return { userId: payload.userId, role: payload.role, hash: hash };
}

export async function invalidateRefreshToken(context: ContextObject) {
  const token = context.req.cookies.refreshToken;
  console.log("token in invalidateRefreshToken: ", token);
  if (!token) return false;
  try {
    jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
    const hash = hashToken(token);
    console.log("hash in invalidateRefreshToken: ", hash);
    await prisma.refreshToken.delete({
      where: { tokenHash: hash },
    });

    return true;
  } catch (err) {
    return false;
  }
}

export async function rotateRefreshToken(payload: {
  userId: string;
  role: string;
  hash: string;
}) {
  return await prisma.$transaction(async (tx) => {
    console.log("payload in rotateRefreshToken: ", payload);
    const existing = await tx.refreshToken.findUnique({
      where: { tokenHash: payload.hash },
    });

    console.log("existing in rotateRefreshToken: ", existing);
    if (!existing || existing.expires < new Date())
      throw new Error("Invalid refresh token");

    await tx.refreshToken.delete({
      where: { tokenHash: payload.hash },
    });

    const refreshToken = jwt.sign(
      { userId: payload.userId, role: payload.role },
      process.env.JWT_REFRESH_SECRET!,
      {
        expiresIn: "10s",
      },
    );

    const tokenHash = hashToken(refreshToken);

    const newRefreshToken = await tx.refreshToken.create({
      data: {
        tokenHash: tokenHash,
        userId: payload.userId,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
      },
    });

    console.log("newRefreshToken in rotateRefreshToken: ", newRefreshToken);

    const newAccessToken = generateAccessToken(payload.userId, payload.role);

    console.log("newAccessToken in rotateRefreshToken: ", newAccessToken);

    return { accessToken: newAccessToken, refreshToken };
  });
}
