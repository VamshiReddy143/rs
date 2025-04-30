import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/lib/connectDb';
import Project from '@/models/project';

export async function GET(req: NextRequest, context: any) {
  const { id } = context.params;

  try {
    await connectMongoDB();
    const project = await Project.findById(id).lean();
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: any) {
  const { id } = context.params;

  try {
    await connectMongoDB();
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: `Failed to delete project: ${message}` }, { status: 500 });
  }
}