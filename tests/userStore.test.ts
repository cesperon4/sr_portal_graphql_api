import { describe, expect, it } from "vitest";
import { CreateUser } from "../store/user.store";
import { pool } from "./db";

describe("Register a user", () => {
  it("creates a user in the database", async () => {
    const user = await CreateUser({
      firstname: "Christian",
      lastname: "Esperon",
      username: "cesperon4",
      email: "cesperon4@gmail.com",
      role: "USER",
      password: "Tiongson444!",
    });

    expect(user.firstname).toBe("Christian");
    const dbUser = await pool.query('SELECT * FROM "User" WHERE id = $1', [
      user.id,
    ]);
    expect(user.email).toBe("cesperon4@gmail.com");
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(dbUser.rows.length).toBe(1);
  });
});
