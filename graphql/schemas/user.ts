import { gql } from "apollo-server-micro";

export const userTypeDefs = gql`
  type User {
    id: ID!
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
    user(id: ID!): User!
  }

  input CreateUserInput {
    firstname: String!
    lastname: String!
    username: String!
    email: String!
    password: String!
  }

  input UpdateUserInput {
    firstname: String
    lastname: String
    username: String
    email: String
    password: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    createUser(data: CreateUserInput): User!
    updateUser(id: ID!, data: UpdateUserInput): User!
    deleteUser(id: ID!): User!
    login(data: LoginInput): AuthPayload!
  }
`;
