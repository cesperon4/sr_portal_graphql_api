import { Worker, type Job } from "bullmq";

import { bullMqConnection } from "../lib/redis-bullmq.js";
import { CACHE_QUEUE_NAME } from "../queues/cache.queue.js";
import { invalidateByPrefix } from "../services/cache.js";

type InvalidateByPrefixPayload = {
  prefix: string;
};

async function handleInvalidateByPrefix(job: Job<InvalidateByPrefixPayload>) {
  const { prefix } = job.data;
  return invalidateByPrefix(prefix);
}

const handlers: Record<string, (job: Job<InvalidateByPrefixPayload>) => Promise<void>> = {
  "invalidate-by-prefix": handleInvalidateByPrefix,
};

const worker = new Worker<InvalidateByPrefixPayload>(
  CACHE_QUEUE_NAME,
  async (job: Job<InvalidateByPrefixPayload>) => {
    const run = handlers[job.name];
    if (!run) throw new Error(`Unknown job name: ${job.name}`);

    await run(job);
  },
  {
    connection: bullMqConnection,
    concurrency: 5,
  },
);

worker.on("ready", () => {
  console.log("[cache.worker] BullMQ worker ready - connected to Redis");
});

worker.on("completed", (job) => {
  if (job) {
    console.log("[cache.worker] completed", job.id);
  }
});

worker.on("failed", (job, err) => {
  if (job) {
    console.error(
      "[cache.worker] Job failed",
      "id:",
      job.id,
      "name:",
      job.name,
      "data:",
      job.data,
      err,
    );
  } else {
    console.error("[cache.worker] Job failed (no job ref)", err);
  }
});
