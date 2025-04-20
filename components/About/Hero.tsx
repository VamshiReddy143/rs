import Image from "next/image";
import React from "react";


const Hero = () => {
  return (
    <div className="relative lg:max-w-[100em] mx-auto lg:px-[6em]  bg-[#f4f3ef]    text-black ">
      <div className="min-h-screen flex items-center  px-3 justify-between">
        <div className="text-black  lg:w-[80%]">
          <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className="lg:text-[72px] text-[2.5em]  font-[500] leading-tight">
            Calm, Steady Hands for the New Digital Economy
          </h1>
          <p style={{ fontFamily: 'Poppins, sans-serif' }} className="text-[20px] text-[#1b1b1b] font-normal leading-tight lg:mt-9 mt-3 lg:w-[90%]">
            Since 2011, we&apos;ve navigated accelerating technological change,
            developing custom software that enables our clients to embrace the
            future with confidence.
          </p>
        </div>
        <div className="absolute lg:right-[8em] lg:top-[14em] right-10 top-[11em] transform -translate-y-1/2">
          <Image
            src={"/triangle.svg"}
            alt="tools"
            width={900}
            height={900}
            className="h-10 w-10 animate-float lg:h-17 lg:w-60 md:h-60 md:w-60 sm:h-48 sm:w-48"
          />
        </div>
      </div>
      
    </div>
  );
};

export default Hero;