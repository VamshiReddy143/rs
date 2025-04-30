'use client';

import Image from 'next/image';
import React from 'react';
import { ITemplate3Project } from '@/types';

interface Template3Props {
  project: ITemplate3Project;
}

const Template3: React.FC<Template3Props> = ({ project }) => {
  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Hero Section */}
      <div className="bg-[#1B1B1B] text-white">
        <div className="lg:max-w-[90em] mx-auto lg:px-[6em] px-3 lg:pt-[19em] pt-[10em] leading-tight">
          <h1 className="lg:text-[80px] lg:leading-[96px] font-medium text-[3em]">{project.name}</h1>
          <p className="lg:text-[24px] lg:leading-[36px] font-normal text-[1em]">{project.tagline}</p>
        </div>
        <div className="lg:pt-[7em]">
          <Image
            src={project.images.hero}
            alt="Hero image"
            height={900}
            width={900}
            className="w-[100vw] lg:h-[60vh] h-[40vh] object-cover"
          />
        </div>
      </div>

      {/* Client Section */}
      <div className="bg-gray-200 text-black min-h-screen">
        <div className="lg:max-w-[90em] mx-auto lg:px-[6em] px-3 lg:pt-[12em] pt-10 md:flex gap-[5em] items-center">
          <div className="flex flex-col items-start lg:gap-2">
            <p className="lg:text-[32px] lg:leading-[38px] font-medium text-[1.5em]">About</p>
            <h1 className="lg:text-[64px] text-[42px] leading-[50px] lg:leading-[77px] font-medium flex lg:gap-5 gap-2">
              the <span>Client</span>
            </h1>
            <div className="w-[50px] h-[2px] mt-3 lg:mt-0 bg-black" />
          </div>
          <div className="lg:mt-0 mt-[2em]">
            <p className="lg:text-[25px] font-normal text-[15px] leading-[23px] lg:leading-[42px] text-[1.2em]">
              {project.clientAbout}
            </p>
          </div>
        </div>
        <div className="lg:max-w-[90em] mx-auto lg:px-[4em] px-3 lg:mt-[18em] mt-[10em] lg:pb-[10em] pb-[6em]">
          <h1 className="lg:text-[67px] font-medium text-[32px] lg:leading-[81px] leading-[38px]">
            “{project.quote.text}”
          </h1>
          <div className="lg:mt-[4em] mt-[2em]">
            <p className="lg:text-[28px] font-normal lg:leading-[43px] text-[1em]">{project.quote.author}</p>
            <p className="lg:text-[28px] font-normal lg:leading-[43px] text-[1em]">{project.quote.position}</p>
          </div>
        </div>
      </div>

      {/* Challenges and Actions Section */}
      <div className="bg-[#1B1B1B] text-white">
        <div className="lg:max-w-[90em] mx-auto lg:px-[4em] px-3 lg:pt-[12em] py-[6em] leading-tight">
          <h1 className="lg:text-[64px] leading-[77px] font-medium text-[2.4em]">The challenge</h1>
          {project.challenges.map((challenge, idx) => (
            <p
              key={idx}
              className="lg:text-[28px] font-extralight leading-[23px] lg:leading-[30px] text-[15px] mt-10"
            >
              {challenge}
            </p>
          ))}
          <Image
            src={project.images.challenge}
            alt="Challenge image"
            height={900}
            width={900}
            className="w-full py-[7em] object-cover"
          />
          <div className="lg:mt-10 mt-7">
            <h1 className="lg:text-[64px] leading-[77px] font-medium text-[2.4em]">What we did</h1>
            <p className="lg:text-[28px] font-extralight leading-[23px] lg:leading-[30px] text-[15px] mt-10">
              {project.actions}
            </p>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-white text-black">
        <div className="lg:max-w-[90em] mx-auto lg:px-[6em] px-3 lg:pt-[12em] pt-[5em] pb-[10em] lg:flex justify-between items-center gap-[2em]">
          <div>
            <h1 className="lg:text-[64px] text-[2.7em] font-medium leading-[77px]">
              The <span className="lg:block">Results</span>
            </h1>
            <div className="h-[3px] w-[60px] bg-black rounded-full mt-5" />
          </div>
          <div className="mt-10 lg:mt-0">
            <p className="lg:text-[28px] font-normal text-[15px] leading-[23px] lg:leading-[42px]">
              {project.results}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template3;