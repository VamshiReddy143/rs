// app/api/blogs/allblogs/route.ts
import { NextResponse } from "next/server";
import Blog from "@/models/Blog";
import connectToDatabase from "@/lib/connectDb";

interface Card {
  _id: string;
  image: string;
  category: string;
  title: string;
}

export async function GET() {
  try {
    await connectToDatabase();
    const blogs = await Blog.find({}, "_id title category primaryImage").sort({ createdAt: -1 })
      .lean()
      .exec();

    const cards: Card[] = blogs.map((blog) => ({
      _id: blog._id.toString(),
      image: blog.primaryImage || "/default-image.jpg",
      category: blog.category || "Uncategorized",
      title: blog.title,
    }));

    console.log("Fetched all blogs for /api/blogs/allblogs:", JSON.stringify(cards, null, 2));
    return NextResponse.json(cards, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching all blogs:", error.message, error.stack);
    return NextResponse.json({ message: `Error: ${error.message}` }, { status: 500 });
  }
}