import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const {
      job_title,
      first_name,
      last_name,
      email,
      phone,
      resume,
      linkedin,
      website,
      country,
      knew_rootstrap,
      heard_from,
      heard_from_details,
    } = await req.json();

    // Validate required fields
    if (!first_name || !last_name || !email || !phone || !resume || !country || !knew_rootstrap) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Setup nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER!,
      to: process.env.EMAIL_TO!,
      subject: `Job Application: ${job_title} - ${first_name} ${last_name}`,
      html: `
        <h2>New Job Application</h2>
        <p><strong>Job Title:</strong> ${job_title}</p>
        <p><strong>First Name:</strong> ${first_name}</p>
        <p><strong>Last Name:</strong> ${last_name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Resume:</strong> <a href="${resume}">${resume}</a></p>
        <p><strong>LinkedIn:</strong> ${linkedin || 'N/A'}</p>
        <p><strong>Website:</strong> ${website || 'N/A'}</p>
        <p><strong>Country:</strong> ${country}</p>
        <p><strong>Knew Rootstrap:</strong> ${knew_rootstrap}</p>
        <p><strong>Heard From:</strong> ${heard_from || 'N/A'}</p>
        <p><strong>Heard From Details:</strong> ${heard_from_details || 'N/A'}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: `Failed to send email: ${error.message}` }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}
