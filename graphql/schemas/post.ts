import { gql } from "apollo-server-micro";

export const postTypeDefs = gql`
  scalar DateTime

  type Post {
    id: ID
    title: String
    body: String
    userId: ID
    createdAt: DateTime
    updatedAt: DateTime
    arrestLogId: ID
    user: User
    postComments: [PostComment]
    arrestLog: ArrestLog
  }

  type Query {
    posts: [Post!]!
    post(id: ID!): Post!
  }

  input CreatePostInput {
    title: String
    body: String
    userId: ID
    arrestLogId: ID
  }

  input UpdatePostInput {
    title: String
    body: String
  }

  type Mutation {
    createPost(data: CreatePostInput): Post!
    updatePost(id: ID!, data: UpdatePostInput): Post!
    deletePost(id: ID!): Post!
  }
`;
