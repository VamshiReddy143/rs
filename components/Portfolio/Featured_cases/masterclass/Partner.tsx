import { div } from 'motion/react-client';
import Image from 'next/image';
import React from 'react';

const Partner = () => {
    return (
        <div>
            <div className="bg-white lg:h-[110em] h-[50em]  text-black pt-[10em]">
                {/* Heading */}
                <h1 className="lg:text-[1.9em] text-[1em] max-w-7xl mx-auto px-4 text-center leading-snug">
                    Throughout our partnership, <span className="font-bold">we introduced insights based on our extensive product development experience</span>, instituted new methodologies, refined working practices, and delivered designs that not only captivated users but also increased conversion rates.
                </h1>

                {/* Red Circle Section */}
                <div className="lg:pt-[20em] pt-[10em] flex justify-center items-center">
                    <div className="bg-red-700 lg:w-[86em] lg:h-[86em] w-[25em] h-[25em]  rounded-full flex flex-col items-center justify-center text-white text-center lg:px-6">
                        {/* Optional image */}
                        <div className="lg:w-[90%] lg:h-[50%] relative mt-[10em] mb-6">
                            <Image
                                src="/us.jpg"
                                alt="team"
                                width={900}
                                height={900}
                                className="w-full h-full"
                            />
                        </div>

                        {/* Text inside the circle */}
                        <div className="flex-1   lg:w-[70%] w-[90%]">
                            <p className="lg:text-[2.2em] text-[1em] leading-relaxed text-center">
                                We assisted MasterClass in <span className='font-bold'>modernizing its payment infrastructure and initiated strategies</span> to amplify its reach and foster user growth and engagement. This included <span className='font-bold'>promoting peer-to-peer incentives to stimulate user recommendations</span>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            <div className=' bg-black text-white lg:mt-[30em] mt-[15em] font-sans'>
                <h1 className='lg:text-[2.7em]  text-[1.9em] max-w-7xl mx-auto px-4 font-bold  leading-snug'>
                    In 2021, we supported MasterClass's globalization efforts by tailoring our product to resonate with diverse linguistic audiences, prepping it for a global stage.
                </h1>
                <div className='h-[2px] w-full bg-red-700 max-w-7xl mx-auto px-3 mt-[7em]' />

            </div>



            <div
                className="bg-black text-white min-h-screen  lg:pt-3 lg:pt-0 md:mt-[10em]  bg-no-repeat 
             md:bg-[position:calc(100%+20px)_top] 
             md:bg-[length:800px_auto] 
             md:bg-[url('/w.svg')]
             bg-[url('/w.svg')]
             bg-[length:300px_100px] 
             bg-[position:calc(90%+70px)_bottom] 
             "
            >
            <div className='max-w-7xl mx-auto px-3'>
                <h1 className='md:text-[3.2em] text-[1.9em] lg:w-[80%] font-semibold '>Accelerated Growth During COVID <span className='block'>Pandemic</span></h1>
                <p className='md:text-[1.5em] text-[1.3em] lg:w-[70%] mt-5 leading-snug text-gray-200'>The COVID pandemic produced an exponential increase in demand for high quality streaming content and presented MasterClass with a rapid expansion challenge during a global shortage of technical talent. As their partners, we doubled the size of an already-large team in less than two months, playing a crucial role in responding to unprecedented consumer demand, spearheading their global expansion, and introducing a new enterprise business strategy.</p>
            </div>
            </div>

        </div>
    );
};

export default Partner;
