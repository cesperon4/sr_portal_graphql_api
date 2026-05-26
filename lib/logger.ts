import pino from "pino";

export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",

  base: {
    service: "sr-portal-graphql",
    env: process.env.NODE_ENV,
  },

  redact: {
    paths: [
      "password",
      "*.password",
      "raw",
      "*.raw",
      "variables.raw",
      "variables.password",
      "variables.data.password",
      "variables.data.raw",
      "variables.data.imageBase64",
      "req.headers.authorization",
      "req.headers.cookie",
      "token",
      "*.token",
      "tokenHash",
      "*.tokenHash",
    ],
    censor: "[REDACTED]",
  },

  transport:
    process.env.NODE_ENV === "development"
      ? {
          target: "pino-pretty",
          options: { colorize: true, translateTime: "SYS:standard" },
        }
      : undefined,
});
