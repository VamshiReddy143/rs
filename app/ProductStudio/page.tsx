






import React from 'react'
import Hero from "@/components/ProductStudio/Hero"
import Vision from "@/components/ProductStudio/Vision"
import Rapid from '@/components/ProductStudio/Rapid'
import Market from '@/components/ProductStudio/Market'
import Us from '@/components/CI/Us'
import Footer from '@/components/AI/Footer'


const page = () => {
  return (
    <div className='text-white bg-[#191a1b]'>


      <div className='lg:ml-[11%] px-3 md:mt-10 lg:mt-0 py-1'>
        <Hero />
      </div>

      <div className=' lg:max-w-[90em] mx-auto lg:px-[6em] px-3'>


        <div className=' hidden md:block '>
          <Vision />
        </div>

        <div className='  hidden md:block'>
          <Rapid />
        </div>



 <div className='  hidden md:block'>
        <Market />
        </div>



        <Us />



        <Footer />
      </div>
    </div>
  )
}

export default page