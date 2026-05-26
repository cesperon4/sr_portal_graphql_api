export type JobDispatchMode = "queue" | "inline";

/**
 * When true, side effects are enqueued to BullMQ (local dev + Docker workers).
 * When false, handlers run inline in the API process (production on Vercel).
 *
 * Override with JOB_DISPATCH=queue|inline.
 * Default: queue when NODE_ENV=development and not on Vercel; inline otherwise.
 */
export function useJobQueue(): boolean {
  const mode = process.env.JOB_DISPATCH as JobDispatchMode | undefined;

  if (mode === "queue") return true;
  if (mode === "inline") return false;

  if (process.env.VERCEL_ENV) return false;

  return process.env.NODE_ENV === "development";
}
