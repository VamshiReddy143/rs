

import Capabilities from '@/components/Home/Capabilities'
import Clients from '@/components/Home/Clients'
import Contact from '@/components/Home/Contact'
import Footer from '@/components/Home/Footer'
import Hero from '@/components/Home/Hero'
import Scroller from '@/components/Home/Scroller'
import Scroller2 from '@/components/Home/Scroller2'

import Team from '@/components/Home/Team'
import React from 'react'

const page = () => {
  return (
    <div className='bg-[#191a1b]'>
     <div className="w-full min-h-screen lg:max-w-[90em] mx-auto lg:px-[6em] px-1  overflow-x-hidden   py-4 lg:py-10 bg-[#191a1b] text-white">
     <Hero/>
     </div>



      <Scroller/>
     <div className="w-full min-h-screen lg:max-w-[90em] mx-auto lg:px-[6em] px-1  overflow-x-hidden   py-8 lg:py-10 bg-[#191a1b] text-white">
     <Capabilities/>
      <Team/>
     </div>

     <Scroller2/>

     <div className="w-full min-h-screen lg:max-w-[90em] mx-auto lg:px-[6em] px-3  overflow-x-hidden   py-8 lg:py-10 bg-[#191a1b] text-white">
      <Clients/>
      <Contact/>
      <Footer/>
      </div>
      
    </div>
  )
}

export default page