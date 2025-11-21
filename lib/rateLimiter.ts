import { type ContextObject } from "../graphql/types/context";

import { redis } from "./redis"; // Import your existing Redis instance

type RateLimitOptions = {
  identifier: string;
  max: number;
  window: number;
  operation?: string;
};

type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
  current: number;
};

export async function checkRateLimit({
  identifier,
  max,
  window,
  operation = "default",
}: RateLimitOptions): Promise<RateLimitResult> {
  const key = `rate_limit:${operation}:${identifier}`;

  try {
    const current = await redis.get(key);
    const count = current ? parseInt(current, 10) : 0;

    if (count >= max) {
      const ttl = await redis.ttl(key);
      return {
        allowed: false,
        remaining: 0,
        resetAt: new Date(Date.now() + ttl * 1000),
        current: count,
      };
    }

    const pipeline = redis.pipeline();
    pipeline.incr(key);
    pipeline.ttl(key);

    const results = await pipeline.exec();
    const newCount = results?.[0]?.[1] as number;
    const currentTTL = results?.[1]?.[1] as number;

    if (currentTTL == -1) {
      await redis.expire(key, window);
    }

    return {
      allowed: true,
      remaining: Math.max(0, max - newCount),
      resetAt: new Date(
        Date.now() + (currentTTL > 0 ? currentTTL : window) * 1000
      ),
      current: newCount,
    };
  } catch (err) {
    console.error("Rate limiter error:", err);
    return {
      allowed: true,
      remaining: max,
      resetAt: new Date(Date.now() + window * 1000),
      current: 0,
    };
  }
}

export function getRateLimitIdentifier(context: ContextObject): string {
  if (context.user && "userId" in context.user) {
    return `user:${context.user.userId}`;
  }

  if (context.ip) {
    return `ip:${context.ip}`;
  }
  return "anonymous";
}
