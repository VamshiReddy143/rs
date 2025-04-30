import { div } from 'framer-motion/client'
import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (

    <div>

    <div style={{ fontFamily: 'Poppins, sans-serif' }} className='bg-[#1B1B1B] text-white'>
      <div className='lg:max-w-[90em] mx-auto lg:px-[6em] px-3 lg:pt-[19em] pt-[10em] leading-tight '>
        <h1 className='lg:text-[80px] lg:leading-[96px] fontt-medium text-[3em] '>Brightwheel</h1>
        <p className='lg:text-[24px] lg:leading-[36px] font-normal text-[1em]'>Building the #1 early education platform</p>
      </div>
      <div className='lg:pt-[7em]'>
        <Image src={"/bwimg.jpg"} alt='team' height={900} width={900} className='w-[100vw] lg:h-[60vh] h-[40vh] object-cover'/>
      </div>
    </div>

    <div style={{ fontFamily: 'Poppins, sans-serif' }} className='bg-gray-200 text-black min-h-screen '>
        {/* <Image src={"/blacky.jpg"} alt="team" width={900} height={900} className='w-[100vw]  lg:h-[60vh] h-[40vh] object-cover '/> */}
        <div className='lg:max-w-[90em] mx-auto lg:px-[6em] px-3 lg:pt-[12em] pt-10 md:flex gap-[5em] items-center'>
            <div className='flex flex-col items-start lg:gap-2'>
                <p className='lg:text-[32px] lg:leading-[38px] font-medium text-[1.5em] '>About</p>
                <h1 className='lg:text-[64px] text-[42px] leading-[50px] lg:leading-[77px] font-medium flex lg:gap-5 gap-2'>the <span className=''>Client</span></h1>
                <div className='w-[50px] h-[2px] mt-3 lg:mt-0 bg-black'/>
            </div>

            <div className='lg:mt-0 mt-[2em]'>
                <p className='lg:text-[25px] font-normal text-[15px] leading-[23px] lg:leading-[42px] text-[1.2em]'>
                Brightwheel is the <span className='font-bold'> leading platform for early education</span>, combining SaaS, Payments, and a consumer-like daily experience. With Brightwheel, teachers save time with tools for assessment, communication, and photo sharing; administrators manage their business with enrollment, reporting, and online bill pay; while parents get a beautiful, real-time view of their child’s day that helps them participate in the learning experience and continue it at home.
                </p>
               
            </div>



        </div>
            <div className='lg:max-w-[90em] mx-auto lg:px-[4em] px-3 lg:mt-[18em] mt-[10em] lg:pb-[10em] pb-[6em]'>
                <h1 className='lg:text-[67px] font-medium  text-[32px]  lg:leading-[81px] leading-[38px]'>
                “We’re happy with the quality of the service Rootstrap provides. Contractor resources are high quality and have good technology and communication skills. Rootstrap management has been a pleasure to work with, and they are fast and thorough in their follow-up.”
                </h1>
                <div className='lg:mt-[4em] mt-[2em]'>
                    <p className=' lg:text-[28px] font-normal lg:leading-[43px] text-[1em]'>Julie DeLoyd</p>
                    <p className='lg:text-[28px] font-normal lg:leading-[43px] text-[1em]'>President, Brightwheel</p>
                </div>
            </div>
    </div>


         <div style={{ fontFamily: 'Poppins, sans-serif' }} className='bg-[#1B1B1B] text-white'>
    
                <div className='lg:max-w-[90em] mx-auto lg:px-[4em] px-3 lg:pt-[12em] py-[6em] leading-tight '>
                    <h1 className='lg:text-[64px] leading-[77px] font-medium text-[2.4em] '>The challenge</h1>
                    <p className='lg:text-[28px] font-extralight leading-[23px] lg:leading-[30px] text-[15px] mt-10'>
                        Brightwheel wanted to scale its engineering operations and needed experienced engineers with Ruby BE, React FE, and Python skills to incorporate into its tech stack capabilities. For this project, speed of work and delivery was paramount.
                    </p>
    
                    <p className='lg:text-[28px] font-extralight  leading-[23px] lg:leading-[30px] text-[15px] mt-10'>
                        Brightwheel needed Rootstrap’s expertise in developing important new web and mobile functionalities, such as a reporting tool and menu planning features. The client also required Rootstrap’s QA services for high-level testing.
                    </p>
    
    
                    <Image src={"/kid.jpg"} alt='team' height={900} width={900} className=' w-full py-[7em] object-cover' />
    
    
    
                    <div className='lg:mt-10 mt-7 '>
                        <h1 className='lg:text-[64px] leading-[77px] font-medium text-[2.4em] '>What we did</h1>
                        <div className='flex flex-col gap-10 mt-10'>
                            <div className='flex gap-4 items-start'>
                                <h1 className='lg:text-[1.5em] text-[1em]'>●</h1>
                                <p className='lg:text-[2em]  leading-[23px] lg:leading-[37px] text-[15px]'><span className='font-semibold'>Versatile Teams:</span><span className='lg:text-[28px] font-extralight  text-[1.3em]'> Rootstrap enlisted senior React JS & WordPress developers to work on the platform's frontend and QA specialists to incorporate quality assurance into the client's process.</span></p>
                            </div>
    
                            <div className='flex gap-4 items-start'>
                                <h1 className='lg:text-[1.5em] text-[1]'>●</h1>
                                <p className='lg:text-[2em]  leading-[23px] lg:leading-[37px] text-[15px] '><span className='font-semibold'>eCommerce Expertise:</span><span className='lg:text-[28px] font-extralight  text-[1.3em]'>The initial project was to research, design, and build an eCommerce website for their early childhood line, Experience Early Learning. Rootstrap deployed an Agile methodology with an iterative delivery approach to design and build out the platform. Rootstrap’s React developers then worked with WordPress and WooCommerce integrations to develop various web functionalities, including Billing and payments, Communication, Center Management, Lesson Plans, Attendance, and Daily Activity Reports.</span></p>
                            </div>
    
                            <div className='flex gap-4 items-start'>
                                <h1 className='lg:text-[1.5em] text-[1]'>●</h1>
                                <p className='lg:text-[2em] leading-[23px] lg:leading-[37px] text-[15px] '><span className='font-semibold'>Trust & Growth on the Web: </span><span className='lg:text-[28px] font-extralight  text-[1.3em] '>
                                Given the success of the eComm project, Brightwheel entrusted Rootstrap with additional responsibilities. Rootstrap eventually took over Brightwheel’s and Experience Early Learning’s (sister company) web applications to maintain and build out the sites. In addition to addressing high-priority bugs causing customer payment processing and subscription management issues, Rootstrap’s developers implemented a host of new backend functionality to help BetterUp’s employees track subscriptions and manage payments better. Salesforce and Intercom were also integrated into the platform to help with customer relationship management. Measure Twice, Cut Once: On the QA side, the team performed functional tests, generated test cases, and utilized test case management tools for traceability of work and to capture metrics that reflect the quality of the released features.
                                     </span></p>
                            </div>
                        </div>
                    </div>
    


    
    
    
    
                </div>
    
            </div>


            <div className='bg-white text-black'>
            <div className='lg:max-w-[90em] mx-auto lg:px-[6em] px-3 lg:pt-[12em] pt-[5em] pb-[10em] lg:flex justify-between items-center gap-[2em]'>
                <div>
                    <h1 className='lg:text-[64px] text-[2.7em] font-medium leading-[77px]'>The <span className='lg:block'>Results</span></h1>
                    <div className='h-[3px] w-[60px] bg-black rounded-full mt-5' />
                </div>
                <div className='flex flex-col gap-10 mt-10 lg:mt-0 '>
                    <div className='flex gap-4 items-start'>
                        <h1 className='lg:text-[1.5em] text-[1em] mt-1'>●</h1>
                        <p className='lg:text-[28px] text-[15px] leading-[23px] lg:leading-[42px] '><span className='font-semibold'>#1 Childcare Software: </span><span className='font-normal '> 
                        Brightwheel is now ranked as the leading childcare center software based on external reviews and the fastest-growing and top-reviewed product in early education - a $100B US market.
                            </span></p>
                    </div>

                    <div className='flex gap-4 items-start'>
                        <h1 className='lg:text-[1.5em] text-[1em] mt-1'>●</h1>
                        <p className='lg:text-[28px] text-[15px] leading-[23px] lg:leading-[42px] '><span className='font-semibold'>Improved Productivity:</span><span className='font-normal '> 
                        With Brightwheel’s all-in-one app, simplified admin tasks can save up to 20 hours per month. 90% of preschools report that more families pay on time, while 95% of administrators & staff report improved communication with families.
                            </span></p>
                    </div>

                    <div className='flex gap-4 items-start'>
                        <h1 className='lg:text-[1.5em] text-[1em] mt-1'>●</h1>
                        <p className='lg:text-[28px] text-[15px] leading-[23px] lg:leading-[42px] '><span className='font-semibold'>Recognition & Investment: </span><span className='font-normal '> 
                        Brightwheel was recognized on the #SMBTech50 list and received notable investment from Addition, Bessemer, Emerson Collective, GGV Capital, Lowercase Capital, and Mark Cuban.
                            </span></p>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Hero