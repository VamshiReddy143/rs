
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






export async function PUT(request: NextRequest, context: any) {
  const { id: teamId } = context.params;

  try {
    await connectToDatabase();

    if (!mongoose.Types.ObjectId.isValid(teamId)) {
      return NextResponse.json({ message: "Invalid team member ID" }, { status: 400 });
    }

    const existingTeamMember = await Team.findById(teamId);
    if (!existingTeamMember) {
      return NextResponse.json({ message: "Team member not found" }, { status: 404 });
    }

    const formData = await request.formData();
    const image = formData.get("image") as File | null;
    const testimonial = formData.get("testimonial") as string;
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;

    if (!testimonial || !name || !role) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Upload new image if present and delete old one
    let imageUrl: string = existingTeamMember.image;
    if (image) {
      if (existingTeamMember.image) {
        const publicId = existingTeamMember.image.split("/").pop()?.split(".")[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`team_images/${publicId}`);
        }
      }
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "team_images", resource_type: "image" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        Readable.from(buffer).pipe(stream);
      });
      imageUrl = (uploadResult as any).secure_url;
    }

    // Update team member
    existingTeamMember.image = imageUrl;
    existingTeamMember.testimonial = testimonial;
    existingTeamMember.name = name;
    existingTeamMember.role = role;

    const updatedTeamMember = await existingTeamMember.save();
    return NextResponse.json(updatedTeamMember, { status: 200 });
  } catch (error: any) {
    console.error("Error updating team member:", error);
    return NextResponse.json({ message: `Error: ${error.message}` }, { status: 500 });
  }
}

// @ts-ignore: Temporary workaround for Next.js type generation issue
export async function DELETE(request: NextRequest, context: any) {
  const { id: teamId } = context.params;

  try {
    await connectToDatabase();

    if (!mongoose.Types.ObjectId.isValid(teamId)) {
      return NextResponse.json({ message: "Invalid team member ID" }, { status: 400 });
    }

    const teamMember = await Team.findById(teamId);
    if (!teamMember) {
      return NextResponse.json({ message: "Team member not found" }, { status: 404 });
    }

    // Delete image from Cloudinary
    if (teamMember.image) {
      const publicId = teamMember.image.split("/").pop()?.split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`team_images/${publicId}`);
      }
    }

    // Delete team member from database
    await Team.findByIdAndDelete(teamId);
    return NextResponse.json({ message: "Team member deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting team member:", error);
    return NextResponse.json({ message: `Error: ${error.message}` }, { status: 500 });
  }
}
