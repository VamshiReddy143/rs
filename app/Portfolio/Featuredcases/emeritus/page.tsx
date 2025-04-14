import Hero from '@/components/Portfolio/Featured_cases/emeritus/Hero'
import React from 'react'
import Clients from "@/components/Portfolio/Featured_cases/emeritus/Clients"
// import Challenges from '@/components/Portfolio/Featured_cases/emeritus/Challenges'
import Achievements from '@/components/Portfolio/Featured_cases/emeritus/Achievements'
import Results from '@/components/Portfolio/Featured_cases/emeritus/Results'
import Technologies from '@/components/Portfolio/Featured_cases/emeritus/Technologies'
import Projects from '@/components/Portfolio/Featured_cases/emeritus/Projects'
import Footer from '@/components/Portfolio/Footer'

const page = () => {
  return (
    <div>
        <Hero/>
        <Clients/>
        {/* <Challenges/> */}
        <Achievements/>
        <Results/>
        <Technologies/>
        <Projects/>
        <Footer/>
    </div>
  )
}

export default page