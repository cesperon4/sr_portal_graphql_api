/**
 * @jest-environment node
 */
import jwt from "jsonwebtoken";
import { generateRefreshToken, hashToken } from "../../helpers/token";
import { prisma } from "../../lib/prisma";

describe("generateRefreshToken", () => {
  const mockCreate = prisma.refreshToken.create as jest.MockedFunction<
    typeof prisma.refreshToken.create
  >;

  beforeEach(() => {
    jest.clearAllMocks();
    mockCreate.mockResolvedValue({} as any);
  });

  it("returns a valid JWT string", async () => {
    const token = await generateRefreshToken("user-123", "USER");

    expect(token).toBeDefined();
    expect(typeof token).toBe("string");
    expect(token.split(".")).toHaveLength(3); // JWT format: header.payload.signature
  });

  it("JWT payload contains userId and role", async () => {
    const token = await generateRefreshToken("user-456", "USER");
    const decoded = jwt.decode(token) as {
      userId: string;
      role: string;
      exp: number;
    };

    expect(decoded.userId).toBe("user-456");
    expect(decoded.role).toBe("USER");
    expect(decoded.exp).toBeDefined();
  });

  it("stores token in database with correct tokenHash and userId", async () => {
    const userId = "user-789";
    const role = "USER";

    const token = await generateRefreshToken(userId, role);

    expect(mockCreate).toHaveBeenCalledTimes(1);
    const [callArg] = mockCreate.mock.calls[0];
    expect(callArg.data.tokenHash).toBe(hashToken(token));
    expect(callArg.data.userId).toBe(userId);
  });

  it("sets expires to 7 days from now", async () => {
    const before = Date.now();
    await generateRefreshToken("user-123", "USER");
    const after = Date.now();

    const [callArg] = mockCreate.mock.calls[0];
    const expires = new Date(callArg.data.expires).getTime();
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;

    expect(expires).toBeGreaterThanOrEqual(before + sevenDaysMs - 1000);
    expect(expires).toBeLessThanOrEqual(after + sevenDaysMs + 1000);
  });

  it("JWT has 7 day expiration", async () => {
    const token = await generateRefreshToken("user-123", "USER");
    const decoded = jwt.decode(token) as { exp: number; iat: number };

    const sevenDaysSeconds = 7 * 24 * 60 * 60;
    const ttl = decoded.exp - decoded.iat;

    expect(ttl).toBeGreaterThanOrEqual(sevenDaysSeconds - 60);
    expect(ttl).toBeLessThanOrEqual(sevenDaysSeconds + 60);
  });
});
