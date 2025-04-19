import Image from 'next/image'
import React from 'react'

const Tools = () => {
  return (
    <div className='lg:pt-[4.3em] flex pt-[4em] flex-col items-center justify-center gap-7'>
    <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className='text-[36px] font-bold text-center'>Frameworks & Tools</h1>
    <p className='text-[#bcbcc0] text-center text-[16px]'>We are expert practitioners and community leaders in the industry&apos;s leading technologies.</p>

        <div className='flex gap-9 flex-wrap justify-center items-center'>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/ec2.svg"} alt="tools" width={900} height={900}  className='lg:h-[56px] lg:w-[56px] h-10 w-10'/>
                <span className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>EC2</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/s3.svg"} alt="tools" width={900} height={900}  className='lg:h-[56px] lg:w-[56px] h-10 w-10'/>
                <p className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>S3</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/rds.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-10 w-10'/>
                <p className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>RDS</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/lamda.svg"} alt="tools" width={900} height={900}  className='lg:h-[56px] lg:w-[56px] h-10 w-10'/>
                <p className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>Lambda</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/eks.svg"} alt="tools" width={900} height={900}  className='lg:h-[56px] lg:w-[56px] h-10 w-10'/>
                <p className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>EKS</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/dynamo.svg"} alt="tools" width={900} height={900}  className='lg:h-[56px] lg:w-[56px] h-10 w-10'/>
                <p className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>DynamoDB</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/cloudfront.svg"} alt="tools" width={900} height={900}  className='lg:h-[56px] lg:w-[56px] h-10 w-10'/>
                <p className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>Cloudfront</p>
            </div>

        </div>
    </div>
  )
}

export default Tools