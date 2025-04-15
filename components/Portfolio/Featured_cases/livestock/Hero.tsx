import React from 'react'

const Hero = () => {
  return (
    <div className='min-h-screen bg-[#b84d00]'>
        <div className='lg:max-w-[90em] mx-auto lg:px-[4em] px-3'>
            <h1 className='lg:text-[2.6em] text-[1.7em] text-center  font-semibold lg:pt-[6em] pt-[5em]'>Leading the Future of <span>Livestock Health</span> with Advanced AI Technology.</h1>
            <video src='/videos/cow.mp4' autoPlay muted loop className='w-full  h-auto lg:h-[35em] object-cover rounded-xl lg:mt-[10em] mt-[5em]'/>
        </div>



        <div className='mt-10 flex flex-col items-start lg:px-[10em] lg:pb-[10em] px-4'>
            <h1 className='lg:text-[5em] text-[2em] font-bold text-white leading-tight'>Revolutionizing Livestock Health:An AI-Driven Approach to Illness Detection</h1>
          <div className='lg:flex justify-between w-full mt-10'>
          <div className='flex flex-col items-start'>
              <h1 className='lg:text-[2.5em] text-[1.4em] text-white mt-5'>Services Provided</h1>
              <div className='md:flex items-center gap-10 mt-4'>
                <div className='flex flex-col items-start gap-5'>
                    <p className='text-white lg:text-[1em] text-[1.2em]'>Project Type</p>
                    <p className='border-1 border-white py-2 px-6 rounded-xl w-fit lg:text-[1.4em] text-[1em]'>Proof of concept</p>
                </div>
                <div className='h-[40px] hidden md:flex flex-col items-center mt-[50px] w-[1px] bg-white'/>
                <div className='flex flex-col items-start gap-5 md:mt-0 mt-5'>
                    <p className='text-white lg:text-[1.3em] text-[1em]'>Industry</p>
                   <div className='flex lg:gap-5 gap-2'>
                   <p className='border-1 border-white py-2 px-3 rounded-xl w-fit lg:text-[1.4em] text-[1em]'>Health</p>
                   <p className='border-1 border-white py-2 px-3 rounded-xl w-fit lg:text-[1.4em] text-[1em]'>Veterinary</p>
                   <p className='border-1 border-white py-2 px-3 rounded-xl w-fit lg:text-[1.4em] text-[1em]'>Image diagnosis</p>
                   </div>
                </div>
              </div>
              <button className='bg-black text-white py-2 px-6 rounded-xl w-fit text-[1em] mt-5'>4 weeks</button>
            </div>


            <div className='pb-10'> 
                <h1  className='lg:text-[2.5em] text-[1.5em] text-white text-left lg:text-center mt-5'>The Team</h1>
                <div className='h-fit flex gap-4 mt-3'>
                    <div className=' flex flex-col items-center w-[1px] bg-white'/>
                    <div className='flex flex-col items-start gap-3'>
                        <p className='lg:text-[1.4em] text-[1em]'>Data Scientist</p>
                        <p  className='lg:text-[1.4em] text-[1em]'>ML Specialists</p>
                        <p  className='lg:text-[1.4em] text-[1em]'>Product designer</p>
                        
                    </div>
                </div>

            </div>
          </div>
        </div>
    </div>
  )
}

export default Hero