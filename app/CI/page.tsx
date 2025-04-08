import Navbar from '@/components/Navbar'
import React from 'react'
import Hero from '@/components/CI/Hero'

import Footer from '@/components/Footer'
import Tools from '@/components/CI/Tools'
import Portfolio from '@/components/CI/Portfolio'
import Team from '@/components/CI/Team'
import Capabilities from '@/components/CI/Capabilities'
import Us from '@/components/CI/Us'

const page = () => {
  return (
    <div className='text-white bg-black'>
    <div className=' px-20 py-1'>
        <Navbar />
      </div>
      <div className=' pl-20 py-1'>
        <Hero />
      </div>

      <div className=' px-20 py-1'>
        <Tools />
      </div>

      <div className=' px-20 py-1'>
        <Portfolio />
      </div>

      <div className=' px-20 py-1'>
        <Team/>
      </div>


      <div className=' px-20 py-1'>
        <Capabilities/>
      </div>

      <div className=' px-20 py-1'>
        <Us/>
      </div>

      <div className=' px-20 py-1'>
        <Footer/>
      </div>

    </div>
  )
}

export default page