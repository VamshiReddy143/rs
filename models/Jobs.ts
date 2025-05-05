import mongoose, { Schema } from "mongoose";

const JobSchema = new Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  employmentType: {
    type: String,
    required: true,
    enum: ["Full-Time", "Part-Time", "Contract", "Internship"],
  },
  department: {
    type: String,
    required: true,
    enum: [
      "Design",
      "DevOps",
      "Engineering Team",
      "Operations",
      "Other",
      "People Team",
      "Product",
      "QA",
    ],
  },
  postedDate: { type: Date, default: Date.now },
});

export const Job = mongoose.models.Job || mongoose.model("Job", JobSchema);