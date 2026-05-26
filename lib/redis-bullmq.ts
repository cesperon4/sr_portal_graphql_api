import Redis from "ioredis";

declare global {
  // "@ts-expect-error"
  var _redisBullMq: Redis | undefined;
  // "@ts-expect-error"
  var _redisBullMqConfiguredUrl: string | undefined;
}

/** Same precedence as lib/redis.ts; second TCP connection with BullMQ-required options. */
const redisUrlRaw =
  process.env.UPSTASH_KV_URL ??
  process.env.UPSTASH_REDIS_URL ??
  process.env.REDIS_URL;

if (!redisUrlRaw) {
  throw new Error(
    "Missing Redis URL: set UPSTASH_REDIS_URL, UPSTASH_KV_URL, or REDIS_URL",
  );
}

const redisUrl: string = redisUrlRaw;

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
function getBullMqConnection(): Redis {
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

export const bullMqConnection = getBullMqConnection();
