import Image from 'next/image'
import React from 'react'

const Tools = () => {
  return (
    <div className='mt-10 flex flex-col items-center justify-center gap-7'>
        <h1 className='text-[2.4em] font-bold'>Frameworks & Tools</h1>
        <p className='text-gray-400'>We are expert practitioners and community leaders in the industry&apos;s leading technologies.</p>

        <div className='flex gap-9 items-center'>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/ten.svg"} alt="tools" width={900} height={900} className='h-17 w-17'/>
                <span className='text-[0.9em]'>Tensor Flow</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/star.svg"} alt="tools" width={900} height={900} className='h-17 w-17'/>
                <p className='text-[0.9em]'>Apache Spark</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/gpt.svg"} alt="tools" width={900} height={900} className='h-17 w-17'/>
                <p className='text-[0.9em]'>OpenAI</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/meta.svg"} alt="tools" width={900} height={900} className='h-17 w-17'/>
                <p className='text-[0.9em]'>Llama</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/lc.svg"} alt="tools" width={900} height={900} className='h-17 w-17'/>
                <p className='text-[0.9em]'>LangChain</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/aws.svg"} alt="tools" width={900} height={900} className='h-17 w-17'/>
                <p className='text-[0.9em]'>AWS Rekognition</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/sora.svg"} alt="tools" width={900} height={900} className='h-17 w-17'/>
                <p className='text-[0.9em]'>Sora</p>
            </div>

        </div>
    </div>
  )
}

export default Tools