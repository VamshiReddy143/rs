import { NextResponse } from 'next/server';
import Project from '@/models/project';
import Template3Project from '@/models/Template3Project';
import CustomContent from '@/models/CustomContent';
import connectDB from '@/lib/connectDb';

// Define interfaces for Mongoose documents
interface ProjectDocument {
  _id: string | { toString(): string }; // Mongoose ObjectId or string
  name?: string;
  thumbnailText?: string;
  thumbnailImage?: string | null;
  isFeatured?: boolean;
  createdAt?: Date;
  type?: string;
}

interface Template3ProjectDocument {
  _id: string | { toString(): string };
  name?: string;
  thumbnailText?: string;
  thumbnailImage?: string | null;
  isFeatured?: boolean;
  createdAt?: Date;
  type?: string;
}

interface CustomContentDocument {
  _id: string | { toString(): string };
  title?: string;
  thumbnailText?: string;
  thumbnailImage?: string | null;
  isFeatured?: boolean;
  createdAt?: Date;
  type?: string;
}

// Define interface for response
interface UnifiedProject {
  _id: string;
  title: string;
  thumbnailText: string;
  image: string | null;
  model: 'Project' | 'Template3Project' | 'CustomContent';
  isFeatured: boolean;
  createdAt: Date;
}

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const limit = parseInt(searchParams.get('limit') || '3', 10);

    // Build query
    const query = type ? { type } : {};

    // Fetch projects from all models
    const [projects, template3Projects, customContents] = await Promise.all([
      Project.find(query).lean<ProjectDocument[]>(),
      Template3Project.find(query).lean<Template3ProjectDocument[]>(),
      CustomContent.find(query).lean<CustomContentDocument[]>(),
    ]);

    // Combine and normalize projects
    const allProjects: UnifiedProject[] = [
      ...projects.map((p) => ({
        _id: p._id.toString(),
        title: p.name || 'Untitled Project',
        thumbnailText: p.thumbnailText || 'No description available',
        image: p.thumbnailImage || null,
        model: 'Project' as const,
        isFeatured: p.isFeatured || false,
        createdAt: p.createdAt || new Date(),
      })),
      ...template3Projects.map((p) => ({
        _id: p._id.toString(),
        title: p.name || 'Untitled Template3 Project',
        thumbnailText: p.thumbnailText || 'No description available',
        image: p.thumbnailImage || null,
        model: 'Template3Project' as const,
        isFeatured: p.isFeatured || false,
        createdAt: p.createdAt || new Date(),
      })),
      ...customContents.map((c) => ({
        _id: c._id.toString(),
        title: c.title || 'Untitled Custom Content',
        thumbnailText: c.thumbnailText || 'No description available',
        image: c.thumbnailImage || null,
        model: 'CustomContent' as const,
        isFeatured: c.isFeatured || false,
        createdAt: c.createdAt || new Date(),
      })),
    ];

    // Sort by createdAt (newest first) and limit
    const sortedProjects = allProjects
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);

    return NextResponse.json(sortedProjects, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}