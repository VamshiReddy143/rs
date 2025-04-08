"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import { cn } from "@/lib/utils";

// Separate company arrays for top and bottom
const topCompanies = [
  { name: "MasterClass", logo: "/logos/company-a.png" },
  { name: "The Farmers Dog", logo: "/logos/company-b.png" },
  { name: "brightwheel", logo: "/logos/company-c.png" },
  { name: "BetterUp", logo: "/logos/company-d.png" },
  { name: "Google", logo: "/logos/company-e.png" },
];

const bottomCompanies = [
  { name: "salesforce", logo: "/logos/company-i.png" },
  { name: "SONY", logo: "/logos/company-f.png" },
  { name: "EPSON", logo: "/logos/company-g.png" },
  { name: "DoorSpace", logo: "/logos/company-h.png" },
  { name: "Globalization Partners", logo: "/logos/company-j.png" },
];

// New ScrollNames component
interface ScrollNamesProps {
  companies: typeof topCompanies;
}

const ScrollNames: React.FC<ScrollNamesProps> = ({ companies }) => {
  return (
    <>
      {companies.map((company, index) => (
        <div key={index} className="inline-flex items-center mx-8">
          {/* <Image
            src={company.logo}
            alt={`${company.name} logo`}
            width={100}
            height={50}
            className="object-contain"
          /> */}
          <span className="text-4xl font-bold">{company.name}</span>
        </div>
      ))}
    </>
  );
};

interface ParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction: 'left' | 'right';
}

export const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

function ParallaxText({ children, direction }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollProgress = useSpring(scrollY, {
    damping: 50,
    stiffness: 400,
  });

  const [repetitions, setRepetitions] = useState(1);
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

  const x = useTransform(
    scrollProgress,
    [0, 1000],
    direction === 'left' ? [0, -200] : [-20, 100],
    { clamp: false }
  );

  useEffect(() => {
    const unsubscribe = scrollProgress.onChange((latest) => {
      const movement = direction === 'left' ? -latest * 0.2 : latest * 0.2;
      baseX.set(movement);
    });
    return () => unsubscribe();
  }, [baseX, scrollProgress, direction]);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden whitespace-nowrap"
    >
      <motion.div className="inline-block" style={{ x }}>
        {Array.from({ length: repetitions }).map((_, i) => (
          <span key={i} ref={i === 0 ? textRef : null} className="inline-flex items-center gap-16">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function VelocityScroll({ className, ...props }: VelocityScrollProps) {
  return (
    <div
      className={cn(
        "relative w-full flex flex-col items-center justify-center gap-12",
        className
      )}
      {...props}
    >
      <ParallaxText direction="left">
        <ScrollNames companies={topCompanies} />
      </ParallaxText>
      <ParallaxText direction="right">
        <ScrollNames companies={bottomCompanies} />
      </ParallaxText>
    </div>
  );
}

interface VelocityScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Hero = () => {
  return (
    <div id="hero">
      <div className='min-h-screen flex items-center justify-between'>
        <div className='w-[36%]'>
          <h1 className='text-[3em] font-extrabold leading-tight'>
            Accelerate Your <span className='block'>Development</span> & Drive Innovation
          </h1>
          <p className='text-[19px] text-gray-400 mt-4 mr-2 leading-[33px]'>
            We are a data-driven, nearshore software agency that values speed, performance, and scalability. That's why we consistently surpass benchmarks for client retention after 750+ product launches and 13 years in business.
          </p>
          <button className='text-[18px] bg-transparent text-white px-4 py-2 rounded-xl cursor-pointer border mt-10'>
            Get in Touch ➔
          </button>
        </div>

        <div className='w-[60%] relative'>
          <video autoPlay muted loop className="w-[60em] h-[35em] object-cover rounded-xl">
            <source src="/videos/homevideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className='absolute flex flex-col right-0 bottom-0 items-center rounded-tl-xl justify-center w-fit h-fit px-2 py-3 bg-black'>
            <Image
              src="https://cdn.prod.website-files.com/63f902d79a33f71d496cde07/66f5b9ac256e1a355eccc02f_clutch-box.svg"
              alt="stars"
              width={900}
              height={900}
              className="h-[3em] w-[7em] mt-3"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mb-10">
        <p className="rounded-lg bg-gray-800 px-4 py-2">Trusted By 100s of High-Growth Startups & Industry Leaders</p>
      </div>
      
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-12">
        <VelocityScroll />
      </div>
    </div>
  );
};

export default Hero;