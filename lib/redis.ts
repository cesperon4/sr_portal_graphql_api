import Redis from "ioredis";

declare global {
  // "@ts-expect-error"
  var _redis: Redis | undefined;
  // "@ts-expect-error"
  var _redisConfiguredUrl: string | undefined;
}

const redisUrlRaw =
  process.env.REDIS_URL ??
  process.env.UPSTASH_REDIS_URL ??
  process.env.UPSTASH_KV_URL;

if (!redisUrlRaw) {
  throw new Error(
    "Missing Redis URL: set REDIS_URL, UPSTASH_REDIS_URL, or UPSTASH_KV_URL",
  );
}

const redisUrl: string = redisUrlRaw;

function connectRedis(url: string): Redis {
  return new Redis(
    url,
    url.startsWith("rediss://")
      ? { tls: { rejectUnauthorized: false } }
      : {},
  );
}

/** Dev HMR keeps `global._redis`; recreate client when REDIS_URL changes. */
function getRedis(): Redis {
  if (process.env.NODE_ENV === "production") {
    return connectRedis(redisUrl);
  }

  if (
    global._redis &&
    global._redisConfiguredUrl === redisUrl
  ) {
    return global._redis;
  }

  if (global._redis) {
    global._redis.disconnect();
    global._redis = undefined;
    global._redisConfiguredUrl = undefined;
  }

  const client = connectRedis(redisUrl);
  global._redis = client;
  global._redisConfiguredUrl = redisUrl;
  return client;
}

export const redis = getRedis();
