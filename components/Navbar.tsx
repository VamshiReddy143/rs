"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isServicedropdownOpen, setIsServicedropdownOpen] = useState(false);

  // Handler for Capabilities click
  const handleCapabilitiesClick = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle Capabilities dropdown
    setIsServicedropdownOpen(false); // Close Services dropdown
  };

  // Handler for Services click
  const handleServicesClick = () => {
    setIsServicedropdownOpen(!isServicedropdownOpen); // Toggle Services dropdown
    setIsDropdownOpen(false); // Close Capabilities dropdown
  };

  return (
    <div className="fixed top-0 left-0 w-full z-[999] bg-black">
      {/* Navbar container with padding */}
      <div className="flex justify-between items-center mt-5 px-20 py-2">
        <Link href={"/"}>
          <div>
            <Image
              src="https://cdn.prod.website-files.com/63f902d79a33f71d496cde07/66e44bace2a664b42ac8c794_RS-Logo.png"
              alt="logo"
              width={900}
              height={900}
              className="h-[1.5em] w-auto"
            />
          </div>
        </Link>
        <div className="flex gap-10 items-center">
          <ul className="flex gap-6">
            <li
              className="text-[17px] cursor-pointer hover:text-[#f6ff7a]"
              onClick={handleCapabilitiesClick}
            >
              Capabilities
            </li>
            <li
              className="text-[17px] cursor-pointer hover:text-[#f6ff7a]"
              onClick={handleServicesClick}
            >
              Services
            </li>
            <li className="text-[17px] cursor-pointer hover:text-[#f6ff7a]">Portfolio</li>
            <li className="text-[17px] cursor-pointer hover:text-[#f6ff7a]">About</li>
            <li className="text-[17px] cursor-pointer hover:text-[#f6ff7a]">Blog</li>
            <li className="text-[17px] cursor-pointer hover:text-[#f6ff7a]">Hiring!</li>
          </ul>
          <button className="text-[20px] bg-[#f6ff7a] text-black px-3 py-2 rounded-xl cursor-pointer hover:bg-[#f6ff7a]/80">
            Get in Touch ➔
          </button>
        </div>
      </div>

      {/* Capabilities Dropdown */}
      {isDropdownOpen && (
        <div
          className="absolute top-20 z-30 bg-gray-900 border-[1px] border-gray-800 rounded-xl pb-10 mt-2"
          style={{
            left: '5rem',
            right: '5rem',
          }}
        >
          <div className="grid grid-cols-4 gap-5">
            <Link href={"/Ai"}>
              <div>
                <Image src="/ai.svg" alt="logo" width={900} height={900} className="" />
                <div className="p-2">
                  <h1 className="text-[1.5em] font-bold mt-5">Artificial Intelligence</h1>
                  <p className="text-gray-400 mt-5">GenAI, Custom LLMs, Machine Learning & Computer Vision</p>
                </div>
              </div>
            </Link>

            <Link href={"/DE"}>
              <div>
                <Image src="/data.svg" alt="logo" width={900} height={900} className="" />
                <div className="p-2">
                  <h1 className="text-[1.5em] font-bold mt-5">Data Engineering</h1>
                  <p className="text-gray-400 mt-5">ETL & Storage Visualization, Processing & Enrichment</p>
                </div>
              </div>
            </Link>

            <Link href={"/CI"}>
              <div>
                <Image src="/cloud.svg" alt="logo" width={900} height={900} className="" />
                <div className="p-2">
                  <h1 className="text-[1.5em] font-bold mt-5">Cloud Infrastructure</h1>
                  <p className="text-gray-400 mt-5">Infrastructure DevOps, APIs, Automation & Scalability</p>
                </div>
              </div>
            </Link>

            <div className="flex flex-col items-start justify-between border-l border-gray-700 pl-5">
              <ul className="flex flex-col gap-2">
                <li>React</li>
                <li>React Native</li>
                <li>NodeJS</li>
                <li>Ruby on Rails</li>
              </ul>
              <div>
                <button className="bg-transparent text-[20px] text-[#f6ff7a] border p-2 rounded-xl">
                  Discover More ➔
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Services Dropdown */}
      {isServicedropdownOpen && (
        <div
          className="absolute top-20 z-30 bg-gray-900 border-[1px] border-gray-700 rounded-xl pb-10 mt-2"
          style={{
            left: '5rem',
            right: '5rem',
          }}
        >
          <div className="grid grid-cols-3 gap-5">
            <Link href={"/StaffAugmentation"}>
              <div>
                <Image src="/serviceimg1.jpg" alt="logo" width={900} height={900} className="" />
                <div className="p-2">
                  <h1 className="text-[1.5em] font-bold mt-5">Staff Augmentation</h1>
                  <p className="text-gray-400 mt-5">
                    We staff senior engineers and engineering pods up to 50+ people, including PMs, QA, DevOps, and Design
                  </p>
                </div>
              </div>
            </Link>

            <Link href={"/ProductStudio"}>
              <div>
                <Image src="/serviceimg2.jpg" alt="logo" width={900} height={900} className="" />
                <div className="p-2">
                  <h1 className="text-[1.5em] font-bold mt-5">Product Studio</h1>
                  <p className="text-gray-400 mt-5">
                    We staff embedded product teams with expert Product Managers, UI/UX Designers, Front-End, Backend, Data Engineers, and QA
                  </p>
                </div>
              </div>
            </Link>

            <div className="flex flex-col items-start justify-between border-l border-gray-700 pl-5">
              <div className=''>
                <button className="bg-transparent absolute bottom-10 text-[20px] text-white border p-2 rounded-xl">
                  Discover More ➔
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;