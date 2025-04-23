import mongoose, { Schema, Document } from "mongoose";

interface ITeam extends Document {
  image: string;
  testimonial: string;
  name: string;
  role: string;
}

const TeamSchema: Schema = new Schema({
  image: { type: String, required: true },
  testimonial: { type: String, required: true, maxlength: 500 },
  name: { type: String, required: true },
  role: { type: String, required: true },
});

export default mongoose.models.Team || mongoose.model<ITeam>("Team", TeamSchema);