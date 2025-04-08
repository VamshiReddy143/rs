import Navbar from '@/components/Navbar'
import React from 'react'
import Hero from "@/components/ProductStudio/Hero"
import Vision from "@/components/ProductStudio/Vision"
import Rapid from '@/components/ProductStudio/Rapid'
import Market from '@/components/ProductStudio/Market'
import Us from '@/components/CI/Us'
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
        <Vision/>
      </div>

      <div className=' px-20 py-1'>
        <Rapid/>
      </div>

      <div className=' px-20 py-1'>
        <Market/>
      </div>

      <div className=' px-20 py-1'>
        <Us />
      </div>

      <div className=' px-20 py-1'>
        <Footer />
      </div>
    </div>
  )
}

export default page