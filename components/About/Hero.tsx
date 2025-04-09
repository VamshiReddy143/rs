import Image from 'next/image'
import React from 'react'
import MaskedVideo from './MarketVideo'



const Hero = () => {
  return (
    <div className='min-h-screen relative '>
       <div className='min-h-screen flex items-center bg-gray-200 justify-between'>
       <div className='text-black px-[10em] w-[80%]'>
            <h1 className='text-[5em] font-semibold leading-tight'>Calm, Steady Hands for the New Digital Economy</h1>
            <p className='text-[1.5em] leading-tight mt-5 w-[90%]'>Since 2011, we&apos;ve navigated accelerating technological change, developing custom software that enables our clients to embrace the future with confidence.</p>
        </div>
        <div className='absolute right-70  top-50'>
            <Image src={"/triangle.svg"} alt="tools" width={900} height={900} className='h-17 w-17 animate-float'/>
        </div>
       </div>


       <MaskedVideo/>
     
    </div>
  )
}

export default Hero