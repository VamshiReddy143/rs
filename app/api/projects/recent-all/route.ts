import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
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
  createdAt?: Date;
}

interface Template3ProjectDocument {
  _id: import('mongoose').Types.ObjectId;
  name?: string;
  thumbnailText?: string;
  thumbnailImage?: string | null;
  createdAt?: Date;
}

interface CustomContentDocument {
  _id: import('mongoose').Types.ObjectId;
  title?: string;
  thumbnailText?: string;
  thumbnailImage?: string | null;
  createdAt?: Date;
}

export async function GET() {
  try {
    await connectDB();

    // Fetch recent projects with explicit typing
    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('_id name thumbnailText thumbnailImage createdAt')
      .lean() as ProjectDocument[];

    const template3Projects = await Template3Project.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('_id name thumbnailText thumbnailImage createdAt')
      .lean() as Template3ProjectDocument[];

    const customContents = await CustomContent.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('_id title thumbnailText thumbnailImage createdAt')
      .lean() as CustomContentDocument[];

    const normalizedProjects = [
      ...projects.map((p) => ({
        _id: p._id.toString(),
        name: p.name || 'Untitled Project',
        thumbnailText: p.thumbnailText || 'No description available',
        thumbnailImage: p.thumbnailImage || null,
        type: 'project' as const,
      })),
      ...template3Projects.map((p) => ({
        _id: p._id.toString(),
        name: p.name || 'Untitled Template3 Project',
        thumbnailText: p.thumbnailText || 'No description available',
        thumbnailImage: p.thumbnailImage || null,
        type: 'template3project' as const,
      })),
      ...customContents.map((c) => ({
        _id: c._id.toString(),
        name: c.title || 'Untitled Custom Content',
        thumbnailText: c.thumbnailText || 'No description available',
        thumbnailImage: c.thumbnailImage || null,
        type: 'custom' as const,
      })),
    ];

    // Sort by createdAt (fixed comparison for customContents)
    const sortedProjects = normalizedProjects
      .sort((a, b) => {
        const dateA = (projects.find((p) => p._id.toString() === a._id)?.createdAt ||
          template3Projects.find((p) => p._id.toString() === a._id)?.createdAt ||
          customContents.find((c) => c._id.toString() === a._id)?.createdAt) || new Date(0);
        const dateB = (projects.find((p) => p._id.toString() === b._id)?.createdAt ||
          template3Projects.find((p) => p._id.toString() === b._id)?.createdAt ||
          customContents.find((c) => c._id.toString() === b._id)?.createdAt) || new Date(0);
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 5);

    return NextResponse.json(sortedProjects, { status: 200 });
  } catch (error) {
    console.error('Error fetching recent projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}