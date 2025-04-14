"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { useScroll } from "framer-motion";
import { useTransform } from "framer-motion";
import { motion } from "framer-motion";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Define props type for Scroller
interface ScrollerProps {
  row1Images: string[]; // Array of image URLs for Row 1
  row2Images: string[]; // Array of image URLs for Row 2
  row3Images: string[]; // Array of image URLs for Row 3
}

const Scroller: React.FC<ScrollerProps> = ({ row1Images, row2Images, row3Images }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Transform scroll progress to x-translation for each row
  const x1 = useTransform(scrollYProgress, [0, 1], [-400, 200]); // First row: right on scroll down
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -200]); // Second row: left on scroll down
  const x3 = useTransform(scrollYProgress, [0, 1], [-800, 200]); // Third row: right on scroll down

  return (
    <div ref={containerRef} className="py-10 overflow-hidden">
      {/* Row 1: Moves right on scroll down */}
      <motion.div
        className="flex gap-4 mb-8"
        style={{ x: x1 }}
        transition={{ ease: "linear" }}
      >
        {[...row1Images, ...row1Images].map((src, index) => (
          <div key={`row1-${index}`} className="flex-shrink-0 lg:w-[400px] lg:h-[250px] w-[300px] h-[200px] relative">
            <Image
              src={src}
              alt={`Row 1 Image ${index}`}
              width={900}
              height={900}
              className="object-cover rounded-lg lg:w-[600px] lg:h-[250px] w-[400px] h-[200px]"
            />
          </div>
        ))}
      </motion.div>

      {/* Row 2: Moves left on scroll down */}
      <motion.div
        className="flex gap-4 mb-8"
        style={{ x: x2 }}
        transition={{ ease: "linear" }}
      >
        {[...row2Images, ...row2Images].map((src, index) => (
          <div key={`row2-${index}`} className="flex-shrink-0 lg:w-[400px] lg:h-[250px] w-[300px] h-[200px] relative">
            <Image
              src={src}
              alt={`Row 2 Image ${index}`}
              width={200}
              height={200}
              className="object-cover rounded-lg lg:w-[600px] lg:h-[250px] w-[400px] h-[200px]"
            />
          </div>
        ))}
      </motion.div>

      {/* Row 3: Moves right on scroll down */}
      <motion.div
        className="flex gap-4"
        style={{ x: x3 }}
        transition={{ ease: "linear" }}
      >
        {[...row3Images, ...row3Images].map((src, index) => (
          <div key={`row3-${index}`} className="flex-shrink-0 lg:w-[400px] lg:h-[250px] w-[300px] h-[200px] relative">
            <Image
              src={src}
              alt={`Row 3 Image ${index}`}
              width={200}
              height={200}
              className="object-cover rounded-lg lg:w-[600px] lg:h-[250px] w-[400px] h-[200px]"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const ScrollerDemo: React.FC = () => {
  const pimg1Ref = useRef<HTMLImageElement | null>(null);
  const pimg2Ref = useRef<HTMLImageElement | null>(null);
  const netflixRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2, // Adjust the smoothness of scrolling
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing function
    });

    // Lenis rAF (requestAnimationFrame) loop
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Apply GSAP ScrollTrigger animations with a delay for pimg2
    if (pimg1Ref.current && pimg2Ref.current) {
      gsap.to(pimg1Ref.current, {
        y: "+=50", // Move down by 30px when scrolling down
        ease: "none",
        scrollTrigger: {
          trigger: pimg1Ref.current,
          start: "top bottom", // Animation starts when the element enters the viewport
          end: "bottom top", // Animation ends when the element leaves the viewport
          scrub: true, // Smoothly scrub the animation based on scroll position
        },
      });

      gsap.to(pimg2Ref.current, {
        y: "+=50", // Move down by 30px when scrolling down
        ease: "none",
        delay: 1, // Delay the animation by 1 second
        scrollTrigger: {
          trigger: pimg2Ref.current,
          start: "top bottom", // Animation starts when the element enters the viewport
          end: "bottom top", // Animation ends when the element leaves the viewport
          scrub: true, // Smoothly scrub the animation based on scroll position
        },
      });

      gsap.to(netflixRef.current, {
        y: "-=50", // Move up by 50px when scrolling down
        ease: "none",
        scrollTrigger: {
          trigger: netflixRef.current,
          start: "top bottom", // Animation starts when the element enters the viewport
          end: "bottom top", // Animation ends when the element leaves the viewport
          scrub: true, // Smoothly scrub the animation based on scroll position
        },
      });
    }
    
  }, []);

  // Sample image URLs for each row
  const row1Images = ["/mcimg1.jpg", "/mcimg2.jpg", "/mcimg3.jpg", "/mcimg4.jpg"];
  const row2Images = ["/mcimg5.jpg", "/mcimg6.jpg", "/mcimg7.jpg", "/mcimg8.jpg"];
  const row3Images = ["/mcimg9.jpg", "/mcimg10.jpg", "/mcimg11.jpg", "/mcimg12.jpg"];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <div className="lg:px-[3.1em] pt-[3em] pb-[1em] text-[3.4em] font-semibold mx-auto">
        Helping{" "}
        <span className="inline bg-gradient-to-t from-red-500 to-red-500 bg-[length:100%_0.3em] bg-no-repeat bg-bottom">
          MasterClass
        </span>{" "}
        build new
        <span className="block">features and double its revenue</span>
      </div>

      {/* Scroller Component */}
      <Scroller row1Images={row1Images} row2Images={row2Images} row3Images={row3Images} />

      {/* Text Section */}
      <div className="lg:px-[10em] pb-[10em] lg:pt-[17em] pt-[5em] px-3 mx-auto flex flex-col gap-10">
        <p className="lg:text-[2.5em] text-[2em] leading-tight lg:w-[70%]">
          Masterclass needed to scale its engineering function and{" "}
          <span className="font-bold inline">
            enhance its product in pursuit of an ambitious growth plan
          </span>
          , but faced challenges sourcing local, talented programmers in ReactJS - their front-end programming language.
        </p>
        <p className="lg:text-[2.5em] text-[2em] leading-tight lg:w-[70%]">
          <span className="font-bold inline">
            Rootstrap emerged as the ideal partner,
          </span>{" "}
          combining common{" "}
          <span className="font-bold inline">
            values, deep technical and process expertise, and sufficient operating scale
          </span>{" "}
          for Masterclass to be able to achieve its ambitious goals.
        </p>
      </div>

      {/* Phone Section with Animated Images */}
      <div className="bg-red-700 h-[40vh] pt-10 flex items-center justify-center relative">
        {/* Base phone image */}
        <Image
          src={
            "https://cdn.prod.website-files.com/63f902d79a33f71d496cde07/6516d0d017d7d9c179aac2e0_phone1-p-800.webp"
          }
          width={600}
          height={600}
          alt="phone"
          className="relative "
        />

        {/* pimg1 - Moves up/down on scroll */}
        <Image
          ref={pimg1Ref}
          src={"/pimg1.jpg"}
          width={600}
          height={600}
          alt="phone"
          className="absolute z-[10]"
        />

        {/* pimg2 - Moves up/down on scroll with a 1-second delay */}
        <Image
          ref={pimg2Ref}
          src={"/pimg2.jpg"}
          width={600}
          height={600}
          alt="phone"
          className="absolute "
        />
      </div>

      {/* Final Text Section */}
      <div className="bg-white text-black  ">
        <div className="lg:px-[10em] pb-[10em] lg:pt-[27em] md:pt-[20em] pt-[15em] px-3 mx-auto lg:flex gap-10">
          <h1 className="lg:text-[2.7em] text-[2em] font-semibold leading-tight lg:w-[40em]">
            Elevates Front-End Capabilities for Ambitious Growth
          </h1>
          <p className="lg:text-[1.6em] text-[1.2em] leading-tight lg:mt-0 mt-5">
            Our team seamlessly integrated with MasterClass, working closely alongside their development and product teams. We began by addressing ReactJS and web development requirements and later expanded our collaboration, establishing new teams and expanding existing ones to handle multiple projects.
          </p>
        </div>
      </div>

      <div>
      <Image
  ref={netflixRef}
  src={"/netflix.jpg"}
  alt="team"
  width={900}
  height={900}
  className="w-[100vw] lg:h-[60vh] h-[30vh] object-cover"
/>
      </div>
    </div>
  );
};

export default ScrollerDemo;