"use client"; // Add this if using Next.js App Router and client-side features
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const Kpi = () => {
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
        <div className="min-h-screen mt-[2em] flex justify-between items-center">
            <div
                ref={leftSectionRef}
                className="flex flex-col items-start gap-6 w-[50%]"
            >
                <p className="text-gray-400">Data-Driven</p>
                <h1 className="text-[2.2em] font-bold">Your KPIs Are Our KPIs</h1>
                <p className="text-[1.2em] text-gray-400">
                    Rootstrap understands that results are the only thing that really matter. We take ownership of our work and provide strategic recommendations every step of the way based on what we believe is best for your business.
                </p>
                <button className="mt-10 border bg-transparent p-3 rounded-xl cursor-pointer">
                    Get In Touch ➔
                </button>
            </div>

            <div ref={rightSectionRef} className="w-[40%] relative">
                <Image
                    src="/kpi.png"
                    alt="team"
                    width={900}
                    height={900}
                    className="h-full w-full"
                />
            </div>
        </div>
    );
};

export default Kpi;