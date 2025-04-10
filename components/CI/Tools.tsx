import Image from 'next/image'
import React from 'react'

const Tools = () => {
  return (
    <div className='lg:mt-10 mt-4 flex flex-col items-center justify-center lg:gap-7 gap-4 md:gap-5'>
        <h1 className='lg:text-[2.4em] text-[1.8em] font-bold text-center'>Frameworks & Tools</h1>
        <p className='text-gray-400 text-center'>We are expert practitioners and community leaders in the industry&apos;s leading technologies.</p>

        <div className='flex gap-9 flex-wrap justify-center items-center'>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/ec2.svg"} alt="tools" width={900} height={900}  className='lg:h-17 lg:w-17 h-10 w-10'/>
                <span className='lg:text-[0.9em] text-[0.7em]'>EC2</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/s3.svg"} alt="tools" width={900} height={900}  className='lg:h-17 lg:w-17 h-10 w-10'/>
                <p className='lg:text-[0.9em] text-[0.7em]'>S3</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/rds.svg"} alt="tools" width={900} height={900}  className='lg:h-17 lg:w-17 h-10 w-10'/>
                <p className='lg:text-[0.9em] text-[0.7em]'>RDS</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/lamda.svg"} alt="tools" width={900} height={900}  className='lg:h-17 lg:w-17 h-10 w-10'/>
                <p className='lg:text-[0.9em] text-[0.7em]'>Lambda</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/eks.svg"} alt="tools" width={900} height={900}  className='lg:h-17 lg:w-17 h-10 w-10'/>
                <p className='lg:text-[0.9em] text-[0.7em]'>EKS</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/dynamo.svg"} alt="tools" width={900} height={900}  className='lg:h-17 lg:w-17 h-10 w-10'/>
                <p className='lg:text-[0.9em] text-[0.7em]'>DynamoDB</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/cloudfront.svg"} alt="tools" width={900} height={900}  className='lg:h-17 lg:w-17 h-10 w-10'/>
                <p className='lg:text-[0.9em] text-[0.7em]'>Cloudfront</p>
            </div>

        </div>
    </div>
  )
}

export default Tools