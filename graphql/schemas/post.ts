import { gql } from "apollo-server-micro";

export const postTypeDefs = gql`
  scalar DateTime

  type Post {
    id: Int!
    title: String
    body: String
    userId: ID
    createdAt: DateTime
    updatedAt: DateTime
    arrestLogId: Int
    user: User
    postComments: [PostComment!]!
    arrestLog: ArrestLog
    imageUrls: [String]
    likes: [Like!]!
  }

  input PostsInput {
    limit: Int!
    cursor: Int
  }

  type PostsPage {
    posts: [Post!]!
    cursor: Int
    hasNextPage: Boolean!
  }

  type PostsResponse {
    status: Int
    message: String
    data: PostsPage
  }

  type Query {
    posts(data: PostsInput): PostsResponse!
    post(id: Int!): Post!
  }

  input CreatePostInput {
    title: String
    body: String
    userId: ID
    arrestLogId: Int
    imageBase64: [String]
    imageName: [String]
  }

  input UpdatePostInput {
    title: String
    body: String
  }

  type Mutation {
    createPost(data: CreatePostInput): Post!
    updatePost(id: Int!, data: UpdatePostInput): Post!
    deletePost(id: Int!): Post!
  }
`;
