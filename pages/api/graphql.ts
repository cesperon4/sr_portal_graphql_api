// External packages
import { ApolloServer } from "apollo-server-micro";
import Cors from "cors";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

// Internal modules
import { resolvers } from "../../graphql/resolvers";
import { typeDefs } from "../../graphql/schemas";
import {
  type ContextObject,
  type ContextUser,
} from "../../graphql/types/context";
import { type ApiResponse } from "../../graphql/types/response";
import { sendResponse } from "../../lib/apiResponse";
import { HttpMessages, HttpStatus } from "../../lib/constants/http";
import { logger } from "../../lib/logger";
import { graphqlOperationLoggingPlugin } from "../../lib/graphql-operation-logging-plugin";

// CORS setup
const cors = Cors({
  origin:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : "https://sr-portal-gamma.vercel.app",
  methods: ["GET", "POST"],
  credentials: true,
});

function runCorsMiddleware(req: NextApiRequest, res: NextApiResponse) {
  return new Promise<void>((resolve, reject) => {
    cors(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve();
    });
  });
}

// Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [graphqlOperationLoggingPlugin()],
  context: async ({
    req,
    res,
  }: {
    req: NextApiRequest;
    res: NextApiResponse;
  }): Promise<ContextObject | ApiResponse<[]>> => {
    if (!req || !res) throw new Error("Missing req or res");

    //always reuse requestId if possible so we can correlate id's
    const requestId =
      (req.headers["x-request-id"] as string) ?? crypto.randomUUID();

    const ip =
      req.headers["x-forwarded-for"]?.toString().split(",")[0] ||
      req.socket.remoteAddress ||
      null;

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
    res.setHeader("x-request-id", requestId);

    const token = (req.headers.authorization || "").replace("Bearer ", "");
    let user: ContextUser | null = null;

    if (token) {
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!);
        user = payload as ContextUser;
      } catch (err) {
        console.log("expired or invalid token: ", err);
        user = null;
        logger.warn({ err }, "invalid or expired JWT");
        sendResponse(null, HttpStatus.UNAUTHORIZED, HttpMessages.UNAUTHORIZED);
      }
    }

    const reqLogger = logger.child({
      requestId,
      ip,
      userId: user && "userId" in user ? user.userId : null,
      role: user?.role ?? null,
    });

    return { req, res, user, ip, requestId, logger: reqLogger };
  },
});

const startServer = server.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await runCorsMiddleware(req, res);

  if (req.method === "OPTIONS") {
    res.end();
    return;
  }

  await startServer;
  return server.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
