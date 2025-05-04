import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import CustomContent from '@/models/CustomContent';

// Define the shape of a content block in the database
interface ContentBlock {
  type: string;
  content: string;
  [key: string]: any;
}

// Define the shape of the CustomContent document from MongoDB
interface CustomContentDocument {
  _id: mongoose.Types.ObjectId;
  title: string;
  thumbnailImage?: string;
  thumbnailText?: string;
  contentBlocks?: ContentBlock[];
  createdAt: Date;
  __v?: number;
}

// Define the response shape for GET
interface TransformedProject {
  _id: string;
  type: 'custom';
  title: string;
  thumbnailImage: string | null;
  thumbnailText?: string;
  content: Array<{
    type: 'text' | 'image' | 'video';
    subtype?: string;
    value: string;
    description?: string;
  }>;
  createdAt: Date;
}

async function connectDB(): Promise<void> {
  if (mongoose.connection.readyState === 0) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    await mongoose.connect(uri);
  }
}

export async function GET(req: NextRequest, context: any) {
  try {
    await connectDB();

    const { id } = context.params;
    if (!id) {
      console.error('Project ID is missing');
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error('Invalid project ID:', id);
      return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 });
    }

    const project = await CustomContent.findById(id).lean<CustomContentDocument>();
    if (!project) {
      console.error(`Project not found for ID: ${id}`);
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    console.log('Raw project from DB:', project);

    const transformedProject: TransformedProject = {
      _id: project._id.toString(),
      type: 'custom',
      title: project.title,
      thumbnailImage: project.thumbnailImage || null,
      thumbnailText: project.thumbnailText,
      content: Array.isArray(project.contentBlocks)
        ? project.contentBlocks.map((block: ContentBlock) => ({
            type: block.type === 'image' || block.type === 'video' ? block.type : 'text',
            subtype: block.type === 'image' || block.type === 'video' ? undefined : block.type,
            value: block.content,
            description: undefined,
          }))
        : [],
      createdAt: project.createdAt,
    };

    console.log('Transformed content:', transformedProject.content);

    return NextResponse.json(transformedProject);
  } catch (error: unknown) {
    console.error('Error fetching project:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      id: context.params.id,
    });
    const message = error instanceof Error ? error.message : 'Failed to fetch project';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: any) {
  try {
    await connectDB();

    const { id } = context.params;
    if (!id) {
      console.error('Content ID is missing');
      return NextResponse.json({ error: 'Content ID is required' }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error('Invalid content ID:', id);
      return NextResponse.json({ error: 'Invalid content ID' }, { status: 400 });
    }

    const content = await CustomContent.findByIdAndDelete(id).lean<CustomContentDocument>();
    if (!content) {
      console.error(`Content not found for ID: ${id}`);
      return NextResponse.json({ error: 'CustomContent not found' }, { status: 404 });
    }

    console.log('Content deleted:', content);
    return NextResponse.json({ message: 'CustomContent deleted successfully' });
  } catch (error: unknown) {
    console.error('Error deleting content:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      id: context.params.id,
    });
    const message = error instanceof Error ? error.message : 'Failed to delete CustomContent';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}