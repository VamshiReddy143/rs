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
    <div id="hero" className="w-full">
      <div className='  lg:min-h-screen flex flex-col-reverse min-w-full lg:flex-row mt-10 items-center justify-center lg:justify-between gap-8 lg:gap-0'>
        <div className='w-full lg:w-[36%] px-4 lg:px-0'>
          <h1 className='lg:text-[3em] text-[1.5em] sm:text-[2em] md:text-[2.5em] mt-6 lg:mt-0 font-extrabold leading-tight text-center lg:text-left'>
            Accelerate Your <span className='block'>Development</span> & Drive Innovation
          </h1>
          <p className='text-base sm:text-[19px] text-gray-400 mt-4 leading-relaxed text-center lg:text-left'>
            We are a data-driven, nearshore software agency that values speed, performance, and scalability. That‘s why we consistently surpass benchmarks for client retention after 750+ product launches and 13 years in business.
          </p>
          <div className="flex justify-center lg:justify-start">
            <button className='text-base sm:text-[18px] bg-transparent text-white px-4 py-2 rounded-xl cursor-pointer border mt-8 hover:bg-white/10 transition-colors'>
              Get in Touch ➔
            </button>
          </div>
        </div>

        <div className='w-full lg:w-[60%] pt-8 lg:pt-0 px-4 lg:px-0'>
          <div className="relative max-w-full mx-auto">
            <video 
              autoPlay 
              muted 
              loop 
              className="w-full max-w-[60em] h-auto lg:h-[35em] object-cover rounded-xl"
            >
              <source src="/videos/homevideo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className='absolute right-0 bottom-0 flex flex-col items-center rounded-tl-xl justify-center w-fit px-2 py-3 bg-black'>
              <Image
                src="https://cdn.prod.website-files.com/63f902d79a33f71d496cde07/66f5b9ac256e1a355eccc02f_clutch-box.svg"
                alt="stars"
                width={112}  // Actual pixel width
                height={48}  // Actual pixel height
                className="w-[7em] h-[3em] mt-3 object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center my-8 lg:my-10 px-4">
        <p className="rounded-lg bg-gray-800 px-4 py-2 text-sm sm:text-base text-center">
          Trusted By 100s of High-Growth Startups & Industry Leaders
        </p>
      </div>
      
      <div className="hidden sm:block relative w-full flex flex-col items-center justify-center overflow-hidden py-8 lg:py-12">
        <VelocityScroll />
      </div>
    </div>
  );
};

export default Hero;