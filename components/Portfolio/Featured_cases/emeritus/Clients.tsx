import Image from 'next/image'
import React from 'react'

const Team = () => {
  return (
    <div className='bg-gray-200 text-black min-h-screen '>
        <Image src={"/blacky.jpg"} alt="team" width={900} height={900} className='w-[100vw]  lg:h-[60vh] h-[40vh] object-cover '/>
        <div className='lg:max-w-[90em] mx-auto lg:px-[6em] px-3 lg:mt-[12em] md:flex gap-[5em] items-center'>
            <div className='flex flex-col items-start gap-2'>
                <p className='lg:text-[2em] text-[1.5em] font-semibold'>About</p>
                <h1 className='lg:text-[4em] text-[2.5em] leading-tight font-semibold'>the <span className='lg:block'>Client</span></h1>
                <div className='w-[50px] h-[2px] bg-black'/>
            </div>

            <div className='lg:mt-0 mt-[2em]'>
                <p className='lg:text-[1.5em] text-[1.2em]'>
                Emeritus is committed to teaching the skills of the future by making high-quality education accessible and affordable to individuals, companies, and governments around the world.
It does this by collaborating with more than 80 top-tier universities across the United States, Europe, Latin America, Southeast Asia, India and China. Its unique model has educated more than 500,000 individuals across 80 countries.
                </p>
                <p className='lg:text-[1.5em] text-[1.2em] mt-5'>
                Founded in 2015, Emeritus, part of the Eruditus Group, has more than 2300+ team members globally and offices in Mumbai, New Delhi, Shanghai, Singapore, Palo Alto, Mexico City, New York, Boston, London, and Dubai.
                </p>
            </div>



        </div>
            <div className='lg:max-w-[90em] mx-auto lg:px-[4em] px-3 lg:mt-[20em] mt-[10em] pb-[10em]'>
                <h1 className='lg:text-[3em] text-[2em] font-semibold leading-tight'>
                "Rootstrap’s work has been pivotal to the company’s success in securing investment. They provide high-quality resources that are incredibly skilled and <span className='text-[#01824a]'>always strive to broaden their expertise</span>. Their seamless integration with the internal team sets them apart, as does their ability to communicate."
                </h1>
                <div className='lg:mt-[4em] mt-[2em]'>
                    <p className=' lg:text-[2em] text-[1em]'>Jesse Ocon</p>
                    <p className='lg:text-[2.2em] text-[1.2em] text-[#01824a]'>VP of Engineering at Emeritus</p>
                </div>
            </div>
    </div>
  )
}

export default Team