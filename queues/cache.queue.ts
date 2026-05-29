import { getCacheQueue } from "./lazy-queue-instances";

export { CACHE_QUEUE_NAME } from "./lazy-queue-instances";

export type InvalidateByPrefixPayload = {
  prefix: string;
};

export function enqueueInvalidateByPrefix(
  payload: InvalidateByPrefixPayload,
  options?: { jobId?: string },
) {
  return getCacheQueue().add("invalidate-by-prefix", payload, {
    jobId: options?.jobId,
  });
}
