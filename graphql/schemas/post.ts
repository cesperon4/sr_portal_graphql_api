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
    lat: Float
    lon: Float
    street: String
    city: String
    state: String
    zip: String
    date_occurred: DateTime
    category: String
  }

  type MapPost {
    id: Int!
    title: String
    lat: Float!
    lon: Float!
    date_occurred: DateTime
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

  type MapPostsResponse {
    status: Int
    message: String
    data: [MapPost!]!
  }

  type Query {
    posts(data: PostsInput): PostsResponse!
    post(id: Int!): Post!
    mapPosts: MapPostsResponse
  }

  input CreatePostInput {
    title: String
    body: String
    userId: ID
    arrestLogId: Int
    imageBase64: [String]
    imageName: [String]
    lat: String
    lon: String
    locationName: String
    date_occurred: DateTime
    category: String
  }

  input UpdatePostInput {
    title: String
    body: String
    category: String
  }

  type Mutation {
    createPost(data: CreatePostInput): Post!
    updatePost(id: Int!, data: UpdatePostInput): Post!
    deletePost(id: Int!): Post!
  }
`;
