"use client";

import Image from 'next/image';
import React from 'react';
import line1 from "../public/lineimg1.png";
import line2 from "../public/lineimg2.png";
import line3 from "../public/lineimg3.png";
import line4 from "../public/lineimg4.png";
import line5 from "../public/lineimg5.png";
import line6 from "../public/lineimg6.png";
import { motion } from 'framer-motion';

const Capabilities = () => {
    return (
        <div id="capabilities" className='min-h-screen mt-20'>
            <div className='grid grid-cols-3 gap-7'>
                {/* Card Container with shared hover */}
                <motion.div
                    className='relative rounded-xl overflow-hidden group'
                >
                    {/* Image Section */}
                    <motion.div
                        className='w-full h-[300px] overflow-hidden'
                        whileHover={{ scale: 1.1 }} // Enlarge image on hover
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <Image
                            src={line1}
                            alt="line"
                            width={900}
                            height={900}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </motion.div>

                    {/* Text Section Container */}
                    <motion.div
                        className='relative z-10 transition-all duration-500 group-hover:-translate-y-[120px]'
                    >
                        <div className='p-5 bg-gray-900 rounded-b-xl'>
                            <h1 className='text-[2em] font-bold'>Artificial Intelligence</h1>
                            <p className='text-gray-400 mt-5'>
                                Gen AI, Custom LLMs, Machine Learning & Computer Vision
                            </p>
                            {/* Points Section */}
                            <div className='grid grid-cols-3 gap-4 mt-12'>
                                <p className='bg-gray-700 w-fit p-2 rounded-xl'>OpenAI</p>
                                <p className='bg-gray-700 w-fit p-2 rounded-xl'>Claude</p>
                                <p className='bg-gray-700 w-fit p-2 rounded-xl'>Llama</p>
                                <p className='bg-gray-700 w-fit p-2 rounded-xl'>Langchain</p>
                                <p className='bg-gray-700 w-fit p-2 rounded-xl'>TensorFlow</p>
                                <p className='bg-gray-700 w-fit p-2 rounded-xl'>Python</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Black div at the bottom */}
                    <div className='absolute bg-black h-[11em] w-full bottom-0 z-20' />
                </motion.div>



                <motion.div
                    className='relative rounded-xl overflow-hidden group'
                >
                    {/* Image Section */}
                    <motion.div
                        className='w-full h-[300px] overflow-hidden'
                        whileHover={{ scale: 1.1 }} // Enlarge image on hover
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <Image
                            src={line2}
                            alt="line"
                            width={900}
                            height={900}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </motion.div>

                    {/* Text Section Container */}
                    <motion.div
                        className='relative z-10 transition-all duration-500 group-hover:-translate-y-[170px]'
                    >
                        <div className='p-5 bg-gray-900 rounded-b-xl'>
                            <h1 className='text-[2em] font-bold'>Data</h1>
                            <p className='text-gray-400 mt-5'>
                                ETL & Storage, Visualization, Processing & Enrichment
                            </p>
                            {/* Points Section */}
                            <div className=' gap-4 mt-12'>
                                <div className='flex gap-4'>
                                    <p className='bg-gray-700 w-fit p-2 rounded-xl'>AWS Redshift</p>
                                    <p className='bg-gray-700 w-fit p-2 rounded-xl'>Snowflake</p>
                                </div>
                                <div className='flex gap-4 mt-4'>
                                    <p className='bg-gray-700 w-fit p-2 rounded-xl'>Databicks</p>
                                    <p className='bg-gray-700 w-fit p-2 rounded-xl'>Apache</p>
                                </div>
                                <p className='bg-gray-700 w-fit p-2 rounded-xl mt-4'>Google BigQuery</p>

                            </div>
                        </div>
                    </motion.div>

                    {/* Black div at the bottom */}
                    <div className='absolute bg-black h-[11em] w-full bottom-0 z-20' />
                </motion.div>



                <motion.div
                    className='relative rounded-xl overflow-hidden group'
                >
                    {/* Image Section */}
                    <motion.div
                        className='w-full h-[300px] overflow-hidden'
                        whileHover={{ scale: 1.1 }} // Enlarge image on hover
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <Image
                            src={line3}
                            alt="line"
                            width={900}
                            height={900}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </motion.div>

                    {/* Text Section Container */}
                    <motion.div
                        className='relative z-10 transition-all duration-500 group-hover:-translate-y-[120px]'
                    >
                        <div className='p-5 bg-gray-900 rounded-b-xl'>
                            <h1 className='text-[2em] font-bold'>Cloud</h1>
                            <p className='text-gray-400 mt-5'>
                                Infrastructure, DevOps, APIs Automation & Scalability
                            </p>
                            {/* Points Section */}
                            <div className=' gap-4 mt-12'>
                                <div className='flex gap-4'>
                                    <p className='bg-gray-700 w-fit p-2 rounded-xl'>AWS</p>
                                    <p className='bg-gray-700 w-fit p-2 rounded-xl'>Heroku</p>
                                    <p className='bg-gray-700 w-fit p-2 rounded-xl'>GCP</p>
                                </div>
                                <div className='flex gap-4 mt-4'>
                                    <p className='bg-gray-700 w-fit p-2 rounded-xl'>Azure</p>
                                    <p className='bg-gray-700 w-fit p-2 rounded-xl'>Vercel</p>
                                    <p className='bg-gray-700 w-fit p-2 rounded-xl'>Contentful</p>
                                </div>

                            </div>
                        </div>
                    </motion.div>

                    {/* Black div at the bottom */}
                    <div className='absolute bg-black h-[11em] w-full bottom-0 z-20' />
                </motion.div>




                <motion.div
                    className='relative rounded-xl overflow-hidden group'
                >
                    {/* Image Section */}
                    <motion.div
                        className='w-full h-[300px] overflow-hidden'
                        whileHover={{ scale: 1.1 }} // Enlarge image on hover
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <Image
                            src={line4}
                            alt="line"
                            width={900}
                            height={900}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </motion.div>

                    {/* Text Section Container */}
                    <motion.div
                        className='relative z-10 transition-all duration-500 group-hover:-translate-y-[170px]'
                    >
                        <div className='p-5 bg-gray-900 rounded-b-xl'>
                            <h1 className='text-[2em] font-bold'>Web Development</h1>
                            <p className='text-gray-400 mt-5'>
                                Content, Media & Video, Ecommerce, SaaS, & Websites
                            </p>
                            {/* Points Section */}
                            <div className=' gap-4 mt-12'>
                                <div className='flex gap-4'>
                                    <p className='bg-gray-700 w-fit p-2 rounded-xl'>React & NextJS</p>
                                    <p className='bg-gray-700 w-fit p-2 rounded-xl'>Ruby on Rails</p>
                                </div>
                                <div className='flex gap-4 mt-4'>
                                    <p className='bg-gray-700 w-fit p-2 rounded-xl'>NodeJS</p>
                                    <p className='bg-gray-700 w-fit p-2 rounded-xl'>Shopify</p>
                                    <p className='bg-gray-700 w-fit p-2 rounded-xl'>Webflow</p>
                                </div>
                                <div className='flex gap-4 mt-4'>
                                    <p className='bg-gray-700 w-fit p-2 rounded-xl'>Wordpress</p>

                                </div>

                            </div>
                        </div>
                    </motion.div>

                    {/* Black div at the bottom */}
                    <div className='absolute bg-black h-[11em] w-full bottom-0 z-20' />
                </motion.div>



                <motion.div
                    className='relative rounded-xl overflow-hidden group'
                >
                    {/* Image Section */}
                    <motion.div
                        className='w-full h-[300px] overflow-hidden'
                        whileHover={{ scale: 1.1 }} // Enlarge image on hover
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <Image
                            src={line5}
                            alt="line"
                            width={900}
                            height={900}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </motion.div>

                    {/* Text Section Container */}
                    <motion.div
                        className='relative z-10 transition-all duration-500 group-hover:-translate-y-[120px]'
                    >
                        <div className='p-5 bg-gray-900 rounded-b-xl'>
                            <h1 className='text-[2em] font-bold'>Mobile Development</h1>
                            <p className='text-gray-400 mt-5'>
                            Native iOS, Android & Hybrid Mobile Apps, Wearables & IoT
                            </p>
                            {/* Points Section */}
                            <div className=' gap-4 mt-12'>
                                <div className='flex gap-4'>
                                    <p className='bg-gray-700 w-fit p-2 rounded-xl'>iOS</p>
                                    <p className='bg-gray-700 w-fit p-2 rounded-xl'>Kotlin</p>
                                    <p className='bg-gray-700 w-fit p-2 rounded-xl'>ReactNative</p>
                                </div>
                                <div className='flex gap-4 mt-4'>
                                    <p className='bg-gray-700 w-fit p-2 rounded-xl'>Flutter</p>
                                    
                                </div>
                      

                            </div>
                        </div>
                    </motion.div>

                    {/* Black div at the bottom */}
                    <div className='absolute bg-black h-[11em] w-full bottom-0 z-20' />
                </motion.div>




                
                <motion.div
                    className='relative rounded-xl overflow-hidden group'
                >
                    {/* Image Section */}
                    <motion.div
                        className='w-full h-[300px] overflow-hidden'
                        whileHover={{ scale: 1.1 }} // Enlarge image on hover
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <Image
                            src={line6}
                            alt="line"
                            width={900}
                            height={900}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </motion.div>

                    {/* Text Section Container */}
                    <motion.div
                        className='relative z-10 transition-all duration-500 group-hover:-translate-y-[170px]'
                    >
                        <div className='p-5 bg-gray-900 rounded-b-xl'>
                            <h1 className='text-[2em] font-bold'>UX/UI Design</h1>
                            <p className='text-gray-400 mt-5'>
                            User Research, Wireframes, Prototypes & User Validation 
                            </p>
                            {/* Points Section */}
                            <div className=' gap-4 mt-12'>
                                <div className='flex gap-4'>
                                    <p className='bg-gray-700 w-fit p-2 rounded-xl'>Figma</p>
                                    <p className='bg-gray-700 w-fit p-2 rounded-xl'>Adobe InDesigh</p>
                                </div>
                                <div className='flex gap-4 mt-4'>
                                    <p className='bg-gray-700 w-fit p-2 rounded-xl'>Material Design</p>
                                    <p className='bg-gray-700 w-fit p-2 rounded-xl'>Tailwind</p>
                                </div>
                                <p className='bg-gray-700 w-fit p-2 rounded-xl mt-4'>Sketch</p>

                            </div>
                        </div>
                    </motion.div>

                    {/* Black div at the bottom */}
                    <div className='absolute bg-black h-[11em] w-full bottom-0 z-20' />
                </motion.div>

            </div>
        </div>
    );
};

export default Capabilities;
