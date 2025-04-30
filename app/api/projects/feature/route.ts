import { NextResponse } from 'next/server';
import Project from '@/models/Project';
import Template3Project from '@/models/Template3Project';
import CustomContent from '@/models/CustomContent';
import connectDB from '@/lib/connectDb';

// Define interfaces (can be moved to a types file)
interface ProjectDocument {
  _id: import('mongoose').Types.ObjectId;
  name?: string;
  thumbnailText?: string;
  thumbnailImage?: string | null;
  isFeatured?: boolean;
}

interface Template3ProjectDocument {
  _id: import('mongoose').Types.ObjectId;
  name?: string;
  thumbnailText?: string;
  thumbnailImage?: string | null;
  isFeatured?: boolean;
}

interface CustomContentDocument {
  _id: import('mongoose').Types.ObjectId;
  title?: string;
  thumbnailText?: string;
  thumbnailImage?: string | null;
  isFeatured?: boolean;
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const { id, model, isFeatured } = await request.json();

    let Model;
    switch (model) {
      case 'Project':
        Model = Project;
        break;
      case 'Template3Project':
        Model = Template3Project;
        break;
      case 'CustomContent':
        Model = CustomContent;
        break;
      default:
        return NextResponse.json({ error: 'Invalid model type' }, { status: 400 });
    }

    const project = await Model.findByIdAndUpdate(
      id,
      { isFeatured },
      { new: true }
    );
    if (!project) {
      return NextResponse.json({ error: `${model} not found` }, { status: 404 });
    }

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: `Failed to update featured status: ${message}` }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();

    // Fetch featured projects with explicit typing
    const projects = await Project.find({ isFeatured: true }).lean() as ProjectDocument[];
    const template3Projects = await Template3Project.find({ isFeatured: true }).lean() as Template3ProjectDocument[];
    const customContents = await CustomContent.find({ isFeatured: true }).lean() as CustomContentDocument[];

    // Normalize data
    const normalizedProjects = [
      ...projects.map((p) => ({
        _id: p._id.toString(),
        title: p.name || 'Untitled Project',
        thumbnailText: p.thumbnailText || 'No description available',
        image: p.thumbnailImage || null,
        model: 'Project' as const,
        isFeatured: p.isFeatured || false,
      })),
      ...template3Projects.map((p) => ({
        _id: p._id.toString(),
        title: p.name || 'Untitled Template3 Project',
        thumbnailText: p.thumbnailText || 'No description available',
        image: p.thumbnailImage || null,
        model: 'Template3Project' as const,
        isFeatured: p.isFeatured || false,
      })),
      ...customContents.map((c) => ({
        _id: c._id.toString(),
        title: c.title || 'Untitled Custom Content',
        thumbnailText: c.thumbnailText || 'No description available',
        image: c.thumbnailImage || null,
        model: 'CustomContent' as const,
        isFeatured: c.isFeatured || false,
      })),
    ];

    return NextResponse.json(normalizedProjects, { status: 200 });
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return NextResponse.json({ error: 'Failed to fetch featured projects' }, { status: 500 });
  }
}