
import React from 'react'
import Hero from "@/components/Portfolio/Hero"
import Fprojects from '@/components/Portfolio/Fprojects'
import Allprojects from '@/components/Portfolio/Allprojects'
import Footer from '@/components/Portfolio/Footer'


const page = () => {
  return (
    <div className='text-white bg-black'>


      <div className=' lg:max-w-[90em] mx-auto lg:px-[4em] px-3'>
        <Hero />
      
     
        <Fprojects />
      </div>
        <Allprojects />
        <Footer />



    </div>
  )
}

export default page