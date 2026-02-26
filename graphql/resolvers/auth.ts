import { setRefreshTokenCookie } from "../../helpers/cookie";
import { rotateRefreshToken, verifyRefreshToken } from "../../helpers/token";
import { sendResponse } from "../../lib/apiResponse";
import { HttpMessages, HttpStatus } from "../../lib/constants/http";
import { withRateLimit } from "../../lib/withRateLimit";
import { type ContextObject } from "../types/context";
import { ApiResponse } from "../types/response";

export const authResolvers = {
  Query: {},
  Mutation: {
    refresh: withRateLimit(
      async (
        _parent: unknown,
        args: {},
        context: ContextObject,
      ): Promise<ApiResponse<string | null>> => {
        try {
          console.log("hit refresh endpoint");
          const verifiedData = await verifyRefreshToken(context);

          if (!verifiedData) {
            return sendResponse(
              null,
              HttpStatus.UNAUTHORIZED,
              HttpMessages.UNAUTHORIZED,
            );
          }

          const { accessToken, refreshToken } =
            await rotateRefreshToken(verifiedData);
          setRefreshTokenCookie(context, refreshToken);

          // Prevent caching of token responses so clients always get fresh Set-Cookie
          context.res.setHeader("Cache-Control", "no-store");

          return sendResponse(accessToken, HttpStatus.OK, HttpMessages.OK);
        } catch (err) {
          console.log("err", err);
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
