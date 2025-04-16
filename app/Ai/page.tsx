import React from 'react'
import Hero from "@/components/AI/Hero"
import Tools from '@/components/AI/Tools'
import Portfolio from '@/components/AI/Portfolio'
import Team from '@/components/AI/Team'
import Capabilities from '@/components/AI/Capabilities'
import Us from '@/components/AI/Us'
import Footer from '@/components/Home/Footer'


const page = () => {
  return (
    <div className='text-white bg-black'>

       <div className='lg:ml-[11%] px-3 md:mt-10 mt-10 py-1'>
       <Hero />
       </div>
      <div className=' max-w-[90em] mx-auto  lg:px-[6em] px-3'>
   
        <Tools />   
        <Portfolio />   
        <Team />
        <Capabilities /> 
        <Us />
        <Footer/>
      </div>
    </div>
  )
}

export default page