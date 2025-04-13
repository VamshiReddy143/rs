import Image from 'next/image'
import React from 'react'

const Tools = () => {
  return (
    <div className='lg:mt-10 flex flex-col items-center justify-center gap-7'>
        <h1 className='text-[2.4em] font-bold text-center'>Frameworks & Tools</h1>
        <p className='text-gray-400 text-center'>We are expert practitioners and community leaders in the industry&apos;s leading technologies.</p>

        <div className='flex gap-9  flex-wrap  items-center justify-center'>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/nextjs.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <span className='lg:text-[0.7em] text-[0.7em]'>NextJS</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/ts.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <p className='lg:text-[0.7em] text-[0.7em]'>Typescript</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/expo.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <p className='lg:text-[0.7em] text-[0.7em]'>Expo</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/hooks.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <p className='lg:text-[0.7em] text-[0.7em]'>Hooks</p>
            </div>
            
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/angular.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <p className='lg:text-[0.7em] text-[0.7em]'>Angular</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/gatsby.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <p className='lg:text-[0.7em] text-[0.7em]'>Gatsby</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/remix.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <p className='lg:text-[0.7em] text-[0.7em]'>Remix</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/bs.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <p className='lg:text-[0.7em] text-[0.7em]'>Bootstrap</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/tw.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <p className='lg:text-[0.7em] text-[0.7em]'>Tailwind</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/redux.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <p className='lg:text-[0.7em] text-[0.7em]'>Redux</p>
            </div>

            <div className='flex flex-col items-center justify-center'>
                <Image src={"/materialui.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <p className='lg:text-[0.7em] text-[0.7em]'>MaterialUI</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/rd.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <p className='lg:text-[0.7em] text-[0.7em]'>ReactDesktop</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/rr.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <p className='lg:text-[0.7em] text-[0.7em]'>ReactRouter</p>
            </div>

        </div>
    </div>
  )
}

export default Tools