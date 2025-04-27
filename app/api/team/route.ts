import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Team from "@/models/Team";
import connectToDatabase from "@/lib/connectDb";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    await connectToDatabase();
    const teamMembers = await Team.find({}).lean().sort({ createdAt: -1 });
    return NextResponse.json(teamMembers, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching team members:", error);
    return NextResponse.json(
      { message: `Internal server error: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const formData = await request.formData();
    const image = formData.get("image") as File;
    const testimonial = formData.get("testimonial") as string;
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;

    if (!image || !testimonial || !name || !role) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Upload image to Cloudinary
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "team_images", resource_type: "image" },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      Readable.from(buffer).pipe(stream);
    });

    if (!uploadResult || !(uploadResult as any).secure_url) {
      throw new Error("Failed to upload image to Cloudinary");
    }

    const imageUrl = (uploadResult as any).secure_url;
    console.log("Uploaded image URL:", imageUrl);

    // Create new team member
    const newTeamMember = new Team({
      image: imageUrl,
      testimonial,
      name,
      role,
    });

    const savedTeamMember = await newTeamMember.save();
    console.log("Saved team member:", savedTeamMember);

    // Return wrapped response
    return NextResponse.json({ teamMember: savedTeamMember }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating team member:", error);
    return NextResponse.json({ message: `Error: ${error.message}` }, { status: 500 });
  }
}