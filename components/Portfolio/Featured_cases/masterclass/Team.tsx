import Image from 'next/image'
import React from 'react'

const Team = () => {
  return (
    <div className='bg-gray-200 text-black min-h-screen '>
        <Image src={"/team111.jpg"} alt="team" width={900} height={900} className='w-[100vw]  lg:h-[60vh] h-[40vh] object-cover '/>
        <div className='lg:max-w-[90em] mx-auto lg:px-[6em] px-3 mt-[3em] md:flex gap-[5em] items-center'>
            <div className='flex flex-col items-start gap-2'>
                <p className='lg:text-[2em] text-[1.5em] font-semibold'>About</p>
                <h1 className='lg:text-[4em] text-[2.5em] leading-tight font-semibold'>the <span className='lg:block'>Client</span></h1>
                <div className='w-[50px] h-[2px] bg-black'/>
            </div>

            <div className='lg:mt-0 mt-[2em]'>
                <p className='lg:text-[1.5em] text-[1.2em]'>
                MasterClass is a streaming platform that offers lessons from the world's best. With an annual membership, subscribers gain unlimited access to classes taught by world-class instructors spanning subjects including Arts & Entertainment, Business, Design & Style, Sports & Gaming, Writing, and more.
                </p>
            </div>



        </div>
            <div className='lg:max-w-[90em] mx-auto lg:px-[6em] px-3 lg:mt-[20em] mt-[10em] pb-[10em]'>
                <h1 className='lg:text-[4em] text-[2em] font-semibold leading-tight'>“We don't treat them like an outsourced team. They're <span className='text-red-700'>part of our big team</span>. They contribute to all our code initiatives.”</h1>
                <div className='lg:mt-[4em] mt-[2em]'>
                    <p className=' lg:text-[2em] text-[1em]'>Mandar Bapaye</p>
                    <p className='lg:text-[2.2em] text-[1.2em] text-red-700'>VP of Engineering at MasterClass</p>
                </div>
            </div>
    </div>
  )
}

export default Team