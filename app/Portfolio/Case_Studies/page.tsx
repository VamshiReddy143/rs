import Challenge from '@/components/Portfolio/Case_Studies/Challenge'
import Clients from '@/components/Portfolio/Case_Studies/Clients'
import Hero from '@/components/Portfolio/Case_Studies/Hero'
import Results from '@/components/Portfolio/Case_Studies/Results'
import Projects from '@/components/Portfolio/Featured_cases/emeritus/Projects'
import Footer from '@/components/Portfolio/Footer'
import React from 'react'

const page = () => {
  return (
    <div>
      <Hero/>
      <Clients/>
      <Challenge/>
      <Results/>
      <Projects/>
      <Footer/>
      
    </div>
  )
}

export default page
