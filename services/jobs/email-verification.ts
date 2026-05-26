import { useJobQueue } from "../../lib/job-dispatch";
import {
  enqueueEmailVerification,
  type SendEmailVerificationPayload,
} from "../../queues/email.queue";
import { sendVerificationEmailHandler } from "./handlers/send-verification-email";

export async function scheduleEmailVerification(
  payload: SendEmailVerificationPayload,
): Promise<void> {
  if (useJobQueue()) {
    await enqueueEmailVerification(payload);
    return;
  }

  await sendVerificationEmailHandler(payload);
}
