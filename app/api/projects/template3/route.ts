import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Template3Project from '@/models/Template3Project';
import connectDB from '@/lib/connectDb';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

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
      console.error('Cloudinary configuration missing');
      return NextResponse.json({ error: 'Cloudinary configuration missing' }, { status: 500 });
    }

    // Connect to database
    await connectDB();

    // Parse formData
    const formData = await req.formData();
    const dataString = formData.get('data') as string | null;
    const thumbnailImage = formData.get('thumbnailImage') as File | null;
    const heroImage = formData.get('hero') as File | null;
    const challengeImage = formData.get('challenge') as File | null;

    // Validate data
    if (!dataString) {
      console.error('Missing data field in formData');
      return NextResponse.json({ error: 'Missing data field' }, { status: 400 });
    }

    let data;
    try {
      data = JSON.parse(dataString);
    } catch (error) {
      console.error('Invalid JSON in data field:', error);
      return NextResponse.json({ error: 'Invalid JSON in data field' }, { status: 400 });
    }

    // Validate required fields
    if (!data.name || !data.type || !data.tagline || !data.clientAbout || !data.thumbnailText) {
      console.error('Missing required fields:', {
        name: !!data.name,
        type: !!data.type,
        tagline: !!data.tagline,
        clientAbout: !!data.clientAbout,
        thumbnailText: !!data.thumbnailText,
      });
      return NextResponse.json(
        { error: 'Missing required fields: name, type, tagline, clientAbout, thumbnailText' },
        { status: 400 }
      );
    }

    // Validate actions and results are arrays of strings
    if (data.actions && !Array.isArray(data.actions)) {
      console.error('Actions must be an array');
      return NextResponse.json({ error: 'Actions must be an array' }, { status: 400 });
    }
    if (data.results && !Array.isArray(data.results)) {
      console.error('Results must be an array');
      return NextResponse.json({ error: 'Results must be an array' }, { status: 400 });
    }

    // Upload thumbnailImage to Cloudinary
    let thumbnailImageUrl: string | null = null;
    if (thumbnailImage && thumbnailImage.size > 0) {
      try {
        const bytes = await thumbnailImage.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'projects', resource_type: 'image' },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          Readable.from(buffer).pipe(stream);
        });
        thumbnailImageUrl = (result as any).secure_url;
      } catch (error) {
        console.error('Error uploading thumbnailImage:', error);
        return NextResponse.json({ error: 'Failed to upload thumbnail image' }, { status: 500 });
      }
    }

    // Upload hero image to Cloudinary
    let heroImageUrl: string | null = null;
    if (heroImage && heroImage.size > 0) {
      try {
        const bytes = await heroImage.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'projects', resource_type: 'image' },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          Readable.from(buffer).pipe(stream);
        });
        heroImageUrl = (result as any).secure_url;
      } catch (error) {
        console.error('Error uploading heroImage:', error);
        return NextResponse.json({ error: 'Failed to upload hero image' }, { status: 500 });
      }
    }

    // Upload challenge image to Cloudinary
    let challengeImageUrl: string | null = null;
    if (challengeImage && challengeImage.size > 0) {
      try {
        const bytes = await challengeImage.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'projects', resource_type: 'image' },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          Readable.from(buffer).pipe(stream);
        });
        challengeImageUrl = (result as any).secure_url;
      } catch (error) {
        console.error('Error uploading challengeImage:', error);
        return NextResponse.json({ error: 'Failed to upload challenge image' }, { status: 500 });
      }
    }

    // Create new Template3Project
    const project = new Template3Project({
      name: data.name,
      type: data.type, // Added
      tagline: data.tagline,
      clientAbout: data.clientAbout,
      thumbnailText: data.thumbnailText,
      thumbnailImage: thumbnailImageUrl,
      images: {
        hero: heroImageUrl,
        challenge: challengeImageUrl,
      },
      quote: data.quote || undefined,
      challenges: data.challenges || [],
      actions: data.actions || [],
      results: data.results || [],
      createdAt: new Date(),
    });

    // Save to MongoDB
    await project.save();
    console.log('Project created successfully:', project._id);
    return NextResponse.json({ id: project._id.toString() }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating Template3Project:', error);
    return NextResponse.json({ error: `Failed to create project: ${error.message}` }, { status: 500 });
  }
}