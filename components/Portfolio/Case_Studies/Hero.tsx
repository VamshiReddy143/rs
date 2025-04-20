import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }} className='bg-[#1B1B1B] text-white'>
      <div className='lg:max-w-[90em] mx-auto lg:px-[6em] px-3 pt-[19em] leading-tight '>
        <h1 className='lg:text-[80px] leading-[96px] fontt-medium text-[3em] '>Brightwheel</h1>
        <p className='lg:text-[24px] leading-[36px] font-normal text-[1em]'>Building the #1 early education platform</p>
      </div>
      <div className='pt-[7em]'>
        <Image src={"/bwimg.jpg"} alt='team' height={900} width={900} className='w-[100vw] h-[60vh] object-cover'/>
      </div>
    </div>
  )
}

export default Hero