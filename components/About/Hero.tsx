import Image from "next/image";
import React from "react";


const Hero = () => {
  return (
    <div className="min-h-screen relative ">
      <div className="min-h-screen flex items-center bg-gray-200 px-3 justify-between">
        <div className="text-black lg:px-[10em]  lg:w-[80%]">
          <h1 className="lg:text-[5em] text-[2.5em]  font-semibold leading-tight">
            Calm, Steady Hands for the New Digital Economy
          </h1>
          <p className="text-[1.5em] leading-tight lg:mt-5 mt-3 lg:w-[90%]">
            Since 2011, we've navigated accelerating technological change,
            developing custom software that enables our clients to embrace the
            future with confidence.
          </p>
        </div>
        <div className="absolute lg:right-[10em] lg:top-[10em] right-10 top-[11em] transform -translate-y-1/2">
          <Image
            src={"/triangle.svg"}
            alt="tools"
            width={900}
            height={900}
            className="h-10 w-10 animate-float lg:h-20 lg:w-80 md:h-60 md:w-60 sm:h-48 sm:w-48"
          />
        </div>
      </div>
      
    </div>
  );
};

export default Hero;