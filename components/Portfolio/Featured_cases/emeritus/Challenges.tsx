"use client";

import React, { useEffect, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Custom LenisOptions type to include 'smooth'
interface CustomLenisOptions {
  duration?: number;
  easing?: (t: number) => number;
  smooth?: boolean;
}

gsap.registerPlugin(ScrollTrigger);

const Challenges = () => {
  const whityRef = useRef<HTMLImageElement>(null);
  const wimg1Ref = useRef<HTMLImageElement>(null);
  const wimg2Ref = useRef<HTMLImageElement>(null);
  const wimg3Ref = useRef<HTMLImageElement>(null);

  // Initialize Lenis and sync with ScrollTrigger
  useEffect(() => {
    const lenisOptions: CustomLenisOptions = {
      duration: 1.5,
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
      }),
    });

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    const handleScroll = () => {
      if (whityRef.current) {
        const scrollY = lenis.scroll;
        const floatAmplitude = 50;
        const floatSpeed = 0.005;
        const floatOffset = Math.sin(scrollY * floatSpeed) * floatAmplitude;
        const verticalMove = scrollY > 0 ? -floatOffset : floatOffset;
        whityRef.current.style.transform = `translateY(${verticalMove}px)`;
      }
    };

    lenis.on("scroll", handleScroll);
    handleScroll();

    function raf(time: number) { // Explicitly typed 'time' as number
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.off("scroll", handleScroll);
      lenis.destroy();
    };
  }, []);

  // Initialize GSAP animations after DOM is ready
  useLayoutEffect(() => {
    ScrollTrigger.refresh();

    if (wimg1Ref.current && wimg2Ref.current && wimg3Ref.current) {
      // wimg1: Wavy entrance from right
      gsap.fromTo(
        wimg1Ref.current,
        {
          x: window.innerWidth,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          ease: "power2.out",
          duration: 3,
          scrollTrigger: {
            trigger: wimg1Ref.current,
            scroller: document.body,
            start: "top 120%",
            end: "+=800",
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              const waveAmplitude = 50;
              const waveFrequency = 0.1; // Unique frequency
              const waveOffset = Math.sin(progress * Math.PI * waveFrequency) * waveAmplitude;
              gsap.set(wimg1Ref.current, { y: waveOffset });
            },
            onEnter: () => console.log("wimg1 entered"),
            onLeaveBack: () => console.log("wimg1 leaving back"),
          },
        }
      );

      // wimg2: Wavy entrance from right with different timing
      gsap.fromTo(
        wimg2Ref.current,
        {
          x: window.innerWidth + 100, // Offset start position
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          ease: "power2.out",
          duration: 3.2, // Slightly longer duration
          scrollTrigger: {
            trigger: wimg2Ref.current,
            scroller: document.body,
            start: "top 150%",
            end: "+=850",
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              const waveAmplitude = 70;
              const waveFrequency = 0.12; // Different frequency
              const waveOffset = Math.sin(progress * Math.PI * waveFrequency) * waveAmplitude;
              gsap.set(wimg2Ref.current, { y: waveOffset });
            },
            onEnter: () => console.log("wimg2 entered"),
            onLeaveBack: () => console.log("wimg2 leaving back"),
          },
        }
      );

      // wimg3: Wavy entrance from right with unique timing
      gsap.fromTo(
        wimg3Ref.current,
        {
          x: window.innerWidth + 200, // Further offset start position
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          ease: "power2.out",
          duration: 2.8, // Slightly shorter duration
          scrollTrigger: {
            trigger: wimg3Ref.current,
            scroller: document.body,
            start: "top 150%",
            end: "+=750",
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              const waveAmplitude = 60;
              const waveFrequency = 0.15; // Different frequency
              const waveOffset = Math.sin(progress * Math.PI * waveFrequency) * waveAmplitude;
              gsap.set(wimg3Ref.current, { y: waveOffset });
            },
            onEnter: () => console.log("wimg3 entered"),
            onLeaveBack: () => console.log("wimg3 leaving back"),
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }} className="bg-[#212121] text-white overflow-hidden pt-[10em]">
      <div className="lg:px-[2em] pt-[1em] pb-[1em] lg:text-[55px] text-[2em] font-medium mx-auto leading-[77px]">
        A progressive transformation that enhanced{" "}
        <span className="inline bg-gradient-to-t from-green-600 to-green-600 bg-[length:100%_0.3em] bg-no-repeat bg-bottom">
          Digital Presence
        </span>{" "}
        and boosted conversions
      </div>

      <div className="lg:px-[3.2em] pt-[1em] pb-[1em] text-[3.4em] font-semibold mx-auto flex">
        <Image
          src={"/blacky2.jpg"}
          width={900}
          height={900}
          alt="team"
          className="object-cover lg:h-full h-[200px] rounded-full z-10"
        />
        <Image
          ref={whityRef}
          src={"/whity.jpg"}
          width={900}
          height={900}
          alt="team"
          className="object-cover lg:h-full h-[200px]  rounded-full z-20 -ml-10 "
          style={{
            transition: "transform 0.1s ease",
            willChange: "transform",
          }}
        />
      </div>

      <div className="lg:flex items-center justify-between lg:max-w-[90em] mx-auto lg:px-[4em] px-3 pt-[3em] pb-[1em]">
        <h1 className="lg:text-[48px] leading-[58px]  text-[2.4em] font-semibold w-[90%]">Challenge</h1>
        <div className="flex flex-col items-center gap-10">
          <p className="lg:text-[24px] text-[1.3em] font-medium leading-[36px]">
            Emeritus turned to Rootstrap to modernize the tech stack and enhance
            the performance of and results delivered by a mission-critical web
            application.
          </p>
          <p className="lg:text-[24px] text-[1.3em] font-medium leading-[36px]">
            The Emeritus Enrollment Engine was suffering from recurrent platform
            crashes that impacted enrollment and revenue generation, and needed a
            complete revamp to improve website performance, functionality, and end
            results.
          </p>
          <p className="lg:text-[24px] text-[1.3em] font-medium leading-[36px]">
            Our team was also tasked with the creation and execution of a
            migration plan to help Emeritus transition away from a legacy,
            underperforming technical solution.
          </p>
        </div>
      </div>

      <div className="lg:flex items-start justify-between gap-[10em] lg:pl-[10em] mx-auto lg:pl-[4em] lg:pt-[20em] pt-[5em] px-3 pb-[1em]">
        <h1 className="lg:text-[48px] leading-[58px] text-[2em] font-semibold">
          What <span className="block">we did?</span>
        </h1>

        <div className="flex gap-5">
          <Image
            ref={wimg1Ref}
            src={"/wimg1.jpg"}
            width={900}
            height={900}
            alt="team"
            className="w-full lg:h-[40em] h-[15em] mt-10"
          />
          <Image
            ref={wimg2Ref}
            src={"/wimg2.jpg"}
            width={900}
            height={900}
            alt="team"
            className="w-full lg:h-[40em] h-[15em]"
          />
          <Image
            ref={wimg3Ref}
            src={"/wimg3.jpg"}
            width={900}
            height={900}
            alt="team"
            className="w-full lg:h-[40em] h-[15em] mt-10"
          />
        </div>
      </div>

      <div className="mt-10 lg:pl-[10em]  lg:pl-[4em]  px-3 pb-[10em] lg:w-[70%]">
        <p className="lg:text-[24px] leading-[36px] pt-[3em]  text-[1.4em] font-medium ">
          We progressively grew the team from 4 engineers to a cross-functional team of more than 30 people.
        </p>
        <p className="lg:text-[24px] leading-[36px]  pb-[1em] text-[1.4em] font-medium ">
          We successfully migrated Emeritus’s previous Salesforce-based system onto a new platform while maintaining website functionality
        </p>
      </div>
    </div>
  );
};

export default Challenges;