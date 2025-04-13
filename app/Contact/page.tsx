import Hero from '@/components/Contact/Hero'
import Footer from '@/components/Footer'
import React from 'react'

const page = () => {
  return (
    <div>
      <div className=' lg:max-w-[90em] mx-auto lg:px-[6em] px-3'>
        <Hero/>
        </div>
       <div className='lg:p-[11%] text-white px-5'>
       <Footer/>
       </div>
    </div>
  )
}

export default page