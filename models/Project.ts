import mongoose, { Schema, Document } from 'mongoose';

interface IProject extends Document {
  templateId: string;
  data: { [key: string]: string };
  animation: string;
  createdAt: Date;
}

const ProjectSchema: Schema = new Schema({
  templateId: { type: String, required: true },
  data: { type: Schema.Types.Mixed, required: true }, // Store dynamic fields (e.g., title, image URL)
  animation: { type: String, required: true }, // Store selected animation
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);