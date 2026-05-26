import { useJobQueue } from "../../lib/job-dispatch";
import { invalidateByPrefix } from "../cache";
import { enqueueInvalidateByPrefix } from "../../queues/cache.queue";

export async function scheduleInvalidateByPrefix(prefix: string): Promise<void> {
  if (useJobQueue()) {
    await enqueueInvalidateByPrefix({ prefix });
    return;
  }

  await invalidateByPrefix(prefix);
}
