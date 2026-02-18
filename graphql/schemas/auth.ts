import { gql } from "apollo-server-micro";

export const authTypeDefs = gql`
  type ApiTokenResponse {
    status: Int
    data: String
    message: String
  }

  extend type Mutation {
    refresh: ApiTokenResponse!
  }
`;
