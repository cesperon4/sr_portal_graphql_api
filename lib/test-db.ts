// test-db.ts
import { prisma } from "./prisma"; // adjust path if needed

async function main() {
  try {
    console.log("Testing database connection...");
    const users = await prisma.user.findMany({ take: 1 });
    console.log("Success! Retrieved users:", users);
  } catch (err) {
    console.error("Error connecting to DB:", err);
  } finally {
    await prisma.$disconnect(); // close the connection
  }
}

main();
