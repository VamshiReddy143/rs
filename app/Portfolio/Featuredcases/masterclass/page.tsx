
import Hero from '@/components/Portfolio/Featured_cases/masterclass/Hero'
import Projects from '@/components/Portfolio/Featured_cases/masterclass/Projects'
import Footer from '@/components/Portfolio/Footer'

import React from 'react'

const masterclass = () => {
  return (
   <div className='bg-[#212121]'>
     {/* <div className='text-white lg:max-w-[90em] bg-red-700 mx-auto lg:px-[6em] px-3'>
    </div> */}
      <Hero/>
      <Projects/>
      <Footer/>
   </div>
  )
}

export default masterclass