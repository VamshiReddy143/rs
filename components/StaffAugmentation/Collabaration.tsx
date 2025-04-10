"use client"; // Required for client-side features in Next.js App Router
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const Collabaration = () => {
    const leftSectionRef = useRef(null); // Ref for the image
    const rightSectionRef = useRef(null); // Ref for the text content

    useEffect(() => {
        // Animation for the left section (image)
        gsap.fromTo(
            leftSectionRef.current,
            { opacity: 0, y: 100, scale: 0.9 }, // Start state: invisible, below, slightly scaled down
            {
                opacity: 1,
                y: 0, // End state: fully visible and in position
                scale: 1,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: leftSectionRef.current,
                    start: 'top 80%', // Animation starts when top is 80% from viewport top
                    end: 'top 20%',
                    toggleActions: 'play none none reverse', // Play on enter, reverse on leave
                },
            }
        );

        // Animation for the right section (text content)
        gsap.fromTo(
            rightSectionRef.current,
            { opacity: 0, x: 100 }, // Start state: invisible and shifted right
            {
                opacity: 1,
                x: 0, // End state: fully visible and in position
                duration: 1,
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
        <div className="lg:min-h-screen  flex  lg:flex-row md:flex-col-reverse flex-col-reverse  justify-between items-center">
            <div ref={leftSectionRef} className="lg:w-[40%] w-full relative">
                <Image
                    src="/collabaration.png"
                    alt="team"
                    width={900}
                    height={900}
                    className="h-full w-full  object-cover"
                />
            </div>
            <div
                ref={rightSectionRef}
                className="flex flex-col items-start gap-6 lg:w-[42%]"
            >
                <p className="text-gray-400">Agile & Fast</p>
                <h1 className="text-[2.2em] font-bold">
                    Close Collaboration & Continuous Improvement
                </h1>
                <p className="text-[1.2em] text-gray-400">
                    Rootstrap practices agile development to maximize communication, user validation, and speed to market. This means sprint planning together, plus weekly demos, daily standups, and shared Slack so we always stay in sync.
                </p>
                <button className="mt-10 border bg-transparent p-3 rounded-xl cursor-pointer">
                    Get In Touch ➔
                </button>
            </div>
        </div>
    );
};

export default Collabaration;