import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div className=' bg-[#FDD017] text-black lg:px-[10em] px-5 py-10 flex flex-col justify-between'>

   
 
      {/* Footer Links */}
      <div className='lg:flex justify-between items-center w-full mb-10'>
        <div className='flex flex-col gap-4'>
          <Image src='/rlogo.svg' width={900} height={900} alt='team' className='h-fit w-50' />
          <ul>
            <li className='font-semibold text-[1.2em]'>info@rootstrap.com</li>
            <li className='font-semibold text-[1.2em]'>2025 © Rootstrap. All Rights Reserved.</li>
            <li className='font-semibold text-[1.2em]'>Privacy Policy</li>
          </ul>
        </div>
       

          <div className='hidden lg:block' >
            <ul>
              <li className='font-semibold text-[1.2em] hover:border-b-2 border-black'>LinkedIn</li>
              <li className='font-semibold text-[1.2em] hover:border-b-2 border-black'>Dribbble</li>
            </ul>
          </div>

          <div className='hidden lg:block'>
            <ul>
              <li className='font-semibold text-[1.2em] hover:border-b-2 border-black'>Twitter</li>
              <li className='font-semibold text-[1.2em] hover:border-b-2 border-black'>Facebook</li>
            </ul>
          </div>

          <div className='hidden lg:block'>
            <ul>
              <li className='font-semibold text-[1.2em] hover:border-b-2 border-black'>YouTube</li>
              <li className='font-semibold text-[1.2em] hover:border-b-2 border-black'>Instagram</li>
            </ul>
          </div>



         <div className='lg:hidden flex justify-between items-center w-full mb-10 mt-10 '>
         <div >
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
    </div>
  )
}

export default Footer




