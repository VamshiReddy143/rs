
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
   
   <div className=' lg:pl-[10%] md:pl-[5%]  px-2 py-1'>
        <Hero />
      </div>


      <div className=' lg:px-20 px-2 py-1'>
        <Tools />
      </div>

      <div className=' lg:px-20 px-1 py-1'>
        <Portfolio />
      </div>

      <div className=' lg:px-20 px-2 py-1'>
        <Team/>
      </div>


      <div className=' lg:px-20 px-2 py-1'>
        <Capabilities/>
      </div>

      <div className=' lg:px-20 px-2 py-1'>
        <Us/>
      </div>

      <div className=' lg:px-20 px-2 py-1'>
        <Footer/>
      </div>

    </div>
  )
}

export default page