// Mock Prisma to avoid DB connection in tests
jest.mock("../lib/prisma", () => ({
  prisma: {
    refreshToken: {
      create: jest.fn(),
      delete: jest.fn(),
      findUnique: jest.fn(),
      deleteMany: jest.fn(),
    },
    $transaction: jest.fn((fn: (tx: any) => Promise<any>) =>
      fn({
        refreshToken: {
          findUnique: jest.fn(),
          delete: jest.fn(),
          create: jest.fn(),
        },
      })
    ),
    $disconnect: jest.fn().mockResolvedValue(undefined),
  },
}));

// Mock Redis to avoid connection in tests
jest.mock("../lib/redis", () => ({
  redis: {
    get: jest.fn().mockResolvedValue(null),
    set: jest.fn().mockResolvedValue("OK"),
    del: jest.fn().mockResolvedValue(1),
    incr: jest.fn().mockResolvedValue(1),
    ttl: jest.fn().mockResolvedValue(60),
    expire: jest.fn().mockResolvedValue(true),
    pipeline: jest.fn(() => ({
      incr: jest.fn().mockReturnThis(),
      ttl: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue([[null, 1], [null, 60]]),
    })),
  },
}));

jest.mock("../services/stripe", () => ({
  stripe: { customers: {}, checkout: {} },
}));

jest.mock("../lib/supabaseAdmin", () => ({
  supabaseAdmin: {
    storage: { fromBucket: jest.fn() },
    from: jest.fn(),
  },
}));

beforeAll(() => {
  process.env.JWT_SECRET = process.env.JWT_SECRET || "test-jwt-secret";
  process.env.JWT_REFRESH_SECRET =
    process.env.JWT_REFRESH_SECRET || "test-jwt-refresh-secret";
  process.env.NEXT_PUBLIC_SUPABASE_URL =
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://test.supabase.co";
  process.env.SUPABASE_SERVICE_ROLE_KEY =
    process.env.SUPABASE_SERVICE_ROLE_KEY || "test-service-role-key";
  process.env.STRIPE_SECRET_KEY =
    process.env.STRIPE_SECRET_KEY || "sk_test_mock";
});
