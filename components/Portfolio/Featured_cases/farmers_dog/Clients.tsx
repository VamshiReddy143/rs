import Image from 'next/image'
import React from 'react'

const Team = () => {
  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }} className='bg-gray-200 text-black min-h-screen '>
        <Image src={"/dogs.jpg"} alt="team" width={900} height={900} className='w-[100vw]  lg:h-[60vh] h-[40vh] object-cover '/>
        <div className='lg:max-w-[90em] mx-auto lg:px-[6em] px-3 lg:mt-[12em] mt-10 md:flex gap-[5em] items-center'>
            <div className='flex flex-col items-start gap-2'>
                <p className='lg:text-[32px] font-medium leading-[38px] text-[1.5em] '>About</p>
                <h1 className='lg:text-[64px] font-medium leading-[77px] text-[2.5em] '>the <span className='lg:block'>Client</span></h1>
                <div className='w-[50px] h-[2px] mt-5 bg-black'/>
            </div>

            <div className='lg:mt-0 mt-[2em]'>
                <p className='lg:text-[24px] leading-[36px] font-normal  text-[1.2em]'>
                The Farmer’s Dog is a <span className='font-bold'>fresh dog food service</span> that has delivered over 200 million meals in the U.S. Founded by two dog lovers who were fed up with highly processed, burnt brown balls being marketed as “natural” and “healthy,” they decided to reimagine pet food from the ground up. Using decades of pet nutrition research, The Farmer’s Dog worked with top vet nutritionists to create a fresh, convenient dog food service that surpasses all quality and food safety in the industry
                </p>
              
            </div>



        </div>
            <div className='lg:max-w-[90em] mx-auto lg:px-[4em] px-3 lg:mt-[20em] mt-[10em] lg:pb-[10em] pb-[5em]'>
                <h1 className='lg:text-[80px] text-[2em] font-medium leading-[96px]'>
                “I have valued our {" "}<span className='text-[#f1684a]'>partnership with the Rootstrap team.</span>The leaders are thoughtful in balancing and being attentive to our needs, while also seeking and immediately applying any feedback given.”
                </h1>
                <div className='lg:mt-[4em] mt-[2em]'>
                    <p className=' lg:text-[28px] font-normal leading-[42px] text-[1em]'>Ashley VanderWel</p>
                    <p className='lg:text-[28px] font-normal leading-[42px] text-[1.2em] text-[#f1684a]'>Sr Director of Engineering</p>
                </div>
            </div>
    </div>
  )
}

export default Team