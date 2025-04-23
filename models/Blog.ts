import mongoose, { Schema, Document } from "mongoose";

interface IContent {
  type: "heading" | "paragraph" | "image" | "code";
  value: string;
  language?: string;
}

interface IBlog extends Document {
  title: string;
  category: string;
  author: string;
  primaryImage?: string;
  content: IContent[];
}

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true },
    primaryImage: { type: String, required: false },
    content: [
      {
        type: { type: String, enum: ["heading", "paragraph", "image", "code"], required: true },
        value: { type: String, required: true },
        language: { type: String, required: false },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);