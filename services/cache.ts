import { redis } from "../lib/redis";
import crypto from "crypto";
import stringify from "fast-json-stable-stringify";

import { type CacheKeyVariables, type CacheValues } from "graphql/types/cache";

export function makeCacheKey(
  operationName: string,
  variables: CacheKeyVariables
) {
  const payload = `${operationName}:${stringify(variables ?? {})}`;
  return crypto.createHash("sha256").update(payload).digest("hex");
}

export async function setJSON<T>(
  key: string,
  value: T,
  ttlMs: number
): Promise<void> {
  await redis.set(key, JSON.stringify(value), "PX", ttlMs);
}

export async function getJSON<T>(key: string): Promise<T | null> {
  const raw = await redis.get(key);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as T;
  } catch (err) {
    await redis.del(key);
    return null;
  }
}

export async function invalidateByPrefix(prefix: string) {
  const stream = redis.scanStream({ match: `${prefix}*`, count: 100 });
  const pipeline = redis.pipeline();
  let count = 0;
  return new Promise<void>((resolve, reject) => {
    stream.on("data", (keys: string[]) => {
      console.log("data: ", keys);
      if (keys.length) {
        keys.forEach((k) => pipeline.del(k));
        count += keys.length;
      }
    });

    stream.on("end", async () => {
      if (count > 0) {
        await pipeline.exec();
      }
      resolve();
    });

    stream.on("error", (err) => reject(err));
  });
}
