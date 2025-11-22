// lib/prisma.ts
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
// We need the 'pg' library types and fs module if loading a local file (less ideal for Vercel)
// Since we use an env var, we don't need 'fs', but we keep the 'pg' type definitions.

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

// --- START SSL Configuration for Supabase with Prisma Adapter ---

let connectionConfig: { connectionString: string; ssl?: any } = {
  connectionString: process.env.DATABASE_URL!,
};

if (process.env.DATABASE_CA) {
  // Use the CA certificate content from the environment variable
  connectionConfig.ssl = {
    ca: process.env.DATABASE_CA,
    rejectUnauthorized: true, // Now we require authorization because we provided the correct CA
  };
  console.log("Prisma configured with Supabase CA certificate.");
} else if (process.env.NODE_ENV === "production") {
  // If in production without a CA, we must reject self-signed for security
  // or default to Vercel's behavior (often requires CA)
  console.warn(
    "WARNING: Production without DATABASE_CA set. Connection may fail."
  );
  // If you *must* disable it temporarily (NOT SECURE):
  // connectionConfig.ssl = { rejectUnauthorized: false };
} else {
  // Development default
  console.log("Development environment, DATABASE_CA not set.");
  connectionConfig.ssl = { rejectUnauthorized: false };
}
// --- END SSL Configuration ---

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

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

process.on("beforeExit", async () => {
  await prisma.$disconnect();
});
