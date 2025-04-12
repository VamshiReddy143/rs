



"use client";

import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const Clients = () => {
    // Sample data for 5 clients
    const clients = [
        {
            image: "/client1.png",
            testimonial:
                "Since I joined the company, I feel that I have been experiencing constant learning, from the internal talks provided within the company to the continuous code reviews I receive from my colleagues.",
            name: "Belen Iglesias",
            role: "Engineering Lead",
        },
        {
            image: "/client2.png",
            testimonial:
                "Started out as a back-end Junior developer 8 years ago, and now I am an Engineering Manager. I can't just say this is the company I work for; it's the place where I get to work with many of my closest friends and the smartest people I've met, growing both personally and professionally together.",
            name: "John Doe",
            role: "Senior Developer",
        },
        {
            image: "/client3.png",
            testimonial:
                "I choose Rootstrap because it pursues technical excellence and outstanding client service, and it also provides a unique environment for us to thrive, professionally and personally. The culture, the values, people around actually cares, it’s not just a slogan.",
            name: "Jane Smith",
            role: "Product Manager",
        },
        {
            image: "/client4.png",
            testimonial:
                "I empathize with Rootstrap’s values. I work in a company that allows me to be authentic, surrounded by people who care for my well-being, and provides ample opportunities for personal growth and learning. And all this while enjoying the process.",
            name: "Alice Johnson",
            role: "UX Designer",
        },

        {
            image: "/client5.png",
            testimonial:
                "I empathize with Rootstrap’s values. I work in a company that allows me to be authentic, surrounded by people who care for my well-being, and provides ample opportunities for personal growth and learning. And all this while enjoying the process.",
            name: "Alice Johnson",
            role: "UX Designer",
        },

        {
            image: "/client6.png",
            testimonial:
                "I've always felt the support of the company and my coworkers whenever I wanted to achieve something. It was here that I started getting involved with the Ruby community, which resulted in contributing to the Rails framework, attending conferences, and being a speaker at RailsConf.",
            name: "Santiago Bartesaghi",
            role: "Architect",
        },

        {
            image: "/client7.png",
            testimonial:
                "I empathize with Rootstrap’s values. I work in a company that allows me to be authentic, surrounded by people who care for my well-being, and provides ample opportunities for personal growth and learning. And all this while enjoying the process.",
            name: "Alice Johnson",
            role: "UX Designer",
        },

    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-scroll every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % clients.length);
        }, 3000);

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [clients.length]);

    // Handle arrow button clicks
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % clients.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? clients.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="bg-gray-300 lg:px-[10%] px-2 text-black  py-[5%] mb-10">
            {/* Carousel Container */}
            <div className="relative overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                >
                    {clients.map((client, index) => (
                        <div
                            key={index}
                            className="w-full flex flex-col lg:flex-row md:flex-col lg:items-center md:items-start justify-center gap-7 min-w-[100%]"
                        >
                            <div className='flex items-center justify-between md:ml-10 lg:ml-0'>
                               <div className='lg:h-[20em] lg:w-[20em] h-[8em] w-[8em]'>
                               <Image
                                    src={client.image}
                                    width={800}
                                    height={800}
                                    alt="team"
                                    className="rounded-full   object-cover"
                                />
                               </div>

                                <div className="flex gap-7 mt-10 md:hidden items-center ml-10">
                                    <button onClick={handlePrev}>
                                        <Image
                                            src="/leftarrow.png"
                                            width={900}
                                            height={900}
                                            alt="left arrow"
                                            className="h-[4em] w-[4em] border-2 border-gray-400 p-2 cursor-pointer"
                                        />
                                    </button>
                                    <button onClick={handleNext}>
                                        <Image
                                            src="/rightarrow.png"
                                            width={900}
                                            height={900}
                                            alt="right arrow"
                                            className="h-[4em] w-[4em] border-2 border-gray-400 p-2 rotate-180 cursor-pointer"
                                        />
                                    </button>
                                </div>
                            </div>
                            <div className='md:ml-10 lg:ml-0'>
                                <p className="lg:text-[1.6em] text-[1.2em] mt-5 lg:mt-0 font-semibold">
                                    {client.testimonial}
                                </p>
                                <div className="mt-5">
                                    <h2 className="text-[1.6em]">{client.name}</h2>
                                    <p className="text-[1.2em]">{client.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Arrow Buttons */}
            <div className="md:flex gap-7 mt-10 hidden   items-center ml-10">
                <button onClick={handlePrev}>
                    <Image
                        src="/leftarrow.png"
                        width={900}
                        height={900}
                        alt="left arrow"
                        className="h-[5em] w-[5em] border-2 border-black p-2 cursor-pointer"
                    />
                </button>
                <button onClick={handleNext}>
                    <Image
                        src="/rightarrow.png"
                        width={900}
                        height={900}
                        alt="right arrow"
                        className="h-[5em] w-[5em] border-2 border-black p-2 rotate-180 cursor-pointer"
                    />
                </button>
            </div>
        </div>
    );
};

export default Clients;



