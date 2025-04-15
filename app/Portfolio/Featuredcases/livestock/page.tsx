import Hero from '@/components/Portfolio/Featured_cases/livestock/Hero'
import React from 'react'
import Management from '@/components/Portfolio/Featured_cases/livestock/Management'
import About from '@/components/Portfolio/Featured_cases/livestock/About'
import Cows from '@/components/Portfolio/Featured_cases/livestock/Cows'
import Breeding from '@/components/Portfolio/Featured_cases/livestock/Breeding'
import Farming from '@/components/Portfolio/Featured_cases/livestock/Farming'
import Projects from '@/components/Portfolio/Featured_cases/masterclass/Projects'
import Footer from '@/components/Portfolio/Footer'

const page = () => {
  return (
    <div>
        <Hero/>
        <Management/>
        <About/>
        <Cows/>
        <Breeding/>
        <Farming/>
        <Projects/>
        <Footer/>
    </div>
  )
}

export default page