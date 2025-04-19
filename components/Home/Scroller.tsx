
"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import React, { useEffect, useRef } from "react";
import Image from 'next/image';
import { cn } from "@/lib/utils";

// Company arrays with exactly 5 logos each, with unique widths
const topCompanies = [
    { logo: "/logos/mc.svg", width: 180 },
    { logo: "/logos/fd.svg", width: 70 },
    { logo: "/logos/bw.svg", width: 190 },
    { logo: "/logos/bu.svg", width: 190 },
    { logo: "/logos/google.svg", width: 140 },
];

const bottomCompanies = [
    { logo: "/logos/sf.svg", width: 120 },
    { logo: "/logos/sony.svg", width: 120 },
    { logo: "/logos/epson.svg", width: 180 },
    { logo: "/logos/ds.svg", width: 190 },
    { logo: "/logos/company-b.png", width: 170 },
];

// ScrollNames component to display logos
interface ScrollNamesProps {
    companies: typeof topCompanies;
}

const ScrollNames: React.FC<ScrollNamesProps> = ({ companies }) => {
    return (
        <div className="flex flex-row justify-center items-center gap-[11em] w-full">
            {companies.map((company, index) => (
                <div key={index} className="flex-shrink-0">
                    <Image
                        src={company.logo}
                        alt={`logo-${index}`}
                        width={company.width}
                        height={10}
                        className="object-contain"
                        onError={() => console.error(`Failed to load logo: ${company.logo}`)}
                    />
                </div>
            ))}
        </div>
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

    const x = useTransform(
        scrollProgress,
        [0, 1000],
        direction === 'left' ? [300, -100] : [0, 200],
        { clamp: false }
    );

    useEffect(() => {
        const unsubscribe = scrollProgress.onChange((latest) => {
            const movement = direction === 'left' ? -latest * 0.1 : latest * 0.1;
            baseX.set(movement);
        });
        return () => unsubscribe();
    }, [baseX, scrollProgress, direction]);

    return (
        <div className="w-full overflow-hidden whitespace-nowrap">
            <motion.div className="inline-block" style={{ x }}>
                <span className="inline-flex items-center gap-16">
                    {children}
                </span>
            </motion.div>
        </div>
    );
}

export function VelocityScroll({ className, ...props }: VelocityScrollProps) {
    return (
        <div
            className={cn(
                "relative w-full flex flex-col items-center justify-center gap-10",
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

const BlogScroller = () => {
    return (
        <div id="hero" className="w-full">
            <div className="flex flex-col items-center justify-center my-8 lg:my-10 px-4">
                <p className="rounded-lg bg-[#242425] px-4 py-2 text-sm sm:text-base text-center text-[#bcbcc0] font-normal leading-[32px]">
                    Trusted By 100s of High-Growth Startups & Industry Leaders
                </p>
            </div>

            <div className="relative w-full flex flex-col items-center justify-center overflow-hidden hidden lg:block py-8 lg:py-1">
                <VelocityScroll />
            </div>

        <div className="md:hidden flex justify-between items-center  px-7  gap-9">
            <div className="flex flex-col gap-10  items-center">
                <Image src={"/logos/mc.svg"} alt="tools" width={130} height={900}/>
                <Image src={"/logos/fd.svg"} alt="tools" width={40} height={900}/>
                <Image src={"/logos/bw.svg"} alt="tools" width={150} height={900}/>
                <Image src={"/logos/bu.svg"} alt="tools" width={110} height={900}/>
                <Image src={"/logos/google.svg"} alt="tools" width={90} height={900}/>
            </div>
            <div className="flex  flex-col gap-10  items-center">
            
                <Image src={"/logos/sf.svg"} alt="tools" width={80} height={900}/>
                <Image src={"/logos/sony.svg"} alt="tools" width={80} height={900}/>
                <Image src={"/logos/epson.svg"} alt="tools" width={90} height={900}/>
                <Image src={"/logos/ds.svg"} alt="tools" width={120} height={900}/>
                <Image src={"/logos/company-b.png"} alt="tools" width={120} height={900}/>
            </div>
         
        </div>
        </div>
    );
};

export default BlogScroller;
