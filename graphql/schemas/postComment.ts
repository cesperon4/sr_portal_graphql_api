import { gql } from "apollo-server-micro";

export const postCommentTypeDefs = gql`
  type PostComment {
    id: ID
    postId: ID
    body: String
    post: Post
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Query {
    postComments: [PostComment!]!
    postComment(id: ID!): PostComment!
  }

  input CreatePostCommentInput {
    postId: ID
    body: String
  }

  input UpdatePostCommentInput {
    body: String
  }

  type Mutation {
    createPostComment(data: CreatePostCommentInput): PostComment!
    updatePostComment(id: ID!, data: UpdatePostCommentInput): PostComment!
    deletePostComment(id: ID!): PostComment!
  }
`;
