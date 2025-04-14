import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <div className="min-h-screen  bg-[#0b2838] flex flex-col  pb-11  items-center justify-center ">
      <div className=" mt-[15em] text-center ">
        <div className='lg:px-[10em] px-4'>
        <h1 className="lg:text-[2.5em] text-[2em] font-semibold text-white">
        Revamp and Ramp Up: How Rootstrap Optimized Emeritus's{' '}
          <span className="font-extrabold">Digital Presence</span>
        </h1>
        <Image 
          src="/emertius.jpg" 
          alt="Team collaborating for online education" 
          width={900} 
          height={900} 
          className="object-cover w-full mt-[5em]" 
        />
        </div>



        <div className='mt-10 flex flex-col items-start lg:px-[10em] px-4'>
            <h1 className='lg:text-[5em] text-[3em] font-bold text-white'>Emeritus</h1>
          <div className='lg:flex justify-between w-full'>
          <div className='flex flex-col items-start'>
              <h1 className='lg:text-[2.5em] text-[1.7em] text-white mt-5'>Services Provided</h1>
              <div className='md:flex items-center gap-10 mt-4'>
                <div className='flex flex-col items-start gap-5'>
                    <p className='text-white lg:text-[1.3em] text-[1.2em]'>Project Type</p>
                    <p className='border-1 border-white py-2 px-6 rounded-xl w-fit lg:text-[1.4em] text-[1.2em]'>Web & Mobile Development
                    </p>
                </div>
                <div className='h-[40px] hidden md:flex flex-col items-center mt-[50px] w-[1px] bg-white'/>
                <div className='flex flex-col items-start gap-5 md:mt-0 mt-5'>
                    <p className='text-white lg:text-[1.3em] text-[1.2em]'>Industry</p>
                   <div className='flex gap-5'>
                   <p className='border-1 border-white py-2 px-6 rounded-xl w-fit lg:text-[1.4em] text-[1.2em]'>Higher Education</p>
                   <p className='border-1 border-white py-2 px-6 rounded-xl w-fit lg:text-[1.4em] text-[1.2em]'>Ed Tech </p>
                   </div>
                </div>
              </div>
              <button className='bg-black text-white py-2 px-6 rounded-xl w-fit text-[1.2em] mt-5'>2018-Present</button>
            </div>


            <div className='pb-10'> 
                <h1  className='lg:text-[2.5em] text-[1.7em] text-white text-left lg:text-center mt-5'>The Team</h1>
                <div className='h-fit flex gap-4 mt-3'>
                    <div className=' flex flex-col items-center w-[1px] bg-white'/>
                    <div className='flex flex-col items-start gap-3'>
                        <p className='lg:text-[1.4em] text-[1em]'>Front end developers</p>
                        <p  className='lg:text-[1.4em] text-[1em]'>Back end developers</p>
                        <p  className='lg:text-[1.4em] text-[1em]'>QA Analyst</p>
                        <p  className='lg:text-[1.4em] text-[1em]'>Web Developers</p>
                        <p className='lg:text-[1.4em] text-[1em]'>Project Manager</p>
                        <p className='lg:text-[1.4em] text-[1em]'>Product Manager</p>

                    </div>
                </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
