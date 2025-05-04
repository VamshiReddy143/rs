import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/lib/connectDb';
import CustomContent from '@/models/CustomContent';
import { v2 as cloudinary } from 'cloudinary';

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

    await connectMongoDB();
    const formData = await req.formData();
    const dataString = formData.get('data') as string | null;
    const files = Array.from(formData.entries()).filter(([key]) => key.startsWith('file-'));
    const thumbnailFile = formData.get('thumbnailImage') as File | null;

    // Log raw FormData for debugging
    console.log('Raw FormData:', {
      data: dataString,
      files: files.map(([key, file]) => ({ key, name: (file as File).name })),
      thumbnail: thumbnailFile ? thumbnailFile.name : null,
    });

    // Validate data
    if (!dataString) {
      console.error('Missing data field in formData');
      return NextResponse.json({ error: 'Missing data field' }, { status: 400 });
    }

    let data: any;
    try {
      data = JSON.parse(dataString);
      console.log('Parsed data.contentBlocks:', JSON.stringify(data.contentBlocks, null, 2));
    } catch (error) {
      console.error('Invalid JSON in data field:', error);
      return NextResponse.json({ error: 'Invalid JSON in data field' }, { status: 400 });
    }

    // Validate required fields
    if (!data.title || !data.type || !data.thumbnailText || !data.contentBlocks) {
      console.error('Missing required fields:', {
        title: !!data.title,
        type: !!data.type,
        thumbnailText: !!data.thumbnailText,
        contentBlocks: !!data.contentBlocks,
      });
      return NextResponse.json(
        { error: 'Missing required fields: title, type, thumbnailText, contentBlocks' },
        { status: 400 }
      );
    }

    // Validate contentBlocks
    if (!Array.isArray(data.contentBlocks) || data.contentBlocks.length === 0) {
      console.error('contentBlocks must be a non-empty array');
      return NextResponse.json({ error: 'contentBlocks must be a non-empty array' }, { status: 400 });
    }

    // Upload thumbnail image
    let thumbnailImageUrl: string | null = null;
    if (thumbnailFile && thumbnailFile.size > 0) {
      const arrayBuffer = await thumbnailFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: 'image', folder: 'projects' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(buffer);
      });
      thumbnailImageUrl = (uploadResult as any).secure_url;
      console.log('Thumbnail uploaded:', thumbnailImageUrl);
    }

    // Process content blocks
    const contentBlocks = await Promise.all(
      data.contentBlocks.map(async (block: any, index: number) => {
        // Log block for debugging
        console.log(`Processing block at index ${index}:`, {
          type: block.type,
          content: block.content,
          order: block.order,
          subtype: block.subtype,
        });

        // Validate block
        if (!block.type || !block.content || block.order == null) {
          console.error(`Invalid block at index ${index}:`, {
            type: block.type,
            content: block.content,
            order: block.order,
            subtype: block.subtype,
          });
          throw new Error(`Invalid block at index ${index}: missing type, content, or order`);
        }

        // Transform type and subtype to match CustomContentSchema
        const blockType =
          block.type === 'text' && block.subtype ? block.subtype : block.type;
        if (!['heading', 'paragraph', 'bullet', 'image', 'video'].includes(blockType)) {
          throw new Error(`Invalid block type at index ${index}: ${blockType}`);
        }

        let content = block.content;
        if (blockType === 'image' || blockType === 'video') {
          const fileEntry = files.find(([key]) => key === `file-${index}`);
          if (!fileEntry) {
            console.error(`Missing file for ${blockType} block at index ${index}`);
            throw new Error(`Missing file for ${blockType} block at index ${index}`);
          }
          const file = fileEntry[1] as File;
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { resource_type: blockType === 'video' ? 'video' : 'image', folder: 'projects' },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            );
            stream.end(buffer);
          });

          content = (uploadResult as any).secure_url;
          console.log(`${blockType} uploaded at index ${index}:`, content);
        }

        return {
          type: blockType,
          content,
          order: block.order,
        };
      })
    );

    // Log contentBlocks for debugging
    console.log('Processed contentBlocks:', contentBlocks);

    // Create new CustomContent document
    const project = await CustomContent.create({
      title: data.title,
      type: data.type,
      thumbnailText: data.thumbnailText,
      thumbnailImage: thumbnailImageUrl,
      contentBlocks,
      createdAt: new Date(),
    });

    console.log('Project created successfully:', project._id);
    return NextResponse.json({ id: project._id.toString() }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: `Failed to create project: ${error.message}` }, { status: 500 });
  }
}