import { Queue, type QueueOptions } from "bullmq";

import { getBullMqConnection } from "../lib/redis-bullmq";

const DEFAULT_JOB_OPTIONS: QueueOptions["defaultJobOptions"] = {
  attempts: 3,
  backoff: { type: "exponential", delay: 1000 },
  removeOnComplete: { count: 200 },
  removeOnFail: { count: 500 },
};

/** Defer BullMQ Queue construction until first enqueue (avoids Redis on Vercel import). */
export function createLazyQueue(name: string): () => Queue {
  let queue: Queue | undefined;

  return () => {
    if (!queue) {
      queue = new Queue(name, {
        connection: getBullMqConnection(),
        defaultJobOptions: DEFAULT_JOB_OPTIONS,
      });
    }
    return queue;
  };
}
