import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

// --- SSL / TLS configuration ---
const connectionConfig: { connectionString: string; ssl?: any } = {
  connectionString: process.env.DATABASE_URL!,
};

if (process.env.DATABASE_CA) {
  // Production: trust CA provided in environment variable
  connectionConfig.ssl = {
    ca: process.env.DATABASE_CA,
    rejectUnauthorized: true,
  };
  console.log("Prisma configured with DATABASE_CA.");
} else if (process.env.NODE_ENV === "production") {
  // Production without CA: fail if self-signed (secure)
  connectionConfig.ssl = { rejectUnauthorized: true };
  console.warn("No DATABASE_CA provided in production. Connection may fail.");
} else {
  // Development fallback: ignore self-signed certificate
  connectionConfig.ssl = { rejectUnauthorized: false };
  console.log(
    "Development mode: SSL verification disabled for self-signed certificate."
  );
}

// --- Initialize Prisma Client ---
const adapter = new PrismaPg(connectionConfig);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

// Enable Hot Reloading for Next.js dev
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Graceful shutdown
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});
