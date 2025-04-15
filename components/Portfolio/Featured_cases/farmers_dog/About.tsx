import React from 'react'

const About = () => {
  return (
    <div className='bg-white text-black'>
         <div className='lg:max-w-[90em] mx-auto lg:px-[4em] px-3 lg:py-[14em] py-[6em] '>
                <h1 className='lg:text-[4em] text-[2em] font-semibold leading-tight'>
                “The team is friendly, engineers are tightly integrated into our teams, and culture and leadership has been thoughtful in seeking feedback and working to {" "}<span className='text-[#f1684a]'>partnership with the Rootstrap team.</span>”
                </h1>
                <div className='lg:mt-[4em] mt-[2em]'>
                    <p className=' lg:text-[2em] text-[1em]'>Ashley VanderWel</p>
                    <p className='lg:text-[2.2em] text-[1.2em] text-[#f1684a]'>Sr Director of Engineering</p>
                </div>
            </div>
    </div>
  )
}

export default About