import mongoose, { Schema } from 'mongoose';
import { ICustomContent } from '@/types';

const ContentBlockSchema = new Schema({
  type: {
    type: String,
    enum: ['heading', 'paragraph', 'bullet', 'image', 'video'],
    required: true,
  },
  content: { type: String, required: true },
  order: { type: Number, required: true },
});

const CustomContentSchema = new Schema<ICustomContent>({
  title: { type: String, required: true },
  contentBlocks: [ContentBlockSchema],
  thumbnailImage: { type: String, required: false },
  thumbnailText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isFeatured: { type: Boolean, default: false },
});

export default mongoose.models.CustomContent || mongoose.model<ICustomContent>('CustomContent', CustomContentSchema);