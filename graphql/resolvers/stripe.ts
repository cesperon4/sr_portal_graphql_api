import { sendResponse } from "../../lib/apiResponse";
import { HttpMessages, HttpStatus } from "../../lib/constants/http";
import { withRateLimit } from "../../lib/withRateLimit";
import { stripe } from "../../services/stripe";
import { type ContextObject } from "../types/context";
import { ApiResponse } from "../types/response";

export const stripeResolvers = {
  Query: {},
  Mutation: {
    createPaymentIntent: withRateLimit(
      async (
        _parent: unknown,
        args: { amount: number },
        context: ContextObject,
      ): Promise<ApiResponse<{ clientSecret: string | null } | null>> => {
        try {
          //   const authenticated = requireAuth(context);
          //   if (!authenticated)
          //     return sendResponse(
          //       null,
          //       HttpStatus.UNAUTHORIZED,
          //       HttpMessages.UNAUTHORIZED,
          //     );

          console.log("args: ", args);
          const paymentIntent = await stripe.paymentIntents.create({
            amount: args.amount * 100,
            currency: "usd",
            automatic_payment_methods: { enabled: true },
          });
          return sendResponse(
            { clientSecret: paymentIntent.client_secret },
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
