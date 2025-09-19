// backend/src/utils/verification.ts
import crypto from "crypto";

//Create a helper to generate raw token and hash it (SHA256). SHA256 is
// fine for DB storage and lookup; you could also use HMAC or bcrypt but
// SHA256 is performant + acceptable because you store the hash only and tokens expire.

//never store raw token in DB in case of leaks instead store hashed token
export function createVerificationToken() {
  //this token is sent to the user via verification email
  const raw = crypto.randomBytes(32).toString("hex"); // 64 chars
  const hash = crypto.createHash("sha256").update(raw).digest("hex");
  return { raw, hash };
}

export function hashToken(raw: string) {
  //this token is stored in the db
  return crypto.createHash("sha256").update(raw).digest("hex");
}
