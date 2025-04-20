import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div className='min-h-screen bg-[#ffc83f] text-black lg:px-[10em] px-5 flex flex-col justify-between'>

      {/* Centered Heading */}
        <div className='flex-1 flex items-center justify-start'>
      <h1
        style={{ fontFamily: 'Poppins, sans-serif' }}
        className='lg:text-[72px] text-[3em] font-normal border-b-7 border-black w-fit leading-none overflow-hidden relative  group  '
      >
        <span className='relative z-10 group-hover:text-[#FDD017] transition-colors duration-300'>
          Let's Talk!
        </span>
        <span
          className='absolute inset-[-1] bg-black    transform -translate-x-full group-hover:translate-x-0  group-hover:talk-slider-hover transition-all duration-400 z-0'
        ></span>
      </h1>
    </div>

      {/* Footer Links */}
      <div className='lg:flex justify-between items-end w-full mb-10'>
        <div className='flex flex-col gap-4'>
          <Image src='/rlogo.svg' width={900} height={900} alt='team' className='h-fit w-50' />
          <ul  style={{ fontFamily: 'Poppins, sans-serif' }}>
            <li  className=' text-[20px] font-normal'>info@rootstrap.com</li>
            <li  className=' text-[20px] font-normal'>2025 © Rootstrap. All Rights Reserved.</li>
            <li className=' text-[20px] font-normal'>Privacy Policy</li>
          </ul>
        </div>
       

          <div className='hidden lg:block' >
            <ul style={{ fontFamily: 'Poppins, sans-serif' }}>
              <li className=' text-[20px] font-normal hover:border-b-2 border-black'>LinkedIn</li>
              <li className=' text-[20px] font-normal hover:border-b-2 border-black'>Dribbble</li>
            </ul>
          </div>

          <div className='hidden lg:block'>
            <ul style={{ fontFamily: 'Poppins, sans-serif' }}>
              <li className=' text-[20px] font-normal hover:border-b-2 border-black'>Twitter</li>
              <li className=' text-[20px] font-normal hover:border-b-2 border-black'>Facebook</li>
            </ul>
          </div>

          <div className='hidden lg:block'>
            <ul style={{ fontFamily: 'Poppins, sans-serif' }}>
              <li className=' text-[20px] font-normal hover:border-b-2 border-black'>YouTube</li>
              <li className=' text-[20px] font-normal hover:border-b-2 border-black'>Instagram</li>
            </ul>
          </div>



         <div className='lg:hidden flex justify-between items-center w-full mb-10 mt-10 '>
         <div >
            <ul style={{ fontFamily: 'Poppins, sans-serif' }}>
              <li className=' text-[20px] font-normal hover:border-b-2 border-black'>LinkedIn</li>
              <li className=' text-[20px] font-normal hover:border-b-2 border-black'>Dribbble</li>
            </ul>
          </div>

          <div>
            <ul style={{ fontFamily: 'Poppins, sans-serif' }}>
              <li className=' text-[20px] font-normal hover:border-b-2 border-black'>Twitter</li>
              <li className=' text-[20px] font-normal hover:border-b-2 border-black'>Facebook</li>
            </ul>
          </div>

          <div>
            <ul style={{ fontFamily: 'Poppins, sans-serif' }}>
              <li className=' text-[20px] font-normal hover:border-b-2 border-black'>YouTube</li>
              <li className=' text-[20px] font-normal hover:border-b-2 border-black'>Instagram</li>
            </ul>
          </div>
         </div>
       
      </div>
    </div>
  )
}

export default Footer




