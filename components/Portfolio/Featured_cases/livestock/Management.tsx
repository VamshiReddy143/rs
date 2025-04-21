import Image from 'next/image'
import React from 'react'

const Team = () => {
    return (
        <div style={{ fontFamily: 'Poppins, sans-serif' }} className='bg-gray-200 text-black '>

            <div className='lg:max-w-[95em] mx-auto lg:px-[6em] px-3 lg:py-[10em] py-[5em] md:flex gap-[5em] items-center'>
                <div className='flex flex-col items-start leading-tight'>
                <h1 className='lg:text-[64px] text-[2.5em] lg:leading-[77px]   font-medium'>Elevating</h1>
                    <h1 className='lg:text-[64px] text-[2.5em] lg:leading-[77px] font-medium'>Cattle Health</h1>
                    <h1 className='lg:text-[64px] text-[2.5em] lg:leading-[77px] font-medium'>Management</h1>
                   
                </div>

                <div className='lg:mt-0 mt-[2em]'>
                    <p className='lg:text-[24px] font-normal lg:leading-[36px] text-[18px] leading-[26px]'>
                    A cow breeding Uruguayan entrepreneur aimed to <span className='font-bold'>optimize the detection of a health condition in cattle</span> known as Lameness. This condition can greatly impact animal welfare and productivity, leading to significant economic consequences for the business.
                    </p>
                </div>



            </div>
      
        </div>
    )
}

export default Team