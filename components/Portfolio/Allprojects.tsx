
"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Project {
  _id: string;
  title: string;
  thumbnailText: string;
  image: string | null;
  model: 'Project' | 'Template3Project' | 'CustomContent';
  isFeatured: boolean;
  createdAt?: string; // Optional, for sorting
}

const Allprojects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'most-recent' | 'oldest'>('most-recent');

  // Fetch all projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects/allprojects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data: Project[] = await response.json();
        // Remove duplicates by _id
        const uniqueProjects = Array.from(
          new Map(data.map((p) => [p._id, p])).values()
        );
        setProjects(uniqueProjects);
        console.log('Fetched Projects:', uniqueProjects); // Debug log
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Failed to load projects');
      }
    };
    fetchProjects();
  }, []);

  // Sort projects based on sortBy
  const sortedProjects = React.useMemo(() => {
    const sorted = [...projects];
    sorted.sort((a, b) => {
      // Use createdAt if available, else _id for MongoDB order
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : new Date(parseInt(a._id.substring(0, 8), 16) * 1000).getTime();
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : new Date(parseInt(b._id.substring(0, 8), 16) * 1000).getTime();
      return sortBy === 'most-recent' ? dateB - dateA : dateA - dateB;
    });
    // Add padding dynamically to match original pattern
    return sorted.map((project, index) => {
      const colIndex = index % 3; // 0, 1, 2 for each row
      let padding = '';
      if (colIndex === 1) {
        padding = 'md:pt-[4em] lg:pt-[7em]'; // Second column
      } else if (colIndex === 2) {
        padding = 'md:pt-[1em] lg:pt-[4em]'; // Third column
      }
      return { ...project, padding };
    });
  }, [projects, sortBy]);

  // Handle sort change
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value as 'most-recent' | 'oldest');
  };

  return (
    <div className="bg-gray-100 text-black lg:py-[10em] py-[5em] mt-[5em]">
      <div className="flex justify-between px-3 lg:px-[4em] lg:max-w-[90em] mx-auto">
        <h1
          style={{ fontFamily: 'Poppins, sans-serif' }}
          className="lg:text-[64px] text-[42px] leading-[50px] font-medium"
        >
          All Projects
        </h1>
        <div className="md:flex gap-3 items-center md:mt-[10em] mt-[5em]">
          <p
            style={{ fontFamily: 'Poppins, sans-serif' }}
            className="text-[16px] font-normal"
          >
            Sort by
          </p>
          <select
            style={{ fontFamily: 'Poppins, sans-serif' }}
            value={sortBy}
            onChange={handleSortChange}
            className="border border-gray-400 p-1 font-normal mt-3 lg:mt-0 text-[14px] focus:border-none focus:outline-1 focus:outline-[#FFDF00]"
          >
            <option value="most-recent">Most recent</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-[3em] mt-[1em] px-3 lg:px-[4em] lg:max-w-[90em] mx-auto">
        {error ? (
          <p className="text-red-500 col-span-3">Failed to load projects</p>
        ) : projects.length === 0 ? (
          <div className="flex justify-center col-span-3">
            <div className="animate-spin h-8 w-8 border-4 border-t-[#FFDF00] rounded-full"></div>
          </div>
        ) : (
          sortedProjects.map((project) => (
            <div
              key={project._id}
              className={`group flex flex-col gap-3 ${project.padding}`}
            >

<Link href={`/projects/${project._id}`}>
              <div className="relative w-full lg:h-[32em] h-[25em] overflow-hidden bg-transparent group-hover:outline group-hover:outline-5 group-hover:outline-[#FFDF00]">
                <Image
                  src={project.image || '/placeholder.jpg'}
                  fill
                  alt={project.title}
                  className="object-cover transition-all duration-300 group-hover:scale-110"
                />
              </div>
              </Link>
              <h1
                style={{ fontFamily: 'Poppins, sans-serif' }}
                className="lg:text-[32px] text-[2em] font-medium"
              >
                {project.title}
              </h1>
              <p className="lg:text-[20px] font-normal md:text-[1em] text-[1.3em] text-[#6f6f6e]">
                {project.thumbnailText}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Allprojects;
