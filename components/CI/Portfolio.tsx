import Image from 'next/image';
import React from 'react';

const Portfolio = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-7 mt-20">
            <h1 className="text-[2.4em] font-bold">
                Our Portfolio: Artificial Intelligence & Machine Learning
            </h1>
            <p className="text-gray-400">
                We have partnered with some of the world‘s fastest-growing startups and most innovative corporations.
            </p>

            <div className="grid grid-cols-3 gap-10 mt-10">
                <div>
                    <div
                        className="card  h-[500px] w-[400px] group gap-[0.5em] rounded-[1.5em] relative flex justify-end flex-col p-[1.5em] z-[1] overflow-hidden"
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
                                Deploying An AI-Powered Application
                                </p>
                            </div>
                        </div>
                        <div className='absolute top-10 left-9 z-[2]'>
                            <h2 className='font-bold text-white text-[1.2em]'>Universal Innovations</h2>
                        </div>
                        <div className="relative overflow-hidden h-[0em] group-hover:h-[9em] transition-all duration-500 z-[2]">
                            <p className="font-nunito text-white font-light leading-[1.2em]">
                            Secured containerized environment with ECR and ECS. Automated CI/CD with CodePipeline. RDS and ElasticCache ensured fast and reliable access to the data.
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
                        className="card h-[500px] w-[400px]  group gap-[0.5em] rounded-[1.5em] relative flex justify-end flex-col p-[1.5em] z-[1] overflow-hidden"
                        style={{
                            backgroundImage: "url('/DEimg1.jpg')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        {/* Black overlay layer */}
                        <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-70 transition-opacity duration-500 z-[1]"></div>

                        <div className="container text-white z-[2] relative font-nunito flex flex-col gap-[0.5em]">
                            <div className="h-fit w-full">
                                <p className="text-[1.8em] font-bold">
                                Delivering High Availability & Compliance
                                </p>
                            </div>
                        </div>
                        <div className='absolute top-10 left-9 z-[2]'>
                            <Image src={"/egglogo.svg"} alt="tools" width={900} height={900} className='h-17 w-17' />
                        </div>
                        <div className="relative overflow-hidden h-[0em] group-hover:h-[9em] transition-all duration-500 z-[2]">
                            <p className="font-nunito text-white font-light leading-[1.2em]">
                            Scaled EXI&apos;s Cloud Infrastructure to support increased load and user interactions. Ensured compliance with major regulations including FDA, NHS, GDPR/HIPAA, and ISO Standards.
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
                        className="card  h-[500px] w-[400px]  group gap-[0.5em] rounded-[1.5em] relative flex justify-end flex-col p-[1.5em] z-[1] overflow-hidden"
                        style={{
                            backgroundImage: "url('/DEimg2.jpg')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        {/* Black overlay layer */}
                        <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-70 transition-opacity duration-500 z-[1]"></div>

                        <div className="container text-white z-[2] relative font-nunito flex flex-col gap-[0.5em]">
                            <div className="h-fit w-full">
                                <p className="text-[1.8em] font-bold">
                                Migrating From On-Premise To the Cloud
                                </p>
                            </div>
                        </div>
                        <div className='absolute top-10 left-9 z-[2]'>
                            <h2 className='font-bold text-white text-[1.2em]'>Bildsy</h2>
                        </div>
                        <div className="relative overflow-hidden h-[0em] group-hover:h-[9em] transition-all duration-500 z-[2]">
                            <p className="font-nunito text-white font-light leading-[1.2em]">
                            Migrated RGB&apos;s infrastructure to AWS, reducing risk of failure and preparing for high user demand during tax season.
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
            <div>
                <button className='text-[20px] bg-transparent border text-white px-3 py-2 rounded-xl cursor-pointer hover:bg-gray-700 mt-10'>
                    Get in Touch ➔
                </button>
            </div>

        </div>
    );
};

export default Portfolio;