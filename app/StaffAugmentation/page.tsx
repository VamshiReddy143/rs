






import React from 'react'
import Hero from "@/components/StaffAugmentation/Hero"
import Kpi from '@/components/StaffAugmentation/Kpi'
import Collabaration from '@/components/StaffAugmentation/Collabaration'
import Roadmap from '@/components/StaffAugmentation/Roadmap'
import Us from '@/components/CI/Us'
import Footer from '@/components/AI/Footer'


const page = () => {
  return (
    <div className='text-white bg-[#191a1b] '>
      

      <div className='lg:ml-[11%] px-3 md:mt-10 lg:mt-0 py-1'>
        <Hero />
      </div>

      <div className=' lg:max-w-[90em] mx-auto lg:px-[6em] px-3'>
      <div className='   '>
        <Kpi />
      </div>

      <div className='  '>
        <Collabaration />
      </div>
        <Roadmap />
        <Us />
        <Footer />
      </div>
    </div>
  )
}

export default page