"use client";

import Image from "next/image";
import React, { useEffect, useRef, useLayoutEffect } from "react";
import Lenis  from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


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
    <div style={{ fontFamily: 'Poppins, sans-serif' }}  ref={sectionRef} className="min-h-screen bg-red-700 pb-[5em] ">
      <div className="lg:pt-[15em] pt-[13em] text-center lg:max-w-[90em]  lg:px-[6em] px-3 mx-auto">
        <div>
          <h1 className="lg:text-[36px] text-[1.7em] font-medium text-white">
            A Dynamic Partnership{' '}
            <span className="font-semibold">Shaping the Future</span> of Online Education
          </h1>
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
          <h1 className="lg:text-[80px] text-[3em] font-bold text-white leading-[96px]">Masterclass</h1>
          <div className="lg:flex justify-between w-full pt-15">
            <div className="flex flex-col items-start">
              <h1 className="lg:text-[32px] text-[1.7em] font-normal text-white mt-5 leading-[38px]">Services Provided</h1>
              <div className="md:flex items-center gap-10 mt-4">
                <div className="flex flex-col items-start gap-5">
                  <p className="text-white lg:text-[20px] text-[1.2em]">Project Type</p>
                  <p className="border border-white py-2 px-6 rounded-xl w-fit lg:text-[20px] text-[1.2em]">Staff Augmentation</p>
                </div>
                <div className="h-[40px] hidden md:flex flex-col items-center mt-[50px] w-[1px] bg-white"/>
                <div className="flex flex-col items-start gap-5 md:mt-0 mt-5">
                  <p className="text-white lg:text-[20px] text-[1.2em]">Industry</p>
                  <div className="flex gap-5">
                    <p className="border border-white py-2 px-6 rounded-xl w-fit lg:text-[20px] text-[1.2em]">Education</p>
                    <p className="border border-white py-2 px-6 rounded-xl w-fit lg:text-[20px] text-[1.2em]">Streaming</p>
                  </div>
                </div>
              </div>
              <button className="bg-black text-white py-2 px-6 rounded-xl w-fit text-[20px] mt-5">2018-Present</button>
            </div>

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
  );
};

export default Hero;