import Image from 'next/image';
import React from 'react';

const Fun = () => {
  return (
    <div className='lg:p-[10%] md:p-[5%] p-5 lg:min-h-screen px-2 bg-gray-200 text-black'>
      <h1 className='lg:text-[4em] text-[2em] font-semibold'>
        Having fun is a key part of the process.
      </h1>

      <div
        className='mt-[7em] relative'
        style={{ minHeight: '800px' }} // Adjust based on tallest image + margin
      >
        <div
          className='lg:h-[300px] lg:w-[400px] md:h-[200px] md:w-[300px] h-[100px] w-[200px] absolute'
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
          className='h-[200px] w-[200px] md:hidden absolute ml-[7em]'
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
          className='lg:h-[500px] lg:w-[500px] md:h-[300px] md:w-[300px] h-[200px] w-[200px] absolute lg:ml-[5em] lg:mt-[13em] md:ml-[5em] md:mt-[1em] mt-[9em]'
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
          className='lg:h-[600px] lg:w-[600px] md:h-[350px] md:w-[350px]  hidden md:block absolute lg:ml-[30em] md:ml-[22em]'
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
          className='lg:h-[300px] lg:w-[400px] h-[150px] w-[200px] absolute lg:ml-[55em] lg:mt-[26em] md:mt-[15em] md:ml-[31em] mt-[15em] ml-[10em]'
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
        <h1 className='lg:mt-[2em] md:mt-0 lg:text-[4em] text-[2em] text-right font-semibold'>We believe that collaborative, close-knit <span>teams can achieve the unthinkable.</span></h1>
      </div>
    </div>
  );
};

export default Fun;



