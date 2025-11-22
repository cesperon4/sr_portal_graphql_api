import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

// --- Configure Prisma Connection ---
const connectionConfig: { connectionString: string; ssl?: any } = {
  connectionString: process.env.DATABASE_URL!,
};

// If DATABASE_CA is set, use it for SSL verification
if (process.env.DATABASE_CA) {
  connectionConfig.ssl = {
    ca: process.env.DATABASE_CA,
    rejectUnauthorized: true,
  };
  console.log(
    "Prisma configured with CA certificate from environment variable."
  );
} else if (process.env.NODE_ENV === "production") {
  // Production without a CA is risky: warn and optionally disable SSL verification (not recommended)
  console.warn(
    "WARNING: Production without DATABASE_CA set. Connection may fail with self-signed cert."
  );
  // Optional: temporarily allow self-signed cert (NOT SECURE)
  // connectionConfig.ssl = { rejectUnauthorized: false };
} else {
  // Development fallback
  console.log("Development environment: SSL verification disabled.");
  connectionConfig.ssl = { rejectUnauthorized: false };
}

// --- Instantiate Prisma Client ---
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

// Assign global instance in dev for hot reloads
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Ensure disconnection on exit
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});
