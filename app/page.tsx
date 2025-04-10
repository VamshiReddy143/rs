
import Capabilities from '@/components/AI/Capabilities'
import Clients from '@/components/Clients'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'

import Team from '@/components/Team'
import React from 'react'

const page = () => {
  return (
    <div className='max-w-[100vw] overflow-x-hidden lg:px-[10%] px-4 py-8 lg:py-10 bg-black text-white'>
      <Hero/>
      <Capabilities/>
      <Team/>
      <Clients/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default page