import Connections from '@/components/About/Connections'
import Hero from '@/components/About/Hero'
import Maps from '@/components/About/Maps'
import MarketVideo from '@/components/About/MarketVideo'
import Footer from '@/components/Portfolio/Footer'

import React from 'react'

const page = () => {
  return (
    <div className=''>
    
       <Hero/>
       <MarketVideo/>
      <Connections/>
      <Maps/>
      <Footer/>
 

        
    </div>
  )
}

export default page