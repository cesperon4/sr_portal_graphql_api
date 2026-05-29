import Redis from "ioredis";

import { isRedisEnabled, requireRedisUrl } from "./redis-config";

declare global {
  // "@ts-expect-error"
  var _redisBullMq: Redis | undefined;
  // "@ts-expect-error"
  var _redisBullMqConfiguredUrl: string | undefined;
}

function bullMqRedisOptions(url: string) {
  const base = {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
  } as const;

  if (url.startsWith("rediss://")) {
    return { ...base, tls: { rejectUnauthorized: false } };
  }

  return base;
}

function connectBullMqRedis(url: string): Redis {
  return new Redis(url, bullMqRedisOptions(url));
}

/**
 * Dedicated ioredis connection for BullMQ (Queue / Worker).
 * Do not use lib/redis.ts — BullMQ expects these connection options.
 */
export function getBullMqConnection(): Redis {
  if (!isRedisEnabled()) {
    throw new Error(
      "BullMQ requires Redis. Set REDIS_ENABLED=true and REDIS_URL for local workers.",
    );
  }

  const redisUrl = requireRedisUrl();

  if (process.env.NODE_ENV === "production") {
    return connectBullMqRedis(redisUrl);
  }

  if (global._redisBullMq && global._redisBullMqConfiguredUrl === redisUrl) {
    return global._redisBullMq;
  }

  if (global._redisBullMq) {
    global._redisBullMq.disconnect();
    global._redisBullMq = undefined;
    global._redisBullMqConfiguredUrl = undefined;
  }

  const client = connectBullMqRedis(redisUrl);
  global._redisBullMq = client;
  global._redisBullMqConfiguredUrl = redisUrl;
  return client;
}

/** @deprecated Prefer getBullMqConnection() — lazy init when queues/workers start. */
export const bullMqConnection = new Proxy({} as Redis, {
  get(_target, prop) {
    const client = getBullMqConnection();
    const value = client[prop as keyof Redis];
    return typeof value === "function" ? value.bind(client) : value;
  },
});
