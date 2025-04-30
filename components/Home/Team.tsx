'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import placeholder from '@/public/ph.jpg';

interface Project {
  _id: string;
  name: string;
  thumbnailText: string;
  thumbnailImage: string | null;
  type: 'project' | 'template3project' | 'custom';
}

const Team: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects/recent-all');
        if (!res.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await res.json();
        setProjects(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load projects');
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading projects...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  if (projects.length === 0) {
    return <div className="min-h-screen flex items-center justify-center text-white">No projects available</div>;
  }

  return (
    <div id="team" className="min-h-screen mt-30">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className="lg:text-[48px] text-[48px] font-semibold leading-tight">
          The Team Behind The Products You Know
        </h1>
        <p className="text-[21px] text-[#bcbcc0]">
          We have partnered with 10+ billion-dollar companies on their flagship products.
        </p>
      </div>

      {projects.length >= 1 && (
        <div className="mt-5 lg:flex gap-5">
          {projects[0] && (
            <div className="relative lg:w-[70%] w-full rounded-xl overflow-hidden group">
              <Link href={`/projects/${projects[0]._id}`}>
                <Image
                  src={projects[0].thumbnailImage || placeholder}
                  alt={projects[0].thumbnailText}
                  width={900}
                  height={900}
                  className="lg:h-[40em] h-[20em] w-full object-cover transform rounded-xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 w-full h-[4em] bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
                <h1 className="absolute bottom-5 left-0 z-20 pl-8 w-[70%] md:w-full lg:text-[24px] text-[20px] lg:pl-7 lg:pr-[6em] text-left font-semibold text-white">
                  {projects[0].thumbnailText}
                </h1>
              </Link>
            </div>
          )}

          {projects[1] && (
            <div className="relative lg:w-[35%] rounded-xl overflow-hidden group">
              <Link href={`/projects/${projects[1]._id}`}>
                <Image
                  src={projects[1].thumbnailImage || placeholder}
                  alt={projects[1].thumbnailText}
                  width={900}
                  height={900}
                  className="lg:h-[40em] h-[20em] w-full object-cover transform rounded-xl  transition-transform duration-500 group-hover:rounded-xl group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 w-full h-[4em] bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
                <h1 className="absolute bottom-0 left-0 z-20 pl-8 w-[70%] md:w-full lg:text-[24px] text-[1.2em] lg:pl-7 lg:pb-10 text-left font-semibold text-white">
                  {projects[1].thumbnailText}
                </h1>
              </Link>
            </div>
          )}
        </div>
      )}

      {projects.length >= 3 && (
        <div className="lg:flex justify-center rounded-xl gap-5 text-center">
          <div className="flex flex-col lg:gap-6 gap-5 lg:w-[35%] mx-auto lg:mt-5 mt-5 relative">
            {projects[2] && (
              <div className="relative overflow-hidden rounded-xl group">
                <Link href={`/projects/${projects[2]._id}`}>
                  <Image
                    src={projects[2].thumbnailImage || placeholder}
                    alt={projects[2].thumbnailText}
                    width={900}
                    height={900}
                    className="w-full h-auto object-cover rounded-lg transform transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 w-full h-[4em] bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
                  <h1 className="absolute bottom-5 left-0 z-20 pl-8 w-[75%] md:w-full lg:text-[24px] text-[1.2em] lg:pl-7 text-left font-semibold text-white">
                    {projects[2].thumbnailText}
                  </h1>
                </Link>
              </div>
            )}

            {projects[3] && (
              <div className="relative overflow-hidden rounded-xl group">
                <Link href={`/projects/${projects[3]._id}`}>
                  <Image
                    src={projects[3].thumbnailImage || placeholder}
                    alt={projects[3].thumbnailText}
                    width={900}
                    height={900}
                    className="w-full h-auto object-cover rounded-lg transform transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 w-full h-[4em] bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
                  <h1 className="absolute bottom-5 left-0 z-20 pl-8 w-[75%] md:w-full lg:text-[24px] text-[1.2em] lg:pl-7 text-left font-semibold text-white">
                    {projects[3].thumbnailText}
                  </h1>
                </Link>
              </div>
            )}
          </div>

          {projects[4] && (
            <div className="relative lg:w-[70%] aspect-[2/2] lg:aspect-[3/2] mt-5 overflow-hidden rounded-xl group">
              <Link href={`/projects/${projects[4]._id}`}>
                <Image
                  src={projects[4].thumbnailImage || placeholder}
                  alt={projects[4].thumbnailText}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 w-full h-[4em] bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
                <h1 className="absolute bottom-5 left-0 z-20 pl-8 w-[70%] md:w-full lg:text-[24px] text-[1.2em] lg:pl-7 text-left font-semibold text-white line-clamp-3">
                  {projects[4].thumbnailText}
                </h1>
              </Link>
            </div>
          )}
        </div>
      )}

      <Link href="/Portfolio">
        <div className="flex flex-col items-center justify-center gap-4 text-center mt-20">
          <button className="border-1 border-white text-white px-4 py-2 text-[16px] rounded-lg cursor-pointer hover:bg-white/10 hover:border-white/10 hover:text-white/70 transition-colors">
            View All Case Studies
          </button>
        </div>
      </Link>
    </div>
  );
};

export default Team;