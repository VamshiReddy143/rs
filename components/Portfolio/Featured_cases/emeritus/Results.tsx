import React from 'react'

const Results = () => {
  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }} className='bg-[#212121] text-white'>
      <div className='lg:max-w-[90em] mx-auto lg:px-[6em] px-3 lg:mt-[12em] mt-[5em] pb-[10em]  items-center'>
        <h2 className='lg:text-[45px] lg:leading-[58px] font-medium text-[32px] leading-[38px]'>Establishing a scalable and secure CI/CD process that enabled efficient and smooth releases as the team grew to 40 people.</h2>
        <h2 className='lg:text-[45px] lg:leading-[58px] font-medium text-[32px] leading-[38px] mt-7'>We are next focused on improving performance and reducing costs related to infrastructure services. These efforts will be vital for sustained growth and continued success.</h2>
        <div className='w-full h-[4px]  mt-[9em] bg-[#07844e]'/>
      </div>

      <div className='lg:max-w-[90em] mx-auto lg:px-[6em] px-3 lg:mt-[12em] pb-[10em]  items-center'>
        <p className='lg:text-[24px] lg:leading-[36px] text-[18px] font-normal'>RESULTS</p>
        <div className='grid md:grid-cols-2 grid-cols-1  gap-10 mt-10'>
            <div className='border-1 border-[#07844e] px-4 pt-2 pb-[10em]'>
                <h1 className='lg:text-[3em] text-[2em] '><span className='text-[#07844e] font-medium lg:text-[93px]  text-[42px]'>+20%</span> <span className='font-semibold lg:text-[61px] text-[28px] font-medium leading-[61px]'>Revenue</span></h1>

            </div>
            <div className='border-1 border-[#07844e] px-4 pt-2 pb-[8em]'>
                <h1 className='lg:text-[3em] text-[2em]  '><span className='text-[#07844e] font-medium lg:text-[93px]  text-[42px]'>+50%</span><span className='font-semibold lg:text-[61px] text-[28px] font-medium leading-[61px] block ml-7'>Enrollment</span></h1>

            </div>

        </div>

      </div>
    </div>
  )
}

export default Results