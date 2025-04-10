import Image from 'next/image'
import React from 'react'

const Tools = () => {
  return (
    <div className='lg:mt-10 flex flex-col items-center justify-center gap-7'>
        <h1 className='text-[2.4em] font-bold text-center'>Frameworks & Tools</h1>
        <p className='text-gray-400 text-center'>We are expert practitioners and community leaders in the industry&apos;s leading technologies.</p>

        <div className='flex gap-9  flex-wrap  items-center justify-center'>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/ten.svg"} alt="tools" width={900} height={900} className='lg:h-17 lg:w-17 h-10 w-10'/>
                <span className='lg:text-[0.9em] text-[0.7em]'>Tensor Flow</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/star.svg"} alt="tools" width={900} height={900} className='lg:h-17 lg:w-17 h-10 w-10'/>
                <p className='lg:text-[0.9em] text-[0.7em]'>Apache Spark</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/gpt.svg"} alt="tools" width={900} height={900} className='lg:h-17 lg:w-17 h-10 w-10'/>
                <p className='lg:text-[0.9em] text-[0.7em]'>OpenAI</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/meta.svg"} alt="tools" width={900} height={900} className='lg:h-17 lg:w-17 h-10 w-10'/>
                <p className='lg:text-[0.9em] text-[0.7em]'>Llama</p>
            </div>
            
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/lc.svg"} alt="tools" width={900} height={900} className='lg:h-17 lg:w-17 h-10 w-10'/>
                <p className='lg:text-[0.9em] text-[0.7em]'>LangChain</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/aws.svg"} alt="tools" width={900} height={900} className='lg:h-17 lg:w-17 h-10 w-10'/>
                <p className='lg:text-[0.9em] text-[0.7em]'>AWS Rekognition</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/sora.svg"} alt="tools" width={900} height={900} className='lg:h-17 lg:w-17 h-10 w-10'/>
                <p className='lg:text-[0.9em] text-[0.7em]'>Sora</p>
            </div>

        </div>
    </div>
  )
}

export default Tools