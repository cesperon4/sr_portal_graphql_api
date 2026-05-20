import "dotenv/config";
import { defineConfig } from "prisma/config";

/** Deploy/build use DATABASE_URL; tests may only set DATABASE_TEST_URL (see tests/setup.ts). */
const datasourceUrl =
  process.env.DATABASE_URL ?? process.env.DATABASE_TEST_URL;

if (!datasourceUrl) {
  throw new Error(
    "Missing DATABASE_URL or DATABASE_TEST_URL (required for Prisma CLI)",
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
