/**
 * @jest-environment node
 */
import { graphqlRequest } from "../graphqlRequest";

jest.mock("../../helpers/token", () => ({
  //import functions from helpers/token
  verifyRefreshToken: jest.fn(),
  rotateRefreshToken: jest.fn(),
}));

jest.mock("../../helpers/cookie", () => ({
  setRefreshTokenCookie: jest.fn(),
}));

import { rotateRefreshToken, verifyRefreshToken } from "../../helpers/token";

const REFRESH_MUTATION = `
  mutation Refresh {
    refresh {
      status
      data
      message
    }
  }
`;

describe("refresh mutation", () => {
  const mockVerifyRefreshToken = verifyRefreshToken as jest.MockedFunction<
    typeof verifyRefreshToken
  >;
  const mockRotateRefreshToken = rotateRefreshToken as jest.MockedFunction<
    typeof rotateRefreshToken
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns 401 when no refresh token cookie is present", async () => {
    mockVerifyRefreshToken.mockResolvedValue(null);

    const result = await graphqlRequest(REFRESH_MUTATION);

    expect(result.data?.refresh).toBeDefined();
    expect(result.data?.refresh.status).toBe(401);
    expect(result.data?.refresh.message).toBe("Unauthorized access");
    expect(result.data?.refresh.data).toBeNull();
  });

  it("returns 401 when refresh token is invalid or expired", async () => {
    mockVerifyRefreshToken.mockResolvedValue(null);

    const result = await graphqlRequest(
      REFRESH_MUTATION,
      undefined,
      "refreshToken=invalid-token",
    );

    expect(result.data?.refresh.status).toBe(401);
  });

  it("returns new access token when refresh token is valid", async () => {
    mockVerifyRefreshToken.mockResolvedValue({
      userId: "user-123",
      role: "USER",
      hash: "token-hash",
    });
    mockRotateRefreshToken.mockResolvedValue({
      accessToken: "new-access-token",
      refreshToken: "new-refresh-token",
    });

    const result = await graphqlRequest(
      REFRESH_MUTATION,
      undefined,
      "refreshToken=valid-refresh-token",
    );

    expect(result.errors).toBeUndefined();
    expect(result.data?.refresh).toBeDefined();
    expect(result.data?.refresh.status).toBe(200);
    expect(result.data?.refresh.message).toBe("Request succeeded");
    expect(result.data?.refresh.data).toBe("new-access-token");
  });

  it("calls setRefreshTokenCookie with new refresh token on success", async () => {
    const { setRefreshTokenCookie } = await import("../../helpers/cookie");
    const mockSetRefreshTokenCookie =
      setRefreshTokenCookie as jest.MockedFunction<
        typeof setRefreshTokenCookie
      >;

    mockVerifyRefreshToken.mockResolvedValue({
      userId: "user-123",
      role: "USER",
      hash: "token-hash",
    });
    mockRotateRefreshToken.mockResolvedValue({
      accessToken: "new-access-token",
      refreshToken: "new-refresh-token",
    });

    await graphqlRequest(
      REFRESH_MUTATION,
      undefined,
      "refreshToken=valid-refresh-token",
    );

    expect(mockSetRefreshTokenCookie).toHaveBeenCalledWith(
      expect.anything(),
      "new-refresh-token",
    );
  });
});
