import Image from 'next/image'
import React from 'react'

const About = () => {
  return (
    <div className='bg-gray-200 text-black min-h-screen '>
              <Image src={"/aicow.jpg"} alt="team" width={900} height={900} className='w-[100vw]  lg:h-[60vh] h-[40vh] object-cover  ' />

              <div className='lg:max-w-[90em] mx-auto lg:px-[6em] px-3 lg:pt-[10em] pt-[4em] gap-[5em] items-center'>
                 <h1 className='lg:text-[4em] text-[2em] leading-tight font-semibold'>Transforming Cattle Health with AI-Enhanced Lameness Detection</h1>
                 <p className='lg:pt-[5em] pt-[3em] lg:text-[2em] text-[1.2em] lg:w-[70%]'>
                 Detecting Lameness early on is challenging, requiring alternative processes that offer reliable and consistent results. By observing deviations in the cow's back, an expert can identify and quantify the problem. The goal is to develop an Artificial Intelligence (AI) model that can automatically and precisely perform this process.
                 </p>
              </div>
                <div className='lg:pt-[10em] pt-[5em]'>
                <div className=' bg-[#b84d00] h-[20px] w-[100vw]'/>
                </div>

                <div className='lg:max-w-[90em] mx-auto lg:px-[6em] px-3 lg:py-[15em] py-[5em]  md:flex gap-[5em] items-center'>
            <div className='flex flex-col items-start gap-2'>
                <p className='lg:text-[2em] text-[1.5em] font-semibold'>The</p>
                <h1 className='lg:text-[4em] text-[2em] leading-tight font-semibold'>challenge</h1>
                <div className='w-[50px] h-[2px] bg-black'/>
            </div>

            <div className='lg:mt-0 mt-[2em]'>
                <p className='lg:text-[1.5em] text-[1.2em]'>
                MasterClass is a streaming platform that offers lessons from the world's best. With an annual membership, subscribers gain unlimited access to classes taught by world-class instructors spanning subjects including Arts & Entertainment, Business, Design & Style, Sports & Gaming, Writing, and more.
                </p>
            </div>



        </div>
    </div>
  )
}

export default About