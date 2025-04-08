import Image from 'next/image'
import React from 'react'

const Tools = () => {
  return (
    <div className='mt-10 flex flex-col items-center justify-center gap-7'>
        <h1 className='text-[2.4em] font-bold'>Frameworks & Tools</h1>
        <p className='text-gray-400'>We are expert practitioners and community leaders in the industry&apos;s leading technologies.</p>

        <div className='flex gap-9 items-center'>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/snowflake.svg"} alt="tools" width={900} height={900} className='h-17 w-17'/>
                <span className='text-[0.9em]'>Snowflake</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/databricks.svg"} alt="tools" width={900} height={900} className='h-17 w-17'/>
                <p className='text-[0.9em]'>DataBricks</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/apache.svg"} alt="tools" width={900} height={900} className='h-17 w-17'/>
                <p className='text-[0.9em]'>Apache</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/meta.svg"} alt="tools" width={900} height={900} className='h-17 w-17'/>
                <p className='text-[0.9em]'>Sidekiq</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/kue.svg"} alt="tools" width={900} height={900} className='h-17 w-17'/>
                <p className='text-[0.9em]'>Kue</p>
            </div>


        </div>
    </div>
  )
}

export default Tools