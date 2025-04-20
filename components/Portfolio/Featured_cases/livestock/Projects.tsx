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
      description: "Building revenue streams for leading online pet food startup",
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
            border-radius: 0.5rem; /* Match rounded-lg */
            pointer-events: none;
          }
          .image-hover:hover::after {
            opacity: 1;
          }
          .image-hover:hover {
            transform: scale(1.05);
            opacity: 0.95; /* Slight fade for emphasis */
          }
          .hide-scrollbar {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
          }
        `}
      </style>
      <div style={{ fontFamily: 'Poppins, sans-serif' }} className="bg-gray-200 min-h-screen text-black pt-[10em] pb-[10em]">
        {/* Header Section */}
        <div className="flex items-end justify-between px-3 lg:px-[4em] lg:max-w-[90em] mx-auto">
          <div>
            <h2 className="md:text-[32px] text-[1.5em] leading-[38px]">More</h2>
            <h1 className="md:text-[64px] text-[2.5em] font-semibold leading-[77px]">Projects</h1>
            <div className="h-[2px] w-[60px] bg-black rounded-full mt-2" />
          </div>

          <div className="flex items-center gap-5 lg:pr-[20em]">
            {/* Previous Arrow */}
            <div
              className="rotate-180 bg-[#ffb90a] md:p-7 p-5 cursor-pointer"
              onClick={handlePrev}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="black"
                className="w-15 h-15"
              >
                <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
              </svg>
            </div>

            {/* Next Arrow */}
            <div
              className="bg-[#ffb90a] md:p-7 p-5 cursor-pointer"
              onClick={handleNext}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="black"
                className="w-15 h-15"
              >
                <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Project Display Section */}
        <div className="mt-10 px-3 overflow-hidden max-w-full">
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto hide-scrollbar py-4 w-full"
            style={{ scrollBehavior: 'smooth' }}
          >
            {projects.map((project) => (
              <div key={project.id} className="min-w-[20em] lg:min-w-[25em] w-[20em] lg:w-[25em] flex-shrink-0">
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={900}
                    height={900}
                    className="h-[30em] w-full object-cover rounded-lg image-hover hover:shadow-lg will-change-transform"
                  />
                </div>
                <h2 className="text-[32px] font-medium leading-[38px] mt-4">{project.title}</h2>
                <p className="text-[20px] leading-[30px] font-medium text-[#6F6F6E]">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;