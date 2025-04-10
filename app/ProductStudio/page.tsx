
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
     

     <div className=' lg:pl-[10%] md:pl-[5%]  px-2 py-1'>
        <Hero />
      </div>

      <div className=' lg:px-20 hidden md:block px-2 py-1'>
        <Vision/>
      </div>

      <div className=' lg:px-20 hidden md:block px-2 py-1'>
        <Rapid/>
      </div>


      {/* change after wards */}

      <div className=' lg:px-20 px-2 py-1'>
        <Market/>
      </div>

      <div className=' lg;px-20 px-2 py-1'>
        <Us />
      </div>

      <div className=' lg:px-20 px-2 py-1'>
        <Footer />
      </div>
    </div>
  )
}

export default page