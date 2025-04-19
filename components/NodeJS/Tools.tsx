import Image from 'next/image'
import React from 'react';

const Tools = () => {
  return (
    <div className='lg:pt-[4.3em] flex pt-[4em] flex-col items-center justify-center gap-7'>
    <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className='text-[36px] font-bold text-center'>Frameworks & Tools</h1>
    <p className='text-[#bcbcc0] text-center text-[16px]'>We are expert practitioners and community leaders in the industry&apos;s leading technologies.</p>

    <div className='flex gap-6  flex-wrap  items-center justify-center'>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/express.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-10 w-10'/>
                <span className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>Express</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/nestjs.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-10 w-10'/>
                <span className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>NestJS</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/socket.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-10 w-10'/>
                <span className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>Socket.io</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/pm2.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-10 w-10'/>
                <span className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>PM2</span>
            </div>
            
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/jest.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-10 w-10'/>
                <span className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>Jest</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/aws.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-10 w-10'/>
                <span className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>AWS Lambda</span>
            </div>
          
           

        </div>
    </div>
  )
}

export default Tools