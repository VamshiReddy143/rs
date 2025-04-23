import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Blog from "@/models/Blog";
import connectToDatabase from "@/lib/connectDb";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    console.log("Database connected:", mongoose.connection.readyState);

    const blogs = await Blog.find({}, { _id: 1, title: 1, category: 1, primaryImage: 1 }).lean();
    console.log("Fetched blogs:", JSON.stringify(blogs, null, 2));

    // Transform blogs to match Card interface
    const cards = blogs.map((blog) => ({
      _id: blog._id.toString(),
      title: blog.title,
      category: blog.category,
      image: blog.primaryImage || "/placeholder-image.jpg", // Use primaryImage with fallback
    }));

    console.log("Transformed cards:", JSON.stringify(cards, null, 2));
    return NextResponse.json(cards, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ message: `Internal server error: ${error.message}` }, { status: 500 });
  }
}