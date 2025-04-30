'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface ITemplate3Project {
  name: string;
  tagline: string;
  clientAbout: string;
  quote: {
    text: string;
    author: string;
    position: string;
  };
  challenges: string[];
  actions: string;
  results: string;
  images: {
    hero: string;
    challenge: string;
  };
  thumbnailImage: string | null;
  thumbnailText: string;
}

// Use `context: any` to match the working GET handler
export default function Template3ProjectPage(context: any) {
  const { id } = context.params; // Match `const { id } = context.params`
  const [project, setProject] = useState<ITemplate3Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/template3project/${id}`);
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
      <p className="text-white mb-4">{project.tagline}</p>
      <p className="text-white mb-4">{project.clientAbout}</p>
      <blockquote className="text-white mb-4">
        <p>"{project.quote.text}"</p>
        <footer>—{project.quote.author}, {project.quote.position}</footer>
      </blockquote>
      <h2 className="text-2xl font-semibold text-white mb-2">Challenges</h2>
      <ul className="list-disc pl-5 text-white mb-4">
        {project.challenges.map((challenge, index) => (
          <li key={index}>{challenge}</li>
        ))}
      </ul>
      <p className="text-white mb-4">{project.actions}</p>
      <p className="text-white mb-4">{project.results}</p>
      <Image src={project.images.hero} alt="Hero image" width={600} height={400} className="rounded-lg mb-4" />
      <Image src={project.images.challenge} alt="Challenge image" width={600} height={400} className="rounded-lg" />
    </div>
  );
}