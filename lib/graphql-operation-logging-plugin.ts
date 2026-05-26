import type { ApolloServerPlugin } from "apollo-server-plugin-base";

import type { ContextObject } from "../graphql/types/context";
import { sanitizeLogVariables } from "./sanitize-log-variables";

/**
 * Logs GraphQL operation name, sanitized variables, duration, and errors on
 * context.logger (same requestId / userId child logger as resolvers).
 */
export function graphqlOperationLoggingPlugin(): ApolloServerPlugin<ContextObject> {
  return {
    async requestDidStart(requestContext) {
      const context = requestContext.context;
      const startedAt = Date.now();
      const variables = sanitizeLogVariables(
        requestContext.request.variables as
          | Record<string, unknown>
          | undefined,
      );
      let operationName =
        requestContext.request.operationName ?? "(anonymous)";
      let operationType: string | undefined;

      return {
        async didResolveOperation(ctx) {
          operationName = ctx.operationName ?? operationName;
          operationType = ctx.operation.operation;
        },

        async didEncounterErrors(ctx) {
          for (const err of ctx.errors) {
            context.logger.warn(
              {
                event: "graphql.operation.error",
                operationName,
                operationType,
                variables,
                message: err.message,
                path: err.path,
                code: err.extensions?.code,
              },
              "graphql resolver error",
            );
          }
        },

        async willSendResponse(ctx) {
          const hasErrors = (ctx.errors?.length ?? 0) > 0;

          context.logger.info(
            {
              event: "graphql.operation",
              operationName,
              operationType,
              variables,
              durationMs: Date.now() - startedAt,
              hasErrors,
            },
            hasErrors
              ? "graphql operation completed with errors"
              : "graphql operation completed",
          );
        },
      };
    },
  };
}
