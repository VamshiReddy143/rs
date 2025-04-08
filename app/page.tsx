
import Capabilities from '@/components/AI/Capabilities'
import Clients from '@/components/Clients'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import Team from '@/components/Team'
import React from 'react'

const page = () => {
  return (
    <div className='px-20 py-1 bg-black text-white'>
      <Navbar />
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