import { gql } from "apollo-server-micro";

export const userTypeDefs = gql`
  scalar Token

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
    createdAt: String
    updatedAt: String
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
    me: User!
  }

  input CreateUserInput {
    firstname: String
    lastname: String
    username: String
    email: String
    password: String
    role: Role!
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
    createUser(data: CreateUserInput): User!
    updateUser(id: ID!, data: UpdateUserInput): User!
    deleteUser(id: ID!): User!
    login(data: LoginInput): AuthPayload!
    loginGuest: GuestPayload!
    logout: Boolean!
  }
`;
