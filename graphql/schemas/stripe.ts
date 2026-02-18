import { gql } from "apollo-server-micro";

export const stripeTypeDefs = gql`
  type PaymentIntentData {
    clientSecret: String
    paymentIntentId: String
    amount: Int
    currency: String
    status: String
    livemode: Boolean
  }

  type ApiStripeResponse {
    status: Int
    data: PaymentIntentData
    message: String
  }

  input CreatePaymentIntentInput {
    amount: Int!
  }

  input Plan {
    type: String
    billingCycle: String
  }

  type Mutation {
    createPaymentIntent(data: Plan): ApiStripeResponse
  }
`;
