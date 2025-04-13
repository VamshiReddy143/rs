
import React from 'react'
import Hero from '@/components/DE/Hero'
import Tools from '@/components/DE/Tools'
import Portfolio from '@/components/DE/Portfolio'
import Team from '@/components/DE/Team'

import Us from '@/components/DE/Us'
import Footer from '@/components/Footer'
import Capabilities from '@/components/AI/Capabilities'

const page = () => {
  return (
  <div className='text-white bg-black'>
   <div className='lg:ml-[11%] px-3 md:mt-10 mt-10 py-1'>
       <Hero />
       </div>
      <div className=' max-w-[90em] mx-auto lg:px-[6em] px-3'>
        <Tools />

        <Portfolio />

        <Team/>
  
        <Capabilities/>
  
        <Us/>
        <Footer/>
      </div>

    </div>
  )
}

export default page