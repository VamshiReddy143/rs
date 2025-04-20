import Image from 'next/image'
import React from 'react'

const Challenge = () => {
  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }} className='bg-[#203a33] text-white'>
        <div className='lg:max-w-[90em] mx-auto lg:px-[6em] px-3 lg:py-[12em] py-[5em] md:flex gap-[5em] items-center'>
              <div>
               <div className='leading-tight'>
               <p className='lg:text-[32px] font-medium leading-[38px]'>The</p>
               <h1 className='font-medium leading-[77px] lg:text-[64px] text-[3em]'>Challenge</h1>
               </div>
                <div className='h-[2px] w-[60px] bg-white rounded-full mt-9'/>
                <p className='text-[22px] leading-[36px] font-normal  mt-4'>
                The Farmer’s Dog’s strategic priority was to develop strong relationships with veterinarians, as they are the trusted professionals who work towards ensuring the health and wellness of dogs. However, their restrictively manual backend process presented a challenge in <span className='font-bold'>maintaining relationships and expanding their reach with their veterinary targets; </span> they had multiple internal resources individually managing the communication with the vets and did not have a formal program in place to incentivize or track referrals to meet their business goals.
                </p>
              </div>
        </div>

        <div>
            <Image src={"/dogschart.jpg"} alt='team' height={900} width={900} className='h-[50vh] w-[100vw] object-cover'/>
        </div>


        <div className='lg:max-w-[90em] mx-auto lg:px-[6em] px-3 lg:py-[16em] py-[4em] md:flex gap-[5em] items-center'>
            <h1 className='lg:text-[72px] text-[2em] leading-[86px] font-sans font-normal'>
            The Farmer’s Dog partnered with Rootstrap to develop a seamless experience for vet resources and onboarding so as to leverage them as resellers of their products.
            </h1>
        </div>
    </div>
  )
}

export default Challenge