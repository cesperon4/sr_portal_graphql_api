import { useJobQueue } from "../../lib/job-dispatch";
import {
  enqueueDeletePostImages,
  type DeletePostImages,
} from "../../queues/storage.queue";
import { deletePostImagesHandler } from "./handlers/delete-post-images";

export async function scheduleDeletePostImages(
  payload: DeletePostImages,
  options?: { jobId?: string },
): Promise<void> {
  if (payload.imageKeys.length === 0) return;

  if (useJobQueue()) {
    await enqueueDeletePostImages(payload, options);
    return;
  }

  await deletePostImagesHandler(payload);
}
