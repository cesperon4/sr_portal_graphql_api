import { z } from "zod";

export const CreateUserSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  firstname: z.string().trim().min(1).max(50),
  lastname: z.string().trim().min(1).max(50),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72),
  username: z.string().trim().min(8).max(30),
  role: z.enum(["USER", "GUEST"]),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;
