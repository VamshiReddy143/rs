import Image from 'next/image'
import React from 'react'

const Tools = () => {
  return (
    <div className='mt-10 flex flex-col items-center justify-center gap-7'>
        <h1 className='text-[2.4em] font-bold'>Frameworks & Tools</h1>
        <p className='text-gray-400'>We are expert practitioners and community leaders in the industry&apos;s leading technologies.</p>

        <div className='flex gap-9 items-center'>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/ec2.svg"} alt="tools" width={900} height={900} className='h-17 w-17'/>
                <span className='text-[0.9em]'>EC2</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/s3.svg"} alt="tools" width={900} height={900} className='h-17 w-17'/>
                <p className='text-[0.9em]'>S3</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/rds.svg"} alt="tools" width={900} height={900} className='h-17 w-17'/>
                <p className='text-[0.9em]'>RDS</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/lamda.svg"} alt="tools" width={900} height={900} className='h-17 w-17'/>
                <p className='text-[0.9em]'>Lambda</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/eks.svg"} alt="tools" width={900} height={900} className='h-17 w-17'/>
                <p className='text-[0.9em]'>EKS</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/dynamo.svg"} alt="tools" width={900} height={900} className='h-17 w-17'/>
                <p className='text-[0.9em]'>DynamoDB</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/cloudfront.svg"} alt="tools" width={900} height={900} className='h-17 w-17'/>
                <p className='text-[0.9em]'>Cloudfront</p>
            </div>

        </div>
    </div>
  )
}

export default Tools