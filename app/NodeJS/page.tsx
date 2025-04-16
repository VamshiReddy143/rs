import React from 'react'
import Hero from "@/components/NodeJS/Hero"
import Tools from '@/components/NodeJS/Tools'
import Portfolio from '@/components/NodeJS/Portfolio'
import Team from '@/components/NodeJS/Team'
import Capabilities from '@/components/AI/Capabilities'
import Us from '@/components/CI/Us'
import Footer from '@/components/Home/Footer'



const page = () => {
  return (
    <div className='text-white bg-black'>
         <div className='lg:ml-[11%] px-3 md:mt-10 mt-10 py-1'>
       <Hero />
       </div>

       <div className=' lg:max-w-[90em] mx-auto  lg:px-[6em] px-3'>
        <Tools/>
        <Portfolio/>
        <Team/>
        <Capabilities/>
        <Us/>
        <Footer/>
       </div>
    </div>
  )
}

export default page