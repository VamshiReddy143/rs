import { NextResponse } from "next/server";
import  connectToDatabase  from "@/lib/connectDb";
import { Application } from "@/models/Application";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const {
      jobId,
      firstName,
      lastName,
      email,
      phone,
      resume,
      linkedIn,
      website,
      country,
      knewRootstrap,
      heardFrom,
      heardFromDetails,
    } = body;

    if (!jobId || !firstName || !lastName || !email || !phone || !resume || !country || !knewRootstrap) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const application = new Application({
      jobId,
      firstName,
      lastName,
      email,
      phone,
      resume,
      linkedIn,
      website,
      country,
      knewRootstrap,
      heardFrom,
      heardFromDetails,
      submittedAt: new Date(),
    });

    await application.save();
    return NextResponse.json(application, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const applications = await Application.find().sort({ submittedAt: -1 });
    return NextResponse.json(applications);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}