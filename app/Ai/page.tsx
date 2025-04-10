import React from 'react'
import Hero from "@/components/AI/Hero"

import Tools from '@/components/AI/Tools'
import Portfolio from '@/components/AI/Portfolio'
import Team from '@/components/AI/Team'
import Capabilities from '@/components/AI/Capabilities'
import Us from '@/components/AI/Us'
import Footer from '@/components/Footer'


const page = () => {
  return (
    <div className='text-white bg-black'>


      <div className=' lg:pl-[10%] md:pl-[5%]  px-2 py-1'>
        <Hero />
      </div>


      <div className=' lg:px-20 px-2 py-1'>
        <Tools />
      </div>


      <div className=' lg:px-20 px-2 py-1'>
        <Portfolio />
      </div>

      <div className=' lg:px-20 px-2 py-1'>
        <Team />
      </div>

      <div className=' lg:px-20 px-2 py-1'>
        <Capabilities />
      </div>

      <div className=' lg:px-20 px-2 py-1'>
        <Us />
      </div>

      <div className=' lg:px-20 px-2 py-1'>
       <Footer/>
      </div>
    </div>
  )
}

export default page