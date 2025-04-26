
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/connectDb";
import { Job } from "@/models/Jobs";


export async function GET(req: NextRequest, context: any) {
  const { jobId } = context.params;

  try {
    await connectToDatabase();
    const job = await Job.findById(jobId);
    if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });
    return NextResponse.json(job);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// @ts-ignore: Temporary workaround for Next.js type generation issue
export async function PUT(req: NextRequest, context: any) {
  const { jobId } = context.params;

  try {
    await connectToDatabase();
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const location = formData.get("location") as string;
    const description = formData.get("description") as string;
    const employmentType = formData.get("employmentType") as string;

    const job = await Job.findByIdAndUpdate(
      jobId,
      { title, location, description, employmentType },
      { new: true }
    );
    if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });

    return NextResponse.json(job);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// @ts-ignore: Temporary workaround for Next.js type generation issue
export async function DELETE(req: NextRequest, context: any) {
  const { jobId } = context.params;

  try {
    await connectToDatabase();
    const job = await Job.findByIdAndDelete(jobId);
    if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });
    return NextResponse.json({ message: "Job deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
