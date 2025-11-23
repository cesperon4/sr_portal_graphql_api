import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { Pool } from "pg";
import { PrismaClient } from "../generated/prisma/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

console.log("📦 NODE_ENV:", process.env.NODE_ENV);
console.log("🔑 DATABASE_URL:", process.env.DATABASE_URL?.slice(0, 50) + "..."); // partial for safety
console.log("🔑 DATABASE_CA present?", !!process.env.DATABASE_CA);

let connectionConfig: { connectionString: string; ssl?: any } = {
  connectionString: process.env.DATABASE_URL!,
};

if (process.env.DATABASE_CA) {
  console.log("🔐 Using DATABASE_CA from environment variable");
  connectionConfig.ssl = {
    ca: process.env.DATABASE_CA,
    rejectUnauthorized: true,
  };

  console.log("connectionConfig: ", connectionConfig);
} else if (process.env.NODE_ENV === "production") {
  console.warn(
    "⚠️ Production environment without DATABASE_CA. Connection may fail!"
  );
  // Optional insecure fallback (not recommended):
  connectionConfig.ssl = { rejectUnauthorized: false };
} else {
  console.log(
    "🌱 Development environment: disabling SSL certificate verification"
  );
  connectionConfig.ssl = { rejectUnauthorized: false };
}

console.log("🛠 Prisma connectionConfig:", connectionConfig);

const pool = new Pool(connectionConfig);
const adapter = new PrismaPg(pool);

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
  console.log("💤 Disconnecting Prisma...");
  await prisma.$disconnect();
  console.log("✅ Prisma disconnected");
});
