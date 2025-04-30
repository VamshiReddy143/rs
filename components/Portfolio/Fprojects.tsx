'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

interface UnifiedProject {
  _id: string;
  title: string;
  thumbnailText: string;
  image?: string | null;
  model: 'Project' | 'Template3Project' | 'CustomContent';
  isFeatured: boolean;
}

const Fprojects = () => {
  const [projects, setProjects] = useState<UnifiedProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const res = await fetch('/api/projects/feature');
        if (!res.ok) {
          console.error(`Fetch failed with status: ${res.status} ${res.statusText}`);
          throw new Error('Failed to fetch featured projects');
        }
        const data = await res.json();
        console.log('Fetched projects:', data);
        setProjects(data);
      } catch (error) {
        console.error('Error fetching featured projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedProjects();
  }, []);

  return (
    <div className="flex flex-col items-start pt-[7em] lg:pt-[0em] justify-center pb-10">
      <div className="flex flex-col gap-1 leading-snug">
        <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className="lg:text-[32px] text-[21px] font-medium">
          Featured
        </h1>
        <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className="lg:text-[64px] text-[42px] font-medium">
          Projects
        </h1>
        <div className="bg-white w-[70px] h-[4px] mt-5" />
      </div>

      <div className="mt-10">
        {loading ? (
          <p style={{ fontFamily: 'Poppins, sans-serif' }} className="text-gray-400">
            Loading featured projects...
          </p>
        ) : projects.length === 0 ? (
          <p style={{ fontFamily: 'Poppins, sans-serif' }} className="text-gray-400">
            No featured projects found.
          </p>
        ) : (
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
            {projects.map((project, index) => (
              <Link key={project._id} href={`/projects/${project._id}`}>
                <div className={`group ${index === 1 || index === 3 ? 'pt-10' : ''}`}>
            

                <div
  className={`relative w-full ${
    index === 0
      ? 'lg:h-[40em] h-[30em]'
      : index === 2
      ? ''
      : ''
  } overflow-hidden bg-transparent group-hover:outline group-hover:outline-5 group-hover:outline-[#FDD017]`}
>
<Image
  src={project.image || '/default-project-image.png'}
  alt={project.title}
  width={700}
  height={400}
  className="object-cover lg:h-[40em] h-[30em] transition-all duration-300 group-hover:scale-110"

  quality={100}
  priority={index === 0 || index === 1}
/>

</div>

                  <h1
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                    className={`text-[32px] ${index === 3 ? 'font-bold' : 'font-medium'} mt-4`}
                  >
                    {project.title}
                  </h1>
                  <p
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                    className="lg:text-[20px] text-[16px] leading-[26px]"
                  >
                    {project.thumbnailText}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Fprojects;