import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['AI', 'Data Science', 'Cloud', 'React', 'React Native', 'Node.js', 'Ruby on Rails'],
    required: true,
  },
  name: { type: String, required: true },
  about: { type: String, required: true },
  services: {
    projectType: { type: String, required: true },
    industries: [{ type: String, required: true }],
  },
  year: { type: String, required: true },
  team: [{ type: String, required: true }],
  clientAbout: { type: String, required: true },
  quote: {
    text: { type: String, required: false },
    author: { type: String, required: false },
    position: { type: String, required: false },
  },
  projectMotive: { type: String, required: true },
  companyDetails: [{ type: String, required: true }],
  capabilities: {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  technologies: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],
  images: {
    hero: { type: String, required: true },
    team: { type: String, required: true },
  },
  thumbnailText: { type: String, required: true },
  thumbnailImage: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  isFeatured: { type: Boolean, default: false },
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);