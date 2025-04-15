import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <div className="min-h-screen  bg-[#720058] flex flex-col items-center justify-center ">
      <div className=" lg:mt-[15em] mt-[10em] text-center px-3 lg:px-[4em] lg:max-w-[90em] mx-auto">
        <div >
        <h1 className="lg:text-[2.5em] text-[1.7em] font-semibold text-white">
        Madison Reed and Rootstrap Coloring {' '}
          <span className="font-extrabold">Outside the Lines</span>
        </h1>
        <Image 
          src="/models.jpg" 
          alt="Team collaborating for online education" 
          width={900} 
          height={900} 
          className="object-cover w-full mt-[5em]" 
        />
        </div>



        <div className='mt-10 flex flex-col items-start'>
            <h1 className='lg:text-[4.5em] text-[2em] font-bold text-left text-white pr-5 leading-tight mt-5'>Beyond the App: Impacting the Beauty Industry and Consumers</h1>
          <div className='lg:flex justify-between w-full  mt-10 pb-10'>
          <div className='flex flex-col items-start'>
              <h1 className='lg:text-[2.5em] text-[1.6em] text-white mt-5'>Services Provided</h1>
              <div className='md:flex items-center gap-10 mt-4'>
                <div className='flex flex-col items-start gap-5'>
                    <p className='text-white lg:text-[1.3em] text-[1.2em]'>Project Type</p>
                    <p className='border-1 border-white py-2 px-6 rounded-xl w-fit lg:text-[1.4em] text-[1.2em]'>Mobile App development</p>
                </div>
                <div className='h-[40px] hidden md:flex flex-col items-center mt-[50px] w-[1px] bg-white'/>
                <div className='flex flex-col items-start gap-5 md:mt-0 mt-5'>
                    <p className='text-white lg:text-[1.3em] text-[1.2em]'>Industry</p>
                   <div className='flex gap-5'>
                   <p className='border-1 border-white py-2 px-6 rounded-xl w-fit lg:text-[1.4em] text-[1.2em]'>Beauty</p>
                   <p className='border-1 border-white py-2 px-6 rounded-xl w-fit lg:text-[1.4em] text-[1.2em]'>Hair Care</p>
                   </div>
                </div>
              </div>
              <button className='bg-black text-white py-2 px-6 rounded-xl w-fit text-[1em] mt-5'>Mid 2020 - Q1 2021</button>
            </div>


            <div className='pb-10'> 
                <h1  className='lg:text-[2.5em] text-[1.7em] text-white text-left lg:text-center mt-5'>The Team</h1>
                <div className='h-fit flex gap-4 mt-3'>
                    <div className=' flex flex-col items-center w-[1px] bg-white'/>
                    <div className='flex flex-col items-start gap-3'>
                        <p className='lg:text-[1.4em] text-[1em]'>1 Project Manager</p>
                        <p  className='lg:text-[1.4em] text-[1em]'>2 Product Designers</p>
                        <p  className='lg:text-[1.4em] text-[1em]'>2 Product Managers</p>
                        <p  className='lg:text-[1.4em] text-[1em]'>8 React Native developers</p>
                        <p className='lg:text-[1.4em] text-[1em]'>3 QA Analyst</p>
                        <p className='lg:text-[1.4em] text-[1em]'>1 Scrum Master</p>
                      
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
