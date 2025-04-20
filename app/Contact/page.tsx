import Footer from '@/components/AI/Footer'
import Hero from '@/components/Contact/Hero'

import React from 'react'

const page = () => {
  return (
    <div className='bg-[#191a1b]'>
      <div className=' lg:max-w-[90em] mx-auto lg:px-[6em] px-3'>
        <Hero/>
        </div>
       <div className='lg:px-[11%] pb-7 text-white px-5'>
       <Footer/>
       </div>
    </div>
  )
}

export default page