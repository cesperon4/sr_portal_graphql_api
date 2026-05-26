import type { Logger } from "pino";

import { logger as rootLogger } from "./logger";

type JobDispatchLog = {
  logger?: Logger;
  jobName: string;
  queue?: string;
  dispatch: "queue" | "inline";
  jobId?: string;
  requestId?: string;
  meta?: Record<string, unknown>;
  /** High-volume jobs (e.g. cache bust) should use debug. */
  level?: "info" | "debug";
};

export function logJobDispatched({
  logger,
  jobName,
  queue,
  dispatch,
  jobId,
  requestId,
  meta,
  level = "info",
}: JobDispatchLog): void {
  const log = logger ?? rootLogger;

  log[level](
    {
      event: "job.dispatched",
      jobName,
      dispatch,
      ...(queue ? { queue } : {}),
      ...(jobId ? { jobId } : {}),
      ...(requestId ? { requestId } : {}),
      ...meta,
    },
    "job dispatched",
  );
}
