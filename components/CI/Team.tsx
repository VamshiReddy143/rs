import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Team = () => {
  return (
    <div className='mt-[8em] flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center justify-center gap-3'>
                <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className='text-[36px] font-semibold text-center'>Our Skilled Team</h1>
                <p className='text-[#bcbcc0]  text-center'>
                    These represent common roles staffed to partners based on their unique needs.
                </p>
            </div>

      <div className='grid lg:grid-cols-3 grid-cols-1 gap-15 mt-15 '>

        <div className='flex flex-col gap-8 bg-[#242425] rounded-xl p-7  relative h-[450px]  lg:w-[420px]'>
          <div className='flex gap-3 items-center justify-start'>
            <Image src={"/ml.png"} width={900} height={900} alt='team' className='h-15 w-15' />
            <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className='font-bold text-[1.5em]'>Architect</h1>
          </div>

          {/* <h2 className='text-[1em] font-bold'>AI researcher, award-winning data scientist, speaker, and organizer featured in major tech outlets</h2> */}

          <p className='text-[#bcbcc0]  text-[16px] leading-loose'>A full-stack developer with 7+ years of experience, specializing in JavaScript and React. He has contributed to large-scale projects, managing high-stakes situations with poise. Additionally, his strengths in product-thinking and team leadership make him a versatile problem solver.
          </p>

            <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/70 to-white rounded-full " />
          <div className='flex flex-col gap-8 absolute bottom-0 right-5 '>

            <div className='flex gap-10 items-center  justify-end '>
              <Image src={"/time.svg"} width={900} height={900} alt='team' className='h-17 w-17 py-2' />
              {/* <h1 className='font-bold text-[1em] text-gray-300'>Universal Innovations</h1> */}
            </div>
          </div>

        </div>





        <div className='flex flex-col gap-7 bg-[#242425] rounded-xl p-7 relative h-[450px]  lg:w-[420px]'>
          <div className='flex gap-3 items-center justify-start'>
            <Image src={"/ds.png"} width={900} height={900} alt='team' className='h-15 w-15' />
            <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className='font-bold text-[1.5em]'>Senior Devops <span className='block'>Engineer</span></h1>
          </div>

          {/* <h2 className='text-[1em] font-bold'>Analytical thinker, predictive modeler, and collaborative innovator with a passion for turning data into actionable insights</h2> */}

          <p className='text-[#bcbcc0]  text-[16px] leading-loose'>A highly accomplished Staff Engineer with extensive experience in Web and Mobile development, strong backend and machine learning expertise, and proficiency in various frameworks. She has successfully led teams on challenging projects, delivering exceptional results in complex environments.
          </p>

          <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/70 to-white rounded-full  " />
          <div className='flex flex-col gap-8 absolute bottom-0 right-5'>

            <div className='flex gap-10 items-center  justify-end '>
              {/* <Image src={"/egglogo.svg"} width={900} height={900} alt='team' className='h-10 w-10' />
                            <Image src={"/exi.svg"} width={900} height={900} alt='team' className='h-10 w-10' /> */}
              <Image src={"/time.svg"}  width={900} height={900} alt='team' className='h-17 w-17 py-2' />

            </div>
          </div>

        </div>




        <div className='flex flex-col gap-7 bg-[#242425] rounded-xl p-7 relative h-[450px]  lg:w-[420px]'>
          <div className='flex gap-3 items-center justify-start'>
            <Image src={"/mle.png"} width={900} height={900} alt='team' className='h-15 w-15' />
            <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className='font-bold text-[1.5em]'>DevOps Engineer</h1>
          </div>

          {/* <h2 className='text-[1em] font-bold'>AI researcher, award-winning data scientist, speaker, and organizer featured in major tech outlets</h2> */}

          <p className='text-[#bcbcc0]  text-[16px] leading-loose'>A skilled Web Engineer with expertise in React, SCSS, TypeScript, and Vite. He has contributed to significant projects, both independently and as part of a team, showcasing his versatile expertise and practical experience in modern web technologies.
          </p>

          <div className='flex flex-col gap-3 absolute bottom-0 right-5'>
            <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/70 to-white rounded-full" />

            <div className='flex gap-10 items-center  justify-end '>
            <Image src={"/logos/ui.svg"} width={900} height={900} alt='team' className='h-10 w-43' />
              <Image src={"/egglogo.svg"} width={900} height={900} alt='team' className='h-10 w-10' />
              <Image src={"/brenner.svg"} width={900} height={900} alt='team' className='h-15 w-20' />
            </div>
          </div>

        </div>

      </div>
      <Link href={"/Contact"}>
                <div className='flex items-center justify-center pt-10'>

                <button className='text-[16px] bg-transparent border text-white px-3 py-2 rounded-lg cursor-pointer  hover:bg-white/10 hover:border-white/10 hover:text-white/70 transition-colors mt-6'>
                    Get in Touch ➔
                </button>
            </div>
            </Link>

    </div>
  )
}

export default Team