// /app/api/projects/reorder/route.ts
import { NextRequest, NextResponse } from "next/server";
import Project from "@/models/Project"; // Adjust path
import Template3Project from "@/models/Template3Project"; // Adjust path
import CustomContent from "@/models/CustomContent"; // Adjust path
import connectToDatabase from "@/lib/connectDb";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const { projects } = await request.json();

    if (!Array.isArray(projects)) {
      return NextResponse.json({ message: "Invalid projects array" }, { status: 400 });
    }

    for (const project of projects) {
      const { _id, model, order } = project;
      let Model;
      switch (model) {
        case "Project":
          Model = Project;
          break;
        case "Template3Project":
          Model = Template3Project;
          break;
        case "CustomContent":
          Model = CustomContent;
          break;
        default:
          return NextResponse.json({ message: `Invalid model: ${model}` }, { status: 400 });
      }

      await Model.findByIdAndUpdate(_id, { order }, { new: true });
    }

    return NextResponse.json({ message: "Project order updated successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error reordering projects:", error);
    return NextResponse.json({ message: `Error: ${error.message}` }, { status: 500 });
  }
}