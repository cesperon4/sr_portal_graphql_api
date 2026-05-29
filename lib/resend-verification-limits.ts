import { isRedisEnabled } from "./redis-config";
import { getRedis } from "./redis";

const COOLDOWN_SECONDS = 1;
const DAILY_LIMIT = 100;

export async function assertResendVerificationAllowed(
  userId: string,
): Promise<void> {
  if (!isRedisEnabled()) return;

  const redis = getRedis();
  const cooldownKey = `resend:cooldown:${userId}`;
  const dailyKey = `resend:daily:${userId}:${new Date().toISOString().slice(0, 10)}`;

  const ttl = await redis.ttl(cooldownKey);
  if (ttl > 0) {
    throw new Error(`Please wait ${ttl}s before requesting again`);
  }

  const count = await redis.incr(dailyKey);
  if (count === 1) {
    await redis.expire(dailyKey, 24 * 60 * 60);
  }
  if (count > DAILY_LIMIT) {
    throw new Error("Daily resend limit reached");
  }

  await redis.set(cooldownKey, "1", "EX", COOLDOWN_SECONDS);
}
