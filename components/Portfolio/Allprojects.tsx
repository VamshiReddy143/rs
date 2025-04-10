import Image from 'next/image'
import React from 'react'

const Allprojects = () => {
  return (
    <div className='bg-gray-100 text-black lg:p-10 p-4 mt-[5em]'>
      <div>
        <h1 className='text-[3em] font-semibold'>All Projects</h1>
      </div>

      <div className='grid md:grid-cols-3 gap-10 mt-[5em]'>
        <div className='group'>
          <div className='relative w-full lg:h-[35em] h-[25em] object-cover rounded-lg overflow-hidden bg-transparent group-hover:outline group-hover:outline-5 group-hover:outline-[#FFDF00]'>
            <Image
              src={"/cleo.jpg"}
              fill
              alt="team"
              className=' transition-all duration-300 group-hover:scale-110'
            />
          </div>
          <h1 className='lg:text-[3em] text-[2em]  font-semibold'>Cleo</h1>
          <p className='lg:text-[1.5em] md:text-[1em] text-[1.3em]'>Creating a seamless app-based communication experience to assist working parents</p>
        </div>

        <div className='group md:pt-[4em] lg:pt-[7em]'>
          <div className='relative w-full lg:h-[35em] h-[25em] rounded-lg overflow-hidden bg-transparent group-hover:outline group-hover:outline-5 group-hover:outline-[#FFDF00]'>
            <Image
              src={"/car.jpg"}
              fill
              alt="team"
              className='object-cover transition-all duration-300 group-hover:scale-110'
            />
          </div>
          <h1 className='lg:text-[3em] text-[2em]  font-semibold'>Fisker</h1>
          <p className='lg:text-[1.5em] md:text-[1em] text-[1.3em]'>Revolutionizing transportation advertising with fisker</p>
        </div>

        <div className='group md:pt-[1em] lg:pt-[3em]'>
          <div className='relative w-full lg:h-[35em] h-[25em] rounded-lg overflow-hidden bg-transparent group-hover:outline group-hover:outline-5 group-hover:outline-[#FFDF00]'>
            <Image
              src={"/brook.jpg"}
              fill
              alt="team"
              className='object-cover transition-all duration-300 group-hover:scale-110'
            />
          </div>
          <h1 className='lg:text-[3em] text-[2em]  font-semibold'>Watter</h1>
          <p className='lg:text-[1.5em] md:text-[1em] text-[1.3em]'>Helping WalletJoy launch a personal finance platform</p>
        </div>

        <div className='group'>
          <div className='relative w-full lg:h-[35em] h-[25em] rounded-lg overflow-hidden bg-transparent group-hover:outline group-hover:outline-5 group-hover:outline-[#FFDF00]'>
            <Image
              src={"/mrbesat.jpg"}
              fill
              alt="team"
              className='object-cover transition-all duration-300 group-hover:scale-110'
            />
          </div>
          <h1 className='lg:text-[3em] text-[2em] font-semibold'>Tony Robbins</h1>
          <p className='lg:text-[1.5em] md:text-[1em] text-[1.3em]'>Breakingthrough: digitizing Tony Robbins&apos;s coaching empire</p>
        </div>

        <div className='group md:pt-[4em] lg:pt-[7em]'>
          <div className='relative w-full lg:h-[35em] h-[25em] rounded-lg overflow-hidden bg-transparent group-hover:outline group-hover:outline-5 group-hover:outline-[#FFDF00]'>
            <Image
              src={"/d.jpg"}
              fill
              alt="team"
              className='object-cover transition-all duration-300 group-hover:scale-110'
            />
          </div>
          <h1 className='lg:text-[3em] text-[2em] font-semibold'>DAOFY</h1>
          <p className='lg:text-[1.5em] md:text-[1em] text-[1.3em]'>Shaping the future of NFTs</p>
        </div>

        <div className='group md:pt-[1em] lg:pt-[3em]'>
          <div className='relative w-full lg:h-[35em] h-[25em] rounded-lg overflow-hidden bg-transparent group-hover:outline group-hover:outline-5 group-hover:outline-[#FFDF00]'>
            <Image
              src={"/light.jpg"}
              fill
              alt="team"
              className='object-cover transition-all duration-300 group-hover:scale-110'
            />
          </div>
          <h1 className='lg:text-[3em] text-[2em] font-semibold'>Avanti</h1>
          <p className='lg:text-[1.5em] md:text-[1em] text-[1.3em]'>Increasing online retail sales via AI</p>
        </div>
      </div>
    </div>
  )
}

export default Allprojects