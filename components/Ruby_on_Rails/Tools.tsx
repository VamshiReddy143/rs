import Image from 'next/image'
import React from 'react';

const Tools = () => {
  return (
    <div className='lg:pt-[4.3em] flex pt-[4em] flex-col items-center justify-center gap-7'>
    <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className='text-[36px] font-bold text-center'>Frameworks & Tools</h1>
    <p className='text-[#bcbcc0] text-center text-[16px]'>We are expert practitioners and community leaders in the industry&apos;s leading technologies.</p>

    <div className='flex gap-6  flex-wrap  items-center justify-center'>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/rails.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-10 w-10'/>
                <span className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>Rails</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/hotwire.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-10 w-10'/>
                <span className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>Hotwire</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/newrelic.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-10 w-10'/>
                <span className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>NewRelic</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/sonar.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-10 w-10'/>
                <span className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>SonarQube</span>
            </div>
            
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/sidekiq.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-10 w-10'/>
                <span className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>SideKiq</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/github.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-10 w-10'/>
                <span className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>Github Actions</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/psql.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-10 w-10'/>
                <span className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>PostgreSQL</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/redis.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-10 w-10'/>
                <span className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>Redis</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/docker.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-10 w-10'/>
                <span className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>Docker</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/heroku.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-10 w-10'/>
                <span className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>Heroku</span>
            </div>

          

        </div>
    </div>
  )
}

export default Tools