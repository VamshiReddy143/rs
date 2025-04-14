
import Hero from '@/components/Portfolio/Featured_cases/masterclass/Hero'
import Partner from '@/components/Portfolio/Featured_cases/masterclass/Partner'
import Projects from '@/components/Portfolio/Featured_cases/masterclass/Projects'
import Scroller from '@/components/Portfolio/Featured_cases/masterclass/Scroller'
import Team from '@/components/Portfolio/Featured_cases/masterclass/Team'
import Technologies from '@/components/Portfolio/Featured_cases/masterclass/Technologies'
import Footer from '@/components/Portfolio/Footer'

import React from 'react'

const masterclass = () => {
  return (
   <div className=''>
     {/* <div className='text-white lg:max-w-[90em] bg-red-700 mx-auto lg:px-[6em] px-3'>
    </div> */}
      <Hero/>
      <Team/>
      <Scroller/>
      <Partner/>
      <Technologies/>
      <Projects/>
      <Footer/>
   </div>
  )
}

export default masterclass