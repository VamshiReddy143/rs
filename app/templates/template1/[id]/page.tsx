'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface IProject {
  name: string;
  about: string;
  services: {
    projectType: string;
    industries: string[];
  };
  year: string;
  team: string[];
  clientAbout: string;
  quote?: {
    text: string;
    author: string;
    position: string;
  };
  projectMotive: string;
  companyDetails: string[];
  capabilities: {
    title: string;
    description: string;
  };
  technologies: {
    title: string;
    description: string;
  }[];
  images: {
    hero: string;
    team: string;
  };
  thumbnailImage: string | null;
  thumbnailText: string;
}

// Use `context: any` to match the working GET handler
export default function ProjectPage(context: any) {
  const { id } = context.params; // Match `const { id } = context.params`
  const [project, setProject] = useState<IProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/project/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch project');
        }
        const data = await res.json();
        setProject(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load project');
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  if (error || !project) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error || 'Project not found'}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-white mb-6">{project.name}</h1>
      <p className="text-xl text-white mb-6">{project.thumbnailText}</p>
      {project.thumbnailImage && (
        <Image src={project.thumbnailImage} alt={project.thumbnailText} width={600} height={400} className="rounded-lg mb-6" />
      )}
      <p className="text-white mb-4">{project.about}</p>
      <h2 className="text-2xl font-semibold text-white mb-4">Services</h2>
      <p className="text-white">Type: {project.services.projectType}</p>
      <p className="text-white">Industries: {project.services.industries.join(', ')}</p>
      <p className="text-white mt-4">Year: {project.year}</p>
      <p className="text-white">Team: {project.team.join(', ')}</p>
      <p className="text-white mt-4">{project.clientAbout}</p>
      {project.quote && (
        <blockquote className="text-white mt-4">
          <p>"{project.quote.text}"</p>
          <footer>—{project.quote.author}, {project.quote.position}</footer>
        </blockquote>
      )}
      <p className="text-white mt-4">{project.projectMotive}</p>
      <h2 className="text-2xl font-semibold text-white mt-4 mb-2">Company Details</h2>
      <ul className="list-disc pl-5 text-white">
        {project.companyDetails.map((detail, index) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>
      <h2 className="text-2xl font-semibold text-white mt-4 mb-2">Capabilities</h2>
      <p className="text-white">{project.capabilities.title}: {project.capabilities.description}</p>
      <h2 className="text-2xl font-semibold text-white mt-4 mb-2">Technologies</h2>
      {project.technologies.map((tech, index) => (
        <p key={index} className="text-white">{tech.title}: {tech.description}</p>
      ))}
      <Image src={project.images.hero} alt="Hero image" width={600} height={400} className="rounded-lg mt-6" />
      <Image src={project.images.team} alt="Team image" width={600} height={400} className="rounded-lg mt-4" />
    </div>
  );
}