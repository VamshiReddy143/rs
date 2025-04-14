"use client";

import Image from 'next/image';
import React, { useRef } from 'react';

const Projects = () => {
  // Sample project data
  const projects = [
    {
      id: 1,
      image: "/pr1.jpg",
      title: "One Door",
      description: "Developing a cloud platform that unlocked $20M in venture financing",
    },
    {
      id: 2,
      image: "/pr22.jpg",
      title: "Globalization Partners",
      description: "Helping Globalization Partners automate manual processes and achieve a 95% client satisfaction rate with custom software",
    },
    {
      id: 3,
      image: "/pr33.jpg",
      title: "Medical Records Machine Learning",
      description: "Using AI to build a scalable & isolated architecture for preprocessing medical records",
    },
    {
      id: 4,
      image: "/pr44.jpg",
      title: "Avanti",
      description: "Increasing online retail sales via AI",
    },
    {
      id: 5,
      image: "/pr55.jpg",
      title: "Eye Level Learning & Rootstrap",
      description: "Rootstrap Improved Tutoring App Functionality and User Experience",
    },
    {
      id: 6,
      image: "/pr66.jpg",
      title: "The Farmer’s Dog",
      description: " Building revenue streams for leading online pet food startup",
    },
  ];

  // Reference to the scrollable container, typed as HTMLDivElement
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll functions
  const handlePrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white min-h-screen text-black pt-[10em] pb-[10em]">
      {/* Header Section */}
      <div className="flex items-end justify-between px-3 lg:px-[4em] lg:max-w-[90em] mx-auto">
        <div>
          <h2 className="md:text-[2em] text-[1.5em]">More</h2>
          <h1 className="md:text-[3.6em] text-[2.5em] font-semibold">Projects</h1>
          <div className="h-[3px] w-[60px] bg-black rounded-full mt-2" />
        </div>

        <div className="flex items-center gap-5">
          {/* Previous Arrow */}
          <div
            className="rotate-180 bg-[#ffb90a] md:p-7 p-5 cursor-pointer"
            onClick={handlePrev}
          >
            ➤
          </div>

          {/* Next Arrow */}
          <div
            className="bg-[#ffb90a] md:p-7 p-5 cursor-pointer"
            onClick={handleNext}
          >
            ➤
          </div>
        </div>
      </div>

      {/* Project Display Section */}
      <div className="mt-10 px-3 overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto scrollbar-hide py-4"
          style={{ scrollBehavior: 'smooth' }}
        >
          {projects.map((project) => (
            <div key={project.id} className="min-w-[25em] lg:w-[25em] w-[20em] flex-shrink-0">
              <Image
                src={project.image}
                alt={project.title}
                width={900}
                height={900}
                className="h-[30em] lg:w-full w-[25em] object-cover rounded-lg"
              />
              <h2 className="text-[2em] mt-4">{project.title}</h2>
              <p className="text-[1.5em] text-gray-600">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;