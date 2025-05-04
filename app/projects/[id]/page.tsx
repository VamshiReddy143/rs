'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useLayoutEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useParams } from 'next/navigation';
import placeholder from '@/public/ph.jpg';
import Projects from '@/components/Portfolio/Featured_cases/emeritus/Projects';
import Footer from '@/components/Portfolio/Footer';

gsap.registerPlugin(ScrollTrigger);

interface IProject {
  _id: string;
  type: 'project' | 'template3project' | 'custom';
  name?: string; // project, template3project
  title?: string; // custom
  about?: string; // project
  services?: { projectType: string; industries: string[] }; // project
  year?: string; // project
  team?: string[]; // project
  clientAbout?: string; // project, template3project
  quote?: { text: string; author: string; position: string }; // project, template3project
  projectMotive?: string; // project
  companyDetails?: string[]; // project
  capabilities?: { title: string; description: string }; // project
  technologies?: { title: string; description: string }[]; // project
  images?: { hero: string; team?: string; challenge?: string }; // project, template3project
  tagline?: string; // template3project
  challenges?: string[]; // template3project
  actions?: string[]; // template3project
  results?: string[]; // template3project
  content?: Array<{
    type: 'text' | 'image' | 'video';
    subtype?: 'heading' | 'paragraph' | 'bullet'; // For text type
    value: string;
    description?: string;
  }>; // custom
  thumbnailImage: string | null;
  thumbnailText: string;
}

interface CustomLenisOptions {
  duration?: number;
  easing?: (t: number) => number;
  smooth?: boolean;
}

export default function ProjectPage() {
  const { id } = useParams();
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [project, setProject] = useState<IProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch project data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        if (!res.ok) {
          throw new Error(res.status === 404 ? 'Project not found' : 'Failed to fetch project');
        }
        const data = await res.json();
        console.log('API Response:', JSON.stringify(data, null, 2)); // Pretty-print API response
        setProject(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };
    if (id) fetchProject();
  }, [id]);

  // Log project content for debugging
  useEffect(() => {
    if (project?.type === 'custom') {
      console.log('Custom Project Content:', JSON.stringify(project.content, null, 2)); // Pretty-print content
      if (project.content) {
        project.content.forEach((block, idx) => {
          console.log(`Content Block ${idx}:`, {
            type: block.type,
            subtype: block.subtype,
            value: block.value,
            description: block.description,
          });
        });
      }
    }
  }, [project]);

  // Initialize Lenis and sync with ScrollTrigger (for project and custom types)
  useEffect(() => {
    if (project?.type !== 'project' && project?.type !== 'custom') return;

    const lenisOptions: CustomLenisOptions = {
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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
  }, [project]);

  // Initialize GSAP animation (for project type)
  useLayoutEffect(() => {
    if (project?.type !== 'project') return;

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
            onEnter: () => console.log('Image entered'),
            onLeaveBack: () => console.log('Image leaving back'),
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [project]);

  // GSAP animations for custom type
  useLayoutEffect(() => {
    if (project?.type !== 'custom') return;

    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      // Hero section animations
      gsap.fromTo(
        '.custom-hero-title',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.custom-hero',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.custom-hero-text',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          delay: 0.3,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.custom-hero',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.custom-hero-image',
        { scale: 1.2, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.custom-hero',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content block animations
      gsap.utils.toArray<HTMLElement>('.custom-content-block').forEach((block, index) => {
        gsap.fromTo(
          block,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Parallax effect for images and videos
        if (block.querySelector('.custom-media')) {
          gsap.to(block.querySelector('.custom-media'), {
            y: () => window.innerHeight * 0.15,
            ease: 'none',
            scrollTrigger: {
              trigger: block,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [project]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  if (error || !project) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error || 'Project not found'}</div>;
  }

  if (project.type === 'project') {
    return (
      <div style={{ fontFamily: 'Poppins, sans-serif' }}>
        {/* Hero Section (MasterClass Style) */}
        <div ref={sectionRef} className="min-h-screen bg-red-700 pb-[5em]">
          <div className="lg:pt-[15em] pt-[13em] text-center lg:max-w-[90em] lg:px-[6em] px-3 mx-auto">
            <h1 className="lg:text-[36px] text-[1.7em] font-medium text-white">
              {project.about ? (
                <>
                  A Dynamic Partnership <span className="font-semibold">Shaping the Future</span> of{' '}
                  {project.services?.industries[0] || 'Industry'}
                </>
              ) : (
                'Explore Our Work'
              )}
            </h1>
            <Image
              ref={imageRef}
              src={project.thumbnailImage || placeholder}
              alt={project.thumbnailText}
              width={900}
              height={900}
              className="object-cover w-full lg:mt-[10em] lg:h-[600px] h-[20em] mt-[6em]"
            />
            <div className="mt-10 flex flex-col items-start">
              <h1 className="lg:text-[80px] text-[3em] font-bold text-white leading-[96px]">
                {project.name}
              </h1>
              <div className="lg:flex justify-between w-full pt-15">
                <div className="flex flex-col items-start">
                  <h1 className="lg:text-[32px] text-[1.7em] font-normal text-white mt-5 leading-[38px]">
                    Services Provided
                  </h1>
                  {project.services && (
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
                  )}
                  {project.year && (
                    <button className="bg-black text-white py-2 px-6 rounded-xl w-fit text-[20px] mt-5">
                      {project.year}
                    </button>
                  )}
                </div>
                {project.team && (
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
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Client About Section */}
        <div className="bg-gray-200 text-black min-h-screen">
          <Image
            src={project.images?.team || placeholder}
            alt="Team"
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
                {project.clientAbout || 'Details about the client and their mission.'}
              </p>
            </div>
          </div>
          {project.quote && (
            <div className="lg:max-w-[90em] mx-auto lg:px-[6em] px-3 lg:mt-[20em] mt-[10em] pb-[10em]">
              <h1 className="lg:text-[63px] text-[32px] font-medium leading-[38px] lg:leading-[81px]">
                “{project.quote.text}”
              </h1>
              <div className="lg:mt-[4em] mt-[2em]">
                <p className="lg:text-[28px] leading-[42px] font-medium text-[1em]">{project.quote.author}</p>
                <p className="lg:text-[28px] leading-[42px] font-medium text-[1em] text-red-700">
                  {project.quote.position}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Project Motive Section */}
        <div>
          <div className="min-h-screen bg-[#212121] pb-[8em] text-white">
            <div className="lg:px-[10em] pb-[5em] lg:pt-[2em] pt-[5em] px-3 mx-auto flex flex-col gap-10">
              <div className="pt-[3em] pb-[1em] lg:text-[64px] text-[60px] font-medium">
                {project.projectMotive ? (
                  <>
                    Helping <span className="inline bg-gradient-to-t from-red-500 to-red-500 bg-[length:100%_0.3em] bg-no-repeat bg-bottom">{project.name}</span> build new
                    <span className="block">features and achieve goals</span>
                  </>
                ) : (
                  <>
                    Driving Success for <span className="inline bg-gradient-to-t from-red-500 to-red-500 bg-[length:100%_0.3em] bg-no-repeat bg-bottom">{project.name}</span>
                    <span className="block">with Innovative Solutions</span>
                  </>
                )}
              </div>
              {project.companyDetails && project.companyDetails.map((detail, idx) => (
                <p key={idx} className="lg:text-[32px] text-[#D6D5D1] text-[2em] lg:leading-[48px] font-extralight lg:w-[70%]">
                  {detail}
                </p>
              ))}
            </div>
          </div>

          {/* Capabilities */}
          {project.capabilities && (
            <div className="bg-gray-100 py-[10em] text-black">
              <div className="lg:px-[10em] pb-[4em] pt-[4em] px-3 mx-auto lg:flex gap-10">
                <h1 className="lg:text-[48px] text-[2em] font-medium lg:leading-[58px] lg:w-[46em]">
                  {project.capabilities.title}
                </h1>
                <p className="lg:text-[23px] lg:leading-[36px] font-normal text-[18px] leading-[26px] lg:mt-0 mt-5">
                  {project.capabilities.description}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Technologies Section */}
        {project.technologies && (
          <section className="min-h-screen bg-gray-200 text-black lg:pt-[16em] pt-[10em]">
            <div className="px-3 lg:px-[4em] lg:max-w-[90em] mx-auto lg:flex gap-20 justify-start">
              <div className="flex flex-col leading-snug">
                <div className="leading-tight flex flex-col gap-4">
                  <h2 className="md:text-[32px] text-[1.5em] font-medium leading-[38px]">Key Technologies</h2>
                  <h1 className="md:text-[64px] text-[2em] font-bold">Used</h1>
                </div>
                <div className="h-[3px] w-[50px] bg-black rounded-full mt-3" />
              </div>
              <div className="flex gap-5 lg:mt-0 mt-[2em]">
                <div className="w-[0.8px] bg-[#6F6F6E] h-auto" />
                <div className="flex flex-col gap-5">
                  {project.technologies.map((item, idx) => (
                    <div key={idx}>
                      <h2 className="md:text-[20px] text-[1.2em] leading-[30px] font-medium">{item.title}</h2>
                      <p className="md:text-[16px] text-[0.8em] text-[#6F6F6E] leading-[24px]">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
        <Projects />
        <Footer />
      </div>
    );
  }

  if (project.type === 'template3project') {
    return (
      <div style={{ fontFamily: 'Poppins, sans-serif' }}>
        {/* Hero Section (Brightwheel Style) */}
        <div className="bg-[#1B1B1B] text-white">
          <div className="lg:max-w-[90em] mx-auto lg:px-[6em] px-3 lg:pt-[19em] pt-[10em] leading-tight">
            <h1 className="lg:text-[80px] lg:leading-[96px] font-medium text-[3em]">{project.name}</h1>
            <p className="lg:text-[24px] lg:leading-[36px] font-normal text-[1em]">{project.tagline || project.thumbnailText}</p>
          </div>
          <div className="lg:pt-[7em]">
            <Image
              src={project.images?.hero || project.thumbnailImage || placeholder}
              alt={project.thumbnailText}
              height={900}
              width={900}
              className="w-[100vw] lg:h-[60vh] h-[40vh] object-cover"
            />
          </div>
        </div>

        {/* Client About Section */}
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
                {project.clientAbout || 'Details about the client and their mission.'}
              </p>
            </div>
          </div>
          {project.quote && (
            <div className="lg:max-w-[90em] mx-auto lg:px-[4em] px-3 lg:mt-[18em] mt-[10em] lg:pb-[10em] pb-[6em]">
              <h1 className="lg:text-[67px] font-medium text-[32px] lg:leading-[81px] leading-[38px]">
                “{project.quote.text}”
              </h1>
              <div className="lg:mt-[4em] mt-[2em]">
                <p className="lg:text-[28px] font-normal lg:leading-[43px] text-[1em]">{project.quote.author}</p>
                <p className="lg:text-[28px] font-normal lg:leading-[43px] text-[1em]">{project.quote.position}</p>
              </div>
            </div>
          )}
        </div>

        {/* Challenges and Actions Section */}
        <div className="bg-[#1B1B1B] text-white">
          <div className="lg:max-w-[90em] mx-auto lg:px-[4em] px-3 lg:pt-[12em] py-[6em] leading-tight">
            <h1 className="lg:text-[64px] leading-[77px] font-medium text-[2.4em]">The Challenge</h1>
            {project.challenges && project.challenges.map((challenge, idx) => (
              <p key={idx} className="lg:text-[28px] font-extralight leading-[23px] lg:leading-[30px] text-[15px] mt-10">
                {challenge}
              </p>
            ))}
            {project.images?.challenge && (
              <Image
                src={project.images.challenge}
                alt="Challenge image"
                height={900}
                width={900}
                className="w-full py-[7em] object-cover"
              />
            )}
            <div className="lg:mt-10 mt-7">
              <h1 className="lg:text-[64px] leading-[77px] font-medium text-[2.4em]">What We Did</h1>
              {project.actions && (
                <div className="flex flex-col gap-10 mt-10">
                  {project.actions.map((action, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <h1 className="lg:text-[1.5em] text-[1em]">●</h1>
                      <p className="lg:text-[2em] leading-[23px] lg:leading-[37px] text-[15px]">
                        <span className="font-semibold">{action.split(': ')[0]}: </span>
                        <span className="lg:text-[28px] font-extralight text-[1.3em]">{action.split(': ')[1] || action}</span>
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Section */}
        {project.results && (
          <div className="bg-white text-black">
            <div className="lg:max-w-[90em] mx-auto lg:px-[6em] px-3 lg:pt-[12em] pt-[5em] pb-[10em] lg:flex justify-between items-center gap-[2em]">
              <div>
                <h1 className="lg:text-[64px] text-[2.7em] font-medium leading-[77px]">
                  The <span className="lg:block">Results</span>
                </h1>
                <div className="h-[3px] w-[60px] bg-black rounded-full mt-5" />
              </div>
              <div className="flex flex-col gap-10 mt-10 lg:mt-0">
                {project.results.map((result, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <h1 className="lg:text-[1.5em] text-[1em] mt-1">●</h1>
                    <p className="lg:text-[28px] text-[15px] leading-[23px] lg:leading-[42px]">
                      <span className="font-semibold">{result.split(': ')[0]}: </span>
                      <span className="font-normal">{result.split(': ')[1] || result}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <Projects />
        <Footer />
      </div>
    );
  }

  // Enhanced Custom Type
  return (
    <div ref={sectionRef} style={{ fontFamily: 'Poppins, sans-serif' }} className="relative bg-[#0A0A0A] text-white">
      <style>
        {`
          .custom-hero-image {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .custom-hero-image:hover {
            transform: scale(1.02);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
          }
          .custom-content-block {
            transition: background 0.3s ease;
          }
          .custom-content-block:hover {
            background: rgba(255, 255, 255, 0.05);
          }
          .custom-media {
            will-change: transform;
          }
          .gradient-bg {
            background: linear-gradient(135deg, #1B1B1B 0%, #2A2A2A 100%);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            animation: gradientShift 15s ease infinite;
          }
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
      <div className="gradient-bg" />
      {/* Hero Section */}
      <section className="custom-hero min-h-screen flex flex-col justify-center px-3 lg:px-[4em] lg:max-w-[90em] mx-auto pt-[10em] lg:pt-[16em]">
        <h2 className="custom-hero-title lg:text-[80px] text-[2.5em] font-bold leading-tight">
          {project.title}
        </h2>
        <p className="custom-hero-text lg:text-[28px] text-[18px] mt-6 max-w-[60%] leading-relaxed">
          {project.thumbnailText}
        </p>
        {project.thumbnailImage && (
          <div className="mt-10">
            <Image
              src={project.thumbnailImage}
              alt={project.thumbnailText}
              width={1200}
              height={800}
              className="custom-hero-image custom-media w-full object-cover rounded-xl"
            />
          </div>
        )}
      </section>

      {/* Content Sections */}
      <section className="px-3 lg:px-[4em] lg:max-w-[90em] mx-auto pb-[10em]">
        {project.content && project.content.length > 0 ? (
          project.content.map((item, idx) => (
            <div
              key={idx}
              className="custom-content-block my-10 p-6 rounded-xl"
            >
              {item.type === 'text' && item.subtype === 'heading' && (
                <h3 className="lg:text-[36px] text-[24px] font-bold leading-relaxed max-w-[80%] mx-auto text-center">
                  {item.value}
                </h3>
              )}
              {item.type === 'text' && item.subtype === 'paragraph' && (
                <p className="lg:text-[24px] text-[18px] leading-relaxed max-w-[80%] mx-auto text-center">
                  {item.value}
                </p>
              )}
              {item.type === 'text' && item.subtype === 'bullet' && (
                <ul className="list-disc list-inside lg:text-[24px] text-[18px] leading-relaxed max-w-[80%] mx-auto">
                  <li>{item.value}</li>
                </ul>
              )}
              {item.type === 'image' && (
                <div className="relative overflow-hidden rounded-xl">
                  <Image
                    src={item.value}
                    alt={item.description || 'Content image'}
                    width={1200}
                    height={800}
                    className="custom-media w-full object-cover rounded-xl"
                  />
                </div>
              )}
              {item.type === 'video' && (
                <div className="relative overflow-hidden rounded-xl">
                  <video
                    controls
                    className="custom-media w-full max-w-[1200px] rounded-xl"
                  >
                    <source src={item.value} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
              {item.description && (
                <p className="lg:text-[20px] text-[16px] mt-4 text-gray-300 text-center">
                  {item.description}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-[18px] text-gray-400">
            No content blocks available for this project.
          </p>
        )}
      </section>

      <Projects />
      <Footer />
    </div>
  );
}