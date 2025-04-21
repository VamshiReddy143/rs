"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Company arrays with logos and unique widths
const topCompanies = [
  { logo: "/logos/accel.svg", width: 100 },
  { logo: "/logos/nea.svg", width: 70 },
  { logo: "/logos/sony.svg", width: 190 },
  { logo: "/logos/br.svg", width: 160 },
  { logo: "/logos/bg.svg", width: 180 },
];

const bottomCompanies = [
  { logo: "/logos/bvp.svg", width: 120 },
  { logo: "/logos/ga.svg", width: 180 },
  { logo: "/logos/insight.svg", width: 100 },
  { logo: "/logos/la.svg", width: 190 },
  { logo: "/logos/72.svg", width: 170 },
  { logo: "/logos/aeq.svg", width: 140 },
];

// ScrollNames component to display logos
interface ScrollNamesProps {
  companies: typeof topCompanies;
  gap: string; // New prop for custom gap
}

const ScrollNames: React.FC<ScrollNamesProps> = ({ companies, gap }) => {
  return (
    <div className={`flex flex-row justify-center items-center gap-[${gap}] w-full min-w-[100vw]`}>
      {companies.map((company, index) => (
        <div key={index} className="flex-shrink-0">
          <Image
            src={company.logo}
            alt={`logo-${index}`}
            width={company.width}
            height={10}
            className="object-contain"
            onError={() => console.error(`Failed to load ${company.logo}`)}
          />
        </div>
      ))}
    </div>
  );
};

interface ParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction: "left" | "right";
  containerRef: React.RefObject<HTMLDivElement | null>; // Allow null
}

export const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

function ParallaxText({ children, direction, containerRef }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["end end", "start start"], // Animate when component is in view
  });

  const scrollProgress = useSpring(scrollYProgress, {
    damping: 40,
    stiffness: 400,
  });

  const x = useTransform(
    scrollProgress,
    [0, 1],
    direction === "left" ? [400, -900] : [-600, 900], // Adjusted for faster, centered start
    { clamp: false }
  );

  useEffect(() => {
    const unsubscribe = scrollProgress.onChange((latest) => {
      console.log(`scrollYProgress (${direction}):`, latest); // Debug progress
      const movement = direction === "left" ? -latest * 300 : latest * 300;
      baseX.set(movement);
    });
    return () => unsubscribe();
  }, [baseX, scrollProgress, direction]);

  return (
    <div className="w-full overflow-hidden whitespace-nowrap flex justify-center">
      <motion.div className="inline-block" style={{ x }}>
        <span className="inline-flex items-center justify-center gap-16">
          {children}
        </span>
      </motion.div>
    </div>
  );
}

export function VelocityScroll({ className, ...props }: VelocityScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full flex flex-col items-center justify-center gap-6",
        className
      )}
      {...props}
    >
      <ParallaxText direction="left" containerRef={containerRef}>
        <ScrollNames companies={topCompanies} gap="11em" />
      </ParallaxText>
      <ParallaxText direction="right" containerRef={containerRef}>
        <ScrollNames companies={bottomCompanies} gap="10em" />
      </ParallaxText>
    </div>
  );
}

interface VelocityScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const BlogScroller = () => {
  return (
    <div id="hero" className="w-full">
      <div className="flex flex-col items-center justify-center my-8 lg:my-10 px-4">
        <p className="rounded-lg bg-[#242425] px-4 py-2 text-sm sm:text-base text-center text-[#bcbcc0] font-normal leading-[32px]">
          Trusted By 100s of High-Growth Startups & Industry Leaders
        </p>
      </div>

      <div className="relative w-full flex flex-col items-center hidden md:block justify-center overflow-hidden py-8 lg:py-1">
        <VelocityScroll />
      </div>

      <div className="md:hidden flex justify-between items-start px-7 gap-9">
        <div className="flex flex-col gap-15 items-center">
          <Image src={"/logos/accel.svg"} alt="tools" width={80} height={900} />
          <Image src={"/logos/nea.svg"} alt="tools" width={70} height={900} />
          <Image src={"/logos/bw.svg"} alt="tools" width={150} height={900} />
          <Image src={"/logos/br.svg"} alt="tools" width={110} height={900} />
          <Image src={"/logos/bg.svg"} alt="tools" width={120} height={900} />
          <Image src={"/logos/72.svg"} alt="tools" width={120} height={900} />
        </div>
        <div className="flex flex-col gap-12 items-center">
          <Image src={"/logos/bvp.svg"} alt="tools" width={100} height={900} />
          <Image src={"/logos/ga.svg"} alt="tools" width={140} height={900} />
          <Image src={"/logos/insight.svg"} alt="tools" width={90} height={900} />
          <Image src={"/logos/la.svg"} alt="tools" width={130} height={900} />
          <Image src={"/logos/aeq.svg"} alt="tools" width={120} height={900} />
        </div>
      </div>
    </div>
  );
};

export default BlogScroller;