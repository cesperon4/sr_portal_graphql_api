import { gql } from "apollo-server-micro";

export const likeTypeDefs = gql`
  type Like {
    id: Int
    isActive: Boolean
    userId: String
    postId: Int
    user: User
    post: Post
    createdAt: DateTime
    updatedAt: DateTime
  }

  input CreateLikeInput {
    userId: String
    postId: Int
  }

  input ToggleLikeInput {
    userId: String
    postId: Int
  }

  input UpdateLikeInput {
    id: Int
    isActive: Boolean
  }

  type ApiLikeResponse {
    status: Int
    data: Like
    message: String
  }

  type Mutation {
    createLike(data: CreateLikeInput): ApiLikeResponse
    updateLike(data: UpdateLikeInput): ApiLikeResponse
    toggleLike(data: ToggleLikeInput): ApiLikeResponse
  }
`;
