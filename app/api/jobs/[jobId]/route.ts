import { NextResponse } from "next/server";
import  connectToDatabase  from "@/lib/connectDb";
import { Job } from "@/models/Jobs";

export async function GET(req: Request, { params }: { params: { jobId: string } }) {
  try {
    await connectToDatabase();
    const job = await Job.findById(params.jobId);
    if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });
    return NextResponse.json(job);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { jobId: string } }) {
  try {
    await connectToDatabase();
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const location = formData.get("location") as string;
    const description = formData.get("description") as string;
    const employmentType = formData.get("employmentType") as string;

    const job = await Job.findByIdAndUpdate(
      params.jobId,
      { title, location, description, employmentType },
      { new: true }
    );
    if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });

    return NextResponse.json(job);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { jobId: string } }) {
  try {
    await connectToDatabase();
    const job = await Job.findByIdAndDelete(params.jobId);
    if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });
    return NextResponse.json({ message: "Job deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}