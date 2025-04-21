import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Portfolio = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-6 lg:pt-[8em] pt-[7em]">
            <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className="lg:text-[36px] text-[2em] font-semibold text-center">
                Our Portfolio: <span className='block lg:inline'>React Native</span>
            </h1>
            <p className="text-[#bcbcc0] text-[16px] leading-[32px] text-center">
                We have partnered with some of the world‘s fastest-growing startups and most innovative corporations.
            </p>

            <div className="grid lg:grid-cols-3 grid-cols-1  gap-10 lg:mt-10 mt-5">
                <div>
                    <div
                        className="card  h-[500px]  group gap-[0.7em] rounded-[1.5em] relative flex justify-end flex-col p-[1.5em] z-[1] overflow-hidden"
                        style={{
                            backgroundImage: "url('/rnimg1.jpg')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        {/* Black overlay layer */}
                        <div className="absolute inset-0 bg-black opacity-60 group-hover:opacity-70 transition-opacity duration-500 z-[1]"></div>

                        <div className="container text-white z-[2] relative  flex flex-col gap-[0.5em]">
                            <div className="h-fit w-full">
                                <p style={{ fontFamily: 'Poppins, sans-serif' }} className="text-[24px] w-[95%] font-semibold ">
                                    Mobile marketplace, scheduling & chat
                                </p>
                            </div>
                        </div>
                        <div className='absolute top-10 left-9 z-[2]'>
                            <h2 className='font-bold text-white text-[1.2em]'>Universal Innovations</h2>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-[4em] bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                        <div className="relative overflow-hidden h-[0em] group-hover:h-[12em] transition-all duration-500 z-[2]">
                            <p className="text-[#bcbcc0] text-[16px]  font-semibold leading-[1.3em]">

                                Modern, user-friendly healthcare app for patients and practitioners with enhanced appointment scheduling, medical history access, and medication ordering.
                            </p>
                            <div className='flex justify-center items-center mt-5'>
                                <button className='text-[16px] font-semibold  bg-[#f6ff7a] text-black px-2 py-3 w-full flex items-center justify-center rounded-lg cursor-pointer hover:bg-[#f6ff7a]/80'>
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>



                <div>
                    <div
                        className="card h-[500px]   group gap-[0.7em] rounded-[1.5em] relative flex justify-end flex-col p-[1.5em] z-[1] overflow-hidden"
                        style={{
                            backgroundImage: "url('/rnimg2.jpg')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        {/* Black overlay layer */}
                        <div className="absolute inset-0 bg-black opacity-60 group-hover:opacity-70 transition-opacity duration-500 z-[1]"></div>

                        <div className="container text-white z-[2] relative  flex flex-col gap-[0.5em]">
                            <div className="h-fit w-full">
                                <p style={{ fontFamily: 'Poppins, sans-serif' }} className="text-[24px] w-[95%] font-semibold ">
                                    Mobile ecommerce, subscription & loyalty
                                </p>
                            </div>
                        </div>
                        <div className='absolute top-10 left-9 z-[2]'>
                            <Image src={"/egglogo.svg"} alt="tools" width={900} height={900} className='h-17 w-17' />
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-[4em] bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                        <div className="relative overflow-hidden h-[0em] group-hover:h-[12em] transition-all duration-500 z-[2]">
                            <p className="text-[#bcbcc0] text-[16px]  font-semibold leading-[1.3em]">
                                Elevated mobile app with subscription management, appointment handling, and unique loyalty program increased sales and customer engagement
                            </p>
                            <div className='flex justify-center items-center mt-5'>
                                <button className='text-[16px] font-semibold  bg-[#f6ff7a] text-black px-2 py-3 w-full flex items-center justify-center rounded-lg cursor-pointer hover:bg-[#f6ff7a]/80'>
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>



                <div>
                    <div
                        className="card  h-[500px]   group gap-[0.7em] rounded-[1.5em] relative flex justify-end flex-col p-[1.5em] z-[1] overflow-hidden"
                        style={{
                            backgroundImage: "url('/rnimg3.jpg')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        {/* Black overlay layer */}
                        <div className="absolute inset-0 bg-black opacity-60 group-hover:opacity-70 transition-opacity duration-500 z-[1]"></div>

                        <div className="container text-white z-[2] relative  flex flex-col gap-[0.5em]">
                            <div className="h-fit w-full">
                                <p style={{ fontFamily: 'Poppins, sans-serif' }} className="text-[24px] w-[95%] font-semibold ">
                                    Mobile AI, content & CMS
                                </p>
                            </div>
                        </div>
                        <div className='absolute top-10 left-9 z-[2]'>
                            <h2 className='font-bold text-white text-[1.2em]'>Bildsy</h2>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-[4em] bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                        <div className="relative overflow-hidden h-[0em] group-hover:h-[8em] transition-all duration-500 z-[2]">
                            <p className="text-[#bcbcc0] text-[16px]  font-semibold leading-[1.3em]">
                                AI-driven learning platform and mobile app for parents and their kids.
                            </p>
                            <div className='flex justify-center items-center mt-5'>
                                <button className='text-[16px] font-semibold  bg-[#f6ff7a] text-black px-2 py-3 w-full flex items-center justify-center rounded-lg cursor-pointer hover:bg-[#f6ff7a]/80'>
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Link href={"/Contact"}>
           <div>
                <button className='text-[16px] bg-transparent border text-white px-3 py-2 rounded-lg cursor-pointer  hover:bg-white/10 hover:border-white/10 hover:text-white/70 transition-colors mt-6'>
                    Get in Touch ➔
                </button>
            </div>
           </Link>

        </div>
    );
};

export default Portfolio;