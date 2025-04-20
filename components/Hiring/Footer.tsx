import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div    style={{ fontFamily: 'Poppins, sans-serif' }} className=' bg-[#FDD017] text-black lg:px-[10em] px-5 py-10 flex flex-col justify-between'>

   
 
      {/* Footer Links */}
      <div className='lg:flex justify-between items-end w-full mb-2'>
        <div className='flex flex-col gap-4'>
          <Image src='/rlogo.svg' width={900} height={900} alt='team' className='h-fit w-50' />
          <ul>
            <li className='font-normal text-[20px] leading-[30px]'>info@rootstrap.com</li>
            <li className='font-normal text-[20px] leading-[30px]'>2025 © Rootstrap. All Rights Reserved.</li>
            <li className='font-normal text-[20px] leading-[30px]'>Privacy Policy</li>
          </ul>
        </div>
       

          <div className='hidden lg:block' >
            <ul>
              <li className='font-medium text-[20px] leading-[30px] hover:border-b-1 border-black'>LinkedIn</li>
              <li className='font-medium text-[20px] leading-[30px] hover:border-b-1 border-black'>Dribbble</li>
            </ul>
          </div>

          <div className='hidden lg:block'>
            <ul>
              <li className='font-medium text-[20px] leading-[30px] hover:border-b-1 border-black'>Twitter</li>
              <li className='font-medium text-[20px] leading-[30px] hover:border-b-1 border-black'>Facebook</li>
            </ul>
          </div>

          <div className='hidden lg:block'>
            <ul>
              <li className='font-medium text-[20px] leading-[30px] hover:border-b-1 border-black'>YouTube</li>
              <li className='font-medium text-[20px] leading-[30px] hover:border-b-1 border-black'>Instagram</li>
            </ul>
          </div>



         <div className='lg:hidden flex justify-between items-center w-full mb-10 mt-10 '>
         <div >
            <ul>
              <li className='font-medium text-[20px] leading-[30px] hover:border-b-1 border-black'>LinkedIn</li>
              <li className='font-medium text-[20px] leading-[30px] hover:border-b-1 border-black'>Dribbble</li>
            </ul>
          </div>

          <div>
            <ul>
              <li className='font-medium text-[20px] leading-[30px] hover:border-b-1 border-black'>Twitter</li>
              <li className='font-medium text-[20px] leading-[30px] hover:border-b-1 border-black'>Facebook</li>
            </ul>
          </div>

          <div>
            <ul>
              <li className='font-medium text-[20px] leading-[30px] hover:border-b-1 border-black'>YouTube</li>
              <li className='font-medium text-[20px] leading-[30px] hover:border-b-1 border-black'>Instagram</li>
            </ul>
          </div>
         </div>
       
      </div>
    </div>
  )
}

export default Footer




