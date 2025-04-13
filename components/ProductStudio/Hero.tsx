
import Image from 'next/image';
import React from 'react';

const page = () => {
    return (

        <div
            className="bg-black  mt-[5em] lg:mt-0 text-white flex justify-between overflow-hidden lg:min-h-screen bg-no-repeat bg-[position:calc(100%)] lg:bg-[length:900px]  md:bg-[length:900px]  bg-[length:400px] bg-[url('/pss.png')]"
        >
            <div className="flex flex-col items-start  justify-center lg:h-screen leading-tight">
                <div className='lg:flex justify-between items-center '>
                    <div className='lg:w-[60%] w-full'>
                    <h1 className="lg:text-[4em] md:text-[3.5em] text-[2em] font-extrabold">
                        Product Studio

                        </h1>
                        <p className="mt-5 text-[1.3em] text-gray-400 lg:w-[85%]">
                        Build a high-quality, user-centric product or feature from scratch, fast and on budget. We staff embedded product teams with PMs, UX/UI designers, frontend, backend, data, and QA engineers.
                        </p>
                        <button className="mt-10 border bg-transparent p-3 rounded-xl cursor-pointer">
                            Get In Touch ➔
                        </button>
                    </div>


                    <div className='bg-gray-900 border-2 border-[#e54b58] rounded-xl p-2 lg:w-[45%] w-full mt-10 lg:mt-0 lg:mr-[11%] mr-0'>
                        <div className='flex flex-col items-start justify-center p-3 gap-6'>
                            <Image src={"/redcoma.svg"} alt="team" width={900} height={900} className='h-10 w-10' />
                            <p className='text-[1.2em] italic font-bold leading-[1.4em] leading-[1.3em]'>
                            Developed our MVP from scratch. Delivered intuitive and streamlined product, receiving positive user feedback and keeping on budget. The partnership element they bring to the table is impressive.
                            </p>
                           <div className='flex justify-between items-center w-full'>
                           <div className='flex flex-col gap-1 items-start'>
                                <p className='font-bold text-gray-400'>Jess Chan</p>
                                <p className='text-gray-400'>Founder & CEO, Backbone</p>

                                <div>
                                    <Image src={"/backbone.png"} alt="team" width={900} height={900} className='h-5 w-full mt-1' />
                                </div>
                            </div>

                            <div>
                                <Image src={"/man1.jpg"} alt="team" width={900} height={900} className='h-15 w-15' />
                            </div>
                           </div>
                        </div>
                    </div>

                </div>

                <div className='bg-gray-900 lg:flex hidden md:block items-center absolute md:bottom-[4em] lg:bottom-0 left-1/2 -translate-x-1/2 justify-center lg:p-5 md:p-10 lg:rounded-full  lg:w-fit md:w-full'>
                    <div className='flex md:flex-col  items-center justify-center gap-5'>
                        <p className="whitespace-nowrap overflow-hidden text-ellipsis">Staff Augmentation & Product Studio Available Across: </p>         
                        <p className='lg:hidden md:block'>↓</p>
                    </div>
                    <div>
                        <ul className='flex gap-2 items-center justify-center ml-5 md:mt-5 lg:mt-0'>
                            <li className="relative text-[#49895c] font-bold text-[1em] px-3 py-1 rounded-full border border-[#49895c] border-b-0">
                                AI
                                <span className="absolute bottom-0 left-0 w-full h-[8px] bg-gradient-to-t from-[#2424225] to-transparent rounded-b-full"></span>
                            </li>
                            <li className="relative text-[#FF99CA] font-bold text-[1em] px-3 py-1 rounded-full border border-[#FF99CA] border-b-0">
                                Data
                                <span className="absolute bottom-0 left-0 w-full h-[8px] bg-gradient-to-t from-[#2424225] to-transparent rounded-b-full"></span>
                            </li>
                            <li className="relative text-[#8FDAD1] font-bold text-[1em] px-3 py-1 rounded-full border border-[#8FDAD1] border-b-0">
                                Cloud
                                <span className="absolute bottom-0 left-0 w-full h-[8px] bg-gradient-to-t from-[#2424225] to-transparent rounded-b-full"></span>
                            </li>
                            <li className="relative text-[#75ff9C] font-bold text-[1em] px-3 py-1 rounded-full border border-[#75ff9C] border-b-0">
                                Backend
                                <span className="absolute bottom-0 left-0 w-full h-[8px] bg-gradient-to-t from-[#2424225] to-transparent rounded-b-full"></span>
                            </li>
                            
                            <li className="relative text-[#75ff9C] font-bold text-[1em] px-3 py-1 rounded-full border border-[#75ff9C] border-b-0">
                                Frontend
                                <span className="absolute bottom-0 left-0 w-full h-[8px] bg-gradient-to-t from-[#2424225] to-transparent rounded-b-full"></span>
                            </li>
                            <li className="relative text-[#8FDAD1] font-bold text-[1em] px-3 py-1 rounded-full border border-[#8FDAD1] border-b-0">
                                Mobile
                                <span className="absolute bottom-0 left-0 w-full h-[8px] bg-gradient-to-t from-[#2424225] to-transparent rounded-b-full"></span>
                            </li>
                            <li className="relative text-[#77BDFF] font-bold text-[1em] px-3 py-1 rounded-full border border-[#77BDFF] border-b-0">
                                UX/UI
                                <span className="absolute bottom-0 left-0 w-full h-[8px] bg-gradient-to-t from-[#2424225] to-transparent rounded-b-full"></span>
                            </li>
                        </ul>

                     
                    </div>
                </div>



                <div className='bg-gray-900 md:hidden  items-center mt-5  rounded-xl  p-5  w-full'>
                    <div className='flex flex-col items-center gap-5'>
                        <p className="text-center  overflow-hidden text-ellipsis">Staff Augmentation & Product Studio Available Across</p>
                        <p>↓</p>
                    </div>
                    <div>
                        <ul className='flex gap-2 items-center justify-center mt-5'>
                            <li className="relative text-[#49895c] font-bold text-[1em] px-3 py-1 rounded-full border border-[#49895c] border-b-0">
                                AI
                                <span className="absolute bottom-0 left-0 w-full h-[8px] bg-gradient-to-t from-[#2424225] to-transparent rounded-b-full"></span>
                            </li>
                            <li className="relative text-[#FF99CA] font-bold text-[1em] px-3 py-1 rounded-full border border-[#FF99CA] border-b-0">
                                Data
                                <span className="absolute bottom-0 left-0 w-full h-[8px] bg-gradient-to-t from-[#2424225] to-transparent rounded-b-full"></span>
                            </li>
                            <li className="relative text-[#8FDAD1] font-bold text-[1em] px-3 py-1 rounded-full border border-[#8FDAD1] border-b-0">
                                Cloud
                                <span className="absolute bottom-0 left-0 w-full h-[8px] bg-gradient-to-t from-[#2424225] to-transparent rounded-b-full"></span>
                            </li>
                            <li className="relative text-[#75ff9C] font-bold text-[1em] px-3 py-1 rounded-full border border-[#75ff9C] border-b-0">
                                Backend
                                <span className="absolute bottom-0 left-0 w-full h-[8px] bg-gradient-to-t from-[#2424225] to-transparent rounded-b-full"></span>
                            </li>
                            
                           
                        </ul>


                        <ul className='flex gap-2 items-center justify-center  mt-5'>
                           
                            
                            <li className="relative text-[#75ff9C] font-bold text-[1em] px-3 py-1 rounded-full border border-[#75ff9C] border-b-0">
                                Frontend
                                <span className="absolute bottom-0 left-0 w-full h-[8px] bg-gradient-to-t from-[#2424225] to-transparent rounded-b-full"></span>
                            </li>
                            <li className="relative text-[#8FDAD1] font-bold text-[1em] px-3 py-1 rounded-full border border-[#8FDAD1] border-b-0">
                                Mobile
                                <span className="absolute bottom-0 left-0 w-full h-[8px] bg-gradient-to-t from-[#2424225] to-transparent rounded-b-full"></span>
                            </li>
                            <li className="relative text-[#77BDFF] font-bold text-[1em] px-3 py-1 rounded-full border border-[#77BDFF] border-b-0">
                                UX/UI
                                <span className="absolute bottom-0 left-0 w-full h-[8px] bg-gradient-to-t from-[#2424225] to-transparent rounded-b-full"></span>
                            </li>
                        </ul>

                     
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
