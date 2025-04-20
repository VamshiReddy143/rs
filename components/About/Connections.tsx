import React from 'react'

const Connections = () => {
  return (
    <div className='text-white bg-[#212121] min-h-screen pt-[12em] lg:mb-10'>
         <div className='flex flex-col gap-7 lg:w-[75%]'>
            <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className='lg:text-[72px] text-[2.5em] font-semibold leading-[86px]'>Our <span className='text-[#ffc83f]'>Core Values</span> nurture
            <span className='lg:block'>human connections</span></h1>
            <div className='h-[2px] w-[70px] bg-white rounded-full'/>
            <p style={{ fontFamily: 'Poppins, sans-serif' }} className='text-[24px] font-normal'>Developed collaboratively in partnership with our entire team, our values are irrefutable foundations for the company that guide how we think, live, and interact with each other and with our client partners.</p>
         </div>

         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-10'>
            <div className='border-1 border-gray-500 p-10 flex flex-col gap-6 items-start'>
                <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className='text-[40px] font-medium'>Growth Mindset</h1>
                <div className='h-[2px] w-[60px] bg-[#ffc83f] rounded-full'/>
                <p style={{ fontFamily: 'Poppins, sans-serif' }} className='text-[18px] font-normal'>We seek to exceed expectations in every facet of our work and choose courage over comfort.</p>
            </div>

            <div className='border-1 border-gray-500 p-10 flex flex-col gap-6 items-start'>
                <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className='text-[40px] font-medium'>Caring</h1>
                <div className='h-[2px] w-[60px] bg-[#ffc83f] rounded-full'/>
                <p style={{ fontFamily: 'Poppins, sans-serif' }} className='text-[18px] font-normal'>We empathize with our partners' challenges and work tirelessly to find the best solutions.</p>
            </div>

            <div className='border-1 border-gray-500 p-10 flex flex-col gap-6 items-start'>
                <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className='text-[40px] font-medium'>Adaptability</h1>
                <div className='h-[2px] w-[60px] bg-[#ffc83f] rounded-full'/>
                <p style={{ fontFamily: 'Poppins, sans-serif' }} className='text-[18px] font-normal'>We embrace change, are constantly curious, and love feedback.</p>
            </div>

            <div className='border-1 border-gray-500 p-10 flex flex-col gap-6 items-start'>
                <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className='text-[40px] font-medium'>Respect</h1>
                <div className='h-[2px] w-[60px] bg-[#ffc83f] rounded-full'/>
                <p style={{ fontFamily: 'Poppins, sans-serif' }} className='text-[18px] font-normal'>We engage in direct and honest conversations to seek understanding and truth.</p>
            </div>

            <div className='border-1 border-gray-500 p-10 flex flex-col gap-6 items-start'>
                <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className='text-[40px] font-medium'>Ownership</h1>
                <div className='h-[2px] w-[60px] bg-[#ffc83f] rounded-full'/>
                <p style={{ fontFamily: 'Poppins, sans-serif' }} className='text-[18px] font-normal'>We measure our own success by the success of our clients and the products we build.</p>
            </div>

         </div>

    </div>
  )
}

export default Connections