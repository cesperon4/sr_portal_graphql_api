import { Queue } from "bullmq";

import { bullMqConnection } from "../lib/redis-bullmq";

/** Stable queue name — use the same string in the matching Worker. */
export const EMAIL_QUEUE_NAME = "email";

export const emailQueue = new Queue(EMAIL_QUEUE_NAME, {
  connection: bullMqConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 1000 },
    removeOnComplete: { count: 200 },
    removeOnFail: { count: 500 },
  },
});

export type SendEmailVerificationPayload = {
  email: string;
  raw: string;
};

/**
 * Enqueue a welcome email. Call from resolvers / Route Handlers — not from a Worker.
 * Optional `jobId` can dedupe (e.g. `welcome-${userId}`) if you ensure idempotency server-side.
 */
export function enqueueEmailVerification(
  payload: SendEmailVerificationPayload,
  options?: { jobId?: string },
) {
  return emailQueue.add("send-verification", payload, {
    jobId: options?.jobId,
  });
}
