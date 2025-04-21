"use client";

import Image from "next/image";
import React, { useEffect, useRef, useLayoutEffect } from "react";
import Lenis from "lenis"; // Removed { LenisOptions } to avoid default type
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Custom LenisOptions type to include 'smooth'
interface CustomLenisOptions {
  duration?: number;
  easing?: (t: number) => number;
  smooth?: boolean;
}

gsap.registerPlugin(ScrollTrigger);

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
          scale: 1, // Grow to larger size (adjusted to 1 as per your update)
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
    <div style={{ fontFamily: 'Poppins, sans-serif' }}  ref={sectionRef} className="min-h-screen  bg-[#0b2838]  pb-[5em] ">

      <div className="pt-[15em] text-center">
        <div className="lg:px-[10em] px-4">
        <h1 className="lg:text-[36px] text-[1.7em] font-medium text-white">
            Revamp and Ramp Up: How Rootstrap Optimized Emeritus's{' '}
            <span className="font-extrabold">Digital Presence</span>
          </h1>
          <Image
            ref={imageRef}
            src="/emertius.jpg"
            alt="Team collaborating for online education"
            width={900}
            height={900}
            className="object-cover w-full h-[40vh] lg:h-full mt-[5em]"
          />
        </div>

        <div className="mt-10 flex flex-col items-start lg:px-[10em] px-4">
        <h1 className="lg:text-[80px] text-[3em] pt-5 pb-5 font-bold text-white leading-[96px]">Emeritus</h1>
          <div className="lg:flex justify-between w-full">
            <div className="flex flex-col items-start">
              <h1 className="lg:text-[32px] text-[1.7em] font-medium leading-[38px] text-white mt-5">Services Provided</h1>
              <div className="md:flex items-center gap-10 mt-4">
                <div className="flex flex-col items-start gap-5">
                <p className="text-white lg:text-[20px] text-[1.2em]">Project Type</p>
                <p className="border border-white py-2 px-6 rounded-xl w-fit lg:text-[20px] text-[1.2em]">
                    Web & Mobile Development
                  </p>
                </div>
                <div className="h-[40px] hidden md:flex flex-col items-center mt-[50px] w-[1px] bg-white"/>
                <div className="flex flex-col items-start gap-5 md:mt-0 mt-5">
                <p className="text-white lg:text-[20px] text-[1.2em]">Industry</p>
                  <div className="flex gap-5">
                  <p className="border border-white py-2 px-6 rounded-xl w-fit lg:text-[20px] text-[1.2em]">
                      Higher Education
                    </p>
                    <p className="border border-white py-2 px-6 rounded-xl w-fit lg:text-[20px] text-[1.2em]">
                      Ed Tech
                    </p>
                  </div>
                </div>
              </div>
              <button className="bg-black text-white py-2 px-6 rounded-xl w-fit text-[1.2em] mt-5">
                2018-Onwards
              </button>
            </div>

            <div className="pb-10"> 
            <h1 className="lg:text-[32px] font-medium text-[1.7em] text-white text-left lg:text-start mt-5">
                The Team
              </h1>
              <div className="h-fit flex gap-4 mt-3">
                <div className="flex flex-col items-center w-[1px] bg-white"/>
                <div className="flex flex-col items-start gap-3">
                <p className="lg:text-[20px] font-normal leading-[24px] text-[1em]">Front end developers</p>
                <p className="lg:text-[20px] font-normal leading-[24px] text-[1em]">Back end developers</p>
                <p className="lg:text-[20px] font-normal leading-[24px] text-[1em]">QA Analyst</p>
                <p className="lg:text-[20px] font-normal leading-[24px] text-[1em]">Web Developers</p>
                <p className="lg:text-[20px] font-normal leading-[24px] text-[1em]">Project Manager</p>
                <p className="lg:text-[20px] font-normal leading-[24px] text-[1em]">Product Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;