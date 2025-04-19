"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";

// Import images with proper typing
import img1 from "@/public/team1.jpg";
import img2 from "@/public/team2.jpg";
import img3 from "@/public/team3.jpg";
import img4 from "@/public/team4.jpg";
import img5 from "@/public/team5.jpg";
import Link from "next/link";

// Define investor interface and arrays
interface Investor {
  name: string;
}

const teamTopInvestors: Investor[] = [
  { name: "Sequoia Capital" },
  { name: "Andreessen Horowitz" },
  { name: "Y Combinator" },
  { name: "SoftBank" },
  { name: "Accel" },
];

const teamBottomInvestors: Investor[] = [
  { name: "Tiger Global" },
  { name: "Bessemer" },
  { name: "Kleiner Perkins" },
  { name: "Founders Fund" },
  { name: "Index Ventures" },
];

// ScrollNames component with props typing
interface ScrollNamesProps {
  investors: Investor[];
}

const ScrollNames: React.FC<ScrollNamesProps> = ({ investors }) => {
  return (
    <>
      {investors.map((investor, index) => (
        <div key={index} className="inline-flex items-center mx-8">
          <span className="text-4xl font-bold">{investor.name}</span>
        </div>
      ))}
    </>
  );
};

// ParallaxText component with props typing
interface ParallaxTextProps {
  children: React.ReactNode;
  direction: "left" | "right";
  targetRef: React.RefObject<HTMLDivElement | null>; // Changed to allow null
}

const ParallaxText: React.FC<ParallaxTextProps> = ({ children, direction, targetRef }) => {
  const baseX: MotionValue<number> = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const scrollProgress = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 400,
  });
  const [repetitions, setRepetitions] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const calculateRepetitions = () => {
      if (containerRef.current && textRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const textWidth = textRef.current.offsetWidth;
        const newRepetitions = Math.ceil(containerWidth / textWidth) + 2;
        setRepetitions(newRepetitions);
      }
    };

    calculateRepetitions();
    window.addEventListener("resize", calculateRepetitions);
    return () => window.removeEventListener("resize", calculateRepetitions);
  }, [children]);

  const SPEED_FACTOR = 1000;
  const x = useTransform(
    scrollProgress,
    [0, 1],
    direction === "left" ? [0, -SPEED_FACTOR] : [-2000, SPEED_FACTOR],
    { clamp: false }
  );

  useEffect(() => {
    const unsubscribe = scrollProgress.on("change", (latest: number) => {
      const movement = direction === "left" ? -latest * SPEED_FACTOR : latest * SPEED_FACTOR;
      baseX.set(movement);
    });
    return () => unsubscribe();
  }, [baseX, scrollProgress, direction]);

  return (
    <div ref={containerRef} className="w-full overflow-hidden whitespace-nowrap">
      <motion.div className="inline-block" style={{ x }}>
        {Array.from({ length: repetitions }).map((_, i) => (
          <span
            key={i}
            ref={i === 0 ? textRef : null}
            className="inline-flex items-center gap-16"
          >
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const Team: React.FC = () => {
  const scrollSectionRef = useRef<HTMLDivElement>(null);

  return (
    <div id="team" className="min-h-screen mt-30">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <h1  style={{ fontFamily: 'Poppins, sans-serif' }} className="lg:text-[48px] text-[48px] font-semibold leading-tight">
          The Team Behind The Products You Know
        </h1>
        <p className="text-[21px] text-[#bcbcc0]">
          We have partnered with 10+ billion-dollar companies on their flagship products.
        </p>
      </div>

      <div className="mt-5 lg:flex gap-5">
        <div className="relative lg:w-[70%] w-full overflow-hidden group">
          <Link href="/Portfolio/Featuredcases/masterclass">
            {/* Image with zoom effect on hover */}
            <Image
              src={img1}
              alt="team"
              width={900}
              height={900}
              className="lg:h-[40em] h-[20em] w-full object-cover transform transition-transform duration-500 group-hover:scale-105"
            />

            {/* Dark overlay that fades on hover */}
            <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-300" />

            {/* Smooth black fade at the bottom */}
            <div className="absolute bottom-0 left-0 w-full h-[4em] bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

            {/* Text on top of fade */}
            <h1 className="absolute bottom-5 left-0 z-20 pl-8 w-[70%] md:w-full lg:text-[24px] text-[20px] lg:pl-7 lg:pr-[6em] text-left font-semibold text-white">
              Building The Most Premium Learning Experience <span className="hidden md:block"> On the Planet</span>
            </h1>

          </Link>
        </div>



        <div className="relative lg:w-[35%] overflow-hidden group">
          <Link href="/Portfolio/Featuredcases/farmers_dog">
            {/* Image with zoom effect */}
            <Image
              src={img2}
              alt="team"
              width={900}
              height={900}
              className="lg:h-[40em] h-[20em] w-full object-cover transform transition-transform duration-500 group-hover:scale-[1.03]"
            />

            {/* Black overlay with fade on hover */}
            <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-300" />

            {/* Smooth gradient fade at bottom */}
            <div className="absolute bottom-0 left-0 w-full h-[4em] bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

            {/* Title text */}
            <h1 className="absolute bottom-0 left-0 z-20 pl-8 w-[70%] md:w-full lg:text-[24px] text-[1.2em] lg:pl-7 lg:pb-10 text-left font-semibold text-white">
              Delivering Delight For The Largest Pet Startup
            </h1>
          </Link>
        </div>

      </div>

      <div className="lg:flex justify-center gap-5 text-center">
        <div className="flex flex-col lg:gap-6 gap-5 lg:w-[35%] mx-auto lg:mt-5 mt-5 relative">
          <div className="relative overflow-hidden group">
            <Link href="/Portfolio/Featuredcases/emeritus">
              {/* Image with zoom on hover */}
              <Image
                src={img3}
                alt="team"
                width={900}
                height={900}
                className="w-full h-auto object-cover transform rounded-lg transition-transform duration-500 group-hover:scale-[1.03]"
              />

              {/* Dark overlay with smooth fade on hover */}
              <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-300" />

              {/* Black gradient at the bottom */}
              <div className="absolute bottom-0 left-0 w-full h-[4em] bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

              {/* Text on top of gradient */}
              <h1 className="absolute bottom-5 left-0 z-20 pl-8 w-[75%] md:w-full lg:text-[24px] text-[1.2em] lg:pl-7 text-left font-semibold text-white">
                Making Higher Education Accessible Online
              </h1>
            </Link>
          </div>


          <div className="relative overflow-hidden group">
            <Link href="/Portfolio/Featuredcases/madison">
              {/* Image with subtle zoom on hover */}
              <Image
                src={img4}
                alt="team"
                width={900}
                height={900}
                className="w-full h-auto object-cover rounded-lg transform transition-transform duration-500 group-hover:scale-[1.03]"
              />

              {/* Dark overlay that fades on hover */}
              <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-300" />

              {/* Soft bottom gradient for text readability */}
              <div className="absolute bottom-0 left-0 w-full h-[4em] bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

              {/* Headline text */}
              <h1 className="absolute bottom-5 left-0 z-20 pl-8 w-[75%] md:w-full lg:text-[24px] text-[1.2em] lg:pl-7 text-left font-semibold text-white">
                Launching a Critical Mobile App During Covid
              </h1>
            </Link>
          </div>

        </div>

        <div className="relative lg:w-[70%] aspect-[2/2] lg:aspect-[3/2] mt-5 overflow-hidden rounded-xl group">
          <Link href="/Portfolio/Case_Studies">
            {/* Image with zoom on hover */}
            <Image
              src={img5}
              alt="team"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />

            {/* Fading black overlay */}
            <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-300" />

            {/* Gradient at bottom for text readability */}
            <div className="absolute bottom-0 left-0 w-full h-[4em] bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

            {/* Headline text */}
            <h1 className="absolute bottom-5 left-0 z-20 pl-8 w-[70%] md:w-full lg:text-[24px] text-[1.2em] lg:pl-7 text-left font-semibold text-white line-clamp-3">
              Combining SaaS, Consumer & Payments into the industry&apos;s
              <span className="lg:block">
                #1 Platform For Early Education
              </span>
            </h1>
          </Link>
        </div>

      </div>

      <Link href={"/Portfolio"}>
        <div className="flex flex-col items-center justify-center gap-4 text-center mt-20">
          <button className="border-1 border-white text-white px-4 py-2 text-[16px] rounded-lg cursor-pointer hover:bg-white/10 hover:border-white/10 hover:text-white/70 transition-colors">
            View All Case Studies
          </button>
        </div>
      </Link>

    </div>
  );
};

export default Team;