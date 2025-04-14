import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Fprojects = () => {
  return (
    <div className='flex flex-col items-start justify-center'>
      <div>
        <h1 className='text-[2.4em] '>Featured</h1>
        <h1 className='text-[3.5em] font-bold'>Projects</h1>
        <div className='bg-[#f6ff7a] w-[100px] h-[5px] mt-5' />
      </div>

      <div className='mt-10'>
        <div className='grid lg:grid-cols-2 grid-cols-1 gap-10'>
          {/* Project 1 */}
         <Link href={"/Portfolio/Featuredcases/masterclass"}>
         <div className='group'>
            <div className='relative  w-full lg:w-full md:w-full lg:h-[40em] h-[30em]  object-cover rounded-lg overflow-hidden bg-transparent group-hover:outline group-hover:outline-5 group-hover:outline-[#f6ff7a]'>
              <Image
                src={"/ms.jpg"}
                fill
                alt='team'
                className='object-cover transition-all duration-300 group-hover:scale-110'
              />
            </div>
            <h1 className='text-[2em] font-bold mt-4'>MasterClass</h1>
            <p className='text-[1.3em]'>A dynamic partnership shaping the future of online education</p>
          </div>
         </Link>

          {/* Project 2 */}
          <Link href={"/Portfolio/Featuredcases/emeritus"}>
          <div className='group pt-30'>
            <div className='relative  w-full lg:w-full md:w-full h-[30em] object-cover rounded-lg overflow-hidden bg-transparent group-hover:outline group-hover:outline-5 group-hover:outline-[#f6ff7a]'>
              <Image
                src={"/emirutus.jpg"}
                fill
                alt='team'
                className='object-cover transition-all duration-300 group-hover:scale-110'
              />
            </div>
            <h1 className='text-[2em] font-bold mt-4'>Emeritus</h1>
            <p className='text-[1.3em]'>Delving into the progressive transformation that boosted user experience and conversions.</p>
          </div>
          </Link>

          {/* Project 3 */}
          <div className='group'>
            <div className='relative  w-full lg:w-full md:w-full h-[30em]  object-cover rounded-lg overflow-hidden bg-transparent group-hover:outline group-hover:outline-5 group-hover:outline-[#f6ff7a]'>
              <Image
                src={"/cow.jpg"}
                fill
                alt='team'
                className='object-cover transition-all duration-300 group-hover:scale-110'
              />
            </div>
            <h1 className='text-[2em] font-bold mt-4'>Livestock Health</h1>
            <p className='text-[1.3em]'>A revolutionary step in animal health: AI-based illness detection</p>
          </div>

          {/* Project 4 */}
          <div className='group pt-30'>
            <div className='relative  w-full lg:w-full md:w-full h-[30em] object-cover rounded-lg overflow-hidden bg-transparent group-hover:outline group-hover:outline-5 group-hover:outline-[#f6ff7a]'>
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
        </div>
      </div>
    </div>
  )
}

export default Fprojects