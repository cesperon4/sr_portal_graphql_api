import nodemailer from "nodemailer";

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail", // or your email service
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password/app password
  },
});

export async function sendVerificationEmail(to: string, token: string) {
  const url = `http://localhost:3001/verify-email?token=${token}`;

  // Professional HTML template
  const emailHtml = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <title>Email Verification</title>
    </head>
    <body style="margin:0;padding:0;background-color:#f7f9fc;font-family:Arial,sans-serif;color:#333;">
      <table width="100%" cellspacing="0" cellpadding="0" style="background-color:#f7f9fc;padding:20px;">
        <tr>
          <td align="center">
            <!-- Container -->
            <table width="600" cellspacing="0" cellpadding="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;">
              <!-- Header with Logo -->
              <tr>
                <td align="center" style="background-color:#004aad;padding:20px;">
                  <div style="display:inline-block;vertical-align:middle;">
                    <!-- Shield Icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 2L2 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                    </svg>
                  </div>
                  <div style="display:inline-block;vertical-align:middle;margin-left:10px;">
                    <span style="font-size:24px;color:#ffffff;font-weight:bold;">SR Portal</span>
                  </div>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding:40px 30px;text-align:left;">
                  <h1 style="font-size:24px;margin-top:0;color:#004aad;">Verify Your Email Address</h1>
                  <p style="font-size:16px;line-height:1.5;">
                    Hello,
                    <br /><br />
                    Thank you for signing up for <strong>SR Portal</strong>. Please confirm your email address by clicking the button below. This helps us ensure your account security.
                  </p>

                  <!-- CTA Button -->
                  <table cellspacing="0" cellpadding="0" style="margin:30px 0;">
                    <tr>
                      <td align="center" bgcolor="#004aad" style="border-radius:4px;">
                        <a href="${url}" target="_blank" style="display:inline-block;padding:12px 30px;font-size:16px;color:#ffffff;text-decoration:none;font-weight:bold;">Verify Email</a>
                      </td>
                    </tr>
                  </table>

                  <p style="font-size:14px;line-height:1.5;color:#666;">
                    If you didn’t create an SR Portal account, you can safely ignore this email.
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color:#f1f3f6;padding:20px;text-align:center;font-size:12px;color:#999;">
                  &copy; ${new Date().getFullYear()} SR Portal. All rights reserved.
                </td>
              </tr>
            </table>
            <!-- End Container -->
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: "Verify your email for SR Portal",
    html: emailHtml,
  });
}
