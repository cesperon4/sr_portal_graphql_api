import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type User {
    id: String!
    firstname: String!
    email: String!
    lastname: String!
    username: String!
    password: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
  }
`;
