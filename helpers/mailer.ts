import nodemailer from "nodemailer";

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password
  },
});

export async function sendVerificationEmail(to: string, token: string) {
  const url = `https://sr-portal-gamma.vercel.app/verify-email?token=${token}`;
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: "Verify your email for SR Portal",
    html: `<p>Click the link to verify your email: <a href="${url}">${url}</a></p>`,
  });
}
