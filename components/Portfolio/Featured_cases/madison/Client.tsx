import Image from 'next/image'
import React from 'react'

const Team = () => {
  return (
    <div className='  '>
        {/* <Image src={"/team111.jpg"} alt="team" width={900} height={900} className='w-[100vw]  lg:h-[60vh] h-[40vh] object-cover '/> */}
        <div className='lg:max-w-[90em] mx-auto lg:px-[6em] px-3 py-[7em] md:flex gap-[5em] bg-black text-white items-center'>
            <div className='flex flex-col items-start gap-2'>
                <p className='lg:text-[2em] text-[1.5em] font-semibold'>About</p>
                <h1 className='lg:text-[4em] text-[2.5em] leading-tight font-semibold'>the <span className='lg:block'>Client</span></h1>
                <div className='w-[50px] h-[2px] bg-white'/>
            </div>

            <div className='lg:mt-0 mt-[2em]'>
                <p className='lg:text-[1.5em] text-[1.2em]'>
                In the midst of the COVID pandemic, Madison Reed, an innovative American hair care brand, faced unforeseen challenges. As physical stores closed en masse and ecommerce demand skyrocketed 10-fold, the company, known for its tech-driven approach, found itself needing to adapt swiftly. Their user experience needed a rapid overhaul; they had to disrupt the market yet again.
                </p>
            </div>



        </div>
           
    </div>
  )
}

export default Team