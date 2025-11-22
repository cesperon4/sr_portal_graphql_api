import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { Pool } from "pg";
import { PrismaClient } from "../generated/prisma/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
};

// --- SSL / TLS configuration ---
const poolConfig: any = {
  connectionString: process.env.DATABASE_URL!,
  max: 1, // Limit connections for serverless
};

if (process.env.DATABASE_CA) {
  // Production: trust CA provided in environment variable
  poolConfig.ssl = {
    ca: process.env.DATABASE_CA,
    rejectUnauthorized: true,
  };
  console.log("Prisma configured with DATABASE_CA.");
} else if (process.env.NODE_ENV === "production") {
  // Production without CA: accept self-signed certificates for Supabase
  poolConfig.ssl = {
    rejectUnauthorized: false, // ✅ This fixes the Supabase SSL error
  };
  console.log("Production mode: SSL configured for Supabase.");
} else {
  // Development fallback: ignore self-signed certificate
  poolConfig.ssl = { rejectUnauthorized: false };
  console.log(
    "Development mode: SSL verification disabled for self-signed certificate."
  );
}

// --- Create or reuse connection pool ---
if (!globalForPrisma.pool) {
  globalForPrisma.pool = new Pool(poolConfig);
}

// --- Initialize Prisma Client ---
const adapter = new PrismaPg(globalForPrisma.pool);

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
  await globalForPrisma.pool?.end();
});
