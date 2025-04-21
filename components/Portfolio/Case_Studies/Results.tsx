import React from 'react'

const Results = () => {
    return (
        <div className='bg-white text-black'>
            <div className='lg:max-w-[90em] mx-auto lg:px-[6em] px-3 lg:pt-[12em] pt-[5em] pb-[10em] lg:flex justify-between items-center gap-[2em]'>
                <div>
                    <h1 className='lg:text-[64px] text-[2.7em] font-medium leading-[77px]'>The <span className='lg:block'>Results</span></h1>
                    <div className='h-[3px] w-[60px] bg-black rounded-full mt-5' />
                </div>
                <div className='flex flex-col gap-10 mt-10 lg:mt-0 '>
                    <div className='flex gap-4 items-start'>
                        <h1 className='lg:text-[1.5em] text-[1em] mt-1'>●</h1>
                        <p className='lg:text-[28px] text-[15px] leading-[23px] lg:leading-[42px] '><span className='font-semibold'>#1 Childcare Software: </span><span className='font-normal '> 
                        Brightwheel is now ranked as the leading childcare center software based on external reviews and the fastest-growing and top-reviewed product in early education - a $100B US market.
                            </span></p>
                    </div>

                    <div className='flex gap-4 items-start'>
                        <h1 className='lg:text-[1.5em] text-[1em] mt-1'>●</h1>
                        <p className='lg:text-[28px] text-[15px] leading-[23px] lg:leading-[42px] '><span className='font-semibold'>Improved Productivity:</span><span className='font-normal '> 
                        With Brightwheel’s all-in-one app, simplified admin tasks can save up to 20 hours per month. 90% of preschools report that more families pay on time, while 95% of administrators & staff report improved communication with families.
                            </span></p>
                    </div>

                    <div className='flex gap-4 items-start'>
                        <h1 className='lg:text-[1.5em] text-[1em] mt-1'>●</h1>
                        <p className='lg:text-[28px] text-[15px] leading-[23px] lg:leading-[42px] '><span className='font-semibold'>Recognition & Investment: </span><span className='font-normal '> 
                        Brightwheel was recognized on the #SMBTech50 list and received notable investment from Addition, Bessemer, Emerson Collective, GGV Capital, Lowercase Capital, and Mark Cuban.
                            </span></p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Results