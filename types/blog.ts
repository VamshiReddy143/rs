import mongoose from "mongoose";

// types/blog.ts
export interface Blog {
    _id: string;
    title: string;
    author: string;
    primaryImage?: string;
    category: string;
    content: {
      type: "paragraph" | "image" | "code";
      value: string;
      language?: string;
      imageUrls?: string[];
    }[];
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface IBlog {
    _id: mongoose.Types.ObjectId;
    title: string;
    author: string;
    primaryImage?: string;
    category: string;
    content: {
      type: "paragraph" | "image" | "code";
      value: string;
      language?: string;
      imageUrls?: string[];
    }[];
    createdAt: Date;
    updatedAt?: Date;
  }