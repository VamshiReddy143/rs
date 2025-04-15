import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <div className='bg-black text-white'>
      <div className='lg:max-w-[90em] mx-auto lg:px-[6em] px-3 pt-[12em] leading-tight '>
        <h1 className='lg:text-[5em] text-[3em] font-bold font-sans'>Brightwheel</h1>
        <p className='lg:text-[1.4em] text-[1em]'>Building the #1 early education platform</p>
      </div>
      <div className='pt-[7em]'>
        <Image src={"/bwimg.jpg"} alt='team' height={900} width={900} className='w-[100vw] h-[60vh] object-cover'/>
      </div>
    </div>
  )
}

export default Hero