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
  context: async ({
    req,
    res,
  }: {
    req: NextApiRequest;
    res: NextApiResponse;
  }): Promise<ContextObject | ApiResponse<[]>> => {
    if (!req || !res) throw new Error("Missing req or res");

    console.log("req: ", req.body);

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

    const token = (req.headers.authorization || "").replace("Bearer ", "");
    let user: ContextUser | null = null;

    if (token) {
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!);
        user = payload as ContextUser;
      } catch (err) {
        console.log("expired or invalid token: ", err);
        user = null;
      }
    }

    console.log("user in context: ", user);

    return { req, res, user, ip };
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
