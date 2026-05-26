import type { ContextObject } from "../../graphql/types/context";
import { useJobQueue } from "../../lib/job-dispatch";
import { logJobDispatched } from "../../lib/log-job-dispatched";
import {
  enqueueEmailVerification,
  type SendEmailVerificationPayload,
} from "../../queues/email.queue";
import { sendVerificationEmailHandler } from "./handlers/send-verification-email";

export async function scheduleEmailVerification(
  payload: SendEmailVerificationPayload,
  context?: Pick<ContextObject, "logger" | "requestId">,
): Promise<void> {
  const dispatch = useJobQueue() ? "queue" : "inline";

  if (dispatch === "queue") {
    const job = await enqueueEmailVerification(payload);
    logJobDispatched({
      logger: context?.logger,
      requestId: context?.requestId,
      jobName: "send-verification",
      queue: "email",
      dispatch: "queue",
      jobId: String(job.id),
    });
    return;
  }

  await sendVerificationEmailHandler(payload);
  logJobDispatched({
    logger: context?.logger,
    requestId: context?.requestId,
    jobName: "send-verification",
    dispatch: "inline",
  });
}
