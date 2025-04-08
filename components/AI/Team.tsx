import Image from 'next/image'
import React from 'react'

const Team = () => {
    return (
        <div className='mt-20 flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center justify-center gap-3'>
                <h1 className='text-[2.4em] font-bold'>Our Skilled Team</h1>
                <p className='text-gray-400'>These represent common roles staffed to partners based on their unique needs.</p>
            </div>

            <div className='grid grid-cols-3 gap-5 mt-15 '>

                <div className='flex flex-col gap-8 bg-gray-800 rounded-xl p-5  relative h-[500px]  w-[400px]'>
                    <div className='flex gap-3 items-center justify-start'>
                        <Image src={"/ml.png"} width={900} height={900} alt='team' className='h-15 w-15' />
                        <h1 className='font-bold text-[1.5em]'>Machine Learning Lead</h1>
                    </div>

                    <h2 className='text-[1em] font-bold'>AI researcher, award-winning data scientist, speaker, and organizer featured in major tech outlets</h2>

                    <p className='text-gray-300 text-[1em]'>Computer engineer with a Master&apos;s in Data Science. Winner of Globant
                        Award and finalist for the &quot;Global AI Inclusion&quot;.
                        AI researcher at ORT University, and organizer of AI meetups.
                        Featured in LifeWire, BBC, and MKAI. Speaker at conferences: ValleyML, Airflow Summit, and MLConf.
                    </p>

                    <div className='flex flex-col gap-8 absolute bottom-0 right-5 '>
                        <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/10 to-white rounded-full  " />

                        <div className='flex gap-10 items-center  justify-end '>
                            <Image src={"/egglogo.svg"} width={900} height={900} alt='team' className='h-10 w-10' />
                            <h1 className='font-bold text-[1em] text-gray-300'>Universal Innovations</h1>
                        </div>
                    </div>

                </div>





                <div className='flex flex-col gap-7 bg-gray-800 rounded-xl p-5 relative  w-[400px]'>
                    <div className='flex gap-3 items-center justify-start'>
                        <Image src={"/ds.png"} width={900} height={900} alt='team' className='h-15 w-15' />
                        <h1 className='font-bold text-[1.5em]'>Data Scientist</h1>
                    </div>

                    <h2 className='text-[1em] font-bold'>Analytical thinker, predictive modeler, and collaborative innovator with a passion for turning data into actionable insights</h2>

                    <p className='text-gray-300 text-[1em]'>Expert in statistical analysis, machine learning, and data visualization, with strong problem-solving skills. An invaluable asset to any data science team.
                    </p>

                    <div className='flex flex-col gap-8 absolute bottom-0 right-5'>
                        <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/70 to-white rounded-full  " />

                        <div className='flex gap-10 items-center  justify-end '>
                            <Image src={"/egglogo.svg"} width={900} height={900} alt='team' className='h-10 w-10' />
                            <Image src={"/exi.svg"} width={900} height={900} alt='team' className='h-10 w-10' />
                            
                        </div>
                    </div>

                </div>




                <div className='flex flex-col gap-7 bg-gray-800 rounded-xl p-5 relative  w-[400px]'>
                    <div className='flex gap-3 items-center justify-start'>
                        <Image src={"/mle.png"} width={900} height={900} alt='team' className='h-15 w-15' />
                        <h1 className='font-bold text-[1.5em]'>Machine Learning Engineer</h1>
                    </div>

                    <h2 className='text-[1em] font-bold'>AI researcher, award-winning data scientist, speaker, and organizer featured in major tech outlets</h2>

                    <p className='text-gray-300 text-[1em]'>Computer engineer with a Master&apos;s in Data Science. Winner of Globant
                        Award and finalist for the &quot;Global AI Inclusion&quot;.
                        AI researcher at ORT University, and organizer of AI meetups.
                        Featured in LifeWire, BBC, and MKAI. Speaker at conferences: ValleyML, Airflow Summit, and MLConf.
                    </p>

                    <div className='flex flex-col gap-8 absolute bottom-0 right-5'>
                        <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/70 to-white rounded-full" />

                        <div className='flex gap-10 items-center  justify-end '>
                            <Image src={"/egglogo.svg"} width={900} height={900} alt='team' className='h-10 w-10' />
                            <Image src={"/brenner.svg"} width={900} height={900} alt='team' className='h-15 w-15' />
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Team