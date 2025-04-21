"use client"; // Required for client-side features in Next.js App Router
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

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
            { opacity: 0, y: 100 }, // Start state: invisible and shifted down
            {
                opacity: 1,
                y: 0, // End state: fully visible and in position
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
        <div className="lg:min-h-screen flex lg:flex-row md:flex-col-reverse flex-col-reverse justify-between items-center">
            <div ref={leftSectionRef} className="relative">
                <Image
                    src="/collabaration.png"
                    alt="team"
                    width={900}
                    height={900}
                    className="lg:h-[550px] lg:w-[500px] h-[450px] w-full py-[3em] md:py-0 object-cover"
                />
            </div>
            <div
                ref={rightSectionRef}
                className="flex flex-col items-start gap-6 lg:w-[47%] w-full"
            >
                <p className="text-[#bcbcc0] text-[16px]">Agile & Fast</p>
                <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className="text-[36px] font-semibold">
                    Close Collaboration & Continuous Improvement
                </h1>
                <p className="text-[16px] text-[#bcbcc0] leading-loose">
                    Rootstrap practices agile development to maximize communication, user validation, and speed to market. This means sprint planning together, plus weekly demos, daily standups, and shared Slack so we always stay in sync.
                </p>
                <Link href={"/Contact"}>
                    <button className="mt-10 border bg-transparent px-3 py-3 rounded-lg cursor-pointer hover:bg-white/10 hover:border-white/10 hover:text-white/70 transition-colors">
                        Get In Touch <span className='ml-2'>➔</span>
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Collabaration;