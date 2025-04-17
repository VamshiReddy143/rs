"use client";

import Image from "next/image";
import React, { useEffect, useRef, useLayoutEffect } from "react";
import Lenis from "lenis"; // Removed { LenisOptions } since it’s causing issues
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Extend LenisOptions type to include 'smooth' if needed (custom type)
interface CustomLenisOptions {
  duration?: number;
  easing?: (t: number) => number;
  smooth?: boolean;
}

const Hero = () => {
  const imageRef = useRef<HTMLImageElement>(null);

  // Initialize Lenis and sync with ScrollTrigger
  useEffect(() => {
    const lenisOptions: CustomLenisOptions = {
      duration: 0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true, // Re-added with custom type
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

    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        {
          scale: 0.8, // Start small
        },
        {
          scale: 1.1, // Grow to larger size
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageRef.current,
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
    <div className="lg:p-[12%] lg:pt-[10%] mt-[2em] p-5 lg:pt-0 bg-gray-200 text-black">
      <div className="flex flex-col pt-10 gap-5">
        <h1 className="lg:text-[5em] text-[2em] font-bold">We Grow Together!</h1>
        <p className="text-[1.2em]">
          If you want to level up your career at a company in constant motion, you’ve come to the right place.
        </p>
        <div className="lg:mt-[7em] mt-[4em]">
          <Image
            ref={imageRef}
            src="/meeting.jpg"
            alt="team"
            width={900}
            height={900}
            className="w-full h-full transform"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-col lg:flex-row justify-between gap-10 mt-[10em]">
        <div>
          <h1 className="lg:text-[3em] text-[2em] font-semibold leading-tight">
            We believe in fostering a culture of creativity, autonomy, and ownership.
          </h1>
          <p className="lg:text-[1.5em] text-[1.2em] font-semibold mt-7">
            We encourage every member of our team to propose new ideas and make important decisions. By empowering
            individuals to think and act as leaders, we create a dynamic and innovative environment that drives growth
            and success. We nurture talent.
          </p>
        </div>
        <div className="lg:mt-[10em] mt-[7em]">
          <h1 className="lg:text-[3em] text-[2em] font-semibold leading-tight">
            We aim to achieve the highest quality outcomes.
          </h1>
          <p className="lg:text-[1.5em] text-[1.2em] font-semibold mt-7">
            Our challenging projects require excellent results. As a team, we embrace continuous improvement in all
            aspects of our work, from processes and capabilities to services. We seek self-improvement. We strive as a
            team. We grow together.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;