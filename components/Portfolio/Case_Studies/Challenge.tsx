import Image from 'next/image'
import React from 'react'

const Challenge = () => {
    return (
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
    )
}

export default Challenge