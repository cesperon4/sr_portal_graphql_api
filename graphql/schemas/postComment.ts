import { gql } from "apollo-server-micro";

export const postCommentTypeDefs = gql`
  type PostComment {
    id: Int!
    postId: Int
    user: User
    body: String
    post: Post
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Query {
    postComments: [PostComment!]!
    postComment(id: Int!): PostComment!
  }

  input CreatePostCommentInput {
    postId: Int
    userId: ID
    body: String
  }

  input UpdatePostCommentInput {
    body: String
  }

  input PostCommentInput {
    limit: Int!
    cursor: Int
  }

  type PostCommentPage {
    data: [PostComment!]!
    cursor: Int
    hasNextPage: Boolean
  }

  type PostCommentResponse {
    data: PostCommentPage
    status: Int
    message: String
  }

  type Mutation {
    createPostComment(data: CreatePostCommentInput): PostComment!
    updatePostComment(id: Int!, data: UpdatePostCommentInput): PostComment!
    deletePostComment(id: Int!): PostComment!
  }
`;
