import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Project from '@/models/Project';
import connectDB from '@/lib/connectDb';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    // Verify Cloudinary configuration
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      throw new Error('Cloudinary configuration is missing');
    }

    await connectDB();
    const formData = await req.formData();
    const data = JSON.parse(formData.get('data') as string);
    const thumbnailImage = formData.get('thumbnailImage') as File | null;
    const heroImage = formData.get('hero') as File | null;
    const teamImage = formData.get('team') as File | null;

    // Upload thumbnailImage to Cloudinary if provided
    let thumbnailImageUrl: string | null = null;
    if (thumbnailImage && thumbnailImage.size > 0) {
      const bytes = await thumbnailImage.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: 'projects' }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(buffer);
      });
      thumbnailImageUrl = (result as any).secure_url;
    }

    // Upload hero image to Cloudinary
    let heroImageUrl: string | null = null;
    if (heroImage && heroImage.size > 0) {
      const bytes = await heroImage.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: 'projects' }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(buffer);
      });
      heroImageUrl = (result as any).secure_url;
    }

    // Upload team image to Cloudinary
    let teamImageUrl: string | null = null;
    if (teamImage && teamImage.size > 0) {
      const bytes = await teamImage.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: 'projects' }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(buffer);
      });
      teamImageUrl = (result as any).secure_url;
    }

    const project = new Project({
      type: data.services.projectType, // Map frontend's services.projectType to schema's type
      name: data.name,
      about: data.about,
      services: {
        projectType: data.services.projectType,
        industries: data.services.industries,
      },
      year: data.year,
      team: data.team,
      clientAbout: data.clientAbout,
      quote: {
        text: data.quote.text,
        author: data.quote.author,
        position: data.quote.position,
      },
      projectMotive: data.projectMotive,
      companyDetails: data.companyDetails,
      capabilities: {
        title: data.capabilities.title,
        description: data.capabilities.description,
      },
      technologies: data.technologies,
      images: {
        hero: heroImageUrl,
        team: teamImageUrl,
      },
      thumbnailText: data.thumbnailText,
      thumbnailImage: thumbnailImageUrl,
    });

    await project.save();
    return NextResponse.json({ id: project._id }, { status: 200 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}