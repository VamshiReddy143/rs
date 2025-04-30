"use client";

import Image from "next/image";
import React, { useEffect, useRef, useLayoutEffect } from "react";
import Lenis  from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { div } from "framer-motion/client";

gsap.registerPlugin(ScrollTrigger);


const techList = [
  {
    title: "Mobile & TV Technologies",
    description: "Native Android, Native iOS, Apple TV, Roku",
  },
  {
    title: "Web Development",
    description: "ReactJS, NextJS, Typescript",
  },
  {
    title: "DevOps Technologies",
    description: "Heroku, AWS, Nginx",
  },
  {
    title: "Backend Development",
    description: "Ruby on Rails",
  },
  {
    title: "Data Engineering",
    description: "Segment, Optimizel",
  },
];


interface CustomLenisOptions {
  duration?: number;
  easing?: (t: number) => number;
  smooth?: boolean;
}

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Initialize Lenis and sync with ScrollTrigger
  useEffect(() => {
      const lenisOptions: CustomLenisOptions = {
        duration: 0,
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

    lenis.on("scroll", () => {
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

  // Initialize GSAP animation after DOM is ready
  useLayoutEffect(() => {
    ScrollTrigger.refresh();

    if (sectionRef.current && imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        {
          scale: 0.8, // Start small
        },
        {
          scale: 1, // Grow to larger size
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            scroller: document.body,
            start: "top 80%", // Start when 80% from top
            end: "bottom 20%", // End when 20% from bottom
            scrub: true, // Smooth grow on scroll down
            onUpdate: (self) => {
              if (self.direction === -1 && self.progress === 0) {
                gsap.set(imageRef.current, { scale: 0.8 }); // Instant shrink only at top on scroll up
              }
            },
            onEnter: () => console.log("Image entered"),
            onLeaveBack: () => console.log("Image leaving back"),
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
 <div>
     <div style={{ fontFamily: 'Poppins, sans-serif' }}  ref={sectionRef} className="min-h-screen bg-red-700 pb-[5em] ">
      <div className="lg:pt-[15em] pt-[13em] text-center lg:max-w-[90em]  lg:px-[6em] px-3 mx-auto">

        {/* About*/}
        <div>
          <h1 className="lg:text-[36px] text-[1.7em] font-medium text-white">
            A Dynamic Partnership{' '}
            <span className="font-semibold">Shaping the Future</span> of Online Education
          </h1>   
          
                 {/* image should be h-600px t0 700 =px thats it */}
          <Image 
            ref={imageRef}
            src="/mc.jpg" 
            alt="Team collaborating for online education" 
            width={900} 
            height={900} 
            className="object-cover w-full lg:mt-[10em] lg:h-full lg:w-full h-[20em] mt-[6em]" 
          />
        </div>

        <div className="mt-10 flex flex-col items-start">
          {/* project name  */}
          <h1 className="lg:text-[80px] text-[3em] font-bold text-white leading-[96px]">Masterclass</h1>
          <div className="lg:flex justify-between w-full pt-15">
            <div className="flex flex-col items-start">

              {/* services provided */}
              <h1 className="lg:text-[32px] text-[1.7em] font-normal text-white mt-5 leading-[38px]">Services Provided</h1>
              <div className="md:flex items-center gap-10 mt-4">
                <div className="flex flex-col items-start gap-5">
                  <p className="text-white lg:text-[20px] text-[1.2em]">Project Type</p>
                  {/* here give the option to add the project type */}
                  <p className="border border-white py-2 px-6 rounded-xl w-fit lg:text-[20px] text-[1.2em]">Staff Augmentation</p>
                </div>
                <div className="h-[40px] hidden md:flex flex-col items-center mt-[50px] w-[1px] bg-white"/>
                <div className="flex flex-col items-start gap-5 md:mt-0 mt-5">
                  <p className="text-white lg:text-[20px] text-[1.2em]">Industry</p>
                  <div className="flex gap-5">
                     {/* here give the option to add the industry type */}
                    <p className="border border-white py-2 px-6 rounded-xl w-fit lg:text-[20px] text-[1.2em]">Education</p>
                    <p className="border border-white py-2 px-6 rounded-xl w-fit lg:text-[20px] text-[1.2em]">Streaming</p>
                  </div>
                </div>
              </div>

              {/* make this also dynamic for the year ask the year of project */}
              <button className="bg-black text-white py-2 px-6 rounded-xl w-fit text-[20px] mt-5">2018-Present</button>
            </div>



            {/* fot the team you made correct say that add the team members  */}

            <div className="pb-10"> 
              <h1 className="lg:text-[32px] font-medium text-[1.7em] text-white text-left lg:text-start mt-5">The Team</h1>
              <div className="h-fit flex gap-4 mt-3">
                <div className="flex flex-col items-center w-[1px] bg-white"/>
                <div className="flex flex-col items-start gap-3">
                  <p className="lg:text-[20px] font-normal leading-[24px] text-[1em]">Product Designers</p>
                  <p className="lg:text-[20px] font-normal leading-[24px] text-[1em]">Android Developers</p>
                  <p className="lg:text-[20px] font-normal leading-[24px] text-[1em]">iOS Developers</p>
                  <p className="lg:text-[20px] font-normal leading-[24px] text-[1em]">Web Developers</p>
                  <p className="lg:text-[20px] font-normal leading-[24px] text-[1em]">Roku/TV Developers</p>
                  <p className="lg:text-[20px] font-normal leading-[24px] text-[1em]">QA Analysts</p>
                  <p className="lg:text-[20px] font-normal leading-[24px] text-[1em]">Scrum Master</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  <div style={{ fontFamily: 'Poppins, sans-serif' }}   className='bg-gray-200 text-black min-h-screen '>
        <Image src={"/team111.jpg"} alt="team" width={900} height={900} className='w-[100vw]  lg:h-[60vh] h-[40vh] object-cover '/>
        <div className='lg:max-w-[90em] mx-auto lg:px-[6em] px-3 mt-[3em] md:flex gap-[5em] items-center'>
            <div className='flex flex-col items-start lg:gap-2'>
                <p className='lg:text-[32px] text-[1.5em] font-medium'>About</p>
                <h1 className='lg:text-[64px] text-[2.5em] leading-tight font-semibold leading-[77px]'>the <span className='lg:block'>Client</span></h1>
                <div className='w-[50px] h-[2.5px] mt-4 lg:mt-0 bg-black'/>
            </div>

            <div className='lg:mt-0 mt-[2em]'>
                <p className='lg:text-[24px] text-[18px] leading-[26px] lg:leading-[36px]'>
                MasterClass is a streaming platform that offers lessons from the world's best. With an annual membership, subscribers gain unlimited access to classes taught 
             <span className='lg:inline hidden'>   by world-class instructors spanning subjects including Arts & Entertainment, Business, Design & Style, Sports & Gaming, Writing, and more.</span>
                </p>
            </div>



        </div>
            <div className='lg:max-w-[90em] mx-auto lg:px-[6em] px-3 lg:mt-[20em] mt-[10em] pb-[10em]'>

              {/* Quote for the project optional */}
                <h1 className='lg:text-[63px] text-[32px] font-medium leading-[38px] lg:leading-[81px]'>“We don't treat them like an outsourced team. They're <span className='text-red-700'>part of our big team</span>. They contribute to all our code initiatives.”</h1>
                <div className='lg:mt-[4em] mt-[2em]'>

                  {/* quote by */}
                    <p className=' lg:text-[28px] leading-[42px] font-medium text-[1em]'>Mandar Bapaye</p>
                    {/* the member pposition who wrote the quote  */}
                    <p className='lg:text-[28px] leading-[42px] font-medium text-[1.2em] text-red-700'>VP of Engineering at MasterClass</p>
                </div>
            </div>
    </div>



{/* About the project */}
     <div style={{ fontFamily: 'Poppins, sans-serif' }}  className="min-h-screen bg-[#212121] text-white">

      
    
 
          <div className="lg:px-[10em] pb-[5em] lg:pt-[2em] pt-[5em] px-3 mx-auto flex flex-col gap-10">
    {/* heading ot motive of project */}
          <div className=" pt-[3em] pb-[1em] lg:text-[64px] text-[60px] font-medium ">
            Helping{" "}
            <span className="inline bg-gradient-to-t from-red-500 to-red-500 bg-[length:100%_0.3em] bg-no-repeat bg-bottom">
              MasterClass
            </span>{" "}
            build new
            <span className="block">features and double its revenue</span>
          </div>

          {/* about the comapny and project  add options to add paragraphs*/}
            <p className="lg:text-[32px] text-[#D6D5D1] text-[2em] lg:leading-[48px] font-extralight lg:w-[70%]">
              Masterclass needed to scale its engineering function and{" "}
              <span className="font-semibold text-white inline">
                enhance its product in pursuit of an ambitious growth plan
              </span>
              , but faced challenges sourcing local, talented programmers in ReactJS - their front-end programming language.
            </p>
            <p className="lg:text-[32px] text-[#D6D5D1] text-[2em] lg:leading-[48px] font-extralight lg:w-[70%]">
              <span className="font-semibold text-white inline">
                Rootstrap emerged as the ideal partner,
              </span>{" "}
              combining common{" "}
              <span className="font-semibold text-white inline">
                values, deep technical and process expertise, and sufficient operating scale
              </span>{" "}
              for Masterclass to be able to achieve its ambitious goals.
            </p>
          </div>
    
      
    
    
         {/* capabilities */}
          <div className="bg-gray-100 text-black  ">
            <div className="lg:px-[10em] pb-[4em]  pt-[4em] px-3 mx-auto lg:flex gap-10">
              <h1 className="lg:text-[48px] text-[2em] font-medium lg:leading-[58px] lg:w-[46em]">
                Elevates Front-End Capabilities for Ambitious Growth
              </h1>
              <p className="lg:text-[23px] lg:leading-[36px] font-normal text-[18px] leading-[26px] lg:mt-0 mt-5 ">
                Our team seamlessly integrated with MasterClass, working closely alongside their development and product teams. We began by addressing ReactJS and web development requirements and later expanded our collaboration, establishing new teams and expanding existing ones to handle multiple projects.
              </p>
            </div>
          </div>
        </div>


        <section style={{ fontFamily: 'Poppins, sans-serif' }}   className="min-h-screen    bg-gray-200 text-black lg:pt-[16em] pt-[10em]">
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
            {techList.map((item, idx) => (
              <div key={idx}>

                {/* title of technology */}
                <h2 className="md:text-[20px] text-[1.2em] leading-[30px] font-medium">{item.title}</h2>

                {/*  technology used  */}
                <p className="md:text-[16px] text-[0.8em] text-[#6F6F6E] leading-[24px]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

 </div>
  );
};

export default Hero;