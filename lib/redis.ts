import Redis from "ioredis";

import { isRedisEnabled, requireRedisUrl } from "./redis-config";

declare global {
  // "@ts-expect-error"
  var _redis: Redis | undefined;
  // "@ts-expect-error"
  var _redisConfiguredUrl: string | undefined;
}

function connectRedis(url: string): Redis {
  return new Redis(
    url,
    url.startsWith("rediss://") ? { tls: { rejectUnauthorized: false } } : {},
  );
}

/** Dev HMR keeps `global._redis`; recreate client when REDIS_URL changes. */
function createRedisClient(): Redis {
  const redisUrl = requireRedisUrl();

  if (process.env.NODE_ENV === "production") {
    return connectRedis(redisUrl);
  }

  if (global._redis && global._redisConfiguredUrl === redisUrl) {
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

let redisClient: Redis | undefined;

/** Lazy Redis client. Only connects when Redis is enabled. */
export function getRedis(): Redis {
  if (!isRedisEnabled()) {
    throw new Error("Redis is disabled (REDIS_ENABLED=false)");
  }

  if (!redisClient) {
    redisClient = createRedisClient();
  }

  return redisClient;
}

/** @deprecated Prefer getRedis() — kept for existing imports. */
export const redis = new Proxy({} as Redis, {
  get(_target, prop) {
    const client = getRedis();
    const value = client[prop as keyof Redis];
    return typeof value === "function" ? value.bind(client) : value;
  },
});
