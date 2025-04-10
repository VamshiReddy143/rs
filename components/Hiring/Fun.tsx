import Image from 'next/image';
import React from 'react';

const Fun = () => {
  return (
    <div className='lg:p-[10%] lg:min-h-screen px-2 bg-gray-200 text-black'>
      <h1 className='text-[4em] font-semibold'>
        Having fun is a key part of the process.
      </h1>

      <div
        className='mt-[7em] relative'
        style={{ minHeight: '800px' }} // Adjust based on tallest image + margin
      >
        <div
          className='h-[400px] w-[400px] absolute'
          data-scroll
          data-scroll-speed="1"
        >
          <Image
            src={'/fun1.jpg'}
            alt='team'
            width={900}
            height={900}
            className='object-cover w-full h-full'
          />
        </div>
        <div
          className='h-[500px] w-[500px] absolute ml-[10em] mt-[10em]'
          data-scroll
          data-scroll-speed="2"
        >
          <Image
            src={'/fun2.jpg'}
            alt='team'
            width={900}
            height={900}
            className='object-cover w-full h-full'
          />
        </div>
        <div
          className='h-[600px] w-[600px] absolute ml-[40em]'
          data-scroll
          data-scroll-speed="1.5"
        >
          <Image
            src={'/fun3.jpg'}
            alt='team'
            width={900}
            height={900}
            className='object-cover w-full h-full'
          />
        </div>
        <div
          className='h-[300px] w-[400px] absolute ml-[55em] mt-[26em]'
          data-scroll
          data-scroll-speed="3"
        >
          <Image
            src={'/fun4.jpg'}
            alt='team'
            width={900}
            height={900}
            className='object-cover w-full h-full'
          />
        </div>
      </div>

      <div>
        <h1 className='mt-[2em] text-[4em] text-right font-semibold'>We believe that collaborative, close-knit <span>teams can achieve the unthinkable.</span></h1>
      </div>
    </div>
  );
};

export default Fun;