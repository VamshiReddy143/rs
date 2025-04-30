// app/custom/[id]/page.tsx
import { notFound } from 'next/navigation';
import mongoose from 'mongoose';
import connectMongoDB from '@/lib/connectDb';
import CustomContent from '@/models/CustomContent';
import CustomTemplateOriginal from '@/components/templates/CustomTemplate';
import { ComponentType } from 'react';

// Define types locally to match CustomContent schema and CustomTemplate
interface ContentBlock {
  type: 'heading' | 'paragraph' | 'bullet' | 'image' | 'video';
  content: string;
  order: number;
}

interface ICustomContent {
  _id: string;
  title: string;
  type: 'AI' | 'Data Science' | 'Cloud' | 'React' | 'React Native' | 'Node.js' | 'Ruby on Rails';
  thumbnailText: string;
  thumbnailImage?: string; // Match schema and CustomTemplate
  content: ContentBlock[]; // Match CustomTemplate's content
  createdAt: Date;
  isFeatured: boolean;
}

// Match MongoDB document shape
interface CustomContentDocument {
  _id: mongoose.Types.ObjectId;
  title: string;
  type: 'AI' | 'Data Science' | 'Cloud' | 'React' | 'React Native' | 'Node.js' | 'Ruby on Rails';
  thumbnailText: string;
  thumbnailImage?: string;
  contentBlocks: ContentBlock[];
  createdAt: Date;
  isFeatured: boolean;
}

// Explicitly type CustomTemplate to avoid import conflict
interface CustomTemplateProps {
  content: ICustomContent;
}

// Safer type assertion to enforce correct props
const CustomTemplate = CustomTemplateOriginal as unknown as ComponentType<CustomTemplateProps>;

export default async function CustomTemplatePage(context: any) {
  const { id } = context.params;

  try {
    await connectMongoDB();
    const content = await CustomContent.findById(id).lean() as CustomContentDocument | null;

    if (!content) {
      notFound();
    }

    const plainContent: ICustomContent = {
      _id: content._id.toString(),
      title: content.title,
      type: content.type,
      thumbnailText: content.thumbnailText,
      thumbnailImage: content.thumbnailImage, // string | undefined
      content: (content.contentBlocks || []).map((block, index) => ({
        type: block.type,
        content: block.content,
        order: block.order ?? index,
      })),
      createdAt: content.createdAt,
      isFeatured: content.isFeatured,
    };

    return <CustomTemplate content={plainContent} />;
  } catch (error) {
    console.error('Error fetching custom content:', error);
    notFound();
  }
}