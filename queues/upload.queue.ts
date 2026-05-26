import { Worker, type Job } from "bullmq";

import { Queue } from "bullmq";
import { bullMqConnection } from "../lib/redis-bullmq";

export const UPLOAD_QUEUE_NAME = "upload";

async function handleImageUpload(job: Job) {}

export const uploadQueue = new Queue(UPLOAD_QUEUE_NAME, {
  connection: bullMqConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 1000 },
    removeOnComplete: { count: 200 },
    removeOnFail: { count: 500 },
  },
});
