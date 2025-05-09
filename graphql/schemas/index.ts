import { gql } from "apollo-server-micro";

import { userTypeDefs } from "./user";

export const typeDefs = [
  gql`
    type Query
    type Mutation
  `,
  userTypeDefs,
];
