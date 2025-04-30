// pages/api/upload.ts
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      console.error("CLOUDINARY_CLOUD_NAME is not set");
      return NextResponse.json({ error: "Server configuration error: Cloud name missing" }, { status: 500 });
    }
    if (!process.env.CLOUDINARY_API_KEY) {
      console.error("CLOUDINARY_API_KEY is not set");
      return NextResponse.json({ error: "Server configuration error: API key missing" }, { status: 500 });
    }
    if (!process.env.CLOUDINARY_API_SECRET) {
      console.error("CLOUDINARY_API_SECRET is not set");
      return NextResponse.json({ error: "Server configuration error: API secret missing" }, { status: 500 });
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const uploadPreset = formData.get("upload_preset") as string;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    if (!uploadPreset) {
      console.warn("No upload preset provided; proceeding without it");
    }

    // Validate file
    const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Allowed: PDF, DOC, DOCX, TXT" }, { status: 400 });
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      return NextResponse.json({ error: "File size exceeds 5MB limit" }, { status: 400 });
    }

    // Upload to Cloudinary
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          upload_preset: uploadPreset || undefined, // Use preset if provided
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    if (!(result as any).secure_url) {
      console.error("Cloudinary response missing secure_url:", result);
      return NextResponse.json({ error: "No secure URL returned from Cloudinary" }, { status: 500 });
    }

    return NextResponse.json({ secure_url: (result as any).secure_url }, { status: 200 });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false, // Required for FormData
  },
};