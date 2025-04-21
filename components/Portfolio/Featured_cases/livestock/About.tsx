import Image from 'next/image'
import React from 'react'

const About = () => {
  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }} className='bg-gray-200 text-black min-h-screen '>
              <Image src={"/aicow.jpg"} alt="team" width={900} height={900} className='w-[100vw]  lg:h-[60vh] h-[40vh] object-cover  ' />

              <div className='lg:max-w-[90em] mx-auto lg:px-[6em] px-3 lg:pt-[10em] pt-[4em] gap-[5em] items-center'>
                 <h1 className='lg:text-[64px]  text-[45px] leading-[54px] lg:leading-[77px] font-medium'>Transforming Cattle Health with AI-Enhanced Lameness Detection</h1>
                 <p className='lg:pt-[5em] pt-[3em] lg:text-[32px] lg:leading-[48px] font-extralight text-[28px] leading-[42px] lg:w-[75%]'>
                 Detecting Lameness early on is challenging, requiring alternative processes that offer reliable and consistent results. By observing deviations in the cow's back, an expert can identify and quantify the problem. The goal is to 
                 <span className='font-semibold'> develop an Artificial Intelligence (AI) model that can automatically and precisely perform this process.</span>
                 </p>
              </div>
                <div className='lg:pt-[10em] pt-[5em]'>
                <div className=' bg-[#b84d00] h-[20px] w-[100vw]'/>
                </div>

                <div className='lg:max-w-[90em] mx-auto lg:px-[6em] px-3 lg:py-[15em] py-[5em]  md:flex gap-[5em] items-center'>
            <div className='flex flex-col items-start gap-1'>
                <p className='lg:text-[32px] text-[1.5em] font-medium lg:leading-medium'>The</p>
                <h1 className='lg:text-[64px] text-[42px] lg:leading-[77px] font-medium'>challenge</h1>
                <div className='w-[50px] h-[2px] mt-2 bg-black'/>
            </div>

            <div className='lg:mt-0 mt-[2em]'>
                <p className='lg:text-[24px] lg:leading-[36px] font-normal text-[18px] leading-[26px]'>
                To create an MVP solution, Rootstrap had to address risks and <span className='font-semibold'>establish a clear technological approach</span>. This entailed exploring different paths to solve the problem and training the algorithms accordingly. Additionally, it involved identifying the hardware and software platforms necessary for implementing the solution architecture.
                </p>
            </div>



        </div>
    </div>
  )
}

export default About