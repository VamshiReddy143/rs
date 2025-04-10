import Cards from '@/components/Blog/Cards'
import Hero from '@/components/Blog/Hero'
import React from 'react'
import Scroller from '@/components/Blog/BlogScroller'
import Footer from '@/components/Footer'

const page = () => {
    return (
        <div className='bg-black text-white'>
            <Hero />
            <Cards />
           <div className='hidden md:block'>
           <Scroller />
           </div>
            <div className='lg:px-[10%] px-3'>
                <Footer />
            </div>

        </div>
    )
}

export default page