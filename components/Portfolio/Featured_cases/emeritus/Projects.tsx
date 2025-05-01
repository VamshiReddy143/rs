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
  const [itemWidth, setItemWidth] = useState(352);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects/allprojects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data: Project[] = await response.json();
        const uniqueProjects = Array.from(
          new Map(data.map((p) => [p._id, p])).values()
        );
        const selectedProjects = uniqueProjects.slice(0, 7);
        setProjects(selectedProjects);
        console.log('Selected Projects:', selectedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Failed to load projects');
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (scrollRef.current?.firstChild) {
      const firstChild = scrollRef.current.firstChild as HTMLElement;
      const width = firstChild.getBoundingClientRect().width;
      setItemWidth(width);
      console.log('Calculated itemWidth:', width);
    }
  }, [projects]);

  const handlePrev = () => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      if (scrollLeft <= 0) {
        scrollRef.current.scrollTo({
          left: scrollRef.current.scrollWidth,
          behavior: 'smooth',
        });
      } else {
        scrollRef.current.scrollBy({ left: -itemWidth, behavior: 'smooth' });
      }
    }
  };

  const handleNext = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 1) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: itemWidth, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    if (projects.length > 0) {
      console.log('Rendered Projects:', projects);
    }
  }, [projects]);

  return (
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
                className="min-w-[20em] lg:min-w-[25em] w-[20em] lg:w-[25em] flex-shrink-0 group"
              >
                <Link href={`/projects/${project._id}`}>
                  <div
                    className="relative w-full h-[30em] lg:h-[30em] overflow-hidden bg-transparent group-hover:outline group-hover:outline-5 group-hover:outline-[#FDD017] "
                  >
                    <Image
                      src={project.image || '/placeholder.jpg'}
                      alt={project.title}
                      width={900}
                      height={900}
                      className="h-[30em] w-full object-cover  transition-all duration-300 group-hover:scale-110"
                      quality={100}
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
  );
};

export default Projects;