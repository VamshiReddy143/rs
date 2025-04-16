import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Portfolio = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-7 lg:mt-20 mt-10">
            <h1 className="lg:text-[2.4em] text-[2em] font-bold text-center">
                Our Portfolio: Artificial Intelligence & Machine Learning
            </h1>
            <p className="text-gray-400 text-center">
                We have partnered with some of the world‘s fastest-growing startups and most innovative corporations.
            </p>

            <div className="grid lg:grid-cols-3 grid-cols-1  gap-10 lg:mt-10 mt-5">
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
                        <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-70 transition-opacity duration-500 z-[1]"></div>

                        <div className="container text-white z-[2] relative font-nunito flex flex-col gap-[0.5em]">
                            <div className="h-fit w-full">
                                <p className="text-[1.8em] font-bold">
                                    Guiding Parents in Child Development with AI
                                </p>
                            </div>
                        </div>
                        <div className='absolute top-10 left-9 z-[2]'>
                            <h2 className='font-bold text-white text-[1.2em]'>Universal Innovations</h2>
                        </div>
                        <div className="relative overflow-hidden h-[0em] group-hover:h-[9em] transition-all duration-500 z-[2]">
                            <p className="font-nunito text-white font-light leading-[1.2em]">
                                AI-assisted parenting platform for child development in areas like emotional well-being, motor skills, and intelligence.
                            </p>
                            <div className='flex justify-center items-center mt-5'>
                                <button className='text-[20px] bg-[#f6ff7a] text-black px-2 py-3 w-full flex items-center justify-center rounded-lg cursor-pointer hover:bg-[#f6ff7a]/80'>
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
                        <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-70 transition-opacity duration-500 z-[1]"></div>

                        <div className="container text-white z-[2] relative font-nunito flex flex-col gap-[0.5em]">
                            <div className="h-fit w-full">
                                <p className="text-[1.8em] font-bold">
                                    Teaching Children How to Code with AI
                                </p>
                            </div>
                        </div>
                        <div className='absolute top-10 left-9 z-[2]'>
                            <Image src={"/egglogo.svg"} alt="tools" width={900} height={900} className='h-17 w-17' />
                        </div>
                        <div className="relative overflow-hidden h-[0em] group-hover:h-[9em] transition-all duration-500 z-[2]">
                            <p className="font-nunito text-white font-light leading-[1.2em]">
                                AI-driven, gamified learning platform and mobile app for parents and their kids.
                            </p>
                            <div className='flex justify-center items-center mt-5'>
                                <button className='text-[20px] bg-[#f6ff7a] text-black px-2 py-3 w-full flex items-center justify-center rounded-lg cursor-pointer hover:bg-[#f6ff7a]/80'>
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
                        <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-70 transition-opacity duration-500 z-[1]"></div>

                        <div className="container text-white z-[2] relative font-nunito flex flex-col gap-[0.5em]">
                            <div className="h-fit w-full">
                                <p className="text-[1.8em] font-bold">
                                    Generating 3D Home Renovations with AI
                                </p>
                            </div>
                        </div>
                        <div className='absolute top-10 left-9 z-[2]'>
                            <h2 className='font-bold text-white text-[1.2em]'>Bildsy</h2>
                        </div>
                        <div className="relative overflow-hidden h-[0em] group-hover:h-[9em] transition-all duration-500 z-[2]">
                            <p className="font-nunito text-white font-light leading-[1.2em]">
                                AI-powered 3D renderings and augmented reality of home renovation options to assist homeowners and builders.
                            </p>
                            <div className='flex justify-center items-center mt-5'>
                                <button className='text-[20px] bg-[#f6ff7a] text-black px-2 py-3 w-full flex items-center justify-center rounded-lg cursor-pointer hover:bg-[#f6ff7a]/80'>
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           <Link href={"/Contact"}>
           <div>
                <button className='text-[20px] bg-transparent border text-white px-3 py-2 rounded-xl cursor-pointer hover:bg-gray-700 mt-10'>
                    Get in Touch ➔
                </button>
            </div>
           </Link>

        </div>
    );
};

export default Portfolio;