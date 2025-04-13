import Image from 'next/image'
import React from 'react'

const Tools = () => {
  return (
    <div className='lg:mt-10 flex flex-col items-center justify-center gap-7'>
        <h1 className='text-[2.4em] font-bold text-center'>Frameworks & Tools</h1>
        <p className='text-gray-400 text-center'>We are expert practitioners and community leaders in the industry&apos;s leading technologies.</p>

        <div className='flex gap-9  flex-wrap  items-center justify-center'>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/rails.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <span className='lg:text-[0.7em] text-[0.7em]'>Rails</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/hotwire.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <p className='lg:text-[0.7em] text-[0.7em]'>Hotwire</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/newrelic.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <p className='lg:text-[0.7em] text-[0.7em]'>NewRelic</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/sonar.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <p className='lg:text-[0.7em] text-[0.7em]'>SonarQube</p>
            </div>
            
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/sidekiq.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <p className='lg:text-[0.7em] text-[0.7em]'>SideKiq</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/github.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <p className='lg:text-[0.7em] text-[0.7em]'>Github Actions</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/psql.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <p className='lg:text-[0.7em] text-[0.7em]'>PostgreSQL</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/redis.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <p className='lg:text-[0.7em] text-[0.7em]'>Redis</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/docker.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <p className='lg:text-[0.7em] text-[0.7em]'>Docker</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/heroku.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <p className='lg:text-[0.7em] text-[0.7em]'>Heroku</p>
            </div>

          

        </div>
    </div>
  )
}

export default Tools