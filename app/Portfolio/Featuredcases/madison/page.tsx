import Hero from '@/components/Portfolio/Featured_cases/madison/Hero'
import Client from '@/components/Portfolio/Featured_cases/madison/Client'
import React from 'react'
import Quote from '@/components/Portfolio/Featured_cases/madison/Quote'
import Partner from '@/components/Portfolio/Featured_cases/madison/Partner'
import Challenge from '@/components/Portfolio/Featured_cases/madison/Challenge'
import Discovery from '@/components/Portfolio/Featured_cases/madison/Discovery'
import Development from '@/components/Portfolio/Featured_cases/madison/Development'
import Projects from '@/components/Portfolio/Featured_cases/emeritus/Projects'
import Footer from '@/components/Portfolio/Footer'

const page = () => {
  return (
    <div>
        <Hero/>
        <Client/>
        <Quote/>
        <Partner/>
        <Challenge/>
        <Discovery/>
        <Development/>
        <Projects/>
        <Footer/>
    </div>
  )
}

export default page