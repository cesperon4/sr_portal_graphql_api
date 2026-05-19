import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "cross-env NODE_EXTRA_CA_CERTS=./certs/prod-ca-2021.crt tsx prisma/seed.ts",
  },
  datasource: {
    url: env("DATABASE_TEST_URL"),
  },
});
