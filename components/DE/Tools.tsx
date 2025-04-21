import Image from 'next/image'
import React from 'react'

const Tools = () => {
  return (
    <div className='lg:mt-10 flex pt-[4em] flex-col items-center justify-center gap-7'>
    <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className='text-[36px] font-bold text-center'>Frameworks & Tools</h1>
    <p className='text-[#bcbcc0] text-center text-[16px] leading-[32px]'>We are expert practitioners and community leaders in the industry&apos;s leading <span className='block lg:inline'>technologies.</span></p>

        <div className='flex lg:gap-9  gap-5 flex-wrap  items-center justify-center'>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/snowflake.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-15 w-15'/>
                <span className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>Snowflake</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/databricks.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-15 w-15'/>
                <p className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>DataBricks</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/apache.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-15 w-15'/>
                <p className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>Apache</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/meta.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-15 w-15'/>
                <p className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>Sidekiq</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/kue.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-15 w-15'/>
                <p className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>Kue</p>
            </div>


        </div>
    </div>
  )
}

export default Tools