import { PrismaClient } from "../generated/prisma/client";
import fetch from "node-fetch";
import { postResolvers } from "../graphql/resolvers/post"; // ✅ Import the whole resolver object

const prisma = new PrismaClient();

// 🧹 Reset database and reset identity counters
async function resetDatabase() {
  console.log("🧹 Clearing database...");
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE "PostComment", "Post"
    RESTART IDENTITY CASCADE;
  `);
  console.log("✅ Database cleared and IDs reset.");
}

// 🔄 Helper to convert image URL to Base64
async function getImageBase64(url: string): Promise<string> {
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  return `data:image/jpeg;base64,${Buffer.from(buffer).toString("base64")}`;
}

async function main() {
  await resetDatabase();

  console.log("🌱 Seeding initial data...");

  // 1️⃣ Create a test user
  //   const user = await prisma.user.create({
  //     data: {
  //       username: "demo_user",
  //       email: "demo@example.com",
  //       password: "hashedpassword123", // ideally pre-hash if used in auth
  //     },
  //   });

  // 2️⃣ Prepare images
  const imageUrls = [
    "https://picsum.photos/id/1015/600/400",
    "https://picsum.photos/id/1024/600/400",
    "https://picsum.photos/id/1035/600/400",
  ];

  const imageBase64Array = await Promise.all(imageUrls.map(getImageBase64));
  const imageNames = imageUrls.map((_, i) => `seeded_image_${i + 1}.jpg`);

  // 3️⃣ Mock GraphQL context
  const context = { prisma };

  // 4️⃣ Grab createPost resolver
  const createPost = postResolvers.Mutation.createPost;

  // 5️⃣ Create posts using the same logic as GraphQL
  // for (let i = 1; i <= 3; i++) {
  //   await createPost(
  //     null,
  //     {
  //       data: {
  //         title: `Seeded Post ${i}`,
  //         body: `This is post ${i} created through the actual createPost resolver.`,
  //         userId: "cmgui5jfj0000l30f1ofx4exw",
  //         arrestLogId: null,
  //         imageBase64: imageBase64Array,
  //         imageName: imageNames,
  //       },
  //     },
  //     context
  //   );

  //   console.log(`✅ Created post ${i}`);
  // }

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
