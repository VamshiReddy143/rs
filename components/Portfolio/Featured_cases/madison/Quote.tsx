import React from 'react'

const Quote = () => {
  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }} className='bg-white'>
         <div className='lg:max-w-[90em] bg-white text-black mx-auto lg:px-[6em] px-3 lg:py-[15em] py-[7em] pb-[10em]'>
                <h1 className='lg:text-[67px] font-medium leading-[81px] text-[2em]'>
                “This app is just like the products... <span className='text-[#720058]'>everything I need</span>, without all the extras! Excited to set up a reorder so I don't have to think about it ever again. Recommend!
                </h1>
                <div className='lg:mt-[4em] mt-[2em]'>
                    <p className=' lg:text-[28px] font-normal leading-[42px] text-[1em] text-[#720058]'>Madison Reed's Client</p>
                </div>
            </div>
    </div>
  )
}

export default Quote