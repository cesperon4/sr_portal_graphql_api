import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { Pool } from "pg";
import { PrismaClient } from "../generated/prisma/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error("DATABASE_URL is required");
}

const isLocal = /@(localhost|127\.0\.0\.1)[:/]/.test(url);

console.log("📦 NODE_ENV:", process.env.NODE_ENV);
console.log("🔑 DATABASE_URL:", url.slice(0, 50) + "...");
console.log("🔑 DATABASE_CA present?", !!process.env.DATABASE_CA);
console.log("🏠 isLocal?", isLocal);

const connectionConfig: { connectionString: string; ssl?: any } = {
  connectionString: url,
};

if (!isLocal) {
  if (process.env.DATABASE_CA) {
    console.log("🔐 Using DATABASE_CA from environment variable");
    connectionConfig.ssl = {
      ca: process.env.DATABASE_CA,
      rejectUnauthorized: true,
    };
  } else {
    if (process.env.NODE_ENV === "production") {
      console.warn(
        "⚠️ Production environment without DATABASE_CA. Connection may fail!",
      );
    }
    connectionConfig.ssl = { rejectUnauthorized: false };
  }
} else {
  console.log("🌱 Local Postgres detected — SSL disabled");
}

console.log("🛠 Prisma connectionConfig:", {
  ...connectionConfig,
  ssl: connectionConfig.ssl ? "<set>" : undefined,
});

const pool = new Pool(connectionConfig);
const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: [],
    //used for sql logs
    // process.env.NODE_ENV === "development"
    //   ? ["query", "error", "warn"]
    //   : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

process.on("beforeExit", async () => {
  console.log("💤 Disconnecting Prisma...");
  await prisma.$disconnect();
  console.log("✅ Prisma disconnected");
});
