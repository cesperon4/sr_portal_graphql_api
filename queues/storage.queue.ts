import { JobMeta } from "./queue.types";
import { getStorageQueue } from "./lazy-queue-instances";

export { STORAGE_QUEUE_NAME } from "./lazy-queue-instances";

export type DeletePostImages = JobMeta & {
  imageKeys: string[];
};

export function enqueueDeletePostImages(
  payload: DeletePostImages,
  options?: {
    jobId?: string;
  },
) {
  return getStorageQueue().add("delete-post-images", payload, {
    jobId: options?.jobId,
  });
}
