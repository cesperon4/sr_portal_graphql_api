import { createTestServer, executeGraphQL } from "./testServer";

const server = createTestServer();

export async function graphqlRequest(
  query: string,
  variables?: Record<string, unknown>,
  cookie?: string,
) {
  const cookieHeader = cookie
    ? (typeof cookie === "string" && cookie.includes("=")
        ? cookie
        : `refreshToken=${cookie}`)
    : undefined;

  const result = await executeGraphQL(server, {
    query,
    variables,
    cookie: cookieHeader,
  });

  return result;
}
