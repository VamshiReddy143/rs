"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

interface TeamMember {
  _id: string;
  image: string;
  testimonial: string;
  name: string;
  role: string;
}

const Clients: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch team members from API
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/team");
        if (!response.ok) throw new Error("Failed to fetch team members");
        const data = await response.json();
        setTeamMembers(data);
        setError(null);
      } catch (err: any) {
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchTeamMembers();
  }, []);

  // Auto-scroll every 3 seconds
  useEffect(() => {
    if (teamMembers.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
      }, 3000);
      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [teamMembers.length]);

  // Handle arrow button clicks
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? teamMembers.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="bg-gray-300 lg:px-[10%] px-2 text-black py-[5%] pb-[7em]">
      {/* Loading or Error State */}
      {loading && <p className="text-center">Loading team members...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}
      {!loading && !error && teamMembers.length === 0 && (
        <p   style={{ fontFamily: "Poppins, sans-serif" }} className="text-center text-2xl font-bold text-gray-600">No team members found.</p>
      )}

      {/* Carousel Container */}
      {!loading && teamMembers.length > 0 && (
        <>
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {teamMembers.map((member) => (
                <div
                  key={member._id}
                  className="w-full flex flex-col lg:flex-row md:flex-col lg:items-center md:items-start justify-center gap-7 min-w-[100%]"
                >
                  <div className="flex items-center justify-between md:ml-10 lg:ml-0">
                    <div className="lg:h-[20em] lg:w-[20em] h-[8em] w-[8em]">
                      <Image
                        src={member.image}
                        width={800}
                        height={800}
                        alt={member.name}
                        className="rounded-full object-cover"
                      />
                    </div>

                    <div className="flex gap-7 mt-10 md:hidden items-center ml-10">
                      <button onClick={handlePrev}>
                        <Image
                          src="/leftarrow.png"
                          width={900}
                          height={900}
                          alt="left arrow"
                          className="h-[4em] w-[4em] border-2 border-gray-400 p-2 cursor-pointer"
                        />
                      </button>
                      <button onClick={handleNext}>
                        <Image
                          src="/rightarrow.png"
                          width={900}
                          height={900}
                          alt="right arrow"
                          className="h-[4em] w-[4em] border-2 border-gray-400 p-2 rotate-180 cursor-pointer"
                        />
                      </button>
                    </div>
                  </div>
                  <div className="md:ml-10 lg:ml-0">
                    <p
                      style={{ fontFamily: "Poppins, sans-serif" }}
                      className="lg:text-[34px] text-[21px] mt-5 lg:mt-0 leading-[32px] font-medium lg:leading-[50px] line-clamp-5"
                    >
                      {member.testimonial}
                    </p>
                    <div className="mt-5">
                      <h2 className="text-[28px] font-medium leading-[34px]">
                        {member.name}
                      </h2>
                      <p className="text-[20px] text-[#6f6f6e]">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow Buttons */}
          <div className="md:flex gap-7 mt-10 hidden items-center ml-10">
            <button onClick={handlePrev}>
              <Image
                src="/leftarrow.png"
                width={900}
                height={900}
                alt="left arrow"
                className="h-[5em] w-[5em] border-1 border-[#6f6f6e] p-2 cursor-pointer"
              />
            </button>
            <button onClick={handleNext}>
              <Image
                src="/rightarrow.png"
                width={900}
                height={900}
                alt="right arrow"
                className="h-[5em] w-[5em] border-1 border-[#6f6f6e] p-2 rotate-180 cursor-pointer"
              />
            </button>
            </div>
          </>
        )}
      </div>
    
  );
};

export default Clients;