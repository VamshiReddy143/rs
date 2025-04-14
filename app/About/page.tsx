import Connections from '@/components/About/Connections'
import Hero from '@/components/About/Hero'
import Maps from '@/components/About/Maps'
import MarketVideo from '@/components/About/MarketVideo'
import Footer from '@/components/Portfolio/Footer'
import { div } from 'motion/react-client'

import React from 'react'

const page = () => {
  return (
   <div>
   <div className='bg-[#f4f3ef]'>
   <Hero/>
   </div>
    <MarketVideo/>
     <div  className=' lg:max-w-[90em] mx-auto lg:px-[6em] pb-10 px-3'>
    
   <Connections/>


     
 </div>
  <div className='mt-10 min-h-screen'>
  <Maps/>
  </div>
   <Footer/>
   </div>
  )
}

export default page