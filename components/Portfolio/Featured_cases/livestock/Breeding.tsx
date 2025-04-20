import React from 'react'

const Breeding = () => {
    return (
       <div style={{ fontFamily: 'Poppins, sans-serif' }} className='bg-gray-200 text-black min-h-screen'>
         <div className=' flex items-center relative'>
            <div className='lg:pl-[11%] w-[70%] lg:px-[6em] px-3 py-[7em] '>
                <h1 className='lg:text-[61px] text-[2.4em] leading-[77px] font-medium'>Addressing the needs of a cow breeding entrepreneur.</h1>
                <div>
                    <p className='lg:pt-[4em] lg:text-[32px] font-extralight leading-[48px] pt-[3em] text-[1.8em]'>We <span className='font-semibold'>researched and selected suitable algorithms for image segmentation</span> using machine learning. <span className='font-semibold'> Our goal was to detect and outline objects in images</span>.</p>
                    <p className='mt-7 lg:text-[32px] lg:pt-[32px] font-extralight leading-[48px] text-[1.9em]'>
                        We evaluated both supervised and unsupervised options for automatic segmentation, involving intensive model training and data labeling. We utilized Mask R CNN with a labeled training dataset, COCO, to build an initial binary classifier for identifying healthy and unhealthy cows.
                    </p>
                </div>
            </div>

            <div className="absolute lg:right-0 lg:top-1/2 hidden lg:block bottom-0 lg:bottom-auto left-1/2 lg:left-auto -translate-x-1/2 lg:translate-x-0 lg:rotate-0 rotate-90 lg:-translate-y-1/2 -translate-y-1/10 w-[200px] overflow-hidden">

                <div className="bg-[#b84d00] lg:h-[500px] h-[400px] lg:w-[500px] w-[300px] rounded-full translate-x-[4px]" />
            </div>





        </div>
       </div>
    )
}

export default Breeding