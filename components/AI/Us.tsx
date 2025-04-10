import Image from 'next/image'
import React from 'react'

const Us = () => {
  return (
    <div className='mt-20 flex flex-col items-center justify-center '>

        <div className='text-center flex flex-col lg:gap-7 gap-2'>
            <h1 className='lg:text-[3em] text-[2.2em] font-bold text-center'>Get Started in as Little as Two Weeks</h1>
            <p className='lg:text-[20px] text-[15px] text-gray-400 text-center'>We provide a free and guaranteed estimate for cost and timeline with every engagement.</p>
        </div>


        <div className='grid lg:grid-cols-3 grid-cols-1  gap-5 mt-15'>
           <div className='bg-gray-900 lg:p-8 p-4 rounded-xl flex flex-col items-start gap-3 lg:w-[400px] '>
            <Image src={"/staff.png"} alt="team" width={900} height={900} className='h-15 w-15'/>
            <h1 className='lg:text-[2em] text-[1.5em] font-bold'>Staff Augmentation</h1>
            <p className='text-gray-400 leading-8 text-[15px]'>Add senior engineers to your team seamlessly for less than the cost of US employees. We staff individuals as well as teams of 50+ people, plus project managers, DevOps, QA, and designers.</p>

           </div>

           <div className='bg-gray-900 lg:p-8 p-4 rounded-xl flex flex-col items-start gap-3 lg:w-[400px] '>
            <Image src={"/studio.png"} alt="team" width={900} height={900} className='h-15 w-15'/>
            <h1 className='lg:text-[2em] text-[1.5em] font-bold'>Product Studio</h1>
            <p className='text-gray-400 leading-8 text-[15px]'>Build a high-quality, user-centric product or feature from scratch, fast and on budget. We staff embedded product teams with PMs, UX/UI designers, frontend, backend, data engineers, and QA</p>

           </div>


           <div className='bg-gray-900 lg:p-8 p-4 rounded-xl flex flex-col items-start gap-3 lg:w-[400px] '>
            <Image src={"/sprints.png"} alt="team" width={900} height={900} className='h-15 w-15'/>
            <h1 className='lg:text-[2em] text-[1.5em] font-bold'>Staff Augmentation</h1>
            <p className='text-gray-400 leading-8 text-[15px]'>Audit data, code or UX/UI. Train and optimize an AI/ML model. Scope a migration or upgrade. Build a proof of concept or design a prototype. We offer many short-term, shovel-ready projects.</p>

           </div>
        </div>

      <div className='mt-10'>
      <button className='text-[20px] bg-[#f6ff7a] text-black px-3 py-2 rounded-xl cursor-pointer hover:bg-[#f6ff7a]/80'>
            Get in Touch ➔
          </button>
      </div>
    </div>
  )
}

export default Us