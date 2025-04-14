import Image from 'next/image'
import React from 'react'

const Achievements = () => {
  return (
    <div className='min-h-screen bg-gradient-to-b from-[#07844e] to-white '>
      <div className='lg:max-w-[90em] mx-auto lg:px-[6em] px-3 lg:pt-[12em] pt-[5em] lg:pt-[12em] md:flex gap-[5em] items-center'>
        <Image src={"/aimg2.jpg"} alt="team" width={900} height={900} className='h-full w-full '/>
      </div>

      <div className='lg:max-w-[90em] mx-auto text-black  lg:px-[6em] px-3 lg:mt-[12em] lg:pt-[1em]  gap-[5em] items-center pb-[10em]'>
        <p className='lg:text-[1.6em] text-[1.2em]'>ACHIVEMENTS</p>
        <div className='mt-10 flex flex-col gap-4'>
          <div className='flex gap-4 items-start'>
            <h1 className='lg:text-[2em] text-[1.5em]'>●</h1>
            <p className='lg:text-[2.5em] text-[1.5em] '>Developing new back and frontends on higher-performing Ruby on Rails and React applications.</p>
          </div>
          <div className='flex gap-4 items-start'>
            <h1 className='lg:text-[2em] text-[1.5em]'>●</h1>
            <p className='lg:text-[2.5em] text-[1.5em]'>Implementing a single sign-on flow (SSO) to improve the Enrollment Engine functionality.</p>
          </div>

          <div className='flex gap-4 items-start'>
            <h1 className='lg:text-[2em] text-[1.5em]'>●</h1>
            <p className='lg:text-[2.5em] text-[1.5em]'>Launching subdomains for unique white-label experiences with university partners.</p>
          </div>

        </div>
      </div>

      <div className='lg:mt-[1em]'>
        <Image src={"/blacks.jpg"} alt="team" width={900} height={900} className='h-[50vh] w-[100vw] object-cover'/>
      </div>
    </div>
  )
}

export default Achievements
