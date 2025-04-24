import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/connectDb';
import Subscription from '@/models/Subscription';

export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Parse the request body
    const { email } = await req.json();

    // Validate the email format
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    // Check if the email already exists
    const existingSubscription = await Subscription.findOne({ email });

    // If the email exists, return the success message
    if (existingSubscription) {
      return NextResponse.json({ message: 'Thanks for subscribing!' });
    }

    // Create a new subscription record
    await Subscription.create({ email });

    // Return the success message
    return NextResponse.json({ message: 'Thanks for subscribing!' });
  } catch (error) {
    console.error('Error subscribing:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}