// tests/testServer.ts
import { ApolloServer } from "apollo-server-micro";
import jwt from "jsonwebtoken";
import { IncomingMessage } from "http";
import { ServerResponse } from "http";
import { resolvers } from "../graphql/resolvers";
import { typeDefs } from "../graphql/schemas";
import { ContextObject, ContextUser } from "../graphql/types/context";

export type MockReq = IncomingMessage & {
  headers?: Record<string, string>;
  cookies?: Record<string, string>;
  socket?: { remoteAddress?: string };
};

export type MockRes = ServerResponse & {
  _headers: Record<string, string>;
  setHeader: (name: string, value: string | number | readonly string[]) => void;
  getHeader: (name: string) => string | number | string[] | undefined;
};

function createMockRes(): MockRes {
  const _headers: Record<string, string> = {};
  return {
    _headers,
    setHeader(name: string, value: string | number | readonly string[]) {
      _headers[name] = Array.isArray(value) ? value.join(", ") : String(value);
    },
    getHeader(name: string) {
      return _headers[name];
    },
  } as MockRes;
}

/**
 * Create a test ApolloServer instance.
 * Use executeOperation() for testing with full control over req/res.
 */
export function createTestServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({
      req,
      res,
    }: {
      req?: MockReq;
      res?: MockRes;
    }): Promise<ContextObject> => {
      const ip =
        req?.headers?.["x-forwarded-for"]?.toString().split(",")[0] ||
        req?.socket?.remoteAddress ||
        null;

      if (res) {
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader(
          "Access-Control-Allow-Origin",
          process.env.NODE_ENV === "development"
            ? "http://localhost:3001"
            : "https://sr-portal-gamma.vercel.app",
        );
        res.setHeader(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept",
        );
      }

      const token = req?.headers?.authorization?.replace("Bearer ", "") || "";
      let user: ContextUser | null = null;
      if (token && process.env.JWT_SECRET) {
        try {
          const payload = jwt.verify(token, process.env.JWT_SECRET);
          user = payload as ContextUser;
        } catch {
          user = null;
        }
      }

      return { req: req as any, res: res as any, user, ip };
    },
  });

  return server;
}

/**
 * Execute a GraphQL operation with optional mock req/res.
 * Use this for testing mutations like refresh that need cookies.
 */
export async function executeGraphQL(
  server: ApolloServer,
  options: {
    query: string;
    variables?: Record<string, unknown>;
    cookie?: string;
  },
) {
  const res = createMockRes();
  const cookies = parseCookieHeader(options.cookie);
  const req: MockReq = {
    headers: {
      "content-type": "application/json",
      cookie: options.cookie || "",
    },
    cookies,
    socket: { remoteAddress: "127.0.0.1" },
  } as MockReq;

  const result = await server.executeOperation(
    { query: options.query, variables: options.variables },
    { req, res },
  );

  return { ...result, res };
}

function parseCookieHeader(cookieHeader?: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;
  cookieHeader.split(";").forEach((part) => {
    const [key, value] = part.trim().split("=");
    if (key && value) cookies[key] = decodeURIComponent(value);
  });
  return cookies;
}
