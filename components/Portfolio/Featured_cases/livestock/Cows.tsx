import Image from 'next/image'
import React from 'react'

const Cows = () => {
  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }} className='bg-white text-black'>
        <div className='lg:max-w-[90em] mx-auto lg:px-[6em] px-3 lg:py-[10em] py-[6em] text-center'>
            <p className='lg:text-[24px] leading-[36px] font-normal text-[1.3em]'>Five-point sprecher system for the evaluation of <span className='font-semibold'>lameness</span> in a herd</p>
          <div className='grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 lg:gap-10 gap-5'>
            <div className='flex flex-col items-center lg:pt-[5em] pt-[2em]'>
                <Image src={"/cow1.jpg"} alt="team" width={900} height={900} className='lg:w-30 lg:h-30  w-20 h-20 '/>
                <div className='mt-2'>
                <p className='lg:text-[24px]  text-[1em] text-medium leading-[29px]'>Straight back</p>
                <p className='lg:text-[20px] font-normal leading-[30px] text-[0.8em]'>Long steps</p>
                </div>
            </div>


            <div className='flex flex-col items-center lg:pt-[5em] pt-[2em]'>
                <Image src={"/cow2.jpg"} alt="team" width={900} height={900} className='lg:w-30 lg:h-30  w-20 h-20 '/>
                <div className='mt-2'>
                <p className='lg:text-[24px]  text-[1em] text-medium leading-[29px]'>Incurved back in movement</p>
                <p className='lg:text-[20px] font-normal leading-[30px] text-[0.8em]'>Short steps</p>
                </div>
            </div>



            <div className='flex flex-col items-center lg:pt-[5em] pt-[2em]'>
                <Image src={"/cow3.jpg"} alt="team" width={900} height={900} className='lg:w-30 lg:h-30  w-20 h-20  '/>
                <div className='mt-2'>
                <p className='lg:text-[24px]  text-[1em] text-medium leading-[29px]'>Incurved back</p>
                <p className='lg:text-[20px] font-normal leading-[30px] text-[0.8em]'>Very short steps</p>
                </div>
            </div>



            <div className='flex flex-col items-center lg:pt-[5em] pt-[2em]'>
                <Image src={"/cow4.jpg"} alt="team" width={900} height={900} className='lg:w-30 lg:h-30  w-20 h-20  '/>
                <div className='mt-2'>
                <p className='lg:text-[24px]  text-[1em] text-medium leading-[29px]'>Incurved back</p>
                <p className='lg:text-[20px] font-normal leading-[30px] text-[0.8em]'>Obvious lameness</p>
                </div>
            </div>



            <div className='flex flex-col items-center lg:pt-[5em] pt-[2em]'>
                <Image src={"/cow5.jpg"} alt="team" width={900} height={900} className='lg:w-30 lg:h-30  w-20 h-20  '/>
                <div className='mt-2'>
                <p className='lg:text-[24px]  text-[1em] text-medium leading-[29px]'>Very evident lameness</p>
                <p className='lg:text-[20px] font-normal leading-[30px] text-[0.8em]'>Lying down</p>
                </div>
            </div>

          </div>

        </div>
    </div>
  )
}

export default Cows