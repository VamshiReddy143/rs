import Image from 'next/image'
import React from 'react'

const Challenge = () => {
  return (
    <div className='bg-[#203a33] text-white'>
        <div className='lg:max-w-[90em] mx-auto lg:px-[6em] px-3 lg:py-[12em] py-[5em] md:flex gap-[5em] items-center'>
              <div>
               <div className='leading-tight'>
               <p className='lg:text-[1.5em]'>The</p>
               <h1 className='font-semibold lg:text-[4em] text-[3em]'>Challenge</h1>
               </div>
                <div className='h-[2px] w-[80px] bg-white rounded-full mt-5'/>
                <p className='text-[1.5em] mt-10'>
                The Farmer’s Dog’s strategic priority was to develop strong relationships with veterinarians, as they are the trusted professionals who work towards ensuring the health and wellness of dogs. However, their restrictively manual backend process presented a challenge in <span className='font-bold'>maintaining relationships and expanding their reach with their veterinary targets; </span> they had multiple internal resources individually managing the communication with the vets and did not have a formal program in place to incentivize or track referrals to meet their business goals.
                </p>
              </div>
        </div>

        <div>
            <Image src={"/dogschart.jpg"} alt='team' height={900} width={900} className='h-[50vh] w-[100vw] object-cover'/>
        </div>


        <div className='lg:max-w-[90em] mx-auto lg:px-[6em] px-3 lg:py-[12em] py-[4em] md:flex gap-[5em] items-center'>
            <h1 className='lg:text-[4.3em] text-[2em] leading-tight font-sans font-semibold'>
            The Farmer’s Dog partnered with Rootstrap to develop a seamless experience for vet resources and onboarding so as to leverage them as resellers of their products.
            </h1>
        </div>
    </div>
  )
}

export default Challenge