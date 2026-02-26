import { serialize } from "cookie";
import { ContextObject } from "../graphql/types/context";

// Use sameSite: "none" when API and frontend are on different origins (e.g. different subdomains)
// so the browser accepts the Set-Cookie. Requires secure: true (HTTPS).
const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: (process.env.NODE_ENV === "production" ? "none" : "lax") as
    | "lax"
    | "strict"
    | "none",
  path: "/",
};

export function setRefreshTokenCookie(
  context: ContextObject,
  refreshToken: string,
) {
  const cookieValue = serialize("refreshToken", refreshToken, {
    ...REFRESH_COOKIE_OPTIONS,
    maxAge: 60 * 60 * 24 * 7, // 7 days to match JWT expiry
  });

  // Use appendHeader so we don't overwrite other Set-Cookie headers, and ensure
  // the new refresh token is sent even if something else touched the response
  if (typeof context.res.appendHeader === "function") {
    context.res.appendHeader("Set-Cookie", cookieValue);
  } else {
    context.res.setHeader("Set-Cookie", cookieValue);
  }
}

export function clearRefreshTokenCookie(context: ContextObject) {
  context.res.setHeader(
    "Set-Cookie",
    serialize("refreshToken", "", {
      ...REFRESH_COOKIE_OPTIONS,
      expires: new Date(0),
    }),
  );
}
