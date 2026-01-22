import { gql } from "apollo-server-micro";

export const stripeTypeDefs = gql`
  type ApiStripeResponse {
    status: Int
    data: { clientSecret: string }
    message: String
  }

  input CreatePaymentIntentInput {
    amount: Int!
  }

  type Mutation {
    createPaymentIntent(data: CreatePaymentIntentInput): ApiStripeResponse
  }
`;
