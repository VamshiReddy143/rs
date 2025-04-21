import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }} className='bg-[#1B1B1B] text-white'>
      <div className='lg:max-w-[90em] mx-auto lg:px-[6em] px-3 lg:pt-[19em] pt-[10em] leading-tight '>
        <h1 className='lg:text-[80px] lg:leading-[96px] fontt-medium text-[3em] '>Brightwheel</h1>
        <p className='lg:text-[24px] lg:leading-[36px] font-normal text-[1em]'>Building the #1 early education platform</p>
      </div>
      <div className='lg:pt-[7em]'>
        <Image src={"/bwimg.jpg"} alt='team' height={900} width={900} className='w-[100vw] lg:h-[60vh] h-[40vh] object-cover'/>
      </div>
    </div>
  )
}

export default Hero