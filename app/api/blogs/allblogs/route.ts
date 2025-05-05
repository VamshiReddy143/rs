// app/api/blogs/allblogs/route.ts
import { NextResponse } from "next/server";
import Blog from "@/models/Blog";
import connectToDatabase from "@/lib/connectDb";
import { Blog as BlogType } from "@/types/blog";
import { Document, Types } from "mongoose";

// Define a type for the Mongoose document (before lean)
interface BlogDocument extends Document {
  _id: Types.ObjectId;
  title: string;
  author: string;
  primaryImage?: string;
  category: string;
  content: {
    type: "paragraph" | "image" | "code";
    value: string;
    language?: string;
    imageUrls?: string[];
  }[];
  createdAt: Date;
  updatedAt?: Date;
  __v: number;
}

// Define the type for lean() output (plain object)
type LeanBlog = {
  _id: Types.ObjectId;
  title: string;
  author: string;
  primaryImage?: string;
  category: string;
  content: {
    type: "paragraph" | "image" | "code";
    value: string;
    language?: string;
    imageUrls?: string[];
  }[];
  createdAt: Date;
  updatedAt?: Date;
  __v: number;
};

export async function GET() {
  try {
    await connectToDatabase();
    const blogs = await Blog.find({})
      .sort({ createdAt: -1 })
      .lean()
      .exec() as LeanBlog[];

    const formattedBlogs: BlogType[] = blogs.map((blog) => ({
      _id: blog._id.toString(),
      title: blog.title || "",
      category: blog.category || "Uncategorized",
      primaryImage: blog.primaryImage || "/default-image.jpg",
      author: blog.author || "",
      content: Array.isArray(blog.content) ? blog.content : [],
      createdAt: blog.createdAt ? new Date(blog.createdAt).toISOString() : undefined,
      updatedAt: blog.updatedAt ? new Date(blog.updatedAt).toISOString() : undefined,
    }));

    console.log("Fetched all blogs for /api/blogs/allblogs:", JSON.stringify(formattedBlogs, null, 2));
    return NextResponse.json(formattedBlogs, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching all blogs:", error.message, error.stack);
    return NextResponse.json({ error: `Error: ${error.message}` }, { status: 500 });
  }
}