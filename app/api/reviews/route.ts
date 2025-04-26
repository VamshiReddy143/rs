
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import connectToDatabase from "@/lib/connectDb";
import Review from "@/models/Reviews";
import User from "@/models/User";
import { AuthOptions } from "next-auth";

// Define type for lean Review document
interface LeanReview {
  _id: string;
  text: string;
  name: string;
  position: string;
  userId: string;
  image?: string;
  createdAt: Date;
  __v?: number;
}

// Define type for lean User document
interface LeanUser {
  _id: string;
  googleId: string;
  image?: string;
  __v?: number;
}

// Explicitly type authOptions for safety
const typedAuthOptions: AuthOptions = authOptions;

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    // Sort reviews by createdAt in descending order (newest first)
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .lean() as unknown as LeanReview[];
    console.log("Fetched reviews with images:", reviews.map((r) => ({ _id: r._id, image: r.image })));

    // Populate image field if missing
    const reviewsWithImages = await Promise.all(
      reviews.map(async (review) => {
        if (!review.image) {
          const user = await User.findOne({ googleId: review.userId })
            .select("image")
            .lean() as unknown as LeanUser | null;
          if (user && user.image) {
            return { ...review, image: user.image };
          }
        }
        return review;
      })
    );

    return NextResponse.json(reviewsWithImages);
  } catch (error: unknown) {
    console.error("Error fetching reviews:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: `Failed to fetch reviews: ${message}` }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(typedAuthOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const text = formData.get("text") as string;
  const name = formData.get("name") as string;
  const position = formData.get("position") as string;

  if (!text || !name || !position) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  console.log("Session user data:", session.user);

  try {
    await connectToDatabase();
    const newReview = new Review({
      text,
      name,
      position,
      userId: session.user?.id,
      image: session.user?.image,
    });
    await newReview.save();
    console.log("Saved review with image:", {
      text,
      name,
      position,
      userId: session.user?.id,
      image: session.user?.image,
    });
    return NextResponse.json({ message: "Review submitted successfully" });
  } catch (error: unknown) {
    console.error("Error submitting review:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: `Failed to submit review: ${message}` }, { status: 500 });
  }
}
