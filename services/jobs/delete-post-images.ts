import { useJobQueue } from "../../lib/job-dispatch";
import { logJobDispatched } from "../../lib/log-job-dispatched";
import {
  enqueueDeletePostImages,
  type DeletePostImages,
} from "../../queues/storage.queue";
import type { ContextObject } from "../../graphql/types/context";
import { deletePostImagesHandler } from "./handlers/delete-post-images";

export async function scheduleDeletePostImages(
  payload: DeletePostImages,
  context: ContextObject,
  options?: { jobId?: string },
): Promise<void> {
  if (payload.imageKeys.length === 0) return;

  if (useJobQueue()) {
    const job = await enqueueDeletePostImages(payload, options);
    logJobDispatched({
      logger: context.logger,
      requestId: context.requestId,
      jobName: "delete-post-images",
      queue: "storage",
      dispatch: "queue",
      jobId: String(job.id),
      meta: { imageKeyCount: payload.imageKeys.length },
    });
    return;
  }

  await deletePostImagesHandler(payload);
  logJobDispatched({
    logger: context.logger,
    requestId: context.requestId,
    jobName: "delete-post-images",
    dispatch: "inline",
    meta: { imageKeyCount: payload.imageKeys.length },
  });
}
