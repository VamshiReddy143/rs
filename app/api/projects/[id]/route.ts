import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Project from "@/models/Project";
import Template3Project from "@/models/Template3Project";
import CustomContent from "@/models/CustomContent";
import connectDB from "@/lib/connectDb";

// GET handler to fetch a project by ID from multiple collections
export async function GET(req: NextRequest, context: any) {
  const { id } = context.params;

  try {
    await connectDB();

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
    }

    // Try Project collection
    let project = await Project.findById(id).lean();
    if (project) {
      return NextResponse.json({ ...project, type: "project" }, { status: 200 });
    }

    // Try Template3Project collection
    project = await Template3Project.findById(id).lean();
    if (project) {
      return NextResponse.json(
        { ...project, type: "template3project" },
        { status: 200 }
      );
    }

    // Try CustomContent collection
    project = await CustomContent.findById(id).lean();
    if (project) {
      return NextResponse.json({ ...project, type: "custom" }, { status: 200 });
    }

    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  } catch (error: any) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: `Failed to fetch project: ${error.message}` },
      { status: 500 }
    );
  }
}