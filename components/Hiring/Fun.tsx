import Image from "next/image";
import React from "react";

const Fun: React.FC = () => {
  return (
    <div className="lg:p-[10%] md:p-[5%] p-5 lg:min-h-screen px-2 bg-gray-200 text-black">
      <h1  style={{ fontFamily: 'Poppins, sans-serif' }} className="lg:text-[56px] w-[70%] lg:w-full text-[2em] md:text-[4em] font-medium  lg:leading-[67px]">
        Having fun is a key part of the process.
      </h1>

      <div className="mt-[10em] relative " style={{ minHeight: "800px" }}>
        <div
          className="lg:h-[300px] lg:w-[400px] md:h-[200px] md:w-[300px] h-[100px] w-[200px] absolute"
          data-scroll
          data-scroll-speed="1"
        >
          <Image
            src="/fun1.jpg"
            alt="team"
            width={900}
            height={900}
            className="object-cover w-full h-full"
          />
        </div>

        <div
          className="h-[200px] w-[200px] md:hidden absolute ml-[7em] mt-[5em]"
          data-scroll
          data-scroll-speed="1.5"
        >
          <Image
            src="/fun3.jpg"
            alt="team"
            width={900}
            height={900}
            className="object-cover w-full h-full"
          />
        </div>
        <div
          className="lg:h-[500px] lg:w-[500px] md:h-[300px] md:w-[300px] h-[200px] w-[200px] absolute lg:ml-[5em] lg:mt-[13em] md:ml-[5em] md:mt-[8em] mt-[15em]"
          data-scroll
          data-scroll-speed="2"
        >
          <Image
            src="/fun2.jpg"
            alt="team"
            width={900}
            height={900}
            className="object-cover w-full h-full"
          />
        </div>
        <div
          className="lg:h-[600px] lg:w-[600px] md:h-[350px] md:w-[350px] hidden md:block absolute lg:ml-[34em] md:ml-[22em]"
          data-scroll
          data-scroll-speed="1.5"
        >
          <Image
            src="/fun3.jpg"
            alt="team"
            width={900}
            height={900}
            className="object-cover w-full h-full"
          />
        </div>
        <div
          className="lg:h-[300px]  h-[150px]  absolute lg:ml-[53em] lg:mt-[30em] md:mt-[20em] md:ml-[31em] mt-[25em] ml-[10em]"
          data-scroll
          data-scroll-speed="3"
        >
          <Image
            src="/fun4.jpg"
            alt="team"
            width={900}
            height={900}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div>
        <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className="lg:mt-[4em] md:mt-0 lg:text-[56px] leading-[42px] lg:leading-[84px] text-[35px] text-right font-medium">
          We believe that collaborative, close-knit{" "}
          <span>teams can achieve the unthinkable.</span>
        </h1>
      </div>
    </div>
  );
};

export default Fun;