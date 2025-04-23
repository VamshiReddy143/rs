"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";

const MarketVideo = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const videoWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current && videoWrapperRef.current) {
        // Get the bounding rectangle of the section
        const sectionRect = sectionRef.current.getBoundingClientRect();

        // Calculate scroll progress (0 when fully out of view, 1 when fully in view)
        let scrollProgress = 0;

        // If the section is partially or fully in the viewport
        if (sectionRect.top < window.innerHeight && sectionRect.bottom > 0) {
          scrollProgress = Math.max(
            0,
            Math.min(1, 1 - sectionRect.top / window.innerHeight)
          );
        }

        // Apply width based on scroll progress (80% -> 100%)
        const newWidth = `${80 + scrollProgress * 20}%`;
        videoWrapperRef.current.style.width = newWidth;
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Initial call to set the correct state on page load
    handleScroll();

    return () => {
      // Cleanup the event listener
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={sectionRef} className="w-full bg-[#f4f3ef] pb-10">
      {/* Video Section */}
      <div className="flex items-center justify-center overflow-hidden">
        {/* Wrapper with dynamic width */}
        <div
          ref={videoWrapperRef}
          className="relative w-[80%] aspect-[20/10] overflow-hidden transition-all duration-500 ease-in-out"
        >
          {/* Video */}
          <video
            src="/videos/homevideo.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-0 left-0 w-full h-full  object-cover z-0"
          />

          {/* SVG Mask */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/mask3.svg"
              alt="tools"
              fill
              className="     pointer-events-none "
            />
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="text-black flex flex-col md:items-end items-start lg:mt-0 mt-10 px-3 lg:px-0  lg:pr-[9%] leading-tight">
        <h1 className="lg:text-[3.5em] text-[32px] leading-[38px] lg:leading-[59px] font-medium">
          Our Product Is
          <span className="block">Our People.</span>
        </h1>
        <p className="lg:text-[24px] text-[18px] leading-[26px] lg:leading-[36px] font-normal lg:mt-10 mt-5">
          We utilize the collective knowledge and{" "}
          <span className="block">experience of a large, diverse, world-</span>
          <span className="block">class team in order to consistently deliver results.</span>
        </p>
      </div>

      {/* Additional Sections */}
      <div className="text-black lg:flex gap-10 lg:max-w-[90em] mx-auto lg:px-[4em] px-3 lg:pt-[10em] pt-[5em] pb-[10em]">
        <div>
          <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className="lg:text-[45px] text-[2em] font-medium lg:leading-[54px] leading-[34px]">
            Our Goal Is Helping You Achieve Yours.
          </h1>
          <p style={{ fontFamily: 'Poppins, sans-serif' }} className="lg:text-[24px] font-normal text-[1.2em] lg:mt-10 mt-5">
            We are a nearshore software development consultancy that combines design,
            engineering, and strategic expertise to develop custom applications for clients
            seeking to <span className="font-bold">supercharge their impact and growth</span>. Our unique, long-term approach
            to client relationships mirrors the ethos of craftsmanship and care with which
            we build their products.
          </p>
        </div>

        <div className="lg:pt-[10em] pt-[5em]">
          <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className="lg:text-[45px] text-[2em] font-medium lg:leading-[54px] leading-[34px] ">
            It's Simple. Technology Should Serve You.
          </h1>
          <p style={{ fontFamily: 'Poppins, sans-serif' }} className="lg:text-[24px] font-normal text-[1.2em] lg:mt-10 mt-5">
            At the heart of each engagement we take on is this simple commitment: <span className="font-bold">
            to translate vision to value</span>. For demanding clients in education, healthcare,
            financial services, e-commerce, retail, and more, we've done just that. Across
            such broad scope, each project is governed by a non-negotiable principle: Value
            doesn't end with Delivery - and Delivery doesn't end with Launch.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketVideo;