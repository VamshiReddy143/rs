import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/connectDb';
import Project from '@/models/Project';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const formData = await req.formData();
    const templateId = formData.get('templateId') as string;
    const fields = JSON.parse(formData.get('fields') as string);

    if (!templateId || !fields) {
      return NextResponse.json({ error: 'Template ID and fields are required' }, { status: 400 });
    }

    const data: { [key: string]: string } = {};
    for (const [key, value] of Object.entries(fields)) {
      if (formData.get(key) instanceof File) {
        const file = formData.get(key) as File;
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: 'projects' }, (error, result) => {
              if (error) reject(error);
              else resolve(result);
            })
            .end(buffer);
        });
        data[key] = (result as any).secure_url;
      } else {
        data[key] = value as string;
      }
    }

    const project = new Project({ templateId, data });
    await project.save();

    return NextResponse.json({ message: 'Project created successfully', project });
  } catch (error: any) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const projects = await Project.find().sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error: any) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}