import React from 'react'

const Breeding = () => {
    return (
       <div className='bg-gray-200 text-black min-h-screen'>
         <div className=' flex items-center relative'>
            <div className='lg:pl-[11%] w-[70%] lg:px-[6em] px-3 py-[7em] '>
                <h1 className='lg:text-[4em] text-[2.4em] leading-tight font-semibold'>Addressing the needs of a cow breeding entrepreneur.</h1>
                <div>
                    <p className='lg:pt-[5em] pt-[3em] text-[1.8em]'>We <span className='font-bold'>researched and selected suitable algorithms for image segmentation</span> using machine learning. <span className='font-bold'> Our goal was to detect and outline objects in images</span>.</p>
                    <p className='mt-7 lg:text-[2em] text-[1.9em]'>
                        We evaluated both supervised and unsupervised options for automatic segmentation, involving intensive model training and data labeling. We utilized Mask R CNN with a labeled training dataset, COCO, to build an initial binary classifier for identifying healthy and unhealthy cows.
                    </p>
                </div>
            </div>

            <div className="absolute lg:right-0 lg:top-1/2 hidden lg:block bottom-0 lg:bottom-auto left-1/2 lg:left-auto -translate-x-1/2 lg:translate-x-0 lg:rotate-0 rotate-90 lg:-translate-y-1/2 -translate-y-1/10 w-[200px] overflow-hidden">

                <div className="bg-[#b84d00] lg:h-[400px] h-[300px] lg:w-[400px] w-[300px] rounded-full translate-x-[20px]" />
            </div>





        </div>
       </div>
    )
}

export default Breeding