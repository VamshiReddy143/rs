import Image from 'next/image';
import React from 'react';

const Hero = () => {
  return (
    <div className='lg:p-[10%] lg:pt-[10%] mt-[2em] p-5 lg:pt-0 bg-gray-200 text-black'>
      <div className='flex flex-col gap-5'>
        <h1 className='lg:text-[5em] text-[2em] font-bold'>We Grow Together!</h1>
        <p className='text-[1.2em]'>
          If you want to level up your career at a company in constant motion, you’ve come to the right place.
        </p>
        <div className='lg:mt-[7em] mt-[4em]'>
          {/* Add data-scroll and data-scroll-speed attributes */}
          <Image
            src={"/meeting.jpg"}
            alt='team'
            width={900}
            height={900}
            className='w-full h-full transition-transform duration-100 ease-in-out transform ' // Default small size
            data-scroll
            data-scroll-speed="0.1" // Adjust speed of the animation
          />
        </div>
      </div>
      <div className='flex flex-col md:flex-col lg:flex-row justify-between gap-10 mt-[15em]'>
        <div>
          <h1 className='lg:text-[3em] text-[2em] font-semibold leading-tight'>
            We believe in fostering a culture of creativity, autonomy, and ownership.
          </h1>
          <p className='lg:text-[1.5em] text-[1.2em] font-semibold mt-7'>
            We encourage every member of our team to propose new ideas and make important decisions. By empowering
            individuals to think and act as leaders, we create a dynamic and innovative environment that drives growth
            and success. We nurture talent.
          </p>
        </div>
        <div className='lg:mt-[10em] mt-[7em]'>
          <h1 className='lg:text-[3em] text-[2em] font-semibold leading-tight'>
            We aim to achieve the highest quality outcomes.
          </h1>
          <p className='lg:text-[1.5em] text-[1.2em] font-semibold mt-7'>
            Our challenging projects require excellent results. As a team, we embrace continuous improvement in all
            aspects of our work, from processes and capabilities to services. We seek self-improvement. We strive as a
            team. We grow together.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;