import { PrismaClient } from "../generated/prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });

// Prevent multiple instances in development (hot reload)
if (process.env.NODE_ENV !== "production") global.prisma = prisma;
