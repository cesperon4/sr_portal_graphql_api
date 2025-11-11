import { ApolloServer, AuthenticationError } from "apollo-server-micro";
import { typeDefs } from "../../graphql/schemas";
import { resolvers } from "../../graphql/resolvers";
import jwt from "jsonwebtoken";
import { parse } from "cookie";
import Cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";
import { type ContextObject, type ContextUser } from "graphql/types/context";
import { sendResponse } from "lib/apiResponse";
import { HttpStatus, HttpMessages } from "lib/constants/http";
import { type ApiResponse } from "graphql/types/response";

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

    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Origin",
      process.env.NODE_ENV === "development"
        ? "http://localhost:3001"
        : "https://sr-portal-gamma.vercel.app"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

    const token = (req.headers.authorization || "").replace("Bearer ", "");
    let user: ContextUser | null = null;

    if (token) {
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!);
        user = payload as ContextUser;
      } catch (err) {
        return sendResponse(
          [],
          HttpStatus.BAD_REQUEST,
          HttpMessages.BAD_REQUEST
        );
      }
    }

    return { req, res, user };
  },
});

const startServer = server.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
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
