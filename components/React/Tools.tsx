import Image from 'next/image'
import React from 'react';

const Tools = () => {
  return (
    <div className='lg:pt-[4.3em] flex pt-[4em] flex-col items-center justify-center gap-7'>
    <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className='text-[36px] font-bold text-center leading-[42px]'>Frameworks & Tools</h1>
    <p className='text-[#bcbcc0] text-center text-[16px] leading-[32px]'>We are expert practitioners and community leaders in the industry&apos;s leading <span className='block lg:inline'>technologies.</span></p>

        <div className='flex gap-6  flex-wrap  items-center justify-center'>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/nextjs.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-15 w-15'/>
                <span className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>NextJS</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/ts.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-15 w-15'/>
                <p className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>Typescript</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/expo.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-15 w-15'/>
                <p className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>Expo</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/hooks.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-15 w-15'/>
                <p className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>Hooks</p>
            </div>
            
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/angular.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-15 w-15'/>
                <p className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>Angular</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/gatsby.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-15 w-15'/>
                <p className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>Gatsby</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/remix.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-15 w-15'/>
                <p className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>Remix</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/bs.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-15 w-15'/>
                <p className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>Bootstrap</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/tw.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-15 w-15'/>
                <p className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>Tailwind</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/redux.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-15 w-15'/>
                <p className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>Redux</p>
            </div>

            <div className='flex flex-col items-center justify-center'>
                <Image src={"/materialui.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-15 w-15'/>
                <p className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>MaterialUI</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/rd.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-15 w-15'/>
                <p className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>ReactDesktop</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/rr.svg"} alt="tools" width={900} height={900} className='lg:h-[56px] lg:w-[56px] h-15 w-15'/>
                <p className='lg:text-[13px] text-[#bcbcc0] text-[0.7em]'>ReactRouter</p>
            </div>

        </div>
    </div>
  )
}

export default Tools