const SENSITIVE_KEYS = new Set([
  "password",
  "raw",
  "token",
  "refreshToken",
  "imageBase64",
  "imageName",
  "tokenHash",
]);

/** Strip sensitive GraphQL variables before logging. */
export function sanitizeLogVariables(
  variables: Record<string, unknown> | undefined,
): Record<string, unknown> | undefined {
  if (!variables) return undefined;

  const out: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(variables)) {
    if (SENSITIVE_KEYS.has(key)) {
      out[key] = "[REDACTED]";
      continue;
    }

    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      out[key] = sanitizeLogVariables(value as Record<string, unknown>);
      continue;
    }

    if (Array.isArray(value) && key === "imageBase64") {
      out[key] = `[REDACTED:${value.length} items]`;
      continue;
    }

    out[key] = value;
  }

  return out;
}
