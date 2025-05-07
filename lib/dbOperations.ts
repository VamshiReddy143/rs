import  connectToMongoDB from "@/lib/connectDb";
import ProjectModel from "@/models/Project";

export async function createProject(projectData: any) {
  await connectToMongoDB();
  const project = new ProjectModel(projectData);
  return await project.save();
}

export async function getProjects() {
  await connectToMongoDB();
  return await ProjectModel.find({}).exec();
}

export async function getProjectById(id: string) {
  await connectToMongoDB();
  return await ProjectModel.findById(id).exec();
}