
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, company, message, date, time, timezone } = await req.json();

    // Validate required fields
    if (!name || !email || !company || !message) {
      return NextResponse.json({ message: "All required fields must be provided" }, { status: 400 });
    }

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // HTML email template
    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table role="presentation" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="background-color: #191a1b; padding: 20px; text-align: center;">
              <h1 style="color: #f6ff7a; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px;">
              <h2 style="color: #333333; font-size: 20px; margin-top: 0;">Meeting Request Details</h2>
              <table role="presentation" width="100%" style="margin-top: 10px;">
                <tr>
                  <td style="padding: 10px 0; color: #555555; font-size: 16px;"><strong>Name:</strong></td>
                  <td style="padding: 10px 0; color: #333333; font-size: 16px;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #555555; font-size: 16px;"><strong>Email:</strong></td>
                  <td style="padding: 10px 0; color: #333333; font-size: 16px;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #555555; font-size: 16px;"><strong>Company:</strong></td>
                  <td style="padding: 10px 0; color: #333333; font-size: 16px;">${company}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #555555; font-size: 16px;"><strong>Message:</strong></td>
                  <td style="padding: 10px 0; color: #333333; font-size: 16px;">${message}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #555555; font-size: 16px;"><strong>Preferred Date:</strong></td>
                  <td style="padding: 10px 0; color: #333333; font-size: 16px;">${date}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #555555; font-size: 16px;"><strong>Preferred Time:</strong></td>
                  <td style="padding: 10px 0; color: #333333; font-size: 16px;">${time}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #555555; font-size: 16px;"><strong>Timezone:</strong></td>
                  <td style="padding: 10px 0; color: #333333; font-size: 16px;">${timezone}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background-color: #191a1b; padding: 20px; text-align: center;">
              <p style="color: #BCBCC0; margin: 0; font-size: 14px;">© 2025 Your Company. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // Email options
    const mailOptions = {
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `New Meeting Request from ${name}`,
      html: htmlTemplate,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: "Failed to send email" }, { status: 500 });
  }
}
