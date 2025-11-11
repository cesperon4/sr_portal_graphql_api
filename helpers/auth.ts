import { sendResponse } from "lib/apiResponse";
import { HttpStatus, HttpMessages } from "lib/constants/http";
import { type ApiResponse } from "graphql/types/response";

export function requireAuth(context: any): boolean {
  console.log("context from auth", !context.user);
  if (!context.user) {
    console.log("unauthorized");
    return false;
  }
  return true;
}

export function requireArguments<T>(args: T): boolean {
  for (const entry in args) {
    if (!args[entry]) return false;
  }
  return true;
}
