import { NextResponse } from "next/server";
import  connectToDatabase  from "@/lib/connectDb";
import { Job } from "@/models/Jobs";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const location = formData.get("location") as string;
    const description = formData.get("description") as string;
    const employmentType = formData.get("employmentType") as string;

    const job = new Job({ title, location, description, employmentType, postedDate: new Date() });
    await job.save();

    return NextResponse.json(job, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const jobs = await Job.find().sort({ postedDate: -1 });
    return NextResponse.json(jobs);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}