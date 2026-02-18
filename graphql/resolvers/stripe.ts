import { sendResponse } from "../../lib/apiResponse";
import { HttpMessages, HttpStatus } from "../../lib/constants/http";
import { withRateLimit } from "../../lib/withRateLimit";
import { stripe } from "../../services/stripe";
import { type ContextObject } from "../types/context";
import { ApiResponse } from "../types/response";

import { type Plan, calculatePrice } from "../types/plans";

type CreatePaymentIntentResponse = {
  clientSecret: string | null;
  paymentIntentId: string;
  amount: number;
  currency: string;
  status: string;
  livemode: boolean;
};

export const stripeResolvers = {
  Query: {},
  Mutation: {
    createPaymentIntent: withRateLimit(
      async (
        _parent: unknown,
        args: { data: Plan },
        context: ContextObject,
      ): Promise<ApiResponse<CreatePaymentIntentResponse | null>> => {
        try {
          //   const authenticated = requireAuth(context);
          //   if (!authenticated)
          //     return sendResponse(
          //       null,
          //       HttpStatus.UNAUTHORIZED,
          //       HttpMessages.UNAUTHORIZED,
          //     );

          if (!args.data)
            return sendResponse(
              null,
              HttpStatus.BAD_REQUEST,
              HttpMessages.BAD_REQUEST,
            );

          console.log("args.data", calculatePrice(args.data));

          const paymentIntent = await stripe.paymentIntents.create({
            amount: calculatePrice(args.data),
            currency: "usd",
            automatic_payment_methods: { enabled: true },
          });

          console.log("payment intent: ", paymentIntent);

          return sendResponse(
            {
              clientSecret: paymentIntent.client_secret,
              paymentIntentId: paymentIntent.id,
              amount: calculatePrice(args.data),
              currency: paymentIntent.currency,
              status: paymentIntent.status,
              livemode: paymentIntent.livemode,
            },
            HttpStatus.OK,
            HttpMessages.OK,
          );
        } catch (err) {
          console.log("mutation createPaymentIntent error: ", err);
          return sendResponse(
            null,
            HttpStatus.INTERNAL_SERVER_ERROR,
            HttpMessages.INTERNAL_SERVER_ERROR,
          );
        }
      },
      "mutation",
    ),
  },
};
