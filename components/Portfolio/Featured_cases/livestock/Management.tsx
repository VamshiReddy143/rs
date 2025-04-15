import Image from 'next/image'
import React from 'react'

const Team = () => {
    return (
        <div className='bg-gray-200 text-black '>

            <div className='lg:max-w-[90em] mx-auto lg:px-[6em] px-3 lg:py-[10em] py-[5em] md:flex gap-[5em] items-center'>
                <div className='flex flex-col items-start leading-tight'>
                <h1 className='lg:text-[4em] text-[2.5em]  font-semibold'>Elevating</h1>
                    <h1 className='lg:text-[4em] text-[2.5em] leading-tight font-semibold'>Cattle Health</h1>
                    <h1 className='lg:text-[4em] text-[2.5em] leading-tight font-semibold'>Management</h1>
                   
                </div>

                <div className='lg:mt-0 mt-[2em]'>
                    <p className='lg:text-[1.7em] text-[1.2em]'>
                    A cow breeding Uruguayan entrepreneur aimed to <span className='font-bold'>optimize the detection of a health condition in cattle</span> known as Lameness. This condition can greatly impact animal welfare and productivity, leading to significant economic consequences for the business.
                    </p>
                </div>



            </div>
      
        </div>
    )
}

export default Team