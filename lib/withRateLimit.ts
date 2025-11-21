import { type GraphQLResolveInfo } from "graphql";
import { type ContextObject } from "../graphql/types/context";
import { getRateLimitConfig } from "./getRateLimitConfig";
import { type OperationType } from "./rateLimit.types";
import { checkRateLimit, getRateLimitIdentifier } from "./rateLimiter";

export function withRateLimit<Targs = unknown, TResult = unknown>(
  resolver: (
    parent: unknown,
    args: Targs,
    context: ContextObject,
    info: GraphQLResolveInfo
  ) => TResult,
  operationType: OperationType
) {
  return async (
    parent: unknown,
    args: Targs,
    context: ContextObject,
    info: GraphQLResolveInfo
  ): Promise<TResult> => {
    const identifier = getRateLimitIdentifier(context);
    const operation = `${info.parentType.name}.${info.fieldName}`;
    const config = getRateLimitConfig(operationType, context.user?.role);
    const result = await checkRateLimit({
      identifier,
      max: config.max,
      window: config.window,
      operation,
    });

    if (!result.allowed) {
      context.rateLimitError = true;
    }
    // Optionally add rate limit info to context for response headers
    context.rateLimitInfo = {
      remaining: result.remaining,
      resetAt: result.resetAt,
      limit: config.max,
    };

    return resolver(parent, args, context, info);
  };
}
