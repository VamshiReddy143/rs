import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/connectDb";
import { Job } from "@/models/Jobs";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const location = formData.get("location") as string;
    const description = formData.get("description") as string;
    const employmentType = formData.get("employmentType") as string;
    const department = formData.get("department") as string;

    // Validate required fields
    if (!title || !location || !description || !employmentType || !department) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Validate department
    const validDepartments = [
      "Design",
      "DevOps",
      "Engineering Team",
      "Operations",
      "Other",
      "People Team",
      "Product",
      "QA",
    ];
    if (!validDepartments.includes(department)) {
      return NextResponse.json({ error: `Invalid department. Must be one of: ${validDepartments.join(", ")}` }, { status: 400 });
    }

    const job = new Job({
      title,
      location,
      description,
      employmentType,
      department,
      postedDate: new Date(),
    });
    await job.save();

    return NextResponse.json(job, { status: 201 });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || "Failed to create job" }, { status: 500 });
  }
}

export async function GET(req: NextRequest, context: any) {
  try {
    await connectToDatabase();
    const jobId = context.params?.jobId;
    console.log("GET: Context received:", JSON.stringify(context, null, 2));

    if (jobId) {
      if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
      }
      const job = await Job.findById(jobId);
      if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });
      return NextResponse.json(job);
    }
    const jobs = await Job.find().sort({ postedDate: -1 });
    return NextResponse.json(jobs);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch jobs" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: any) {
  const jobId = context.params?.jobId;
  console.log("PUT: Context received:", JSON.stringify(context, null, 2));

  try {
    await connectToDatabase();
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
    }

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const location = formData.get("location") as string;
    const description = formData.get("description") as string;
    const employmentType = formData.get("employmentType") as string;
    const department = formData.get("department") as string;

    // Validate required fields
    if (!title || !location || !description || !employmentType || !department) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Validate department
    const validDepartments = [
      "Design",
      "DevOps",
      "Engineering Team",
      "Operations",
      "Other",
      "People Team",
      "Product",
      "QA",
    ];
    if (!validDepartments.includes(department)) {
      return NextResponse.json({ error: `Invalid department. Must be one of: ${validDepartments.join(", ")}` }, { status: 400 });
    }

    const job = await Job.findByIdAndUpdate(
      jobId,
      { title, location, description, employmentType, department },
      { new: true, runValidators: true }
    );
    if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });

    return NextResponse.json(job);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || "Failed to update job" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: any) {
  const jobId = context.params?.jobId;
  console.log("DELETE: Context received:", JSON.stringify(context, null, 2));

  try {
    await connectToDatabase();
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
    }

    const job = await Job.findByIdAndDelete(jobId);
    if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });
    return NextResponse.json({ message: "Job deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete job" }, { status: 500 });
  }
}