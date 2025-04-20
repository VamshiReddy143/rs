
import React from 'react'
import Hero from "@/components/Portfolio/Hero"
import Fprojects from '@/components/Portfolio/Fprojects'
import Allprojects from '@/components/Portfolio/Allprojects'
import Footer from '@/components/Portfolio/Footer'


const page = () => {
  return (
    <div className='text-white bg-[#212121]'>


      <div className=' lg:pl-[11%]  mx-auto  px-3'>
        <Hero />
      
     
      
      </div>
      
      <div className=' lg:max-w-[90em]  mx-auto lg:px-[4em] px-3'>
    
      
     
        <Fprojects />
      </div>
      <div className=' lg:  mx-auto lg:px-[10%] bg-gray-100 px-3'>
    
      
     
        
        <Allprojects />
      </div>
        <Footer />



    </div>
  )
}

export default page