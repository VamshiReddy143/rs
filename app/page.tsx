'use client'

import React, { useEffect, useState } from 'react'
import Capabilities from '@/components/Home/Capabilities'
import Clients from '@/components/Home/Clients'
import Contact from '@/components/Home/Contact'
import Footer from '@/components/Home/Footer'
import Hero from '@/components/Home/Hero'
import Scroller from '@/components/Home/Scroller'
import Scroller2 from '@/components/Home/Scroller2'
import Team from '@/components/Home/Team'
import Popup from '@/components/Popup/Popup'

const Page = () => {
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    const lastShown = localStorage.getItem('popupLastShown')
    const now = new Date()

    if (!lastShown || (now.getTime() - new Date(lastShown).getTime()) > 7 * 24 * 60 * 60 * 1000) {
      setTimeout(() => {
        setShowPopup(true)
      }, 3000) // show after 3 seconds

      localStorage.setItem('popupLastShown', now.toISOString())
    }
  }, [])

  const handleClosePopup = () => {
    setShowPopup(false)
  }

  return (
    <div className='bg-[#191a1b] relative'>
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#191a1b]/80 z-50 flex justify-center items-center">
          <Popup onClose={handleClosePopup} />
        </div>
      )}

      <div className="w-full min-h-screen lg:max-w-[90em] mx-auto lg:px-[6em] px-1 overflow-x-hidden py-4 lg:py-10 bg-[#191a1b] text-white">
        <Hero />
      </div>

      <Scroller />

      <div className="w-full min-h-screen lg:max-w-[90em] mx-auto lg:px-[6em] px-1 overflow-x-hidden py-8 lg:py-10 bg-[#191a1b] text-white">
        <Capabilities />
        <Team />
      </div>

      <Scroller2 />

      <div className="w-full min-h-screen lg:max-w-[90em] mx-auto lg:px-[6em] px-3 overflow-x-hidden py-8 lg:py-10 bg-[#191a1b] text-white">
        <Clients />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}

export default Page