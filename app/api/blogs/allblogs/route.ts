import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Blog from "@/models/Blog";
import connectToDatabase from "@/lib/connectDb";

// Define the type for content items
interface ContentItem {
  type: "paragraph" | "image" | "code";
  value: string;
  language?: string;
  imagePreview?: string;
}

// Define the type for the lean document returned by Mongoose
interface LeanBlog {
  _id: mongoose.Types.ObjectId;
  title: string;
  category: string;
  author: string;
  primaryImage?: string;
  content: ContentItem[];
}

// Define the Card interface for the response
interface Card {
  _id: string;
  title: string;
  category: string;
  author: string;
  image: string;
  content: ContentItem[];
}

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    console.log("Database connected:", mongoose.connection.readyState);

    // Fetch blogs with all required fields
   // Inside your GET handler
const blogs = await Blog.find(
  {},
  { _id: 1, title: 1, category: 1, author: 1, primaryImage: 1, content: 1 }
)
.sort({ createdAt: -1 }) // ⬅️ Sort by newest first
.lean() as unknown as LeanBlog[];

    console.log("Fetched blogs:", JSON.stringify(blogs, null, 2));

    // Transform blogs to match Card interface
    const cards: Card[] = blogs.map((blog) => ({
      _id: blog._id.toString(),
      title: blog.title || "",
      category: blog.category || "",
      author: blog.author || "",
      image: blog.primaryImage || "/placeholder-image.jpg",
      content: Array.isArray(blog.content) ? blog.content : [],
    }));

    console.log("Transformed cards:", JSON.stringify(cards, null, 2));
    return NextResponse.json(cards, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching blogs:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to fetch blogs: ${message}` },
      { status: 500 }
    );
  }
}