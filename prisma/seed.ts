import fs from "fs";
import path from "path";
import { prisma } from "../lib/prisma";
import { supabaseAdmin } from "../lib/supabaseAdmin"; // <-- Make sure this exists

// 🧹 Reset DB
async function resetDatabase() {
  console.log("🧹 Clearing database...");
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE "Like", "PostComment", "Post", "User"
    RESTART IDENTITY CASCADE;
  `);
  console.log("✅ DB cleared");
}

// 📤 Upload image to Supabase + return URL
async function uploadImageToSupabase(filePath: string, fileName: string) {
  const fileBuffer = fs.readFileSync(filePath);

  const storagePath = `post-images/${Date.now()}-${fileName}`;

  // Upload to Supabase storage
  const { error: uploadError } = await supabaseAdmin.storage
    .from("images")
    .upload(storagePath, fileBuffer, {
      contentType: "image/jpeg",
      upsert: false,
    });

  if (uploadError) {
    console.error("Upload Error:", uploadError);
    throw new Error(uploadError.message);
  }

  // Get public URL
  const { data: publicData } = supabaseAdmin.storage
    .from("images")
    .getPublicUrl(storagePath);

  console.log("url: ", publicData.publicUrl);
  return publicData.publicUrl;
}

// 🎲 Seed posts
async function seedPosts(userIds: string[]) {
  const projectRoot = path.resolve();
  const postsDir = path.join(projectRoot, "prisma", "seedImages");

  const imageFiles = fs.readdirSync(postsDir).slice(0, 20);

  // Titles + bodies
  const postsData = [
    {
      title: "Two-Vehicle Collision on Main Street Causes Traffic Delays",
      body: "At approximately 3:45 PM, two vehicles collided near the intersection...",
    },
    {
      title: "Suspicious Person Reported Near Elm Park Playground",
      body: "Residents reported a person acting suspiciously near the Elm Park playground...",
    },
    {
      title: "Burglary Attempt at Local Electronics Store Foiled by Alarm",
      body: "The store alarm activated at 2:15 AM, preventing a burglary attempt...",
    },
    {
      title: "Car Vandalism in Downtown Parking Lot Overnight",
      body: "Several vehicles were vandalized overnight in a downtown parking lot...",
    },
    {
      title: "Public Disturbance Reported Outside City Library",
      body: "Officers responded to a loud altercation outside the city library...",
    },
    {
      title: "Hit-and-Run Incident on 5th Avenue, Suspect Vehicle Sought",
      body: "A pedestrian was struck by a vehicle on 5th Avenue around 8:30 PM...",
    },
    {
      title: "Loitering Complaint at Gas Station on Maple Road",
      body: "Several residents reported a group loitering at a gas station...",
    },
    {
      title: "Noise Complaint Leads to Citation for Illegal Party",
      body: "Officers responded to a noise complaint and issued a citation...",
    },
    {
      title: "Stolen Bicycle Recovered Near Riverwalk Trail",
      body: "A stolen bicycle reported last week was located near the Riverwalk Trail...",
    },
    {
      title: "Shoplifting Incident at Grocery Store, Suspect in Custody",
      body: "A suspect was detained for attempting to leave the store with unpaid items...",
    },
    {
      title: "Domestic Dispute Reported, No Injuries",
      body: "Police responded to a domestic dispute; no injuries reported...",
    },
    {
      title: "Traffic Stop Leads to Arrest for Outstanding Warrants",
      body: "During a routine traffic stop, officers discovered two warrants...",
    },
    {
      title: "Suspicious Package Investigated at City Hall",
      body: "An unattended package was investigated and found non-threatening...",
    },
    {
      title: "Minor Car Crash Outside High School, No Injuries",
      body: "Two cars collided outside Lincoln High School this morning...",
    },
    {
      title: "Graffiti Vandalism on Community Center Wall",
      body: "Graffiti was discovered on the community center wall...",
    },
    {
      title: "Found Property: Wallet Turned in at Police Station",
      body: "A wallet was turned in by a citizen; owner being contacted...",
    },
    {
      title: "Dog Bite Reported at Neighborhood Park",
      body: "A dog bite incident occurred at Willow Park. Minor injuries...",
    },
    {
      title: "Illegal Dumping Incident Investigated on Oak Street",
      body: "Construction debris was illegally dumped on Oak Street...",
    },
    {
      title: "Vehicle Burglary in Apartment Complex Parking Lot",
      body: "Several vehicles were broken into at Pinewood Apartments...",
    },
    {
      title: "Assault Reported Near Local Nightclub, Investigation Underway",
      body: "An assault occurred outside the Blue Moon Nightclub...",
    },
  ];

  for (let i = 0; i < postsData.length; i++) {
    const fileName = imageFiles[i];
    const localPath = path.join(postsDir, fileName);

    const imageUrl = await uploadImageToSupabase(localPath, fileName);

    await prisma.post.create({
      data: {
        title: postsData[i].title,
        body: postsData[i].body,
        userId: userIds[i % userIds.length],
        imageUrls: [imageUrl],
        arrestLogId: null,
      },
    });

    console.log(`📸 Uploaded + created post ${i + 1}/20`);
  }
}

async function main() {
  await resetDatabase();

  // Seed users
  const users = [
    {
      email: "cesperon4@gmail.com",
      firstname: "Christian",
      lastname: "Esperon",
      username: "cesperon",
    },
    {
      email: "pesperon@gmail.com",
      firstname: "Pamela",
      lastname: "Esperon",
      username: "pesperon",
    },
    {
      email: "aesperon@gmail.com",
      firstname: "Avery",
      lastname: "Esperon",
      username: "aesperon",
    },
    {
      email: "anesperon@gmail.com",
      firstname: "Anaiya",
      lastname: "Esperon",
      username: "anesperon",
    },
  ];

  const userIds: string[] = [];

  for (const u of users) {
    const created = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        firstname: u.firstname,
        lastname: u.lastname,
        username: u.username,
        role: "USER",
        password: "test123",
        email: u.email,
      },
    });

    userIds.push(created.id);
  }

  await seedPosts(userIds);

  console.log("🔥 Seed completed: 20 posts + users + Supabase image URLs");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
