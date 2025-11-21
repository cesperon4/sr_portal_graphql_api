export type HttpStatusCode = (typeof HttpStatus)[keyof typeof HttpStatus];
export type HttpMessage = (typeof HttpMessages)[keyof typeof HttpMessages];

export const HttpStatus = {
  // Success
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,

  // Client Errors
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,

  // Server Errors
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Standard messages
export const HttpMessages = {
  // Success
  OK: "Request succeeded",
  CREATED: "Resource successfully created",
  NO_CONTENT: "No content",

  // Client Errors
  BAD_REQUEST: "Bad request",
  UNAUTHORIZED: "Unauthorized access",
  FORBIDDEN: "Forbidden",
  NOT_FOUND: "Resource not found",
  CONFLICT: "Conflict detected",
  UNPROCESSABLE_ENTITY: "Unprocessable entity",

  // Server Errors
  INTERNAL_SERVER_ERROR: "Internal server error",
  SERVICE_UNAVAILABLE: "Service unavailable",
  RATE_LIMIT_ERROR: "Rate limit exceeded. Please try again later.",
} as const;
