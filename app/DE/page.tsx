import Navbar from '@/components/Navbar'
import React from 'react'
import Hero from '@/components/DE/Hero'
import Tools from '@/components/DE/Tools'
import Portfolio from '@/components/DE/Portfolio'
import Team from '@/components/DE/Team'
import Capabilities from '@/components/DE/Capabilities'
import Us from '@/components/DE/Us'
import Footer from '@/components/Footer'

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