import Image from 'next/image'
import React from 'react'

const Team = () => {
  return (
    <div className='bg-gray-200 text-black min-h-screen '>
        {/* <Image src={"/blacky.jpg"} alt="team" width={900} height={900} className='w-[100vw]  lg:h-[60vh] h-[40vh] object-cover '/> */}
        <div className='lg:max-w-[90em] mx-auto lg:px-[6em] px-3 lg:pt-[12em] pt-10 md:flex gap-[5em] items-center'>
            <div className='flex flex-col items-start gap-2'>
                <p className='lg:text-[2em] text-[1.5em] font-semibold'>About</p>
                <h1 className='lg:text-[4em] text-[2.5em] leading-tight font-semibold'>the <span className='lg:block'>Client</span></h1>
                <div className='w-[50px] h-[2px] bg-black'/>
            </div>

            <div className='lg:mt-0 mt-[2em]'>
                <p className='lg:text-[1.9em] text-[1.2em]'>
                Brightwheel is the <span className='font-bold'> leading platform for early education</span>, combining SaaS, Payments, and a consumer-like daily experience. With Brightwheel, teachers save time with tools for assessment, communication, and photo sharing; administrators manage their business with enrollment, reporting, and online bill pay; while parents get a beautiful, real-time view of their child’s day that helps them participate in the learning experience and continue it at home.
                </p>
               
            </div>



        </div>
            <div className='lg:max-w-[90em] mx-auto lg:px-[4em] px-3 lg:mt-[18em] mt-[10em] lg:pb-[10em] pb-[6em]'>
                <h1 className='lg:text-[4em] text-[2em] font-semibold leading-tight'>
                “We’re happy with the quality of the service Rootstrap provides. Contractor resources are high quality and have good technology and communication skills. Rootstrap management has been a pleasure to work with, and they are fast and thorough in their follow-up.”
                </h1>
                <div className='lg:mt-[4em] mt-[2em]'>
                    <p className=' lg:text-[2em] text-[1em]'>Julie DeLoyd</p>
                    <p className='lg:text-[2.2em] text-[1.2em] text-[#01824a]'>President, Brightwheel</p>
                </div>
            </div>
    </div>
  )
}

export default Team