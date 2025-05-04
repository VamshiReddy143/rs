import mongoose, { Schema, Document } from "mongoose";

interface IReview extends Document {
  text: string;
  name: string;
  position: string;
  userId: string;
  image?: string;
  stars: number; // Add stars field
  createdAt: Date;
}

const ReviewSchema: Schema = new Schema({
  text: { type: String, required: true, maxlength: 500 },
  name: { type: String, required: true },
  position: { type: String, required: true },
  userId: { type: String, required: true },
  image: { type: String },
  stars: { type: Number, required: true, min: 1, max: 5 }, // Required, 1–5
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);