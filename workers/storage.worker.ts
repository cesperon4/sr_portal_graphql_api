import type { FileObject } from "@supabase/storage-js";
import { Worker, type Job } from "bullmq";

import { bullMqConnection } from "../lib/redis-bullmq.js";
import {
  STORAGE_QUEUE_NAME,
  type DeletePostImages,
} from "../queues/storage.queue.js";
import { deletePostImagesHandler } from "../services/jobs/handlers/delete-post-images.js";

import { logger } from "../lib/logger.js";

const workerLogger = logger.child({
  component: "storage.worker",
  queue: STORAGE_QUEUE_NAME,
});

async function handleDeletePostImages(
  job: Job<DeletePostImages>,
): Promise<FileObject[]> {
  return deletePostImagesHandler(job.data);
}

const handlers: Record<
  string,
  (job: Job<DeletePostImages>) => Promise<FileObject[]>
> = {
  "delete-post-images": handleDeletePostImages,
};

const worker = new Worker<DeletePostImages, FileObject[]>(
  STORAGE_QUEUE_NAME,
  async (job: Job<DeletePostImages>) => {
    const jobLogger = workerLogger.child({
      requestId: job.data.requestId,
      jobId: job.id,
      jobName: job.name,
    });
    jobLogger.info({ event: "job.active" }, "processing job");

    const run = handlers[job.name];
    if (!run) throw new Error(`Unknown job name: ${job.name}`);

    return run(job);
  },
  { connection: bullMqConnection, concurrency: 5 },
);

worker.on("ready", () => {
  workerLogger.info("worker ready");
});

worker.on("completed", (job, result) => {
  workerLogger.info(
    {
      requestId: job.data.requestId,
      event: "job.completed",
      userId: job.data.userId,
      jobId: job.id,
      jobName: job.name,
      meta: {
        imageKeyCount: job.data.imageKeys.length,
        deletedCount: result.length,
      },
    },
    "job completed",
  );
});

worker.on("failed", (job, err) => {
  if (job) {
    workerLogger.error(
      {
        requestId: job.data.requestId,
        event: "job.failed",
        userId: job.data.userId,
        jobId: job?.id,
        jobName: job?.name,
        attemptsMade: job?.attemptsMade,
        err, // pino serializes this
      },
      "job failed",
    );
  }
});
