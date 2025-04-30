import mongoose, { Schema } from 'mongoose';

interface ITemplate3Project {
  name: string;
  type: string; // Added
  tagline: string;
  clientAbout: string;
  quote: {
    text: string;
    author: string;
    position: string;
  };
  challenges: string[];
  actions: string[];
  results: string[];
  images: {
    hero: string;
    challenge: string;
  };
  thumbnailImage: string;
  thumbnailText: string;
  createdAt: Date;
  isFeatured: boolean;
}

const Template3ProjectSchema = new Schema<ITemplate3Project>({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ['AI', 'Data Science', 'Cloud', 'React', 'React Native', 'Node.js', 'Ruby on Rails'],
    required: true,
  }, // Added with enum
  tagline: { type: String, required: true },
  clientAbout: { type: String, required: true },
  quote: {
    text: { type: String, required: false },
    author: { type: String, required: false },
    position: { type: String, required: false },
  },
  challenges: [{ type: String, required: false }],
  actions: [{ type: String, required: false }],
  results: [{ type: String, required: false }],
  images: {
    hero: { type: String, required: false },
    challenge: { type: String, required: false },
  },
  thumbnailImage: { type: String, required: false },
  thumbnailText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isFeatured: { type: Boolean, default: false },
});

export default mongoose.models.Template3Project || mongoose.model<ITemplate3Project>('Template3Project', Template3ProjectSchema);