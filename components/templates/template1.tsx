'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useLayoutEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IProject } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface Template1Props {
  project: IProject;
}

const Template1: React.FC<Template1Props> = ({ project }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const lenisOptions = {
      duration: 0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    };

    const lenis = new Lenis(lenisOptions);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop: () => lenis.scroll,
      getBoundingClientRect: () => ({
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }) as DOMRect,
    });

    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useLayoutEffect(() => {
    ScrollTrigger.refresh();

    if (sectionRef.current && imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { scale: 0.8 },
        {
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            scroller: document.body,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
            onUpdate: (self) => {
              if (self.direction === -1 && self.progress === 0) {
                gsap.set(imageRef.current, { scale: 0.8 });
              }
            },
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div ref={sectionRef} className="min-h-screen bg-red-700 pb-[5em]">
        <div className="lg:pt-[15em] pt-[13em] text-center lg:max-w-[90em] lg:px-[6em] px-3 mx-auto">
          <div>
            <h1 className="lg:text-[36px] text-[1.7em] font-medium text-white">
              {project.about}
            </h1>
            <Image
              ref={imageRef}
              src={project.images.hero}
              alt="Project hero image"
              width={900}
              height={600}
              className="object-cover w-full lg:mt-[10em] lg:h-[600px] h-[20em] mt-[6em]"
            />
          </div>
          <div className="mt-10 flex flex-col items-start">
            <h1 className="lg:text-[80px] text-[3em] font-bold text-white leading-[96px]">
              {project.name}
            </h1>
            <div className="lg:flex justify-between w-full pt-15">
              <div className="flex flex-col items-start">
                <h1 className="lg:text-[32px] text-[1.7em] font-normal text-white mt-5 leading-[38px]">
                  Services Provided
                </h1>
                <div className="md:flex items-center gap-10 mt-4">
                  <div className="flex flex-col items-start gap-5">
                    <p className="text-white lg:text-[20px] text-[1.2em]">Project Type</p>
                    <p className="border border-white py-2 px-6 rounded-xl w-fit lg:text-[20px] text-[1.2em]">
                      {project.services.projectType}
                    </p>
                  </div>
                  <div className="h-[40px] hidden md:flex flex-col items-center mt-[50px] w-[1px] bg-white" />
                  <div className="flex flex-col items-start gap-5 md:mt-0 mt-5">
                    <p className="text-white lg:text-[20px] text-[1.2em]">Industry</p>
                    <div className="flex gap-5">
                      {project.services.industries.map((industry, idx) => (
                        <p
                          key={idx}
                          className="border border-white py-2 px-6 rounded-xl w-fit lg:text-[20px] text-[1.2em]"
                        >
                          {industry}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                <button className="bg-black text-white py-2 px-6 rounded-xl w-fit text-[20px] mt-5">
                  {project.year}
                </button>
              </div>
              <div className="pb-10">
                <h1 className="lg:text-[32px] font-medium text-[1.7em] text-white text-left lg:text-start mt-5">
                  The Team
                </h1>
                <div className="h-fit flex gap-4 mt-3">
                  <div className="flex flex-col items-center w-[1px] bg-white" />
                  <div className="flex flex-col items-start gap-3">
                    {project.team.map((member, idx) => (
                      <p key={idx} className="lg:text-[20px] font-normal leading-[24px] text-[1em]">
                        {member}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-200 text-black min-h-screen">
        <Image
          src={project.images.team}
          alt="Team image"
          width={900}
          height={900}
          className="w-[100vw] lg:h-[60vh] h-[40vh] object-cover"
        />
        <div className="lg:max-w-[90em] mx-auto lg:px-[6em] px-3 mt-[3em] md:flex gap-[5em] items-center">
          <div className="flex flex-col items-start lg:gap-2">
            <p className="lg:text-[32px] text-[1.5em] font-medium">About</p>
            <h1 className="lg:text-[64px] text-[2.5em] leading-tight font-semibold leading-[77px]">
              the <span className="lg:block">Client</span>
            </h1>
            <div className="w-[50px] h-[2.5px] mt-4 lg:mt-0 bg-black" />
          </div>
          <div className="lg:mt-0 mt-[2em]">
            <p className="lg:text-[24px] text-[18px] leading-[26px] lg:leading-[36px]">
              {project.clientAbout}
            </p>
          </div>
        </div>
        {project.quote && (
          <div className="lg:max-w-[90em] mx-auto lg:px-[6em] px-3 lg:mt-[20em] mt-[10em] pb-[10em]">
            <h1 className="lg:text-[63px] text-[32px] font-medium leading-[38px] lg:leading-[81px]">
              “{project.quote.text}”
            </h1>
            <div className="lg:mt-[4em] mt-[2em]">
              <p className="lg:text-[28px] leading-[42px] font-medium text-[1em]">
                {project.quote.author}
              </p>
              <p className="lg:text-[28px] leading-[42px] font-medium text-[1.2em] text-red-700">
                {project.quote.position}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="min-h-screen bg-[#212121] text-white">
        <div className="lg:px-[10em] pb-[5em] lg:pt-[2em] pt-[5em] px-3 mx-auto flex flex-col gap-10">
          <div className="pt-[3em] pb-[1em] lg:text-[64px] text-[60px] font-medium">
            {project.projectMotive}
          </div>
          {project.companyDetails.map((detail, idx) => (
            <p
              key={idx}
              className="lg:text-[32px] text-[#D6D5D1] text-[2em] lg:leading-[48px] font-extralight lg:w-[70%]"
            >
              {detail}
            </p>
          ))}
        </div>
        <div className="bg-gray-100 text-black">
          <div className="lg:px-[10em] pb-[4em] pt-[4em] px-3 mx-auto lg:flex gap-10">
            <h1 className="lg:text-[48px] text-[2em] font-medium lg:leading-[58px] lg:w-[46em]">
              {project.capabilities.title}
            </h1>
            <p className="lg:text-[23px] lg:leading-[36px] font-normal text-[18px] leading-[26px] lg:mt-0 mt-5">
              {project.capabilities.description}
            </p>
          </div>
        </div>
      </div>

      <section className="min-h-screen bg-gray-200 text-black lg:pt-[16em] pt-[10em]">
        <div className="px-3 lg:px-[4em] lg:max-w-[90em] mx-auto lg:flex gap-20 justify-start">
          <div className="flex flex-col leading-snug">
            <div className="leading-tight flex flex-col gap-4">
              <h2 className="md:text-[32px] text-[1.5em] font-medium leading-[38px]">
                Key Technologies
              </h2>
              <h1 className="md:text-[64px] text-[2em] font-bold">Used</h1>
            </div>
            <div className="h-[3px] w-[50px] bg-black rounded-full mt-3" />
          </div>
          <div className="flex gap-5 lg:mt-0 mt-[2em]">
            <div className="w-[0.8px] bg-[#6F6F6E] h-auto" />
            <div className="flex flex-col gap-5">
              {project.technologies.map((tech, idx) => (
                <div key={idx}>
                  <h2 className="md:text-[20px] text-[1.2em] leading-[30px] font-medium">
                    {tech.title}
                  </h2>
                  <p className="md:text-[16px] text-[0.8em] text-[#6F6F6E] leading-[24px]">
                    {tech.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Template1;