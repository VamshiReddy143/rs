import Image from 'next/image'
import React from 'react'
import img1 from "@/public/c3.png"
import img2 from "@/public/c2.png"
import img3 from "@/public/c1.png"

const Contact = () => {
  return (
    <div  id="contact" className='min-h-screen mt-20 '>
        <div className='flex flex-col items-center justify-center gap-5'>
            <h1 className='lg:text-[3em] md:text-[2.5em] text-[2.2em] text-center font-bold'>Get Started in as Little as Two Weeks</h1>
            <p className='lg:text-[20px] md:text-[18px] text-center text-gray-400'>We provide a free and guaranteed estimate for cost and timeline with every engagement.</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-1  lg:grid-cols-3 mt-10 gap-7'>
            <div className='bg-gray-900 p-8 rounded-xl '>
                <Image src={img1} alt="team" width={900} height={900} className='h-15 w-15'/>
                <h1 className='lg:text-[2em] text-[1.5em] md:text-[2em] font-bold mt-5'>Staff Augmentation</h1>
                <p className='text-gray-400 mt-5 leading-8 text-[20px]'>Add senior engineers to your team seamlessly for less than the cost of US employees. We staff individuals as well as teams of 50+ people, plus project managers, DevOps, QA, and designers.</p>
            </div>

            <div className='bg-gray-900 p-8 rounded-xl '>
                <Image src={img2} alt="team" width={900} height={900} className='h-15 w-15'/>
                <h1 className='lg:text-[2em] text-[1.5em] md:text-[2em] font-bold mt-5'>Product Studio</h1>
                <p className='text-gray-400 mt-5 leading-8 text-[20px]'>Build a high-quality, user-centric product or feature from scratch, fast and on budget. We staff embedded product teams with PMs, UX/UI designers, frontend, backend, data engineers, and QA.</p>
            </div>

            <div className='bg-gray-900 p-8 rounded-xl '>
                <Image src={img3} alt="team" width={900} height={900} className='h-15 w-15'/>
                <h1 className='lg:text-[2em] text-[1.5em] md:text-[2em] font-bold mt-5'>Staff Augmentation</h1>
                <p className='text-gray-400 mt-5 leading-8 text-[20px]'>Audit data, code or UX/UI. Train and optimize an AI/ML model. Scope a migration or upgrade. Build a proof of concept or design a prototype. We offer many short-term, shovel-ready projects.</p>
            </div>
        </div>

        <div className='md:flex items-center justify-center mt-10 hidden'>
        <button className='text-[20px] bg-[#f6ff7a] text-black px-4 py-2 rounded-lg cursor-pointer hover:bg-[#f6ff7a]/80'>Get in Touch ➔</button>
        </div>

    </div>
  )
}

export default Contact