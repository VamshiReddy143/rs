import React from 'react'

const Connections = () => {
  return (
    <div className='text-white bg-black lg:p-[10%] px-3'>
         <div className='flex flex-col gap-7 w-[75%]'>
            <h1 className='lg:text-[5em] text-semibold leading-tight'>Our <span className='text-[#ffc83f]'>Core Values</span> nurture
            <span className='lg:block'>human connections</span></h1>
            <div className='h-[2px] w-[100px] bg-white rounded-full'/>
            <p className='text-[1.5em]'>Developed collaboratively in partnership with our entire team, our values are irrefutable foundations for the company that guide how we think, live, and interact with each other and with our client partners.</p>
         </div>

         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-10'>
            <div className='border-2 border-gray-500 p-10 flex flex-col gap-7 items-start'>
                <h1 className='text-[2.5em] font-semibold'>Growth Mindset</h1>
                <div className='h-[2px] w-[80px] bg-[#ffc83f] rounded-full'/>
                <p className='text-[1.3em]'>We seek to exceed expectations in every facet of our work and choose courage over comfort.</p>
            </div>

            <div className='border-2 border-gray-500 p-10 flex flex-col gap-7 items-start'>
                <h1 className='text-[2.5em] font-semibold'>Caring</h1>
                <div className='h-[2px] w-[80px] bg-[#ffc83f] rounded-full'/>
                <p className='text-[1.3em]'>We empathize with our partners' challenges and work tirelessly to find the best solutions.</p>
            </div>

            <div className='border-2 border-gray-500 p-10 flex flex-col gap-7 items-start'>
                <h1 className='text-[2.5em] font-semibold'>Adaptability</h1>
                <div className='h-[2px] w-[80px] bg-[#ffc83f] rounded-full'/>
                <p className='text-[1.3em]'>We embrace change, are constantly curious, and love feedback.</p>
            </div>

            <div className='border-2 border-gray-500 p-10 flex flex-col gap-7 items-start'>
                <h1 className='text-[2.5em] font-semibold'>Respect</h1>
                <div className='h-[2px] w-[80px] bg-[#ffc83f] rounded-full'/>
                <p className='text-[1.3em]'>We engage in direct and honest conversations to seek understanding and truth.</p>
            </div>

            <div className='border-2 border-gray-500 p-10 flex flex-col gap-7 items-start'>
                <h1 className='text-[2.5em] font-semibold'>Ownership</h1>
                <div className='h-[2px] w-[80px] bg-[#ffc83f] rounded-full'/>
                <p className='text-[1.3em]'>We measure our own success by the success of our clients and the products we build.</p>
            </div>

         </div>

    </div>
  )
}

export default Connections