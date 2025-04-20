import React from 'react'

const Results = () => {
  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }} className='bg-[#212121] text-white'>
      <div className='lg:max-w-[90em] mx-auto lg:px-[6em] px-3 lg:mt-[12em] mt-[5em] pb-[10em]  items-center'>
        <h2 className='lg:text-[45px] leading-[58px] font-medium text-[2em]'>Establishing a scalable and secure CI/CD process that enabled efficient and smooth releases as the team grew to 40 people.</h2>
        <h2 className='lg:text-[45px] leading-[58px] font-mediumtext-[2em] mt-[1em]'>Establishing a scalable and secure CI/CD process that enabled efficient and smooth releases as the team grew to 40 people.</h2>
        <div className='w-full h-[4px]  mt-[9em] bg-[#07844e]'/>
      </div>

      <div className='lg:max-w-[90em] mx-auto lg:px-[6em] px-3 lg:mt-[12em] pb-[10em]  items-center'>
        <p className='text-[24px] leading-[36px] font-medium'>RESULTS</p>
        <div className='grid md:grid-cols-2 grid-cols-1  gap-10 mt-10'>
            <div className='border-1 border-[#07844e] px-4 pt-2 pb-[10em]'>
                <h1 className='lg:text-[3em] text-[2em] '><span className='text-[#07844e] font-medium lg:text-[93px]  text-[1.5em]'>+20%</span> <span className='font-semibold text-[61px] font-medium leading-[61px]'>Revenue</span></h1>

            </div>
            <div className='border-1 border-[#07844e] px-4 pt-2 pb-[8em]'>
                <h1 className='lg:text-[3em] text-[2em]  '><span className='text-[#07844e] font-medium lg:text-[93px]  text-[1.5em]'>+50%</span><span className='font-semibold text-[61px] font-medium leading-[61px] block ml-7'>Enrollment</span></h1>

            </div>

        </div>

      </div>
    </div>
  )
}

export default Results