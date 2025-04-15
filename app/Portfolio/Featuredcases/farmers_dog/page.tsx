import Hero from '@/components/Portfolio/Featured_cases/farmers_dog/Hero'
import Clients from '@/components/Portfolio/Featured_cases/farmers_dog/Clients'
import React from 'react'
import Challenge from '@/components/Portfolio/Featured_cases/farmers_dog/Challenge'
import What_we_did from '@/components/Portfolio/Featured_cases/farmers_dog/What_we_did'
import About from '@/components/Portfolio/Featured_cases/farmers_dog/About'
import Technologies from '@/components/Portfolio/Featured_cases/farmers_dog/Technologies'
import Projects from '@/components/Portfolio/Featured_cases/emeritus/Projects'
import Footer from '@/components/Portfolio/Footer'

const page = () => {
  return (
    <div>
        <Hero/>
        <Clients/>
        <Challenge/>
        <What_we_did/>
        <About/>
        <Technologies/>
        <Projects/>
        <Footer/>
    </div>
  )
}

export default page