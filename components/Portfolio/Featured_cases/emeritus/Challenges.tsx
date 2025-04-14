"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Lenis from "lenis";

const Challenges = () => {
  const wimg1Ref = useRef<HTMLImageElement | null>(null);
  const wimg2Ref = useRef<HTMLImageElement | null>(null);
  const wimg3Ref = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // Removed 'smooth' as it’s not a valid option
    });

    let lastScrollY = 0;

    const handleScroll = () => {
      const scrollY = lenis.scroll;
      const moveFactor = 1;
      const waveSpeed = 0.005;
      const waveAmplitude = 6;
      const maxMove = 150;

      const isScrollingUp = scrollY < lastScrollY;
      lastScrollY = scrollY;

      if (
        wimg1Ref.current &&
        wimg2Ref.current &&
        wimg3Ref.current
      ) {
        const getWaveOffset = (offset: number, speedMultiplier = 1) =>
          Math.sin(scrollY * waveSpeed * speedMultiplier + offset) * waveAmplitude;

        [wimg1Ref, wimg2Ref, wimg3Ref].forEach((ref, index) => {
          const waveOffset = getWaveOffset(index, 1 + index * 0.2);
          const baseMove = isScrollingUp ? scrollY * moveFactor : -scrollY * moveFactor;
          const move = baseMove + waveOffset;

          ref.current!.style.transform = `translateX(${Math.max(
            -maxMove,
            Math.min(maxMove, move)
          )}px)`;
          ref.current!.style.marginTop = `${10 + waveOffset}px`;
        });
      }
    };

    lenis.on("scroll", handleScroll);
    handleScroll();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.off("scroll", handleScroll);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-black text-white">
      <div className="lg:px-[3.2em] pt-[3em] pb-[1em] text-[3.4em] font-semibold mx-auto mr-10">
        A progressive transformation that enhanced{" "}
        <span className="inline bg-gradient-to-t from-green-600 to-green-600 bg-[length:100%_0.3em] bg-no-repeat bg-bottom">
          Digital Presence
        </span>{" "}
        and boosted conversions
      </div>

      <div className="lg:flex items-start justify-between gap-[10em] lg:pl-[10em] mx-auto lg:pl-[4em] pt-[20em] px-3 pb-[1em]">
        <h1 className="text-[3em] font-semibold">
          What <span className="block">we did?</span>
        </h1>

        <div className="flex gap-5">
          <Image
            ref={wimg1Ref}
            src={"/wimg1.jpg"}
            width={900}
            height={900}
            alt="team"
            className="w-full lg:h-[40em] h-[20em] mt-10"
            style={{
              transition: "transform 0.5s ease, margin-top 0.5s ease",
              willChange: "transform, margin-top",
            }}
          />
          <Image
            ref={wimg2Ref}
            src={"/wimg2.jpg"}
            width={900}
            height={900}
            alt="team"
            className="w-full lg:h-[40em] h-[20em]"
            style={{
              transition: "transform 0.5s ease, margin-top 0.5s ease",
              willChange: "transform, margin-top",
            }}
          />
          <Image
            ref={wimg3Ref}
            src={"/wimg3.jpg"}
            width={900}
            height={900}
            alt="team"
            className="w-full lg:h-[40em] h-[20em] mt-10"
            style={{
              transition: "transform 0.5s ease, margin-top 0.5s ease",
              willChange: "transform, margin-top",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Challenges;