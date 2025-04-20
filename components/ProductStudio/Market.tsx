"use client"; // Add this if using Next.js App Router and client-side features
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const Market = () => {
    const leftSectionRef = useRef(null);
    const rightSectionRef = useRef(null);

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
                    start: 'top 80%', // Animation starts when the top of the element is 80% from the top of the viewport
                    end: 'top 20%', // Ends when the top of the element is 20% from the top
                    toggleActions: 'play none none reverse', // Play on enter, reverse on leave
                },
            }
        );

        // Animation for the right section (image)
        gsap.fromTo(
            rightSectionRef.current,
            { opacity: 0, x: 100, scale: 0.8 }, // Start state: invisible, shifted right, and slightly scaled down
            {
                opacity: 1,
                x: 0,
                scale: 1, // End state: fully visible, in position, and normal size
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

        // Cleanup ScrollTrigger on component unmount
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <div className="lg:py-[6em] lg:flex justify-between items-start">
           <div className='lg:flex  items-center justify-center gap-[4em]'>
           <div
                ref={leftSectionRef}
                className="flex flex-col items-start gap-6 lg:w-[50%]"
            >
                 <p className="text-[#bcbcc0] text-[16px]">Design, Development & QA</p>
                 <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className="text-[36px] font-semibold leading-tight">Go To Market With Confidence & Speed</h1>
                 <p className="text-[16px] text-[#bcbcc0] leading-loose">
                Rootstrap has owned more than 750 product launches over 13 years (more than 1 per week!) thanks to our full-service studio with product, design, development, QA, and DevOps, plus dedicated support during and after launch.
                </p>
                <Link href={"/Contact"}>
               <button className="mt-10 border bg-transparent px-3 py-2 rounded-lg cursor-pointer hover:bg-white/10 hover:border-white/10 hover:text-white/70 transition-colors">
               Get In Touch <span className='ml-2'>➔</span>
                </button>
               </Link>
            </div>

            <div ref={rightSectionRef} className="lg:w-[50%] relative flex justify-center items-center mt-7 lg:mt-0">
                <Image
                    src="/market.jpg"
                    alt="team"
                    width={900}
                    height={900}
                    className="lg:h-full lg:w-full h-[80%] w-full object-cover"
                />
            </div>
           </div>
        </div>
    );
};

export default Market;