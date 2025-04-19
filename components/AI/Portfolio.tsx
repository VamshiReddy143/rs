import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Portfolio = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-6 lg:pt-[8em] pt-[7em]">
            <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className="lg:text-[2.4em] text-[2em] font-bold text-center">
                Our Portfolio: Artificial Intelligence & Machine Learning
            </h1>
            <p className="text-[#bcbcc0] text-center">
                We have partnered with some of the world‘s fastest-growing startups and most innovative corporations.
            </p>

            <div className="grid lg:grid-cols-3 grid-cols-1  gap-6 lg:mt-10 mt-5">
                <div>
                    <div
                        className="card  h-[500px]  group gap-[0.5em] rounded-[1.5em] relative flex justify-end flex-col p-[1.5em] z-[1] overflow-hidden"
                        style={{
                            backgroundImage: "url('/aiimg1.jpg')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        {/* Black overlay layer */}
                        <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-75 transition-opacity duration-500 z-[1]"></div>

                        <div className="container text-white z-[2] relative font-nunito flex flex-col gap-[0.5em]">
                            <div className="h-fit w-full">
                                <p style={{ fontFamily: 'Poppins, sans-serif' }} className="text-[24px] font-semibold ">
                                    Guiding Parents in Child Development with AI
                                </p>
                            </div>
                        </div>
                        <div className='absolute top-10 left-9 z-[2]'>
                            <h2 className='font-bold text-white text-[24px]'>Universal Innovations</h2>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-[3em] bg-gradient-to-t from-black via-black/70 to-transparent z-10" />
                        <div className="relative overflow-hidden h-[0em] group-hover:h-[9em] transition-all duration-500 z-[2]">
                            <p className="text-[#bcbcc0]  font-light leading-[1.2em]">
                                AI-assisted parenting platform for child development in areas like emotional well-being, motor skills, and intelligence.
                            </p>
                            <div className='flex justify-center items-center mt-5'>
                                <button className='text-[16px] font-semibold bg-[#f6ff7a] text-black px-2 py-3 w-full flex items-center justify-center rounded-lg cursor-pointer hover:bg-[#f6ff7a]/80'>
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>



                <div>
                    <div
                        className="card h-[500px]   group gap-[0.5em] rounded-[1.5em] relative flex justify-end flex-col p-[1.5em] z-[1] overflow-hidden"
                        style={{
                            backgroundImage: "url('/aiimg2.jpg')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        {/* Black overlay layer */}
                        <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-75 transition-opacity duration-500 z-[1]"></div>

                        <div className="container text-white z-[2] relative font-nunito flex flex-col gap-[0.5em]">
                            <div className="h-fit w-full">
                                <p style={{ fontFamily: 'Poppins, sans-serif' }} className="text-[24px] font-bold">
                                    Teaching Children How to Code with AI
                                </p>
                            </div>
                        </div>
                        <div className='absolute top-10 left-9 z-[2]'>
                            <Image src={"/egglogo.svg"} alt="tools" width={900} height={900} className='h-17 w-17' />
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-[3em] bg-gradient-to-t from-black via-black/70 to-transparent z-10" />
                        <div className="relative overflow-hidden h-[0em] group-hover:h-[9em] transition-all duration-500 z-[2]">
                            <p className="text-[#bcbcc0] font-light leading-[1.2em]">
                                AI-driven, gamified learning platform and mobile app for parents and their kids.
                            </p>
                            <div className='flex justify-center items-center mt-5'>
                                <button className='text-[16px] font-semibold bg-[#f6ff7a] text-black px-2 py-3 w-full flex items-center justify-center rounded-lg cursor-pointer hover:bg-[#f6ff7a]/80'>
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>



                <div>
                    <div
                        className="card  h-[500px]   group gap-[0.5em] rounded-[1.5em] relative flex justify-end flex-col p-[1.5em] z-[1] overflow-hidden"
                        style={{
                            backgroundImage: "url('/aiimg3.jpg')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        {/* Black overlay layer */}
                        <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-75 transition-opacity duration-500 z-[1]"></div>

                        <div className="container text-white z-[2] relative font-nunito flex flex-col gap-[0.5em]">
                            <div className="h-fit w-full">
                                <p style={{ fontFamily: 'Poppins, sans-serif' }} className="text-[24px] font-bold">
                                    Generating 3D Home Renovations with AI
                                </p>
                            </div>
                        </div>
                        <div className='absolute top-10 left-9 z-[2]'>
                            <h2 className='font-bold text-white text-[1.2em]'>Bildsy</h2>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-[3em] bg-gradient-to-t from-black via-black/70 to-transparent z-10" />
                        <div className="relative overflow-hidden h-[0em] group-hover:h-[9em] transition-all duration-500 z-[2]">
                            <p className="text-[#bcbcc0] font-light leading-[1.2em]">
                                AI-powered 3D renderings and augmented reality of home renovation options to assist homeowners and builders.
                            </p>
                            <div className='flex justify-center items-center mt-5'>
                                <button className='text-[16px] font-semibold bg-[#f6ff7a] text-black px-2 py-3 w-full flex items-center justify-center rounded-lg cursor-pointer hover:bg-[#f6ff7a]/80'>
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