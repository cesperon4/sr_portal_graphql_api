import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "../../graphql/schemas";
import { resolvers } from "../../graphql/resolvers";
import jwt from "jsonwebtoken";
import { parse } from "cookie";
import Cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";

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
  context: async ({ req, res }) => {
    if (!req || !res) {
      throw new Error("Missing `req` or `res` in context.");
    }

    // CORS headers (still recommended in dev)
    res.setHeader("Access-Control-Allow-Credentials", "true"); //This allows the browser to include cookies (such as your JWT token) with cross-origin requests.
    res.setHeader(
      //The origin is dynamically set based on the environment (development or production). In development, it's set to http://localhost:3001 (or wherever your frontend app is running), and in production, it's set to your production domain, https://sr-portal-gamma.vercel.app.
      "Access-Control-Allow-Origin",
      process.env.NODE_ENV === "development"
        ? "http://localhost:3001"
        : "https://sr-portal-gamma.vercel.app"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type"); //This ensures that the browser can send Content-Type headers with the request, which is required for JSON and other content types.

    let user = null;

    try {
      const cookies = parse(req.headers.cookie || "");
      const token = cookies.token;
      if (token) {
        user = jwt.verify(token, process.env.JWT_SECRET!);
        console.log("User from JWT:", user);
      }
    } catch (err) {
      console.error("JWT Error:", err);
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
