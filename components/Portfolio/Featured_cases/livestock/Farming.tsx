import Image from 'next/image'
import React from 'react'

const Farming = () => {
  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }} className='min-h-screen bg-gray-200 text-black'>
        <div className='lg:max-w-[90em] mx-auto lg:px-[6em] px-3 lg:py-[10em] py-[7em]'>
            <h1 className='lg:text-[56px] leading-[84px] font-[400] text-[2em] leading-tight font-normal  lg:w-[60%]'>Our proposed system architecture is decoupled, fault-tolerant, scalable, and enables traceability.</h1>
        </div>

        <div>
           <video src='/videos/farming.mp4' autoPlay muted loop className='w-full  h-auto lg:h-[30em] object-cover '/>
        </div>

        <div className='lg:max-w-[90em] mx-auto lg:px-[6em] px-3 py-[8em]'>
            <h1 className='lg:text-[56px] lg:leading-[84px] font-[400] text-[2em] font-normal  text-right lg:pl-[7em] '>It allows for re-training and ensures data transparency and monitorability.</h1>
        </div>

        <div className='pt-[5em]'>
                <div className=' bg-[#b84d00] h-[20px] w-[100vw]'/>
        </div>

        <div className='lg:max-w-[93em] mx-auto lg:px-[6em] px-3 pt-[10em]'>
            <h1 className='lg:text-[72px] lg:leading-[86px] font-medium text-[42px] leading-[50px] '>
            This approach resulted in a proof of concept that <span className='text-[#b84d00]'>revolutionizes</span> illness detection in cattle breeding using AI and image detection capabilities.
            </h1>
            <div className=' bg-[#b84d00] h-[5px] mt-[9em]'/>
        </div>

    </div>
  )
}

export default Farming