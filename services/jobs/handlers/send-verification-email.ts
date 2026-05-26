import { sendVerificationEmail } from "../../../helpers/mailer";
import type { SendEmailVerificationPayload } from "../../../queues/email.queue";

export async function sendVerificationEmailHandler(
  payload: SendEmailVerificationPayload,
): Promise<void> {
  await sendVerificationEmail(payload.email, payload.raw);
}
