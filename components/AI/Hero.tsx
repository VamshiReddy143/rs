
import React from 'react';

const page = () => {
    return (

        <div
            className="bg-black text-white min-h-screen bg-no-repeat bg-[position:calc(100%+200px)_top] bg-[length:1300px_auto] bg-[url('/linebg.png')]"
        >
            <div className="flex flex-col items-start w-[60%] justify-center h-screen leading-tight">
                <h1 className="text-[4em] font-extrabold">
                    Artificial Intelligence & <span className="block">Machine Learning</span>
                </h1>
                <p className="mt-5 text-[1.2em] text-gray-400 w-[90%]">
                    We provide high-quality AI/ML solutions for partners across diverse projects. Our
                    expertise ensures your models are highly accurate, scalable, and fine-tuned for your
                    specific use cases.
                </p>
                <button className="mt-10 border bg-transparent p-3 rounded-xl cursor-pointer">
                    Get In Touch ➔
                </button>

                <div className='bg-gray-900 flex items-center absolute bottom-0 left-1/2 -translate-x-1/2 justify-center p-5 rounded-full w-fit'>
                    <div className='flex gap-5'>
                        <p className="whitespace-nowrap overflow-hidden text-ellipsis">Staff Augmentation & Product Studio Available Across: </p>
                        <p>➔</p>
                    </div>
                    <div>
                        <ul className='flex gap-2 items-center ml-5'>
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
            </div>
        </div>
    );
};

export default page;
