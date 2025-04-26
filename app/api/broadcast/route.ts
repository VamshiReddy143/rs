
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
    const subscriptions = await Subscription.find({}, 'email').lean();
    const emails = subscriptions.map(sub => sub.email);

    if (emails.length === 0) {
      console.log('No subscribers found in the database');
      return NextResponse.json({ error: 'No subscribers found' }, { status: 404 });
    }

    console.log(`Found ${emails.length} subscribers: ${emails.join(', ')}`);

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
      console.log('Nodemailer transporter verified successfully');
    } catch (verifyErr) {
      console.error('Transporter verification failed:', verifyErr);
      return NextResponse.json({ error: 'Email service configuration failed' }, { status: 500 });
    }

    // Send a test email to the sender to verify delivery
    try {
      const testEmailInfo = await transporter.sendMail({
        from: `"Rootstrap Updates" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: 'Test Email from Rootstrap Broadcast',
        text: 'This is a test email to verify your Nodemailer setup.',
        html: '<p>This is a test email to verify your Nodemailer setup.</p>',
      });
      console.log(`Test email sent to ${process.env.EMAIL_USER}: Message ID ${testEmailInfo.messageId}, Response: ${testEmailInfo.response}, Accepted: ${testEmailInfo.accepted}, Rejected: ${testEmailInfo.rejected}`);
    } catch (testErr) {
      console.error(`Failed to send test email to ${process.env.EMAIL_USER}:`, testErr);
    }

    // Send emails in batches (100 emails per batch)
    const batchSize = 100;
    const emailPromises: Promise<void>[] = [];

    for (let i = 0; i < emails.length; i += batchSize) {
      const batchEmails = emails.slice(i, i + batchSize);
      const batchPromises = batchEmails.map(async (email) => {
        try {
          const info = await transporter.sendMail({
            from: `"Rootstrap Updates" <${process.env.EMAIL_USER}>`,
            to: email,
            bcc: process.env.EMAIL_USER, // BCC to sender for verification
            subject: subject,
            text: message,
            html: `<p>${message.replace(/\n/g, '<br>')}</p>`,
          });
          console.log(`Email sent to ${email}: Message ID ${info.messageId}, Response: ${info.response}, Accepted: ${info.accepted}, Rejected: ${info.rejected}`);
        } catch (err) {
          console.error(`Failed to send email to ${email}:`, err);
          throw err;
        }
      });
      emailPromises.push(...batchPromises);

      // Delay between batches (2 seconds)
      if (i + batchSize < emails.length) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    // Execute all email promises and track failures
    const results = await Promise.allSettled(emailPromises);
    const failedEmails = results.filter(result => result.status === 'rejected').length;

    if (failedEmails > 0) {
      console.warn(`Failed to send emails to ${failedEmails} subscribers`);
      return NextResponse.json(
        { message: `Broadcast email sent to ${emails.length - failedEmails} subscribers, failed for ${failedEmails}` },
        { status: 207 }
      );
    }

    console.log(`Successfully sent broadcast email to ${emails.length} subscribers`);
    return NextResponse.json({ message: 'Broadcast email sent successfully!' });
  } catch (error: any) {
    console.error('Error sending broadcast email:', error);
    return NextResponse.json({ error: 'Failed to send broadcast email' }, { status: 500 });
  }
}
