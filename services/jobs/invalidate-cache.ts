import type { ContextObject } from "../../graphql/types/context";
import { useJobQueue } from "../../lib/job-dispatch";
import { logJobDispatched } from "../../lib/log-job-dispatched";
import { invalidateByPrefix } from "../cache";
import { enqueueInvalidateByPrefix } from "../../queues/cache.queue";

export async function scheduleInvalidateByPrefix(
  prefix: string,
  context?: Pick<ContextObject, "logger" | "requestId">,
): Promise<void> {
  const dispatch = useJobQueue() ? "queue" : "inline";

  if (dispatch === "queue") {
    await enqueueInvalidateByPrefix({ prefix });
  } else {
    await invalidateByPrefix(prefix);
  }

  logJobDispatched({
    logger: context?.logger,
    requestId: context?.requestId,
    jobName: "invalidate-by-prefix",
    queue: dispatch === "queue" ? "cache" : undefined,
    dispatch,
    meta: { prefix },
    level: "debug",
  });
}
