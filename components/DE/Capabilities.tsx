import React from 'react';


const Capabilities = () => {
    return (
        <div className='mt-30 min-h-screen flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center justify-center gap-3'>
                <h1 className='text-[2.4em] font-bold'>Our Capabilities</h1>
                <p className='text-gray-400 text-[1.5em]'>We&apos;re proud to offer exceptional talent across a variety of digital disciplines.</p>
            </div>

            <div className="grid grid-cols-3 items-center justify-center gap-5 mt-20">
                <div
                    className="card h-[500px] w-[400px] group rounded-[1.5em] relative overflow-hidden transition-all duration-500"
                    style={{
                        backgroundImage: "url('/lineimg1.png')",
                        backgroundSize: 'cover', // Default size
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <div 
                        className="absolute inset-0 transition-all duration-500 group-hover:scale-110"
                        style={{
                            backgroundImage: "url('/lineimg1.png')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    ></div>

                    {/* Text content */}
                    <div className="flex flex-col items-center justify-end bg-gray-800 absolute bottom-0 right-0 p-6 z-10">
                        <div className="text-white font-nunito flex flex-col gap-4">
                            <h2 className="text-[2em] font-bold">
                                Artificial Intelligence
                            </h2>
                            <p className="text-lg">
                                Gen AI, Custom LLMs, Machine Learning & Computer Vision
                            </p>
                        </div>

                        {/* Hover section */}
                        <div className="relative overflow-hidden h-0 group-hover:h-[12em] transition-all duration-500 z-[2] w-full mt-10">
                            <div>
                                <ul className='flex flex-col items-start gap-4'>
                                    <div className='flex gap-3 items-center'>
                                        <li className='bg-gray-700 p-3 rounded-xl'>OpenAI</li>
                                        <li className='bg-gray-700 p-3 rounded-xl'>Claude</li>
                                        <li className='bg-gray-700 p-3 rounded-xl'>Llama</li>
                                    </div>
                                    <div className='flex gap-3 items-center'>
                                        <li className='bg-gray-700 p-3 rounded-xl'>LongChain</li>
                                        <li className='bg-gray-700 p-3 rounded-xl'>TensorFlow</li>
                                    </div>
                                    <div className='flex gap-3 items-center'>
                                        <li className='bg-gray-700 p-3 rounded-xl'>Python</li>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="card h-[500px] w-[400px] group rounded-[1.5em] relative overflow-hidden transition-all duration-500"
                    style={{
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <div 
                        className="absolute inset-0 transition-all duration-500 group-hover:scale-110"
                        style={{
                            backgroundImage: "url('/lineimg2.png')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    ></div>

                    {/* Text content */}
                    <div className="flex flex-col items-center justify-end bg-gray-800 absolute bottom-0 right-0 p-6 z-10">
                        <div className="text-white font-nunito flex flex-col gap-4">
                            <h2 className="text-[2em] font-bold">
                                Data
                            </h2>
                            <p className="text-lg">
                                ETL & Storage, Visualization, Processing & Enrichment
                            </p>
                        </div>

                        <div className="relative overflow-hidden h-0 group-hover:h-[12em] transition-all duration-500 z-[2] w-full mt-10">
                            <div>
                                <ul className='flex flex-col items-start gap-4'>
                                    <div className='flex gap-3 items-center'>
                                        <li className='bg-gray-700 p-3 rounded-xl'>AWS Redshift</li>
                                        <li className='bg-gray-700 p-3 rounded-xl'>Snowflake</li>
                                    </div>
                                    <div className='flex gap-3 items-center'>
                                        <li className='bg-gray-700 p-3 rounded-xl'>Databricks</li>
                                        <li className='bg-gray-700 p-3 rounded-xl'>Apache</li>
                                    </div>
                                    <div className='flex gap-3 items-center'>
                                        <li className='bg-gray-700 p-3 rounded-xl'>Google BigQuery</li>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="card h-[500px] w-[400px] group rounded-[1.5em] relative overflow-hidden transition-all duration-500"
                    style={{
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <div 
                        className="absolute inset-0 transition-all duration-500 group-hover:scale-110"
                        style={{
                            backgroundImage: "url('/lineimg3.png')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    ></div>

                    {/* Text content */}
                    <div className="flex flex-col items-center justify-end bg-gray-800 absolute bottom-0 right-0 p-6 z-10">
                        <div className="text-white font-nunito flex flex-col gap-4">
                            <h2 className="text-[2em] font-bold">
                                Cloud
                            </h2>
                            <p className="text-lg">
                                Infrastructure, DevOps, APIs Automation & Scalability
                            </p>
                        </div>

                        <div className="relative overflow-hidden h-0 group-hover:h-[12em] transition-all duration-500 z-[2] w-full mt-10">
                            <div>
                                <ul className='flex flex-col items-start gap-4'>
                                    <div className='flex gap-3 items-center'>
                                        <li className='bg-gray-700 p-3 rounded-xl'>AWS</li>
                                        <li className='bg-gray-700 p-3 rounded-xl'>Heroku</li>
                                        <li className='bg-gray-700 p-3 rounded-xl'>GCP</li>
                                    </div>
                                    <div className='flex gap-3 items-center'>
                                        <li className='bg-gray-700 p-3 rounded-xl'>Azure</li>
                                        <li className='bg-gray-700 p-3 rounded-xl'>Vercel</li>
                                    </div>
                                    <div className='flex gap-3 items-center'>
                                        <li className='bg-gray-700 p-3 rounded-xl'>Contentful</li>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="card h-[500px] w-[400px] group rounded-[1.5em] relative overflow-hidden transition-all duration-500"
                    style={{
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <div 
                        className="absolute inset-0 transition-all duration-500 group-hover:scale-110"
                        style={{
                            backgroundImage: "url('/lineimg4.png')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    ></div>

                    {/* Text content */}
                    <div className="flex flex-col items-center justify-end bg-gray-800 absolute bottom-0 right-0 p-6 z-10">
                        <div className="text-white font-nunito flex flex-col gap-4">
                            <h2 className="text-[2em] font-bold">
                                Web Development
                            </h2>
                            <p className="text-lg">
                                Content, Media & Video, Ecommerce, SaaS, & Websites
                            </p>
                        </div>

                        <div className="relative overflow-hidden h-0 group-hover:h-[15em] transition-all duration-500 z-[2] w-full mt-10">
                            <div>
                                <ul className='flex flex-col items-start gap-4'>
                                    <div className='flex gap-3 items-center'>
                                        <li className='bg-gray-700 p-3 rounded-xl'>React & NextJS</li>
                                    </div>
                                    <div className='flex gap-3 items-center'>
                                        <li className='bg-gray-700 p-3 rounded-xl'>Ruby on Rails</li>
                                    </div>
                                    <div className='flex gap-3 items-center'>
                                        <li className='bg-gray-700 p-3 rounded-xl'>NodeJS</li>
                                        <li className='bg-gray-700 p-3 rounded-xl'>Shopify</li>
                                    </div>
                                    <div className='flex gap-3 items-center'>
                                        <li className='bg-gray-700 p-3 rounded-xl'>Webflow</li>
                                        <li className='bg-gray-700 p-3 rounded-xl'>Wordpress</li>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="card h-[500px] w-[400px] group rounded-[1.5em] relative overflow-hidden transition-all duration-500"
                    style={{
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <div 
                        className="absolute inset-0 transition-all duration-500 group-hover:scale-110"
                        style={{
                            backgroundImage: "url('/lineimg5.png')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    ></div>

                    {/* Text content */}
                    <div className="flex flex-col items-center justify-end bg-gray-800 absolute bottom-0 right-0 p-6 z-10">
                        <div className="text-white font-nunito flex flex-col gap-4">
                            <h2 className="text-[2em] font-bold">
                                Mobile Development
                            </h2>
                            <p className="text-lg">
                                Native iOS, Android & Hybrid Mobile Apps, Wearables & IoT
                            </p>
                        </div>

                        <div className="relative overflow-hidden h-0 group-hover:h-[7em] transition-all duration-500 z-[2] w-full mt-10">
                            <div>
                                <ul className='flex flex-col items-start gap-4'>
                                    <div className='flex gap-3 items-center'>
                                        <li className='bg-gray-700 p-3 rounded-xl'>IOS</li>
                                        <li className='bg-gray-700 p-3 rounded-xl'>Kotlin</li>
                                    </div>
                                    <div className='flex gap-3 items-center'>
                                        <li className='bg-gray-700 p-3 rounded-xl'>React Native</li>
                                        <li className='bg-gray-700 p-3 rounded-xl'>Flutter</li>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="card h-[500px] w-[400px] group rounded-[1.5em] relative overflow-hidden transition-all duration-500"
                    style={{
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <div 
                        className="absolute inset-0 transition-all duration-500 group-hover:scale-110"
                        style={{
                            backgroundImage: "url('/lineimg6.png')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    ></div>

                    {/* Text content */}
                    <div className="flex flex-col items-center justify-end bg-gray-800 absolute bottom-0 right-0 p-6 z-10">
                        <div className="text-white font-nunito flex flex-col gap-4">
                            <h2 className="text-[2em] font-bold">
                                UX/UI Design
                            </h2>
                            <p className="text-lg">
                                User Research, Wireframes, Prototypes & User Validation
                            </p>
                        </div>

                        <div className="relative overflow-hidden h-0 group-hover:h-[12em] transition-all duration-500 z-[2] w-full mt-10">
                            <div>
                                <ul className='flex flex-col items-start gap-4'>
                                    <div className='flex gap-3 items-center'>
                                        <li className='bg-gray-700 p-3 rounded-xl'>Figma</li>
                                        <li className='bg-gray-700 p-3 rounded-xl'>Adobe InDesign</li>
                                    </div>
                                    <div className='flex gap-3 items-center'>
                                        <li className='bg-gray-700 p-3 rounded-xl'>Material Design</li>
                                        <li className='bg-gray-700 p-3 rounded-xl'>Tailwind</li>
                                    </div>
                                    <div className='flex gap-3 items-center'>
                                        <li className='bg-gray-700 p-3 rounded-xl'>Sketch</li>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Capabilities;