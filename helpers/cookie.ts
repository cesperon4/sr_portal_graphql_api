import { serialize } from "cookie";
import { ContextObject } from "../graphql/types/context";

export function setRefreshTokenCookie(
  context: ContextObject,
  refreshToken: string,
) {
  context.res.setHeader(
    "Set-Cookie",
    serialize("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60,
    }),
  );
}

export function clearRefreshTokenCookie(context: ContextObject) {
  context.res.setHeader(
    "Set-Cookie",
    serialize("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(0),
      path: "/",
    }),
  );
}
