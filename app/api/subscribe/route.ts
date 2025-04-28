import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/connectDb';
import Subscription from '@/models/Subscription';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const { email } = await req.json();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    const existingSubscription = await Subscription.findOne({ email: { $regex: `^${email}$`, $options: "i" } });
    if (existingSubscription) {
      return NextResponse.json({ message: 'Thanks for subscribing!' });
    }

    await Subscription.create({ email, createdAt: new Date() });

    const existingUser = await User.findOne({ email: { $regex: `^${email}$`, $options: "i" } });
    if (!existingUser) {
      const nameFromEmail = email.split('@')[0]; 

      await User.create({
        googleId: `manual-${email}`,
        email,
        name: nameFromEmail,
        image: "/ph.jpg",
      });
      console.log(`Created User for ${email}`);
    }

    return NextResponse.json({ message: 'Thanks for subscribing!' });
  } catch (error: any) {
    console.error('Error subscribing:', error.message);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
