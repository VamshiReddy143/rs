import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import connectToDatabase from '@/lib/connectDb';
import Subscription from '@/models/Subscription';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { message, subject } = await req.json();

    if (!message || !subject) {
      return NextResponse.json({ error: 'Subject and message are required' }, { status: 400 });
    }

    // Fetch all subscribed emails
    const subscriptions = await Subscription.find({}, 'email');
    const emails = subscriptions.map(sub => sub.email);

    if (emails.length === 0) {
      return NextResponse.json({ error: 'No subscribers found' }, { status: 404 });
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email service (e.g., 'sendgrid', 'gmail')
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
      },
    });

    // Send email to each subscriber
    const emailPromises = emails.map(email =>
      transporter.sendMail({
        from: `"Rootstrap Updates" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: subject,
        text: message,
        html: `<p>${message.replace(/\n/g, '<br>')}</p>`,
      })
    );

    await Promise.all(emailPromises);

    return NextResponse.json({ message: 'Broadcast email sent successfully!' });
  } catch (error: any) {
    console.error('Error sending broadcast email:', error);
    return NextResponse.json({ error: 'Failed to send broadcast email' }, { status: 500 });
  }
}