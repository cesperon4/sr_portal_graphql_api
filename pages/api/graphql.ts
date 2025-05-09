import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "../../graphql/schemas/index";
import { resolvers } from "../../graphql/resolvers/index";
import { NextApiRequest, NextApiResponse } from "next";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const startServer = server.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await startServer;
  await server.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
