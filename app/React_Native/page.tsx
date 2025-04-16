import React from 'react'
import Hero from '@/components/React_Native/Hero'

import Team from '@/components/React/Team'

import Us from '@/components/CI/Us'
import Footer from '@/components/Home/Footer'
import Tools from '@/components/React_Native/Tools'
import Portfolio from '@/components/React_Native/Portfolio'
import Capabilities from '@/components/AI/Capabilities'



const page = () => {
  return (
    <div className='text-white bg-black'>
         <div className='lg:ml-[11%] px-3 md:mt-10 mt-10 py-1'>
       <Hero/>
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