import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Fprojects = () => {
  return (
    <div className='flex flex-col items-start justify-center pb-10'>
      <div className='flex flex-col gap-1 leading-snug'>
        <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className='text-[32px] font-medium'>Featured</h1>
        <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className='text-[64px] font-medium'>Projects</h1>
        <div className='bg-white w-[70px] h-[4px] mt-5' />
      </div>

      <div className='mt-10'>
        <div className='grid lg:grid-cols-2 grid-cols-1 gap-10'>
          {/* Project 1 */}
         <Link href={"/Portfolio/Featuredcases/masterclass"}>
         <div className='group'>
            <div className='relative  w-full lg:w-full md:w-full lg:h-[40em] h-[30em]  object-cover  overflow-hidden bg-transparent group-hover:outline group-hover:outline-5 group-hover:outline-[#FDD017]'>
              <Image
                src={"/ms.jpg"}
                fill
                alt='team'
                className='object-cover transition-all duration-300 group-hover:scale-110'
              />
            </div>
            <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className='text-[32px] font-medium mt-4'>MasterClass</h1>
            <p style={{ fontFamily: 'Poppins, sans-serif' }} className='text-[20px]'>A dynamic partnership shaping the future of online education</p>
          </div>
         </Link>

          {/* Project 2 */}
          <Link href={"/Portfolio/Featuredcases/emeritus"}>
          <div className='group pt-10'>
            <div className='relative  w-full lg:w-full md:w-full h-[38em] object-cover  overflow-hidden bg-transparent group-hover:outline group-hover:outline-5 group-hover:outline-[#FDD017]'>
              <Image
                src={"/emirutus.jpg"}
                fill
                alt='team'
                className='object-cover transition-all duration-300 group-hover:scale-110'
              />
            </div>
            <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className='text-[32px] font-medium mt-4'>Emeritus</h1>
            <p style={{ fontFamily: 'Poppins, sans-serif' }} className='text-[20px]'>Delving into the progressive transformation that boosted user experience and conversions.</p>
          </div>
          </Link>

          {/* Project 3 */}
          <Link href={"/Portfolio/Featuredcases/livestock"}>
          <div className='group'>
            <div className='relative  w-full lg:w-full md:w-full h-[37em]  object-cover  overflow-hidden bg-transparent group-hover:outline group-hover:outline-5 group-hover:outline-[#FDD017]'>
              <Image
                src={"/cow.jpg"}
                fill
                alt='team'
                className='object-cover transition-all duration-300 group-hover:scale-110'
              />
            </div>
            <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className='text-[32px] font-medium mt-4'>Livestock Health</h1>
            <p style={{ fontFamily: 'Poppins, sans-serif' }} className='text-[20px]'>A revolutionary step in animal health: AI-based illness detection</p>
          </div>
          </Link>

          {/* Project 4 */}
          <Link href={"/Portfolio/Featuredcases/madison"}>
          <div className='group pt-10'>
            <div className='relative  w-full lg:w-full md:w-full h-[38em] object-cover  overflow-hidden bg-transparent group-hover:outline group-hover:outline-5 group-hover:outline-[#FDD017]'>
              <Image
                src={"/madison.jpg"}
                fill
                alt='team'
                className='object-cover transition-all duration-300 group-hover:scale-110'
              />
            </div>
            <h1 className='text-[2em] font-bold mt-4'>Madison Reed</h1>
            <p className='text-[1.3em]'>Elevating an omnichannel customer experience</p>
          </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Fprojects