import Image from 'next/image'
import React from 'react'

const Challenge = () => {
    return (
        <div style={{ fontFamily: 'Poppins, sans-serif' }} className='min-h-screen bg-[#212121]  text-white'>
            <div>
                <div className="lg:px-[2.4em] pt-[3em] pb-[1em] lg:text-[72px] text-[2.2em] font-normal leading-[86px] mx-auto">

                    <span className="inline bg-gradient-to-t from-[#720058] to-[#720058] bg-[length:100%_0.3em] bg-no-repeat bg-bottom">
                        The Challenge
                    </span>{" "}
                </div>

                    <div className="lg:max-w-[90em] bg-[#212121]  text-white mx-auto lg:px-[5em] px-3 flex flex-col gap-10">
                        <p className='lg:text-[24px] leading-[36px] font-normal text-[1.2em] lg:w-[70%]'>Madison Reed faced a challenge: developing a mobile app to enhance their digital presence and integrate seamlessly with their customers' mobile experience. The tight schedule added urgency, requiring careful framing and prioritization.</p>
                        <p className=' lg:text-[24px] leading-[36px] font-normal lg:w-[70%]'>Rootstrap, their chosen partner, had the responsibility of building the app within the timeframe while ensuring a smooth transition for Madison Reed's internal team. Knowledge continuity was crucial for a successful launch and maintenance.</p>
                    </div>


                    <div className="lg:max-w-[90em] bg-[#212121]  text-white mx-auto lg:px-[5em] px-3 flex pt-[5em] flex lg:gap-20 gap-5 justify-center pb-[13em]  overflow-hidden">
                      <Image src={"/modelmobile2.jpg"} alt="team" width={900} height={900} className='lg:h-[30em] lg:w-[35em] h-[20em] w-[25em]'/>
                      <Image src={"/modelmobile3.jpg"} alt="team" width={900} height={900} className='lg:h-[30em] lg:w-[35em] h-[20em] w-[25em] mt-[10em]'/>
                    </div>

            </div>

        </div>
    )
}

export default Challenge