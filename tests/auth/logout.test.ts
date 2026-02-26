/**
 * @jest-environment node
 */
import { graphqlRequest } from "../graphqlRequest";

const LOGOUT_MUTATION = `
  mutation Logout {
    logout
  }
`;

describe("logout mutation", () => {
  it("returns true on success", async () => {
    const result = await graphqlRequest(LOGOUT_MUTATION);

    expect(result.errors).toBeUndefined();
    expect(result.data?.logout).toBe(true);
  });

  it("sets Set-Cookie header to clear refresh token", async () => {
    const result = await graphqlRequest(
      LOGOUT_MUTATION,
      undefined,
      "refreshToken=some-token",
    );

    const setCookie = result.res?.getHeader?.("Set-Cookie");
    expect(setCookie).toBeDefined();
    expect(typeof setCookie).toBe("string");

    const setCookieStr = String(setCookie);
    expect(setCookieStr).toContain("refreshToken=");
    expect(setCookieStr).toMatch(/Expires=Thu,\s*01\s*Jan\s*1970|Max-Age=0/);
    expect(setCookieStr).toContain("Path=/");
  });
});
