import Image from 'next/image'
import React from 'react'

const Tools = () => {
  return (
    <div className='lg:mt-10 flex flex-col items-center justify-center gap-7'>
        <h1 className='text-[2.4em] font-bold text-center'>Frameworks & Tools</h1>
        <p className='text-gray-400 text-center'>We are expert practitioners and community leaders in the industry&apos;s leading technologies.</p>

        <div className='flex gap-9  flex-wrap  items-center justify-center'>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/express.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <span className='lg:text-[0.7em] text-[0.7em]'>Express</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/nestjs.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <p className='lg:text-[0.7em] text-[0.7em]'>NestJS</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/socket.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <p className='lg:text-[0.7em] text-[0.7em]'>Socket.io</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/pm2.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <p className='lg:text-[0.7em] text-[0.7em]'>PM2</p>
            </div>
            
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/jest.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <p className='lg:text-[0.7em] text-[0.7em]'>Jest</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/aws.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <p className='lg:text-[0.7em] text-[0.7em]'>AWS Lambda</p>
            </div>
          
           

        </div>
    </div>
  )
}

export default Tools