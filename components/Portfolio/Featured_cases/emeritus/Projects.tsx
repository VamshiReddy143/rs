
"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useEffect, useState } from 'react';

interface Project {
  _id: string;
  title: string;
  thumbnailText: string;
  image: string | null;
  model: 'Project' | 'Template3Project' | 'CustomContent';
  isFeatured: boolean;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(352); // Initial estimate: 20em + gap-8

  // Fetch projects and select up to 5
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
        // Select up to 5 projects (or all if fewer)
        const selectedProjects = uniqueProjects.slice(0, 5);
        setProjects(selectedProjects);
        console.log('Selected Projects:', selectedProjects); // Debug log
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Failed to load projects');
      }
    };
    fetchProjects();
  }, []);

  // Calculate itemWidth dynamically
  useEffect(() => {
    if (scrollRef.current?.firstChild) {
      const firstChild = scrollRef.current.firstChild as HTMLElement;
      const width = firstChild.getBoundingClientRect().width;
      setItemWidth(width);
      console.log('Calculated itemWidth:', width); // Debug log
    }
  }, [projects]);

  // Scroll functions for buttons
  const handlePrev = () => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      if (scrollLeft > 0) {
        scrollRef.current.scrollBy({ left: -itemWidth, behavior: 'smooth' });
      }
    }
  };

  const handleNext = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      if (scrollLeft < scrollWidth - clientWidth) {
        scrollRef.current.scrollBy({ left: itemWidth, behavior: 'smooth' });
      }
    }
  };

  // Log rendered projects
  useEffect(() => {
    if (projects.length > 0) {
      console.log('Rendered Projects:', projects); // Debug log
    }
  }, [projects]);

  return (
    <>
      <style>
        {`
          .image-hover {
            position: relative;
            transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
          }
          .image-hover::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border: 6px solid #ffca28;
            opacity: 0;
            transition: opacity 0.2s ease-in-out;
            border-radius: 0.5rem;
            pointer-events: none;
          }
          .image-hover:hover::after {
            opacity: 1;
          }
          .image-hover:hover {
            transform: scale(1.05);
            opacity: 0.95;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <div style={{ fontFamily: 'Poppins, sans-serif' }} className="bg-white min-h-screen text-black pt-[10em] pb-[10em]">
        <div className="flex items-end justify-between px-3 lg:px-[4em] lg:max-w-[90em] mx-auto">
          <div>
            <h2 className="md:text-[32px] text-[1.5em] lg:leading-[38px]">More</h2>
            <h1 className="md:text-[64px] text-[2.5em] font-semibold lg:leading-[77px]">Projects</h1>
            <div className="h-[2px] w-[60px] bg-black rounded-full mt-2" />
          </div>
          <div className="flex items-center gap-5 lg:pr-[20em]">
            <div
              className="rotate-180 bg-[#ffb90a] md:p-7 p-5 cursor-pointer"
              onClick={handlePrev}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="black"
                className="lg:w-10 lg:h-10 w-6 h-6"
              >
                <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
              </svg>
            </div>
            <div
              className="bg-[#ffb90a] md:p-7 p-5 cursor-pointer"
              onClick={handleNext}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="black"
                className="lg:w-10 lg:h-10 w-6 h-6"
              >
                <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="mt-10 px-3 overflow-hidden max-w-full">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : projects.length === 0 ? (
            <div className="flex justify-center">
              <div className="animate-spin h-8 w-8 border-4 border-t-[#ffb90a] rounded-full"></div>
            </div>
          ) : (
            <div
              ref={scrollRef}
              className="flex gap-8 overflow-x-auto hide-scrollbar py-4 w-full"
              style={{ scrollBehavior: 'smooth' }}
            >
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="min-w-[20em] lg:min-w-[25em] w-[20em] lg:w-[25em] flex-shrink-0"
                >

<Link href={`/projects/${project._id}`}>
                  <div className="relative overflow-hidden rounded-lg">
                    <Image
                      src={project.image || '/placeholder.jpg'}
                      alt={project.title}
                      width={900}
                      height={900}
                      className="h-[30em] w-full object-cover rounded-lg image-hover hover:shadow-lg will-change-transform"
                    />
                  </div>
                  </Link>
                  <h2 className="lg:text-[32px] text-[21px] leading-[25px] font-medium lg:leading-[38px] mt-4">
                    {project.title}
                  </h2>
                  <p className="lg:text-[20px] text-[16px] leading-[24px] lg:leading-[30px] mt-4 font-medium text-[#6F6F6E]">
                    {project.thumbnailText}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Projects;
