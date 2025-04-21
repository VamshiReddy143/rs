import Image from 'next/image'
import React from 'react'

const Tools = () => {
  return (
    <div className='lg:pt-10 flex pt-[4em] flex-col items-center justify-center gap-7'>
        <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className='text-[36px] font-bold text-center'>Frameworks & Tools</h1>
        <p className='text-[#bcbcc0] text-center leading-[32px] text-[16px] '>We are expert practitioners and community leaders in the industry&apos;s leading <span className='block lg:inline'>technologies.</span></p>

        <div className='flex gap-7  flex-wrap  items-center justify-center'>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/ten.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-15 w-15'/>
                <span className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>Tensor Flow</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/star.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-15 w-15'/>
                <p className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>Apache Spark</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/gpt.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-15 w-15'/>
                <p className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>OpenAI</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/meta.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-15 w-15'/>
                <p className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>Llama</p>
            </div>
            
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/lc.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-15 w-15'/>
                <p className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>LangChain</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/aws.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-15 w-15'/>
                <p className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>AWS Rekognition</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/sora.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-15 w-15'/>
                <p className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>Sora</p>
            </div>

        </div>
    </div>
  )
}

export default Tools