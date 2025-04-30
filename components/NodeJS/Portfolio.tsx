'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Interface for project data
interface Project {
  _id: string;
  title: string;
  thumbnailText: string;
  image: string | null;
  model: 'CustomContent';
  isFeatured: boolean;
}

const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch recent AI projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects/recent-ds?type=Node.js&limit=3');
        if (!res.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data: Project[] = await res.json();
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
        // Fallback to placeholder data
        setProjects([
          {
            _id: '1',
            title: 'Guiding Parents in Child Development with AI',
            thumbnailText:
              'AI-assisted parenting platform for child development in areas like emotional well-being, motor skills, and intelligence.',
            image: '/aiimg1.jpg',
            model: 'CustomContent',
            isFeatured: false,
          },
          {
            _id: '2',
            title: 'Teaching Children How to Code with AI',
            thumbnailText: 'AI-driven, gamified learning platform and mobile app for parents and their kids.',
            image: '/aiimg2.jpg',
            model: 'CustomContent',
            isFeatured: false,
          },
          {
            _id: '3',
            title: 'Generating 3D Home Renovations with AI',
            thumbnailText:
              'AI-powered 3D renderings and augmented reality of home renovation options to assist homeowners and builders.',
            image: '/aiimg3.jpg',
            model: 'CustomContent',
            isFeatured: false,
          },
        ]);
      }
    };
    fetchProjects();
  }, []);

  // Company names/logos for each card (static, as not provided by API)
  const companyInfo = [
    { name: 'Universal Innovations', logo: null },
    { name: 'Egg', logo: '/egglogo.svg' },
    { name: 'Bildsy', logo: null },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-6 lg:pt-[8em] pt-[7em]">
      <h1
        style={{ fontFamily: 'Poppins, sans-serif' }}
        className="lg:text-[2.4em] leading-[43px] text-[36px] font-bold text-center"
      >
        Our Portfolio: Artificial Intelligence & Machine Learning
      </h1>
      <p className="text-[#bcbcc0] text-center leading-[32px]">
        We have partnered with some of the world‘s fastest-growing startups and most innovative corporations.
      </p>

      {error && (
        <p className="text-red-400 text-center">{error}</p>
      )}

<div className="w-full px-4">
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:mt-10 mt-5 w-full">
    {projects.slice(0, 3).map((project, index) => (
      <div key={project._id} className="w-full">
        <div
          className="h-[500px] w-full group gap-[0.5em] rounded-[1.5em] relative flex justify-end flex-col p-[1.5em] z-[1] overflow-hidden"
          style={{
            backgroundImage: `url(${project.image || `/aiimg${index + 1}.jpg`})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Black overlay layer */}
          <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-75 transition-opacity duration-500 z-[1]"></div>

          <div className="container text-white z-[2] relative flex flex-col gap-[0.5em]">
            <div className="h-fit w-full">
              <p className="text-[24px] font-semibold font-[Poppins]">
                {project.title}
              </p>
            </div>
          </div>

          <div className="absolute top-10 left-9 z-[2]">
            {companyInfo[index].logo ? (
              <Image
                src={companyInfo[index].logo}
                alt={companyInfo[index].name}
                width={68}
                height={68}
                className="h-17 w-17"
              />
            ) : (
              <h2 className="font-bold text-white text-[24px]">{companyInfo[index].name}</h2>
            )}
          </div>

          <div className="absolute bottom-0 left-0 w-full h-[3em] bg-gradient-to-t from-black via-black/70 to-transparent z-10" />
          <div className="relative overflow-hidden h-[0em] group-hover:h-[9em] transition-all duration-500 z-[2]">
            <p className="text-[#bcbcc0] font-light leading-[1.2em]">
              {project.thumbnailText}
            </p>


            <Link href={`/projects/${project._id}`}>
            <div className="flex justify-center items-center mt-5">
              <button className="text-[16px] font-semibold bg-[#f6ff7a] text-black px-2 py-3 w-full flex items-center justify-center rounded-lg cursor-pointer transition-colors duration-300 hover:bg-[#AAB418]">
                Learn More
              </button>
            </div>
            </Link>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

      <Link href="/Contact">
        <div>
          <button className="text-[16px] bg-transparent border text-white px-3 py-2 rounded-lg cursor-pointer hover:bg-white/10 hover:border-white/10 hover:text-white/70 transition-colors mt-6">
            Get in Touch ➔
          </button>
        </div>
      </Link>
    </div>
  );
};

export default Portfolio;