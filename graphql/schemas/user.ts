import { gql } from "apollo-server-micro";

export const userTypeDefs = gql`
  scalar Token
  scalar DateTime

  enum Role {
    USER
    GUEST
  }

  type User {
    id: ID
    firstname: String
    email: String
    lastname: String
    username: String
    password: String
    role: Role!
    createdAt: DateTime
    updatedAt: DateTime
    posts: [Post]
    emailVerified: DateTime
    emailVerificationTokens: [EmailVerificationToken]
  }

  type EmailVerificationToken {
    id: ID
    tokenHash: String
    userId: String
    expires: DateTime
    used: Boolean
    createdAt: DateTime
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
    me: User!
    chatBotResponse(prompt: String!): String!
  }

  input CreateUserInput {
    firstname: String
    lastname: String
    username: String
    email: String
    password: String
    role: Role!
  }

  input UpsertUserInput {
    email: String!
    firstname: String!
    lastname: String!
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
    user: User!
    token: Token!
  }

  type GuestPayload {
    token: Token!
  }

  type Mutation {
    registerUser(data: CreateUserInput): Boolean!
    verifyEmail(token: Token!): Boolean!
    resendVerificationEmail(email: String!): Boolean!
    updateUser(id: ID!, data: UpdateUserInput): User!
    upsertUser(data: UpsertUserInput): AuthPayload!
    deleteUser(id: ID!): User!
    login(data: LoginInput): AuthPayload!
    loginGuest: GuestPayload!
    logout: Boolean!
  }
`;
