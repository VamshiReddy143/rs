import Image from 'next/image'
import React from 'react'
import img1 from "@/public/c3.png"
import img2 from "@/public/c2.png"
import img3 from "@/public/c1.png"
import Link from 'next/link'

const Contact = () => {
  return (
    <div  id="contact" className=' lg:mt-2 mt-[6em] lg:pb-[7em] '>
        <div className='flex flex-col items-center justify-center gap-5'>
            <h1  style={{ fontFamily: 'Poppins, sans-serif' }} className='lg:text-[36px] md:text-[2.5em] text-[36px] text-center font-semibold'>Get Started in as Little as Two Weeks</h1>
            <p className='lg:text-[16px] md:text-[18px] text-[16px] text-center text-[#bcbcc0]'>We provide a free and guaranteed estimate for cost and timeline with every engagement.</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-1  lg:grid-cols-3 mt-15 gap-6'>
            <div className='bg-[#242425] p-6 rounded-xl '>
                <Image src={img1} alt="team" width={900} height={900} className='h-15 w-15'/>
                <h1 className='lg:text-[24px] text-[1.5em] md:text-[2em] font-bold mt-5'>Staff Augmentation</h1>
                <p className='text-[#bcbcc0] mt-2 leading-8 text-[16px] leading-[28px]'>Add senior engineers to your team seamlessly for less than the cost of US employees. We staff individuals as well as teams of 50+ people, plus project managers, DevOps, QA, and designers.</p>
            </div>

            <div className='bg-[#242425] p-6 rounded-xl '>
                <Image src={img2} alt="team" width={900} height={900} className='h-15 w-15'/>
                <h1 className='lg:text-[24px] text-[1.5em] md:text-[2em] font-bold mt-5'>Product Studio</h1>
                <p className='text-[#bcbcc0] mt-2 leading-8 text-[16px] leading-[28px]'>Build a high-quality, user-centric product or feature from scratch, fast and on budget. We staff embedded product teams with PMs, UX/UI designers, frontend, backend, data engineers, and QA.</p>
            </div>

            <div className='bg-[#242425] p-6 rounded-xl '>
                <Image src={img3} alt="team" width={900} height={900} className='h-15 w-15'/>
                <h1 className='lg:text-[24px] text-[1.5em] md:text-[2em] font-bold mt-5'>Staff Augmentation</h1>
                <p className='text-[#bcbcc0] mt-2 leading-8 text-[16px] leading-[28px]'>Audit data, code or UX/UI. Train and optimize an AI/ML model. Scope a migration or upgrade. Build a proof of concept or design a prototype. We offer many short-term, shovel-ready projects.</p>
            </div>
        </div>

        <Link href={"/Contact"}>
        <div className='md:flex items-center justify-center mt-15 hidden'>
        <button className='text-[16px] bg-[#f6ff7a] text-black px-4 py-3 rounded-lg cursor-pointer hover:bg-[#f6ff7a]/80'>Get in Touch ➔</button>
        </div>
        </Link>

    </div>
  )
}

export default Contact