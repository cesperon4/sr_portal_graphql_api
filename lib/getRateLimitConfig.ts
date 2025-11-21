import { type OperationType } from "./rateLimit.types";

export type RateLimitConfig = {
  max: number;
  window: number;
};

export function getRateLimitConfig(
  operation: OperationType,
  userRole?: string
): RateLimitConfig {
  if (!userRole || userRole === "GUEST") {
    return {
      query: { max: 50, window: 60 },
      mutation: { max: 5, window: 60 },
      expensive: { max: 10, window: 60 },
    }[operation];
  }

  if (userRole === "USER") {
    return {
      query: { max: 200, window: 60 },
      mutation: { max: 20, window: 60 },
      expensive: { max: 50, window: 60 },
    }[operation];
  }

  // Default fallback
  return {
    query: { max: 100, window: 60 },
    mutation: { max: 10, window: 60 },
    expensive: { max: 20, window: 60 },
  }[operation];
}
