import Cards from '@/components/Blog/Cards'
import Hero from '@/components/Blog/Hero'
import React from 'react'
import Scroller from '@/components/Blog/BlogScroller'
import Footer from '@/components/Footer'


const page = () => {
    return (
        <div>
            <div className='lg:ml-[11%] px-3 md:mt-10 mt-0 py-1'>
                <Hero />
            </div>
            <div className=' lg:max-w-[90em] mx-auto lg:px-[6em] px-3'>
                <Cards />
            </div>

            <div className=' mx-auto hidden md:block px-3'>
                <Scroller />
            </div>

            <div className=' lg:max-w-[90em] mx-auto lg:px-[6em] px-3'>
                <Footer />
            </div>

        </div>
    )
}

export default page