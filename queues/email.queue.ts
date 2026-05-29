import { getEmailQueue } from "./lazy-queue-instances";

export { EMAIL_QUEUE_NAME } from "./lazy-queue-instances";

export type SendEmailVerificationPayload = {
  email: string;
  raw: string;
};

/**
 * Enqueue a verification email. Call from resolvers — not from a Worker.
 */
export function enqueueEmailVerification(
  payload: SendEmailVerificationPayload,
  options?: { jobId?: string },
) {
  return getEmailQueue().add("send-verification", payload, {
    jobId: options?.jobId,
  });
}
