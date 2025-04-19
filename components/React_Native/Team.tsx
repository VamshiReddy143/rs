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


            <div className='grid lg:grid-cols-3 grid-cols-1 gap-15 mt-15'>
                {/* Card 1 */}
                <div className='flex flex-col gap-8 bg-[#242425] rounded-xl p-7  relative h-[410px]  lg:w-[420px]'>
                    <div className='flex gap-3 items-center justify-start'>
                        <Image
                            src={"/ml.png"}
                            width={900}
                            height={900}
                            alt='team'
                            className='h-15 w-15'
                        />
                     <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className='font-bold text-[1.5em]'>Engineering Lead</h1>
                    </div>

                    <h2 style={{ fontFamily: 'Poppins, sans-serif' }} className='text-[16px] font-bold leading-loose'>
                    Proven leader, technical planner, and collaborator with cross-functional teams
                    </h2>

                    <p className='text-[#bcbcc0]  text-[16px]'>
                    Proficient in JavaScript, Swift, and accessibility, combined with strong mentoring abilities. Valuable asset to any team.
                    </p>

                    {/* Downpart */}
                    <div className='absolute bottom-0 left-5 right-5 flex flex-col  gap-3'>
                        <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/10 to-white rounded-full" />

                        <div className='flex gap-10 items-center justify-end py-2'>
                            <Image
                                src={"/logos/mc.svg"}
                                width={900}
                                height={900}
                                alt='team'
                                className='h-15 w-36'
                            />
                           
                        </div>
                    </div>
                </div>

                {/* Card 2 */}
                <div className='flex flex-col gap-8 bg-[#242425] rounded-xl p-7  relative h-[410px]  lg:w-[420px]'>
                    <div className='flex gap-3 items-center justify-start'>
                        <Image
                            src={"/ds.png"}
                            width={900}
                            height={900}
                            alt='team'
                            className='h-15 w-15'
                        />
                         <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className='font-bold text-[1.5em]'>Staff Engineer</h1>
                    </div>

                    <h2 style={{ fontFamily: 'Poppins, sans-serif' }} className='text-[16px] font-bold leading-loose'>
                    Top-notch developer, committed to delivering high-quality work swiftly
                    </h2>

                    <p className='text-[#bcbcc0]  text-[16px]'>
                    Well-regarded, easy-going, and adaptive nature, fostering a positive and collaborative work environment.
                    </p>

                    {/* Downpart */}
                    <div className='absolute bottom-0 left-5 right-5 flex flex-col gap-3'>
                        <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/70 to-white rounded-full" />

                        <div className='flex gap-10 items-center justify-end py-2'>
                            <Image
                                src={"/time.svg"}
                                width={900}
                                height={900}
                                alt='team'
                                className='h-15 w-20'
                            />
                            {/* <Image
                                src={"/exi.svg"}
                                width={900}
                                height={900}
                                alt='team'
                                className='h-10 w-10'
                            /> */}
                        </div>
                    </div>
                </div>

                {/* Card 3 */}
                <div className='flex flex-col gap-8 bg-[#242425] rounded-xl p-7  relative h-[410px]  lg:w-[420px]'>
                    <div className='flex gap-3 items-center justify-start'>
                        <Image
                            src={"/mle.png"}
                            width={900}
                            height={900}
                            alt='team'
                            className='h-15 w-15'
                        />
                         <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className='font-bold text-[1.5em]'>Senior Engineer</h1>
                    </div>

                    <h2 style={{ fontFamily: 'Poppins, sans-serif' }} className='text-[16px] font-bold leading-loose'>
                    Seasoned React Native developer with deep expertise in JavaScript and TypeScript
                    </h2>

                    <p className='text-[#bcbcc0]  text-[16px]'>
                    Successful track record of delivering high-quality mobile and web applications, strong tech abilities and an excellent communicator.
                    </p>

                    {/* Downpart */}
                    <div className='absolute bottom-0 left-5 right-5 flex flex-col  '>
                        <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/70 to-white rounded-full" />

                        <div className='flex gap-10 items-center justify-end py-2'>
                            <Image
                                src={"/logos/ds.svg"}
                                width={900}
                                height={900}
                                alt='team'
                                className='h-15 w-25 '
                            />
                           
                        </div>
                    </div>
                </div>
            </div>

            <Link href={"/Contact"}>
                <div className='flex items-center justify-center pt-10 '>

                <button className='text-[16px] bg-transparent border text-white px-3 py-2 rounded-lg cursor-pointer  hover:bg-white/10 hover:border-white/10 hover:text-white/70 transition-colors mt-6'>
                    Get in Touch ➔
                </button>
            </div>
            </Link>
        </div>
    );
};

export default Team;