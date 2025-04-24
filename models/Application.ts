import mongoose, { Schema } from "mongoose";

const ApplicationSchema = new Schema({
  jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  resume: { type: String, required: true }, // URL or text
  linkedIn: { type: String },
  website: { type: String },
  country: { type: String, required: true },
  knewRootstrap: { type: String, required: true, enum: ["Yes", "No"] },
  heardFrom: { type: String },
  heardFromDetails: { type: String },
  submittedAt: { type: Date, default: Date.now },
});

export const Application = mongoose.models.Application || mongoose.model("Application", ApplicationSchema);