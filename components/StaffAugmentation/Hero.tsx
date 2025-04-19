
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const page = () => {
    return (

        <div
            className="bg-[#191a1b] mt-[5em] lg:mt-0 text-white flex justify-between overflow-hidden lg:min-h-screen bg-no-repeat bg-[position:calc(100%)] lg:bg-[length:700px]  md:bg-[length:900px]  bg-[length:400px] bg-[url('/sasimg.png')]"
        >
            <div className="flex flex-col items-start   justify-center lg:h-screen leading-tight">
                <div className='lg:flex justify-between  lg:mb-[10em] items-center '>
                    <div className='lg:w-[60%] w-full'>
                        <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className="lg:text-[64px] md:text-[3.5em] text-[2em] font-bold">
                            Staff Augmentation
                        </h1>
                        <p className="mt-5 text-[16px] text-[#bcbcc0] leading-loose w-[95%]">
                            Add senior engineers to your staff for less than the cost of US employees. We staff individuals as well as teams of 50+ people, plus project managers, DevOps, QA, and designers.
                        </p>
                        <Link href={"/Contact"}>
                            <button className="mt-10 border bg-transparent px-3 py-3 rounded-lg cursor-pointer hover:bg-white/10 hover:border-white/10 hover:text-white/70 transition-colors">
                                Get In Touch <span className='ml-2'>➔</span>
                            </button>
                        </Link>
                    </div>

                    <div className='bg-[#191a1b] border-2 border-[#3b9b58] rounded-xl p-3 lg:w-[37%] w-full mt-10 lg:mt-0 lg:mr-45 mr-0'>
                        <div className='flex flex-col items-start justify-center p-5 gap-7'>
                            <Image src={"/coma.png"} alt="team" width={900} height={900} className='h-10 w-10' />
                            <p className='text-[22px] italic font-normal leading-[1.5em]'>
                                Rootstrap has the same level of care and ownership of the product as our team. Treat them as your core team, and you can utilize them to the fullest to tackle challenging problems.
                            </p>
                            <div className='flex justify-between items-center w-full'>
                                <div className='flex flex-col gap-2 items-start'>
                                    <p className='font-bold text-[14px] text-[#bcbcc0]'>Mandar Bapaye</p>
                                    <p className='font-bold text-[14px] text-[#bcbcc0]'>CTO/CPO</p>

                                    <div>
                                        <Image src={"/m.png"} alt="team" width={900} height={900} className='h-5 w-full mt-1' />
                                    </div>
                                </div>

                                <div>
                                    <Image src={"/man1.jpg"} alt="team" width={900} height={900} className='h-[76px] w-[76px] rounded-lg' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <div className='bg-[#242425] lg:flex hidden md:block items-center absolute md:bottom-20 lg:bottom-20 left-1/2 -translate-x-1/2 justify-center lg:p-5 md:p-10 lg:rounded-full  lg:w-fit md:w-full'>
                    <div className='flex md:flex-col  items-center justify-center gap-5 py-3'>
                        <p className="whitespace-nowrap overflow-hidden text-ellipsis text-[16px] text-[#bcbcc0] flex">Staff Augmentation & Product Studio Available Across: <span className='hidden lg:block ml-4'>➔</span> </p>
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



                <div className='bg-[#242425] md:hidden  items-start mt-5  rounded-xl  p-5  w-full'>
                    <div className='flex flex-col items-center gap-5'>
                        <p className="text-center  overflow-hidden text-[16px] text-left text-[#bcbcc0] text-ellipsis">Staff Augmentation & Product Studio Available Across</p>
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


                        <ul className='flex gap-2 items-left justify-center  mt-5'>


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
