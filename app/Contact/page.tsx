import Hero from '@/components/Contact/Hero'
import Footer from '@/components/Footer'
import React from 'react'

const page = () => {
  return (
    <div>
        <Hero/>
       <div className='lg:p-[10%] text-white px-5'>
       <Footer/>
       </div>
    </div>
  )
}

export default page