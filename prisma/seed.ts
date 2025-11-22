import fs from "fs";
import path from "path";
import { prisma } from "../lib/prisma";

// 🔄 Convert local image file to Base64
function getImageBase64(fileName: string): string {
  // Ensure we start from the prisma folder
  const absolutePath = path.resolve(__dirname, "seedImages", fileName);
  const fileBuffer = fs.readFileSync(absolutePath);
  const ext = path.extname(fileName).slice(1); // e.g., jpg, png
  return `data:image/${ext};base64,${fileBuffer.toString("base64")}`;
}
// 🧹 Reset database
async function resetDatabase() {
  console.log("🧹 Clearing database...");
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE "Like", "PostComment", "Post", "User"
    RESTART IDENTITY CASCADE;
  `);
  console.log("✅ Database cleared and IDs reset.");
}

// 🎲 Seed posts with images
async function seedPosts(userIds: string[]) {
  const projectRoot = path.resolve();

  const postsDir = path.join(projectRoot, "prisma", "seedImages");

  // Load image filenames from the folder
  const imageFiles = fs.readdirSync(postsDir).slice(0, 20); // take first 20 images

  // Titles and bodies
  const postsData = [
    {
      title: "Two-Vehicle Collision on Main Street Causes Traffic Delays",
      body: "At approximately 3:45 PM, two vehicles collided near the intersection of Main Street and 7th Avenue. Minor injuries were reported, and traffic was temporarily delayed while crews cleared the scene.",
    },
    {
      title: "Suspicious Person Reported Near Elm Park Playground",
      body: "Residents reported a person acting suspiciously near the Elm Park playground around 6:30 PM. Officers responded and are investigating the situation; no criminal activity confirmed yet.",
    },
    {
      title: "Burglary Attempt at Local Electronics Store Foiled by Alarm",
      body: "The store alarm activated at 2:15 AM, preventing a burglary attempt. Security footage captured an unknown suspect fleeing the scene. No items were stolen.",
    },
    {
      title: "Car Vandalism in Downtown Parking Lot Overnight",
      body: "Several vehicles were reported vandalized overnight in the downtown parking lot. Broken windows and scratched paint were observed. Police are investigating and reviewing nearby surveillance footage.",
    },
    {
      title: "Public Disturbance Reported Outside City Library",
      body: "At around 4:00 PM, officers were called to the city library due to a loud altercation between two individuals. Both parties were separated, and no arrests were made at this time.",
    },
    {
      title: "Hit-and-Run Incident on 5th Avenue, Suspect Vehicle Sought",
      body: "A pedestrian was struck by a vehicle on 5th Avenue around 8:30 PM. The driver fled the scene. Police are seeking information on a silver sedan with front-end damage.",
    },
    {
      title: "Loitering Complaint at Gas Station on Maple Road",
      body: "Several residents reported a group loitering at the Maple Road gas station late last night. Officers responded and dispersed the group; no criminal activity was detected.",
    },
    {
      title: "Noise Complaint Leads to Citation for Illegal Party",
      body: "Officers responded to a noise complaint at a residential address on Cedar Street. An unauthorized party was ongoing, and a citation was issued for violation of local noise ordinances.",
    },
    {
      title: "Stolen Bicycle Recovered Near Riverwalk Trail",
      body: "A stolen bicycle reported last week was located near the Riverwalk Trail. The owner was notified and the bicycle returned. Investigation continues regarding the theft.",
    },
    {
      title: "Shoplifting Incident at Grocery Store, Suspect in Custody",
      body: "A suspect was detained by store security for attempting to leave the grocery store with unpaid items valued at approximately $120. Officers arrived and placed the individual in custody.",
    },
    {
      title: "Domestic Dispute Reported, No Injuries",
      body: "Police responded to a domestic dispute at a residential address on Oak Street. Both parties were spoken to and no injuries were reported. Case is under review.",
    },
    {
      title: "Traffic Stop Leads to Arrest for Outstanding Warrants",
      body: "During a routine traffic stop on Highway 12, officers discovered the driver had two outstanding warrants. The individual was arrested without incident.",
    },
    {
      title: "Suspicious Package Investigated at City Hall",
      body: "City Hall staff reported an unattended package in the lobby. Officers responded and determined the package posed no threat. Bomb squad was not required.",
    },
    {
      title: "Minor Car Crash Outside High School, No Injuries",
      body: "Two vehicles collided outside Lincoln High School at 7:45 AM. There were no reported injuries. Traffic was briefly affected during the cleanup.",
    },
    {
      title: "Graffiti Vandalism on Community Center Wall",
      body: "The community center reported graffiti on its east wall. Officers documented the incident and are reviewing nearby cameras for potential suspects.",
    },
    {
      title: "Found Property: Wallet Turned in at Police Station",
      body: "A wallet was turned into the police station by a concerned citizen. Officers are attempting to locate the owner using identification found inside.",
    },
    {
      title: "Dog Bite Reported at Neighborhood Park",
      body: "A dog bite incident was reported at Willow Park. The victim received minor injuries and medical attention. Animal control was notified and is following up with the dog owner.",
    },
    {
      title: "Illegal Dumping Incident Investigated on Oak Street",
      body: "Residents reported illegal dumping of construction debris on Oak Street. Officers collected evidence and are attempting to identify the responsible party.",
    },
    {
      title: "Vehicle Burglary in Apartment Complex Parking Lot",
      body: "Multiple vehicles were broken into overnight at the Pinewood Apartments. Personal belongings were stolen from two cars. Police are reviewing surveillance footage.",
    },
    {
      title: "Assault Reported Near Local Nightclub, Investigation Underway",
      body: "An assault was reported outside the Blue Moon Nightclub at 1:30 AM. The victim was treated for minor injuries. Police are investigating and seeking witnesses.",
    },
  ];

  for (let i = 0; i < postsData.length; i++) {
    const imagePath = path.join(postsDir, imageFiles[i]);
    const imageBase64 = getImageBase64(imagePath);

    await prisma.post.create({
      data: {
        title: postsData[i].title,
        body: postsData[i].body,
        userId: userIds[i % userIds.length], // rotate users
        imageUrls: [imageBase64],
        arrestLogId: null,
      },
    });
  }
}

async function main() {
  await resetDatabase();

  // 1️⃣ Users
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

  const userIds = [];

  for (const u of users) {
    const user = await prisma.user.upsert({
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
    userIds.push(user.id);
  }

  // 2️⃣ Seed posts
  await seedPosts(userIds);

  console.log("✅ Database seeded with 20 posts, images, and users.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
