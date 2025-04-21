import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Team = () => {
    return (
        <div className='mt-[8em] flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center justify-center gap-3'>
                <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className='text-[36px] font-semibold text-center'>Our Skilled Team</h1>
                <p className='text-[#bcbcc0]  text-center leading-[32px] text-[16px]'>
                    These represent common roles staffed to partners based on their unique needs.
                </p>
            </div>

            <div className='grid lg:grid-cols-3 grid-cols-1 gap-5 mt-15'>
                {/* Card 1 */}
                <div className='flex flex-col gap-7 bg-[#242425] rounded-xl p-5 mb-10 relative min-h-[550px]'>
                    <div className='flex gap-3 items-center justify-start'>
                        <Image
                            src={"/ml.png"}
                            width={900}
                            height={900}
                            alt='team'
                            className='h-15 w-15'
                        />
                        <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className='font-bold text-[1.5em]'>Machine Learning Lead</h1>
                    </div>

                    <h2 style={{ fontFamily: 'Poppins, sans-serif' }} className='text-[16px] font-bold leading-loose'>
                       AI researcher, award-winning data scientist, speaker, and organizer featured in major tech outlets
                    </h2>

                    <p className='text-[#bcbcc0]  text-[1em]'>
                    Computer engineer with a Master's in Data Science. Winner of Globant Award and finalist for the "Global AI Inclusion". AI researcher at ORT University, and organizer of AI meetups. Featured in LifeWire, BBC, and MKAI. Speaker at conferences: ValleyML, Airflow Summit, and MLConf.
                
                    </p>

                    {/* Downpart */}
                    <div className='absolute bottom-0 left-5 right-5 flex flex-col  gap-3'>
                        <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/10 to-white rounded-full" />

                        <div className='flex gap-10 items-center justify-end pb-3 '>
                            <Image
                                src={"/egglogo.svg"}
                                width={900}
                                height={900}
                                alt='team'
                                className='h-15 w-12'
                            />
                            <h1 className='font-bold text-[1.1em] text-[#7f7f7f]'>
                                Universal Innovations
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Card 2 */}
                <div className='flex flex-col gap-7 bg-[#242425] rounded-xl p-5 relative mb-10 min-h-[400px]'>
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
                    Analytical thinker, predictive modeler, and collaborative innovator with a passion for turning data into actionable insights
                    </h2>

                    <p className='text-[#bcbcc0]  text-[1em]'>
                    Expert in statistical analysis, machine learning, and data visualization, with strong problem-solving skills. An invaluable asset to any data science team.
                    </p>

                    {/* Downpart */}
                    <div className='absolute bottom-0 left-5 right-5 flex flex-col gap-3'>
                        <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/70 to-white rounded-full" />

                        <div className='flex gap-10 items-center justify-end pb-3'>
                            <Image
                                src={"/egglogo.svg"}
                                width={900}
                                height={900}
                                alt='team'
                                className='h-15 w-12'
                            />
                            <Image
                                src={"/exi.svg"}
                                
                                width={900}
                                height={900}
                                alt='team'
                                className='h-10 w-10 text-[#7f7f7f]'
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
                        <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className='font-bold text-[1.5em]'>Machine Learning Engineer</h1>
                    </div>

                    <h2 style={{ fontFamily: 'Poppins, sans-serif' }} className='text-[16px] font-bold leading-loose'>
                    Skilled problem solver, data pipeline builder, and team player with a focus on scalable Machine Learning solutions
                    </h2>

                    <p className='text-[#bcbcc0]  text-[1em]'>
                    Expert in deploying, scaling, and maintaining machine learning models in production environments. Optimizes models for performance, ensuring seamless integration with existing systems. Specializes in designing and managing the infrastructure needed for running models.
                    </p>

                    {/* Downpart */}
                    <div className='absolute bottom-0 left-5 right-5 flex flex-col  '>
                        <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/70 to-white rounded-full" />

                        <div className='flex gap-10 items-center justify-end pb-3'>
                            <Image
                                src={"/egglogo.svg"}
                                width={900}
                                height={900}
                                alt='team'
                                className='h-15 w-12'
                            />
                            <Image
                                src={"/brenner.svg"}
                                width={900}
                                height={900}
                                alt='team'
                                className='h-16 w-20'
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