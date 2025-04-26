
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Blog from "@/models/Blog";
import connectToDatabase from "@/lib/connectDb";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface ContentItem {
  type: "heading" | "paragraph" | "image" | "code";
  value: string;
  language?: string;
}


export async function PUT(request: NextRequest, context: any) {
  const { id: blogId } = context.params;

  try {
    await connectToDatabase();

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return NextResponse.json({ message: "Invalid blog ID" }, { status: 400 });
    }

    const existingBlog = await Blog.findById(blogId);
    if (!existingBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

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

    // Upload new primary image if present and delete old one
    let primaryImageUrl: string | undefined = existingBlog.primaryImage;
    if (primaryImage) {
      if (existingBlog.primaryImage) {
        const publicId = existingBlog.primaryImage.split("/").pop()?.split(".")[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`blog_images/${publicId}`);
        }
      }
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

    // Process content and handle image updates
    const processedContent: ContentItem[] = [];
    const oldImageUrls: string[] = existingBlog.content
      .filter((item: ContentItem) => item.type === "image")
      .map((item: ContentItem) => item.value);

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
          // Retain existing image URL if no new file is uploaded
          processedItem.value =
            existingBlog.content[index]?.type === "image"
              ? existingBlog.content[index].value
              : "";
        }
      }

      processedContent.push(processedItem);
    }

    // Delete old images that are no longer used
    const newImageUrls = processedContent
      .filter((item) => item.type === "image")
      .map((item) => item.value);
    const imagesToDelete = oldImageUrls.filter((url) => !newImageUrls.includes(url));
    for (const url of imagesToDelete) {
      const publicId = url.split("/").pop()?.split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`blog_images/${publicId}`);
      }
    }

    // Update blog
    existingBlog.title = title;
    existingBlog.category = category;
    existingBlog.author = author;
    existingBlog.primaryImage = primaryImageUrl;
    existingBlog.content = processedContent;

    const updatedBlog = await existingBlog.save();
    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error: any) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ message: `Error: ${error.message}` }, { status: 500 });
  }
}

// @ts-ignore: Temporary workaround for Next.js type generation issue
export async function DELETE(req: NextRequest, context: any) {
  const { id: blogId } = context.params;

  try {
    await connectToDatabase();

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return NextResponse.json({ message: "Invalid blog ID" }, { status: 400 });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    // Delete primary image from Cloudinary
    if (blog.primaryImage) {
      const publicId = blog.primaryImage.split("/").pop()?.split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`blog_images/${publicId}`);
      }
    }

    // Delete content images from Cloudinary
    const imageItems = blog.content.filter((item: ContentItem) => item.type === "image");
    for (const item of imageItems) {
      const publicId = item.value.split("/").pop()?.split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`blog_images/${publicId}`);
      }
    }

    // Delete blog from database
    await Blog.findByIdAndDelete(blogId);
    return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ message: `Error: ${error.message}` }, { status: 500 });
  }
}
