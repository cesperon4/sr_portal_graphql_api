/**
 * Redis is optional. Disabled on Vercel by default (REDIS_ENABLED=false or VERCEL_ENV).
 * Local dev: docker compose up -d redis + REDIS_URL=redis://127.0.0.1:6379
 */
export function isRedisEnabled(): boolean {
  const explicit = process.env.REDIS_ENABLED;
  if (explicit === "true") return true;
  if (explicit === "false") return false;

  // Production on Vercel: off unless explicitly enabled
  if (process.env.VERCEL_ENV) return false;

  return Boolean(resolveRedisUrl());
}

/** Prefer local REDIS_URL over Upstash when both are set. */
export function resolveRedisUrl(): string | undefined {
  return (
    process.env.REDIS_URL ??
    process.env.UPSTASH_REDIS_URL ??
    process.env.UPSTASH_KV_URL
  );
}

export function requireRedisUrl(): string {
  const url = resolveRedisUrl();
  if (!url) {
    throw new Error(
      "Redis is enabled but no URL is set. Use REDIS_URL=redis://127.0.0.1:6379 for local dev.",
    );
  }
  return url;
}
