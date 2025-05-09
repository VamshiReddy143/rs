"use client";

import React from "react"

import { useEffect, useRef, useLayoutEffect } from "react";
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
  const videoRef = useRef<HTMLVideoElement>(null);

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

    if (sectionRef.current && videoRef.current) {
      gsap.fromTo(
        videoRef.current,
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
                gsap.set(videoRef.current, { scale: 0.8 }); // Instant shrink only at top on scroll up
              }
            },
            onEnter: () => console.log("Video entered"),
            onLeaveBack: () => console.log("Video leaving back"),
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }}  ref={sectionRef} className="min-h-screen bg-[#b84d00]">
      <div className="lg:max-w-[90em] mx-auto lg:px-[4em] px-3">
        <h1 className="lg:text-[36px] lg:leading-[43px] font-medium text-[28px] leading-[34px] text-center  lg:pt-[6em] pt-[5em]">
          Leading the Future of <span className="font-semibold">Livestock Health</span> with Advanced <span className="block lg:inline">AI Technology.</span>
        </h1>
        <video
          ref={videoRef}
          src="/videos/cow.mp4"
          autoPlay
          muted
          loop
          className="w-full  lg:h-[35em] h-[32em] object-cover  lg:mt-[10em] mt-[5em]"
        />
      </div>

      <div className="mt-10 flex flex-col lg:pt-[5em] items-start lg:px-[10em] lg:pb-[10em] px-4">
        <h1 className="lg:text-[80px] lg:leading-[96px] leading-[50px]   text-[40px] font-semibold text-white ">
          Revolutionizing Livestock Health:An AI-Driven Approach to Illness Detection
        </h1>
        <div className="lg:flex justify-between w-full mt-10">
          <div className="flex flex-col items-start">
            <h1 className="lg:text-[32px] leading-[38px] font-medium text-[1.4em] text-white mt-5">Services Provided</h1>
            <div className="md:flex items-center gap-10 mt-4">
              <div className="flex flex-col items-start gap-5">
                <p className="text-white lg:text-[20px] leading-[30px] font-medium text-[1.2em]">Project Type</p>
                <p className="border border-white py-2 px-6 rounded-xl w-fit lg:text-[20px] font-medium leading-[30px] text-[1em]">
                  Proof of concept
                </p>
              </div>
              <div className="h-[40px] hidden md:flex flex-col items-center mt-[50px] w-[1px] bg-white"/>
              <div className="flex flex-col items-start gap-5 md:mt-0 mt-5">
                <p className="text-white lg:text-[20px] leading-[30px] font-medium  text-[1em]">Industry</p>
                <div className="flex lg:gap-5 gap-2">
                  <p className="border border-white py-2 px-3 rounded-xl w-fit lg:text-[20px] font-medium leading-[30px] text-[1em]">
                    Health
                  </p>
                  <p className="border border-white py-2 px-3 rounded-xl w-fit lg:text-[20px] font-medium leading-[30px] text-[1em]">
                    Veterinary
                  </p>
                  <p className="border border-white py-2 px-3 rounded-xl w-fit lg:text-[20px] font-medium leading-[30px] text-[1em]">
                    Image diagnosis
                  </p>
                </div>
              </div>
            </div>
            <button className="bg-black text-white py-2 px-6 rounded-xl w-fit text-[20px] leading-[30px] font-medium mt-5">
              4 weeks
            </button>
          </div>

          <div className="pb-10"> 
            <h1 className="lg:text-[32px] leading-[38px] font-medium text-[1.5em] text-white text-left lg:text-start mt-5">
              The Team
            </h1>
            <div className="h-fit flex gap-4 mt-3">
              <div className="flex flex-col items-center w-[1px] bg-white"/>
              <div className="flex flex-col items-start gap-3">
                <p className="lg:text-[20px] leading-[24px] font-normal text-[1em]">Data Scientist</p>
                <p className="lg:text-[20px] leading-[24px] font-normal text-[1em]">ML Specialists</p>
                <p className="lg:text-[20px] leading-[24px] font-normaltext-[1em]">Product designer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;