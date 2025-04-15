import Image from 'next/image'
import React from 'react'

const Cows = () => {
  return (
    <div className='bg-white text-black'>
        <div className='lg:max-w-[90em] mx-auto lg:px-[6em] px-3 lg:py-[10em] py-[6em] text-center'>
            <p className='lg:text-[2em] text-[1.3em]'>Five-point sprecher system for the evaluation of lameness in a herd</p>
          <div className='grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 lg:gap-10 gap-5'>
            <div className='flex flex-col items-center lg:pt-[5em] pt-[2em]'>
                <Image src={"/cow1.jpg"} alt="team" width={900} height={900} className='lg:w-30 lg:h-30  w-20 h-20 '/>
                <div className='mt-2'>
                <p className='lg:text-[1.7em] text-[1em] text-semibold'>Straight back</p>
                <p className='lg:text-[1.2em] text-[0.8em]'>Long steps</p>
                </div>
            </div>


            <div className='flex flex-col items-center lg:pt-[5em] pt-[2em]'>
                <Image src={"/cow2.jpg"} alt="team" width={900} height={900} className='lg:w-30 lg:h-30  w-20 h-20 '/>
                <div className='mt-2'>
                <p className='lg:text-[1.7em] text-[1em]  text-semibold'>Incurved back in movement</p>
                <p className='lg:text-[1.2em] text-[0.8em]'>Short steps</p>
                </div>
            </div>



            <div className='flex flex-col items-center lg:pt-[5em] pt-[2em]'>
                <Image src={"/cow3.jpg"} alt="team" width={900} height={900} className='lg:w-30 lg:h-30  w-20 h-20  '/>
                <div className='mt-2'>
                <p className='lg:text-[1.7em] text-[1em]  text-semibold'>Incurved back</p>
                <p className='lg:text-[1.2em] text-[0.8em]'>Very short steps</p>
                </div>
            </div>



            <div className='flex flex-col items-center lg:pt-[5em] pt-[2em]'>
                <Image src={"/cow4.jpg"} alt="team" width={900} height={900} className='lg:w-30 lg:h-30  w-20 h-20  '/>
                <div className='mt-2'>
                <p className='lg:text-[1.7em] text-[1em]  text-semibold'>Incurved back</p>
                <p className='lg:text-[1.2em] text-[0.8em]'>Obvious lameness</p>
                </div>
            </div>



            <div className='flex flex-col items-center lg:pt-[5em] pt-[2em]'>
                <Image src={"/cow5.jpg"} alt="team" width={900} height={900} className='lg:w-30 lg:h-30  w-20 h-20  '/>
                <div className='mt-2'>
                <p className='lg:text-[1.7em] text-[1em]  text-semibold'>Very evident lameness</p>
                <p className='lg:text-[1.2em] text-[0.8em]'>Lying down</p>
                </div>
            </div>

          </div>

        </div>
    </div>
  )
}

export default Cows