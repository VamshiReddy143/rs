


import Clients from '@/components/Hiring/Clients';
import Fun from '@/components/Hiring/Fun';
import Hero from '@/components/Hiring/Hero';
import Team from '@/components/Hiring/Team';
import Challenges from '@/components/Hiring/Challenges';
import Community from '@/components/Hiring/Community';
import Footer from '@/components/Hiring/Footer';


import React from 'react'


const page = () => {
  return (
  
     <div className='bg-[#1b1b1b]'>
      <Hero />
       <Clients />
       <div className=' lg:max-w-[90em] mx-auto lg:px-[6em] px-3'>

    
        <Team />
        </div>
        
       <Fun />
       <Challenges />
       <Community />
      <Footer />
    
     </div>
  )
}

export default page