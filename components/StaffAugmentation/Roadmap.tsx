"use client"; // Required for client-side features in Next.js App Router
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const Roadmap = () => {
    const leftSectionRef = useRef(null); // Ref for the text content
    const rightSectionRef = useRef(null); // Ref for the image

    useEffect(() => {
        // Animation for the left section (text content)
        gsap.fromTo(
            leftSectionRef.current,
            { opacity: 0, x: -100 }, // Start state: invisible and shifted left
            {
                opacity: 1,
                x: 0, // End state: fully visible and in position
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: leftSectionRef.current,
                    start: 'top 80%', // Animation starts when top is 80% from viewport top
                    end: 'top 20%',
                    toggleActions: 'play none none reverse', // Play on enter, reverse on leave
                },
            }
        );

        // Animation for the right section (image)
        gsap.fromTo(
            rightSectionRef.current,
            { opacity: 0, y: 100, scale: 0.9 }, // Start state: invisible, below, slightly scaled down
            {
                opacity: 1,
                y: 0, // End state: fully visible and in position
                scale: 1,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: rightSectionRef.current,
                    start: 'top 80%',
                    end: 'top 20%',
                    toggleActions: 'play none none reverse',
                },
            }
        );

        // Cleanup ScrollTrigger on unmount
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <div className="lg:min-h-screen mt-[2em] lg:flex justify-between items-center">
            <div
                ref={leftSectionRef}
                className="flex flex-col items-start gap-6 lg:w-[50%] w-full"
            >
                 <p className="text-[#bcbcc0] text-[16px]">Scalable & Flexible</p>
                 <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className="text-[36px] font-semibold">
                    Accelerate Your Roadmap with Multiple Cross-Functional Pods
                </h1>
                <p className="text-[16px] text-[#bcbcc0] leading-loose">
                    Rootstrap tackles large-scale projects with teams as large as 50 people operating across several independent working groups called &apos;pods&apos;, complete with engineers, PMs, QA, DevOps, designers, and more.
                </p>
                <Link href={"/Contact"}>
               <button className="mt-10 border bg-transparent px-3 py-3 rounded-lg cursor-pointer hover:bg-white/10 hover:border-white/10 hover:text-white/70 transition-colors">
               Get In Touch <span className='ml-2'>➔</span>
                </button>
               </Link>
            </div>

            <div ref={rightSectionRef} className="lg:w-[40%] relative">
                <Image
                    src="/roadmap.png"
                    alt="team"
                    width={900}
                    height={900}
                    className="lg:h-[550px] lg:w-[500px]  h-[450px] w-full py-[3em]  md:py-0 object-cover"
                />
            </div>
        </div>
    );
};

export default Roadmap;