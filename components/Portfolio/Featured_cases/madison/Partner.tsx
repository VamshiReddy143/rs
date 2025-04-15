import Image from 'next/image'
import React from 'react'

const Partner = () => {
  return (
    <div className='bg-black text-white'>
         <div className='lg:max-w-[90em] bg-black text-white mx-auto lg:px-[6em] px-3 lg:py-[15em] py-[7em]'>
            <h1 className='lg:text-[4em] text-[2em] font-semibold leading-tight w-[90%]'>Madison Reed urgently needed a partner to help them navigate this drastic turn of events</h1>
            <p className='lg:pt-[4em] pt-[2em] text-[1.3em] w-[90%]'>There core business logic would be bringing on board an outsourced team, add capacity and capability temporarily, and then transition the project back to their smaller, internal team for ongoing maintenance.</p>
         </div>
         <div>
            <Image src={"/modelmobile.jpg"} alt="team" width={900} height={900} className='w-[100vw]  lg:h-[60vh] h-[40vh] object-cover '/>
         </div>
    </div>
  )
}

export default Partner