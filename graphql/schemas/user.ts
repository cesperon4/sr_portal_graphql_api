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
    role: Role!
    createdAt: DateTime
    updatedAt: DateTime
    posts(data: PostsInput): PostsResponse
    comments(data: PostCommentInput): PostCommentResponse
    emailVerified: DateTime
    emailVerificationTokens: [EmailVerificationToken]
    likedPosts(data: LikedPostInput): LikedPostResponse
  }

  type EmailVerificationToken {
    id: ID
    tokenHash: String
    userId: String
    expires: DateTime
    used: Boolean
    createdAt: DateTime
  }

  type ApiUsersResponse {
    status: Int
    data: [User]
    message: String
  }

  type ApiUserResponse {
    status: Int
    data: User
    message: String
  }

  type UpsertUserData {
    user: User
    token: String
    refreshToken: String
  }

  type ApiUpsertUserResponse {
    status: Int
    data: UpsertUserData
    message: String
  }

  type Query {
    users: ApiUsersResponse
    user(id: ID!): ApiUserResponse!
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
    accessToken: Token!
  }

  type GuestPayload {
    token: Token!
  }

  type Mutation {
    registerUser(data: CreateUserInput!): ApiUserResponse!
    verifyEmail(token: Token!): Boolean!
    resendVerificationEmail(email: String!): Boolean!
    updateUser(id: ID!, data: UpdateUserInput): User!
    upsertUser(data: UpsertUserInput): ApiUpsertUserResponse
    deleteUser(id: ID!): User!
    login(data: LoginInput): AuthPayload!
    loginGuest: GuestPayload!
    logout: Boolean!
  }
`;
