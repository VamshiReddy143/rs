import Image from 'next/image'
import React from 'react'

const Team = () => {
  return (
    <div className='lg:p-[10%]   py-5 px-2 text-white bg-black'>
        <h1 className='lg:text-[5em] text-[2.2em] font-semibold leading-tight'>Join our team and unlock <span className='lg:block'>your potential!</span></h1>

        <div className='grid grid-cols-1 md:grid-cols-1  lg:grid-cols-3 lg:mt-[7em] mt-10 gap-10'>
            <div className='flex flex-col gap-8 p-10 border-2 border-gray-500'>
                <Image src={"/tree.svg"} alt="team" width={900} height={900} className='h-25 w-25'/>
                <h2 className='font-bold text-[2em]'>Growth and Development</h2>
                <div className='h-[3px] w-[20%] bg-[#ffc83f] rounded-full mt-3'/>
                <p className='text-gray-200 text-[1.5em]'>Reach your full potential with training, mentorship, feedback program.</p>
            </div>


            <div className='flex flex-col gap-8 p-10 border-2 border-gray-500'>
                <Image src={"/hheart.svg"} alt="team" width={900} height={900} className='h-25 w-25'/>
                <h2 className='font-bold text-[2em]'>Wellness</h2>
                <div className='h-[3px] w-[20%] bg-[#ffc83f] rounded-full mt-3'/>
                <p className='text-gray-200 text-[1.5em]'>Prioritize your well-being with a comprehensive set of options for you.</p>
            </div>


            <div className='flex flex-col gap-8 p-10 border-2 border-gray-500'>
                <Image src={"/hbrain.svg"} alt="team" width={900} height={900} className='h-25 w-25'/>
                <h2 className='font-bold text-[2em]'>Find your own balance</h2>
                <div className='h-[3px] w-[20%] bg-[#ffc83f] rounded-full mt-3'/>
                <p className='text-gray-200 text-[1.5em]'>Achieve balance and fulfillment with flexible work arrangements.</p>
            </div>


            <div className='flex flex-col gap-8 p-10 border-2 border-gray-500'>
                <Image src={"/hpuzzle.svg"} alt="team" width={900} height={900} className='h-25 w-25'/>
                <h2 className='font-bold text-[2em]'>Team building</h2>
                <div className='h-[3px] w-[20%] bg-[#ffc83f] rounded-full mt-3'/>
                <p className='text-gray-200 text-[1.5em]'>Foster connections and teamwork with opportunities for social events, team-building activities, and more.</p>
            </div>


            <div className='flex flex-col gap-8 p-10 border-2 border-gray-500'>
                <Image src={"/hstar.svg"} alt="team" width={900} height={900} className='h-25 w-25'/>
                <h2 className='font-bold text-[2em]'>Customized processes</h2>
                <div className='h-[3px] w-[20%] bg-[#ffc83f] rounded-full mt-3'/>
                <p className='text-gray-200 text-[1.5em]'>Receive prizes and recognitions, while enjoying working with the latest technologies.</p>
            </div>


            <div className='flex flex-col gap-8 p-10 border-2 border-gray-500'>
                <Image src={"/hmob.svg"} alt="team" width={900} height={900} className='h-25 w-25'/>
                <h2 className='font-bold text-[2em]'>Digital empowerment</h2>
                <div className='h-[3px] w-[20%] bg-[#ffc83f] rounded-full mt-3'/>
                <p className='text-gray-200 text-[1.5em]'>Enjoy advanced digital tools for improved collaboration and efficiency.</p>
            </div>

        </div>

    </div>
  )
}

export default Team