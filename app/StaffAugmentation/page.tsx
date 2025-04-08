import Navbar from '@/components/Navbar'
import React from 'react'
import Hero from "@/components/StaffAugmentation/Hero"
import Kpi from '@/components/StaffAugmentation/Kpi'
import Collabaration from '@/components/StaffAugmentation/Collabaration'
import Roadmap from '@/components/StaffAugmentation/Roadmap'
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
        <Kpi />
      </div>

      <div className=' px-20 py-1'>
        <Collabaration />
      </div>

      <div className=' px-20 py-1'>
        <Roadmap />
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