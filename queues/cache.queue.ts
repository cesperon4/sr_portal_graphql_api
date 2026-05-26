import { Queue } from "bullmq";
import { bullMqConnection } from "../lib/redis-bullmq";

export const CACHE_QUEUE_NAME = "cache";

export const cacheQueue = new Queue(CACHE_QUEUE_NAME, {
  connection: bullMqConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 1000 },
    removeOnComplete: { count: 200 },
    removeOnFail: { count: 500 },
  },
});

export type InvalidateByPrefixPayload = {
  prefix: string;
};

export function enqueueInvalidateByPrefix(
  payload: InvalidateByPrefixPayload,
  options?: { jobId?: string },
) {
  return cacheQueue.add("invalidate-by-prefix", payload, {
    jobId: options?.jobId,
  });
}
