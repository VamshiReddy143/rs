import Image from 'next/image'
import React from 'react'

const Tools = () => {
  return (
    <div className='lg:mt-10 flex flex-col items-center justify-center gap-7'>
        <h1 className='text-[2.4em] font-bold text-center'>Frameworks & Tools</h1>
        <p className='text-gray-400 text-center'>We are expert practitioners and community leaders in the industry&apos;s leading technologies.</p>

        <div className='flex gap-9  flex-wrap  items-center justify-center'>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/expo.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <span className='lg:text-[0.7em] text-[0.7em]'>Expo</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/redux.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <p className='lg:text-[0.7em] text-[0.7em]'>Redux</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/rn.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <p className='lg:text-[0.7em] text-[0.7em]'>React Navigation</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/sc.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <p className='lg:text-[0.7em] text-[0.7em]'>Styled Components</p>
            </div>
            
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/lottie.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <p className='lg:text-[0.7em] text-[0.7em]'>Lottie</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/amity.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <p className='lg:text-[0.7em] text-[0.7em]'>Amity</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/fb.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <p className='lg:text-[0.7em] text-[0.7em]'>Firebase</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/realm.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <p className='lg:text-[0.7em] text-[0.7em]'>Realm</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Image src={"/mobx.svg"} alt="tools" width={900} height={900} className='lg:h-14 lg:w-14 h-10 w-10'/>
                <p className='lg:text-[0.7em] text-[0.7em]'>MobX</p>
            </div>
           

        </div>
    </div>
  )
}

export default Tools