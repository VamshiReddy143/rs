import React from 'react'
import Hero from '@/components/React_Native/Hero'



import Us from '@/components/CI/Us'
import Tools from '@/components/React_Native/Tools'
import Portfolio from '@/components/React_Native/Portfolio'
import Capabilities from '@/components/AI/Capabilities'
import Team from '@/components/React_Native/Team'
import Footer from '@/components/AI/Footer'



const page = () => {
  return (
    <div className='text-white bg-[#191a1b]'>
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