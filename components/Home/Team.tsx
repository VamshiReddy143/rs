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
        <h1 className="lg:text-[3em] text-[2em] font-bold">
          The Team Behind The Products You Know
        </h1>
        <p className="text-[20px] text-gray-400">
          We have partnered with 10+ billion-dollar companies on their flagship products.
        </p>
      </div>

      <div className="mt-10 lg:flex gap-10">
       <div className="relative lg:w-[70%] w-full">
       <Link href={"/Portfolio/Featuredcases/masterclass"}>
          <Image
            src={img1}
            alt="team"
            width={900}
            height={900}
            className="lg:h-[40em] h-[20em] w-full object-cover relative"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 hover:opacity-0" />
          <h1 className="absolute bottom-0 esquerda-0 lg:p-1 p-3  lg:text-[1.7em] text-[1.2em] transform -translate-x-1/70 lg:pl-7 lg:pr-[6em] text-left   font-bold text-white">
            Building The Most Premium Learning Experience On the Planet
          </h1>
       </Link>
        </div>

        <div className="relative lg:w-[30%]">
        <Link href={"/Portfolio/Featuredcases/farmers_dog"}>
          <Image
            src={img2}
            alt="team"
            width={900}
            height={900}
            className="lg:h-[40em] h-[20em] object-cover relative"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 hover:opacity-0" />
          <h1 className="absolute bottom-0  left-0 lg:p-1 p-3  lg:text-[1.7em] text-[1.2em] transform -translate-x-1/70 lg:pl-7 text-left   font-bold text-white">
           Delivering Delight For The Largest Pet Startup
          </h1>
          </Link>
        </div>
      </div>

      <div className="lg:flex justify-center gap-7 text-center">
        <div className="flex flex-col lg:gap-10 gap-5 lg:w-[30%] mx-auto lg:mt-10 mt-5 relative">
          <div className="relative">
          <Link href={"/Portfolio/Featuredcases/emeritus"}>
            <Image src={img3} alt="team" width={900} height={900} className=""/>
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 hover:opacity-0" />
            <h1 className="absolute bottom-0 left-0 lg:p-1 p-3  lg:text-[1.7em] text-[1.2em] transform -translate-x-1/70 lg:pl-7  text-left  font-bold text-white">
              Making Higher Education Accessible Online
            </h1>
            </Link>
          </div>

          <div className="relative">
          <Link href={"/Portfolio/Featuredcases/madison"}>
            <Image src={img4} alt="team" width={900} height={900} className="" />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 hover:opacity-0" />
            <h1 className="absolute bottom-0 left-0 lg:p-1 p-3  lg:text-[1.7em] text-[1.2em] transform -translate-x-1/70 lg:pl-7 text-left  font-bold text-white">
              Launching a Critical Mobile App During Covid
            </h1>
            </Link>
          </div>
        </div>

        <div className="relative lg:w-[70%] aspect-[2/2] lg:aspect-[3/2] mt-7 overflow-hidden rounded-xl">
        <Link href={"/Portfolio/Case_Studies"}>
          <Image src={img5} alt="team" fill className="" />
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 hover:opacity-0" />
          <h1 className="absolute bottom-0 left-0 lg:p-1 p-3  lg:text-[1.7em] text-[1.2em] transform -translate-x-1/70 lg:pl-7 text-left  font-bold text-white">
            Combining saas, Consumer & Payments into The industry&apos;s
            <span className="lg:block">
              #1 Platform For Early Education
            </span>
          </h1>
          </Link>
        </div>
      </div>

     <Link href={"/Portfolio"}>
     <div className="flex flex-col items-center justify-center gap-4 text-center mt-20">
        <button className="border-1 border-white text-white px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-700 hover:text-white transition duration-300 ease-in-out">
          View All Case Studies
        </button>
      </div>
     </Link>

      {/* <div className="flex flex-col items-center justify-center mt-30">
        <p className="rounded-lg bg-gray-800 px-4 py-2">
          Our Clients Are Backed by the World&apos;s Leading Investors
        </p>
      </div> */}
      {/* <div
        ref={scrollSectionRef}
        className="relative hidden md:flex flex w-full flex-col items-center justify-center overflow-hidden py-12 gap-12"
      >
        <ParallaxText direction="left" targetRef={scrollSectionRef}>
          <ScrollNames investors={teamTopInvestors} />
        </ParallaxText>
        <ParallaxText direction="right" targetRef={scrollSectionRef}>
          <ScrollNames investors={teamBottomInvestors} />
        </ParallaxText>
      </div> */}
    </div>
  );
};

export default Team;