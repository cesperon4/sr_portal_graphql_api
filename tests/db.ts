import { Pool } from "pg";

const url = process.env.DATABASE_TEST_URL;

if (!url) {
  throw new Error("DATABASE_TEST_URL is required for tests");
}

// Safety net: refuse to run the test pool against anything other than a local
// database. Prevents accidentally truncating a remote/production database.
if (!/@(localhost|127\.0\.0\.1)[:/]/.test(url)) {
  throw new Error(
    `Refusing to run tests: DATABASE_TEST_URL must target localhost (got host in URL: ${url.replace(/:[^:@]+@/, ":<redacted>@")})`,
  );
}

export const pool = new Pool({ connectionString: url });
