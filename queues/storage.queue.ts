import { Queue } from "bullmq";
import { bullMqConnection } from "../lib/redis-bullmq";
import { JobMeta } from "./queue.types";
import { ContextObject } from "../graphql/types/context";

export const STORAGE_QUEUE_NAME = "storage";

export const storageQueue = new Queue(STORAGE_QUEUE_NAME, {
  connection: bullMqConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 1000 },
    removeOnComplete: { count: 200 },
    removeOnFail: { count: 500 },
  },
});

export type DeletePostImages = JobMeta & {
  imageKeys: string[];
};

export function enqueueDeletePostImages(
  payload: DeletePostImages,
  options?: {
    jobId?: string;
  },
) {
  return storageQueue.add("delete-post-images", payload, {
    jobId: options?.jobId,
  });
  //second arg = job.data
}
