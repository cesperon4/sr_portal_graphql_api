import "dotenv/config";
import { beforeEach } from "vitest";

if (!process.env.DATABASE_TEST_URL) {
  throw new Error("DATABASE_TEST_URL is required for tests");
}

// Redirect the app's DATABASE_URL to the test DB before anything imports
// `lib/prisma` (which reads DATABASE_URL at module-init time). Also strip any
// Supabase CA so Prisma doesn't try to negotiate TLS against local Postgres.
process.env.DATABASE_URL = process.env.DATABASE_TEST_URL;
delete process.env.DATABASE_CA;

const { pool } = await import("./db");

beforeEach(async () => {
  await pool.query(
    'TRUNCATE TABLE "User", "Post", "PostComment", "Like", "ArrestLog", "RefreshToken", "EmailVerificationToken" RESTART IDENTITY CASCADE',
  );
});
