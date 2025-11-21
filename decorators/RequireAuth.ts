import { MiddlewareFn } from "type-graphql";
import { ContextObject } from "../graphql/types/context";
import { sendResponse } from "../lib/apiResponse";
import { HttpMessages, HttpStatus } from "../lib/constants/http";

export const RequireAuth: MiddlewareFn<ContextObject> = async (
  { context },
  next
) => {
  if (!context.user) {
    return sendResponse([], HttpStatus.UNAUTHORIZED, HttpMessages.UNAUTHORIZED);
  }
  return next();
};
