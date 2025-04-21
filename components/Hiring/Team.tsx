import Image from 'next/image';
import React from 'react';

const Team = () => {
  return (
    <div className='text-white bg-[#1b1b1b] pt-[8em] pb-[7em]'>
      <h1
        style={{ fontFamily: 'Poppins, sans-serif' }}
        className='lg:text-[72px] text-[31px] text-left font-medium leading-[42px] lg:leading-tight text-center'
      >
        Join our team and unlock <span className='lg:block'>your potential!</span>
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:mt-[7em] mt-10 gap-[3em]'>
        <div className='flex flex-col justify-between gap-8 p-10 border-2 border-gray-500 min-h-[400px]'>
          <Image
            src={'/tree.svg'}
            alt='team'
            width={100}
            height={100}
            className='h-25 w-25 object-contain'
          />
          <h2
            style={{ fontFamily: 'Poppins, sans-serif' }}
            className='font-semibold lg:text-[35px] text-[32px]'
          >
            Growth and Development
          </h2>
          <div className='h-[3px] w-[20%] bg-[#ffc83f] rounded-full mt-3' />
          <p
            style={{ fontFamily: 'Poppins, sans-serif' }}
            className='text-gray-200 lg:text-[20px] text-[16px] font-normal line-clamp-3'
          >
            Reach your full potential with training, mentorship, feedback program.
          </p>
        </div>

        <div className='flex flex-col justify-between gap-8 p-10 border-2 border-gray-500 min-h-[400px]'>
          <Image
            src={'/hheart.svg'}
            alt='team'
            width={100}
            height={100}
            className='h-25 w-25 object-contain'
          />
          <h2
            style={{ fontFamily: 'Poppins, sans-serif' }}
            className='font-semibold lg:text-[35px] text-[32px]'
          >
            Wellness
          </h2>
          <div className='h-[3px] w-[20%] bg-[#ffc83f] rounded-full mt-3' />
          <p
            style={{ fontFamily: 'Poppins, sans-serif' }}
            className='text-gray-200 lg:text-[20px] text-[16px] font-normal line-clamp-3'
          >
            Prioritize your well-being with a comprehensive set of options for you.
          </p>
        </div>

        <div className='flex flex-col justify-between gap-8 p-10 border-2 border-gray-500 min-h-[400px]'>
          <Image
            src={'/hbrain.svg'}
            alt='team'
            width={100}
            height={100}
            className='h-25 w-25 object-contain'
          />
          <h2
            style={{ fontFamily: 'Poppins, sans-serif' }}
            className='font-semibold lg:text-[35px] text-[32px]'
          >
            Find your own balance
          </h2>
          <div className='h-[3px] w-[20%] bg-[#ffc83f] rounded-full mt-3' />
          <p
            style={{ fontFamily: 'Poppins, sans-serif' }}
            className='text-gray-200 lg:text-[20px] text-[16px] font-normal line-clamp-3'
          >
            Achieve balance and fulfillment with flexible work arrangements.
          </p>
        </div>

        <div className='flex flex-col justify-between gap-8 p-10 border-2 border-gray-500 min-h-[400px]'>
          <Image
            src={'/hpuzzle.svg'}
            alt='team'
            width={100}
            height={100}
            className='h-25 w-25 object-contain'
          />
          <h2
            style={{ fontFamily: 'Poppins, sans-serif' }}
            className='font-semibold lg:text-[35px] text-[32px]'
          >
            Team building
          </h2>
          <div className='h-[3px] w-[20%] bg-[#ffc83f] rounded-full mt-3' />
          <p
            style={{ fontFamily: 'Poppins, sans-serif' }}
            className='text-gray-200 lg:text-[20px] text-[16px] font-normal line-clamp-3'
          >
            Foster connections and teamwork with opportunities for social events,
            team-building activities, and more.
          </p>
        </div>

        <div className='flex flex-col justify-between gap-8 p-10 border-2 border-gray-500 min-h-[400px]'>
          <Image
            src={'/hstar.svg'}
            alt='team'
            width={100}
            height={100}
            className='h-25 w-25 object-contain'
          />
          <h2
            style={{ fontFamily: 'Poppins, sans-serif' }}
            className='font-semibold lg:text-[35px] text-[32px]'
          >
            Customized processes
          </h2>
          <div className='h-[3px] w-[20%] bg-[#ffc83f] rounded-full mt-3' />
          <p
            style={{ fontFamily: 'Poppins, sans-serif' }}
            className='text-gray-200 lg:text-[20px] text-[16px] font-normal line-clamp-3'
          >
            Receive prizes and recognitions, while enjoying working with the latest
            technologies.
          </p>
        </div>

        <div className='flex flex-col justify-between gap-8 p-10 border-2 border-gray-500 min-h-[400px]'>
          <Image
            src={'/hmob.svg'}
            alt='team'
            width={100}
            height={100}
            className='h-25 w-25 object-contain'
          />
          <h2
            style={{ fontFamily: 'Poppins, sans-serif' }}
            className='font-semibold lg:text-[35px] text-[32px]'
          >
            Digital empowerment
          </h2>
          <div className='h-[3px] w-[20%] bg-[#ffc83f] rounded-full mt-3' />
          <p
            style={{ fontFamily: 'Poppins, sans-serif' }}
            className='text-gray-200 lg:text-[20px] text-[16px] font-normal line-clamp-3'
          >
            Enjoy advanced digital tools for improved collaboration and efficiency.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Team;