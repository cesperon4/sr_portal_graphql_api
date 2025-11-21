import Redis from "ioredis";

declare global {
  // "@ts-expect-error"
  var _redis: Redis | undefined;
}

const redisUrl = process.env.REDIS_URL!;
const isTls = redisUrl.startsWith("rediss://"); // check protocol

export const redis =
  global._redis ||
  new Redis(redisUrl, isTls ? { tls: { rejectUnauthorized: false } } : {});

if (process.env.NODE_ENV !== "production") {
  // "@ts-expect-error"
  global._redis = redis;
}
