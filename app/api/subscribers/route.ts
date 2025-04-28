import { NextResponse } from "next/server";
import Subscription from "@/models/Subscription";
import User from "@/models/User";
import connectToDatabase from "@/lib/connectDb";

// Define interfaces for lean documents
interface LeanSubscription {
  _id: string;
  email: string;
  createdAt: Date;
  __v?: number;
}

interface LeanUser {
  _id: string;
  googleId: string;
  email: string;
  name: string;
  image: string;
  __v?: number;
}

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";

    let subscribers: LeanSubscription[];
    if (query) {
      subscribers = (await Subscription.find({
        email: { $regex: query, $options: "i" },
      })
        .sort({ createdAt: -1 })
        .lean()) as LeanSubscription[];
    } else {
      subscribers = (await Subscription.find()
        .sort({ createdAt: -1 })
        .lean()) as LeanSubscription[];
    }

    const subscribersWithDetails = await Promise.all(
      subscribers.map(async (sub: LeanSubscription) => {
        const user: LeanUser | null = (await User.findOne({
          email: { $regex: `^${sub.email}$`, $options: "i" },
        }).lean()) as LeanUser | null;
        if (!user) {
          console.warn(`No User found for email: ${sub.email}`);
        }
        return {
          _id: sub._id,
          email: sub.email,
          createdAt: sub.createdAt,
          name: user?.name || "Subscriber",
          image: user?.image || "/ph.jpg",
        };
      })
    );

    return NextResponse.json({ subscribers: subscribersWithDetails }, { status: 200 });
  } catch (error: any) {
    console.error("API error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}