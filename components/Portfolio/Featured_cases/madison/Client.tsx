import Image from 'next/image'
import React from 'react'

const Team = () => {
  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }} className=' bg-[#212121] '>
        {/* <Image src={"/team111.jpg"} alt="team" width={900} height={900} className='w-[100vw]  lg:h-[60vh] h-[40vh] object-cover '/> */}
        <div className='lg:max-w-[90em] mx-auto lg:px-[6em] px-3 py-[10em] md:flex gap-[5em] bg-[#212121]  text-white items-center'>
            <div className='flex flex-col items-start gap-2'>
                <p className='lg:text-[32px] font-medium leading-[38px] text-[1.5em] '>About</p>
                <h1 className='lg:text-[64px] text-[2.5em] leading-[77px] font-medium'>the <span className='lg:block'>Client</span></h1>
                <div className='w-[60px] h-[2px] bg-white mt-3'/>
            </div>

            <div className='lg:mt-0 mt-[2em]'>
                <p className='lg:text-[24px] leading-[36px] font-normal text-gray-100 text-[1.2em]'>
                In the midst of the COVID pandemic, Madison Reed, an innovative American hair care brand, faced unforeseen challenges. As physical stores closed en masse and ecommerce demand skyrocketed 10-fold, the company, known for its tech-driven approach, found itself needing to adapt swiftly. Their user experience needed a rapid overhaul; they had to disrupt the market yet again.
                </p>
            </div>



        </div>
           
    </div>
  )
}

export default Team