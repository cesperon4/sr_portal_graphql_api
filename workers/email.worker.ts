import { Worker, type Job } from "bullmq";

import { bullMqConnection } from "../lib/redis-bullmq.js";
import { EMAIL_QUEUE_NAME, type SendEmailVerificationPayload } from "../queues/email.queue.js";
import { sendVerificationEmailHandler } from "../services/jobs/handlers/send-verification-email.js";

async function handleVerificationEmail(job: Job<SendEmailVerificationPayload>) {
  await sendVerificationEmailHandler(job.data);
}

const handlers: Record<string, (job: Job<SendEmailVerificationPayload>) => Promise<void>> = {
  "send-verification": handleVerificationEmail,
};

const worker = new Worker<SendEmailVerificationPayload>(
  EMAIL_QUEUE_NAME,
  async (job: Job<SendEmailVerificationPayload>) => {
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
  console.log("[email.worker] BullMQ worker ready — connected to Redis");
});

worker.on("completed", (job) => {
  if (job) {
    console.log("[email.worker] completed", job.id, "attemptsMade:", job.attemptsMade);
  }
});

worker.on("failed", (job, err) => {
  if (job) {
    console.error(
      "[email.worker] Job failed",
      "id:",
      job.id,
      "name:",
      job.name,
      "data:",
      job.data,
      err,
    );
  } else {
    console.error("[email.worker] Job failed (no job ref)", err);
  }
});
