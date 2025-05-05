// app/api/blogs/create/route.ts
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Blog from "@/models/Blog";
import connectToDatabase from "@/lib/connectDb";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import sanitizeHtml from "sanitize-html";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface ContentItem {
  type: "paragraph" | "image" | "code";
  value: string;
  language?: string;
  imageUrls?: string[];
}

export async function GET() {
  try {
    await connectToDatabase();
    const blogs = await Blog.find({}, "_id title category author primaryImage content createdAt").lean();
    console.log("Fetched blogs:", JSON.stringify(blogs, null, 2));
    return NextResponse.json(blogs, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching blogs:", error.message, error.stack);
    return NextResponse.json({ message: `Error: ${error.message}` }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const author = formData.get("author") as string;
    const contentRaw = formData.get("content") as string;
    const primaryImage = formData.get("primaryImage") as File | null;

    if (!title || !category || !author || !contentRaw) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    let content: ContentItem[];
    try {
      content = JSON.parse(contentRaw) as ContentItem[];
    } catch (error) {
      return NextResponse.json({ message: "Invalid content format" }, { status: 400 });
    }

    let primaryImageUrl: string | undefined;
    if (primaryImage) {
      const arrayBuffer = await primaryImage.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "blog_images", resource_type: "image" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        Readable.from(buffer).pipe(stream);
      });
      primaryImageUrl = (uploadResult as any).secure_url;
    }

    const processedContent: ContentItem[] = [];
    for (const [index, item] of content.entries()) {
      if (!item.type || !item.value) {
        return NextResponse.json(
          { message: `Invalid content item ${index}: missing type or value` },
          { status: 400 }
        );
      }

      const processedItem: ContentItem = { type: item.type, value: item.value };
      if (item.language) {
        processedItem.language = item.language;
      }

      if (item.type === "image") {
        const file = formData.get(`image-${index}`) as File;
        if (file) {
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: "blog_images", resource_type: "image" },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            );
            Readable.from(buffer).pipe(stream);
          });
          processedItem.value = (uploadResult as any).secure_url;
        } else {
          return NextResponse.json(
            { message: `Missing image file for content item ${index}` },
            { status: 400 }
          );
        }
      } else if (item.type === "paragraph") {
        processedItem.value = sanitizeHtml(item.value, {
          allowedTags: [
            "p",
            "span",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "strong",
            "em",
            "ul",
            "ol",
            "li",
            "a",
            "img",
            "table",
            "tr",
            "td",
            "th",
            "blockquote",
            "code",
            "pre",
            "div",
            "iframe",
          ],
          allowedAttributes: {
            "*": ["style", "class"],
            "a": ["href", "target", "rel"],
            "img": ["src", "alt", "width", "height", "style"],
            "iframe": ["src", "frameborder", "allow", "allowfullscreen", "style"],
          },
          allowedIframeHostnames: ["www.youtube.com", "player.vimeo.com"],
          allowedSchemes: ["http", "https"],
          allowedSchemesByTag: { img: ["https"] },
        });

        if (item.imageUrls) {
          processedItem.imageUrls = item.imageUrls.filter((url) => url.includes("cloudinary.com"));
          if (processedItem.imageUrls.length === 0) {
            delete processedItem.imageUrls;
          }
        }
      }

      processedContent.push(processedItem);
    }

    const newBlog = new Blog({
      title,
      category,
      author,
      primaryImage: primaryImageUrl,
      content: processedContent,
    });

    const savedBlog = await newBlog.save();
    console.log("Saved blog:", JSON.stringify(savedBlog, null, 2));
    return NextResponse.json(savedBlog, { status: 201 });
  } catch (error: any) {
    console.error("Error creating blog:", error.message, error.stack);
    return NextResponse.json({ message: `Error: ${error.message}` }, { status: 500 });
  }
}