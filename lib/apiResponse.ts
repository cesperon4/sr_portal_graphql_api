import { type ApiResponse } from "graphql/types/response";
import {
  type HttpMessage,
  HttpMessages,
  HttpStatus,
  type HttpStatusCode,
} from "lib/constants/http";

export function sendResponse<T>(
  data: T,
  status: HttpStatusCode = HttpStatus.OK,
  message?: HttpMessage,
  error?: string
): ApiResponse<T> {
  return {
    status,
    message: message ?? defaultMessage(status),
    data,
    error,
  };
}

function defaultMessage(
  status: HttpStatusCode
): HttpMessage | "Unknown status" {
  switch (status) {
    case HttpStatus.OK:
      return HttpMessages.OK;
    case HttpStatus.CREATED:
      return HttpMessages.CREATED;
    case HttpStatus.BAD_REQUEST:
      return HttpMessages.BAD_REQUEST;
    case HttpStatus.UNAUTHORIZED:
      return HttpMessages.UNAUTHORIZED;
    case HttpStatus.FORBIDDEN:
      return HttpMessages.FORBIDDEN;
    case HttpStatus.NOT_FOUND:
      return HttpMessages.NOT_FOUND;
    case HttpStatus.CONFLICT:
      return HttpMessages.CONFLICT;
    case HttpStatus.INTERNAL_SERVER_ERROR:
      return HttpMessages.INTERNAL_SERVER_ERROR;
    default:
      return "Unknown status";
  }
}
