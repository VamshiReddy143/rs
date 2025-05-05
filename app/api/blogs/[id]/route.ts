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

export async function GET(request: NextRequest, context: any) {
  try {
    await connectToDatabase();
    const id = context.params?.id;
    console.log("GET: Context received:", JSON.stringify(context, null, 2));

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      console.error("Invalid blog ID:", id);
      return NextResponse.json({ message: "Invalid blog ID" }, { status: 400 });
    }

    console.log("Fetching blog with ID:", id);
    const blog = await Blog.findById(id).lean();
    if (!blog) {
      console.warn("Blog not found for ID:", id);
      const allBlogs = await Blog.find({}, "_id title").lean();
      console.log("All blog IDs in database:", allBlogs.map((b) => ({ id: b._id.toString(), title: b.title })));
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    const randomBlogs = await Blog.aggregate([
      { $match: { _id: { $ne: new mongoose.Types.ObjectId(id) } } },
      { $sample: { size: 3 } },
      { $project: { _id: 1, title: 1, category: 1, primaryImage: 1 } },
    ]).exec();

    console.log("Fetched blog:", JSON.stringify(blog, null, 2));
    console.log("Fetched random blogs:", JSON.stringify(randomBlogs, null, 2));

    return NextResponse.json({ blog, randomBlogs }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching blog:", error.message, error.stack);
    return NextResponse.json({ message: `Error: ${error.message}` }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: any) {
  const blogId = context.params?.id;

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

    const processedContent: ContentItem[] = [];
    const oldImageUrls: string[] = [
      ...existingBlog.content
        .filter((item: ContentItem) => item.type === "image")
        .map((item: ContentItem) => item.value),
      ...(existingBlog.content
        .filter((item: ContentItem) => item.type === "paragraph" && item.imageUrls)
        .flatMap((item: ContentItem) => item.imageUrls || [])),
    ];

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
          processedItem.value =
            existingBlog.content[index]?.type === "image"
              ? existingBlog.content[index].value
              : "";
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

    const newImageUrls: string[] = [
      ...processedContent
        .filter((item) => item.type === "image")
        .map((item) => item.value),
      ...processedContent
        .filter((item) => item.type === "paragraph" && item.imageUrls)
        .flatMap((item) => item.imageUrls || []),
    ];

    const imagesToDelete = oldImageUrls.filter((url) => !newImageUrls.includes(url));
    for (const url of imagesToDelete) {
      const publicId = url.split("/").pop()?.split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`blog_images/${publicId}`);
      }
    }

    existingBlog.title = title;
    existingBlog.category = category;
    existingBlog.author = author;
    existingBlog.primaryImage = primaryImageUrl;
    existingBlog.content = processedContent;
    existingBlog.updatedAt = new Date();

    const updatedBlog = await existingBlog.save();
    console.log("Updated blog:", JSON.stringify(updatedBlog, null, 2));
    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error: any) {
    console.error("Error updating blog:", error.message, error.stack);
    return NextResponse.json({ message: `Error: ${error.message}` }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: any) {
  const blogId = context.params?.id;

  try {
    await connectToDatabase();

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return NextResponse.json({ message: "Invalid blog ID" }, { status: 400 });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    if (blog.primaryImage) {
      const publicId = blog.primaryImage.split("/").pop()?.split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`blog_images/${publicId}`);
      }
    }

    const imageUrls: string[] = [
      ...blog.content
        .filter((item: ContentItem) => item.type === "image")
        .map((item: ContentItem) => item.value),
      ...blog.content
        .filter((item: ContentItem) => item.type === "paragraph" && item.imageUrls)
        .flatMap((item: ContentItem) => item.imageUrls || []),
    ];

    for (const url of imageUrls) {
      const publicId = url.split("/").pop()?.split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`blog_images/${publicId}`);
      }
    }

    await Blog.findByIdAndDelete(blogId);
    console.log("Deleted blog ID:", blogId);
    return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting blog:", error.message, error.stack);
    return NextResponse.json({ message: `Error: ${error.message}` }, { status: 500 });
  }
}