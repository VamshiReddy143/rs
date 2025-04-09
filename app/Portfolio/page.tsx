import Navbar from '@/components/Navbar'
import React from 'react'
import Hero from "@/components/Portfolio/Hero"
import Fprojects from '@/components/Portfolio/Fprojects'
import Allprojects from '@/components/Portfolio/Allprojects'
import Footer from '@/components/Portfolio/Footer'


const page = () => {
  return (
    <div className='text-white bg-black'>
        <Navbar/>
       
        <div className='px-20 py-2'>
           <Hero/>
        </div>
        <div className='px-20 py-2'>
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