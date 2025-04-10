
import React from 'react'
import Hero from "@/components/Portfolio/Hero"
import Fprojects from '@/components/Portfolio/Fprojects'
import Allprojects from '@/components/Portfolio/Allprojects'
import Footer from '@/components/Portfolio/Footer'


const page = () => {
  return (
    <div className='text-white bg-black'>
      
       
      <div className=' lg:px-[10%] md:pl-[5%] mt-[10em] lg:mt-0 px-2 py-1'>
        <Hero />
      </div>
        <div className='lg:px-[10%] px-4 mt-[5em] lg:mt-0 py-2'>
        <Fprojects/>
        </div>
        <div className=''>
        <Allprojects/>
        </div>
        <div className=''>
        <Footer/>
        </div>

      

    </div>
  )
}

export default page