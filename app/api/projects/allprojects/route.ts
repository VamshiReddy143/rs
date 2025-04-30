import { NextResponse } from 'next/server';
import Project from '@/models/project';
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

export async function GET() {
  try {
    await connectDB();

    // Fetch all projects with explicit typing
    const projects = await Project.find().sort({ _id: -1 }).lean() as ProjectDocument[];
    const template3Projects = await Template3Project.find().sort({ _id: -1 }).lean() as Template3ProjectDocument[];
    const customContents = await CustomContent.find().sort({ _id: -1 }).lean() as CustomContentDocument[];

    // Normalize data to match ProjectsDashboard's UnifiedProject interface
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
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}