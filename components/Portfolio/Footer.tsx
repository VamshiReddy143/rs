import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div className='min-h-screen bg-[#FDD017] text-black px-[10em] flex flex-col justify-between'>
      
      {/* Centered Heading */}
      <div className='flex-1 flex items-center justify-start'>
        <h1 className='text-[5em] font-semibold border-b-8 border-black w-fit leading-tight relative overflow-hidden group p-2'>
          <span className='relative z-10 group-hover:text-[#FDD017] transition-colors duration-300'>Let&apos;s Talk!</span>
          <span className='absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-400 z-0'></span>
        </h1>
      </div>

      {/* Footer Links */}
      <div className='flex justify-between items-center w-full mb-10'>
        <div className='flex flex-col gap-4'>
          <Image src='/rlogo.svg' width={900} height={900} alt='team' className='h-fit w-50' />
          <ul>
            <li className='font-semibold text-[1.2em]'>info@rootstrap.com</li>
            <li className='font-semibold text-[1.2em]'>2025 © Rootstrap. All Rights Reserved.</li>
            <li className='font-semibold text-[1.2em]'>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <ul>
            <li className='font-semibold text-[1.2em] hover:border-b-2 border-black'>LinkedIn</li>
            <li className='font-semibold text-[1.2em] hover:border-b-2 border-black'>Dribbble</li>
          </ul>
        </div>

        <div>
          <ul>
            <li className='font-semibold text-[1.2em] hover:border-b-2 border-black'>Twitter</li>
            <li className='font-semibold text-[1.2em] hover:border-b-2 border-black'>Facebook</li>
          </ul>
        </div>

        <div>
          <ul>
            <li className='font-semibold text-[1.2em] hover:border-b-2 border-black'>YouTube</li>
            <li className='font-semibold text-[1.2em] hover:border-b-2 border-black'>Instagram</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer




