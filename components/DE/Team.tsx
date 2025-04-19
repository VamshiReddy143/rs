import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Team = () => {
    return (
        <div className='mt-[8em] flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center justify-center gap-3'>
                <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className='text-[36px] font-semibold text-center'>Our Skilled Team</h1>
                <p className='text-[#bcbcc0]  text-center'>
                    These represent common roles staffed to partners based on their unique needs.
                </p>
            </div>

            <div className='grid lg:grid-cols-3 grid-cols-1 gap-5 mt-15'>
                {/* Card 1 */}
                <div className='flex flex-col gap-7 bg-[#242425]  rounded-xl p-5 mb-10 relative min-h-auto'>
                    <div className='flex gap-3 items-center justify-start'>
                        <Image
                            src={"/ml.png"}
                            width={900}
                            height={900}
                            alt='team'
                            className='h-15 w-15'
                        />
                         <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className='font-bold text-[1.5em]'>Data Architect</h1>
                    </div>

                    <h2 style={{ fontFamily: 'Poppins, sans-serif' }} className='text-[16px] font-bold leading-loose'>
                    Strategic thinker, data strategist, and collaborator with cross-functional teams
                    </h2>

                    <p className='text-[#bcbcc0]  text-[1em]'>
                    Expert in data modeling, architecture design, and cloud technologies, paired with strong leadership and mentoring skills.
                        
                    
                    </p>

                    {/* Downpart */}
                    <div className='absolute bottom-0 left-5 right-5 flex flex-col  gap-3'>
                        <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/10 to-white rounded-full" />

                        <div className='flex gap-10 items-center justify-end'>
                            <Image
                                src={"/egglogo.svg"}
                                width={900}
                                height={900}
                                alt='team'
                                className='h-10 w-10'
                            />
                            <h1 className='font-bold text-[1em] text-gray-300'>
                                Universal Innovations
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Card 2 */}
                <div className='flex flex-col gap-7 bg-[#242425]  rounded-xl p-5 relative mb-10 min-h-[400px]'>
                    <div className='flex gap-3 items-center justify-start'>
                        <Image
                            src={"/ds.png"}
                            width={900}
                            height={900}
                            alt='team'
                            className='h-15 w-15'
                        />
                         <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className='font-bold text-[1.5em]'>Data Scientist</h1>
                    </div>

                    <h2 style={{ fontFamily: 'Poppins, sans-serif' }} className='text-[16px] font-bold leading-loose'>
                    Skilled analyst, effective communicator, and experienced with both traditional and serverless applications
                    </h2>

                    <p className='text-[#bcbcc0]  text-[1em]'>
                    Expert in statistical analysis, machine learning, and data visualization, with strong problem-solving skills.
                    </p>

                    {/* Downpart */}
                    <div className='absolute bottom-0 left-5 right-5 flex flex-col gap-3'>
                        <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/70 to-white rounded-full" />

                        <div className='flex gap-10 items-center justify-end'>
                            <Image
                                src={"/egglogo.svg"}
                                width={900}
                                height={900}
                                alt='team'
                                className='h-10 w-10'
                            />
                            <Image
                                src={"/exi.svg"}
                                width={900}
                                height={900}
                                alt='team'
                                className='h-10 w-10'
                            />
                        </div>
                    </div>
                </div>

                {/* Card 3 */}
                <div className='flex flex-col gap-7 bg-[#242425] rounded-xl p-5 relative mb-10 min-h-[400px]'>
                    <div className='flex gap-3 items-center justify-start'>
                        <Image
                            src={"/mle.png"}
                            width={900}
                            height={900}
                            alt='team'
                            className='h-15 w-15'
                        />
                         <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className='font-bold text-[1.5em]'>Data Engineer</h1>
                    </div>

                    <h2 style={{ fontFamily: 'Poppins, sans-serif' }} className='text-[16px] font-bold leading-loose'>
                    Skilled problem solver, data pipeline builder, and team player with a focus on scalable data solutions
                    </h2>

                    <p className='text-[#bcbcc0]  text-[1em]'>
                    Expert in ETL processes, SQL, and cloud platforms, complemented by strong collaboration skills.
                    </p>

                    {/* Downpart */}
                    <div className='absolute bottom-0 left-5 right-5 flex flex-col  '>
                        <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/70 to-white rounded-full" />

                        <div className='flex gap-10 items-center justify-end'>
                            <Image
                                src={"/egglogo.svg"}
                                width={900}
                                height={900}
                                alt='team'
                                className='h-10 w-10'
                            />
                            <Image
                                src={"/brenner.svg"}
                                width={900}
                                height={900}
                                alt='team'
                                className='h-15 w-15'
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Link href={"/Contact"}>
                <div className='flex items-center justify-center '>

                <button className='text-[16px] bg-transparent border text-white px-3 py-2 rounded-lg cursor-pointer  hover:bg-white/10 hover:border-white/10 hover:text-white/70 transition-colors mt-6'>
                    Get in Touch ➔
                </button>
            </div>
            </Link>
        </div>
    );
};

export default Team;