import Image from 'next/image'
import React from 'react'

const Challenge = () => {
    return (
        <div className='min-h-screen bg-black text-white'>
            <div>
                <div className="lg:px-[3.1em] pt-[3em] pb-[1em] lg:text-[3.8em] text-[2.2em] font-semibold mx-auto">

                    <span className="inline bg-gradient-to-t from-[#720058] to-[#720058] bg-[length:100%_0.3em] bg-no-repeat bg-bottom">
                        The Challenge
                    </span>{" "}
                </div>

                    <div className="lg:max-w-[90em] bg-black text-white mx-auto lg:px-[5em] px-3 flex flex-col gap-10">
                        <p className='lg:text-[1.5em] text-[1.2em] lg:w-[70%]'>Madison Reed faced a challenge: developing a mobile app to enhance their digital presence and integrate seamlessly with their customers' mobile experience. The tight schedule added urgency, requiring careful framing and prioritization.</p>
                        <p className=' lg:text-[1.5em] text-[1.2em] lg:w-[70%]'>Rootstrap, their chosen partner, had the responsibility of building the app within the timeframe while ensuring a smooth transition for Madison Reed's internal team. Knowledge continuity was crucial for a successful launch and maintenance.</p>
                    </div>


                    <div className="lg:max-w-[90em] bg-black text-white mx-auto lg:px-[5em] px-3 flex pt-[5em] flex lg:gap-20 gap-5 justify-center pb-[10em]  overflow-hidden">
                      <Image src={"/modelmobile2.jpg"} alt="team" width={900} height={900} className='lg:h-[30em] lg:w-[35em] h-[20em] w-[25em]'/>
                      <Image src={"/modelmobile3.jpg"} alt="team" width={900} height={900} className='lg:h-[30em] lg:w-[35em] h-[20em] w-[25em] mt-[10em]'/>
                    </div>

            </div>

        </div>
    )
}

export default Challenge