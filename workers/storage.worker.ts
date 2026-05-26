import type { FileObject } from "@supabase/storage-js";
import { Worker, type Job } from "bullmq";

import { bullMqConnection } from "../lib/redis-bullmq.js";
import {
  STORAGE_QUEUE_NAME,
  type DeletePostImages,
} from "../queues/storage.queue.js";
import { deletePostImagesHandler } from "../services/jobs/handlers/delete-post-images.js";

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
    const run = handlers[job.name];
    if (!run) throw new Error(`Unknown job name: ${job.name}`);

    return run(job);
  },
  { connection: bullMqConnection, concurrency: 5 },
);

worker.on("ready", () => {
  console.log("[storage.worker] BullMQ worker ready — connected to Redis");
});

worker.on("completed", (job, result) => {
  console.log("[storage.worker] completed", {
    jobId: job.id,
    jobName: job.name,
    requestedKeys: job.data.imageKeys,
    deleted: result.map((file) => file.name),
  });
});

worker.on("failed", (job, err) => {
  if (job) {
    console.error(
      "[storage.worker] job failed",
      "id:",
      job.id,
      "name:",
      job.name,
      "data:",
      job.data,
      err,
    );
  } else {
    console.error("[storage.worker] job failed (no job ref)", err);
  }
});
