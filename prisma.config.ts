import "dotenv/config";
import { defineConfig } from "prisma/config";

/**
 * Prisma CLI URL resolution (migrate, db push, db pull, seed, etc.).
 *
 * Order:
 *   1. DIRECT_DATABASE_URL — Supabase session-mode endpoint (port 5432). REQUIRED for
 *      `prisma migrate dev` because transaction-mode PgBouncer (port 6543) can't hold
 *      the advisory locks / session state migrations need; the CLI hangs forever otherwise.
 *   2. DATABASE_URL — used by Prisma Client at runtime and as a CLI fallback for local
 *      Postgres (where there's no separate pooler).
 *   3. DATABASE_TEST_URL — tests may only set this (see tests/setup.ts).
 *
 * Runtime (lib/prisma.ts) is unaffected: it reads DATABASE_URL directly from env.
 */
const datasourceUrl =
  process.env.DIRECT_DATABASE_URL ??
  process.env.DATABASE_URL ??
  process.env.DATABASE_TEST_URL;

if (!datasourceUrl) {
  throw new Error(
    "Missing DIRECT_DATABASE_URL, DATABASE_URL, or DATABASE_TEST_URL (required for Prisma CLI)",
  );
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "cross-env NODE_EXTRA_CA_CERTS=./certs/prod-ca-2021.crt tsx prisma/seed.ts",
  },
  datasource: {
    url: datasourceUrl,
  },
});
