"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isServicedropdownOpen, setIsServicedropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const capabilitiesRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  const toggleCapabilitiesDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
    setIsServicedropdownOpen(false);
  };

  const toggleServicesDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsServicedropdownOpen((prev) => !prev);
    setIsDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    setIsDropdownOpen(false);
    setIsServicedropdownOpen(false);
  };

  const closeAll = () => {
    setIsDropdownOpen(false);
    setIsServicedropdownOpen(false);
    setIsMobileMenuOpen(false);
  };


 

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       capabilitiesRef.current &&
  //       !capabilitiesRef.current.contains(event.target as Node) &&
  //       isDropdownOpen
  //     ) {
  //       setIsDropdownOpen(false);
  //     }
  //     if (
  //       servicesRef.current &&
  //       !servicesRef.current.contains(event.target as Node) &&
  //       isServicedropdownOpen
  //     ) {
  //       setIsServicedropdownOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, [isDropdownOpen, isServicedropdownOpen]);

  useEffect(() => {
    const updateDropdownStyles = () => {
      if (navbarRef.current) {
        const navbarWidth = navbarRef.current.offsetWidth;
        const windowWidth = window.innerWidth;
        const leftPosition = (windowWidth - navbarWidth) / 2;

        [capabilitiesRef, servicesRef].forEach((ref) => {
          if (ref.current) {
            ref.current.style.width = `${navbarWidth}px`;
            ref.current.style.left = `${leftPosition}px`;
          }
        });
      }
    };

    updateDropdownStyles();
    window.addEventListener("resize", updateDropdownStyles);
    return () => window.removeEventListener("resize", updateDropdownStyles);
  }, [isDropdownOpen, isServicedropdownOpen]);

  return (
    <div className="fixed top-0 left-0 w-full lg:px-[5em] z-[999] bg-black">
      <div ref={navbarRef} className="flex justify-between items-center px-4 py-2 md:px-10 lg:px-20">
        <Link href="/" onClick={closeAll}>
          <div className="">
            <Image
              src="https://cdn.prod.website-files.com/63f902d79a33f71d496cde07/66e44bace2a664b42ac8c794_RS-Logo.png"
              alt="logo"
              width={900}
              height={900}
              className="h-[1.2em] w-auto md:h-[1em]"
            />
          </div>
        </Link>



        <div className="hidden lg:flex lg:items-center lg:gap-10">
          <ul className="flex gap-4 lg:gap-10">
            <li
              className="text-[14px] lg:text-[14px] cursor-pointer hover:text-[#f6ff7a] transition-colors"
              onClick={toggleCapabilitiesDropdown}
            >
              Capabilities
            </li>
            <li
              className="text-[14px] lg:text-[14px] cursor-pointer hover:text-[#f6ff7a] transition-colors"
              onClick={toggleServicesDropdown}
            >
              Services
            </li>
            <Link href="/Portfolio" onClick={closeAll}>
              <li className="text-[14px] lg:text-[14px] cursor-pointer hover:text-[#f6ff7a] transition-colors">
                Portfolio
              </li>
            </Link>
            <Link href="/About" onClick={closeAll}>
              <li className="text-[14px] lg:text-[14px] cursor-pointer hover:text-[#f6ff7a] transition-colors">
                About
              </li>
            </Link>
           <Link href={"/Blog"}>
           <li className="text-[14px] lg:text-[14px] cursor-pointer hover:text-[#f6ff7a] transition-colors">
              Blog
            </li>
           </Link>
          <Link href={"/Hiring"}>
          <li className="text-[14px] lg:text-[14px] cursor-pointer hover:text-[#f6ff7a] transition-colors">
              Hiring!
            </li>
          </Link>
          </ul>
          <button className="text-[16px] lg:text-[15px] bg-[#f6ff7a] text-black px-2 py-1 lg:px-4 lg:py-2 rounded-lg cursor-pointer hover:bg-[#f6ff7a]/80 transition-colors">
            Get in Touch ➔
          </button>
        </div>

        <div className="lg:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-white text-2xl focus:outline-none"
          >
            ☰
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-black border-t border-gray-800">
          <ul className="flex flex-col items-center gap-4 py-4">
            <li
              className="text-[16px] cursor-pointer hover:text-[#f6ff7a] transition-colors"
              onClick={toggleCapabilitiesDropdown}
            >
              Capabilities
            </li>
            <li
              className="text-[16px] cursor-pointer hover:text-[#f6ff7a] transition-colors"
              onClick={toggleServicesDropdown}
            >
              Services
            </li>
            <Link href="/Portfolio" onClick={closeAll}>
              <li className="text-[16px] cursor-pointer hover:text-[#f6ff7a] transition-colors">
                Portfolio
              </li>
            </Link>
            <Link href="/About" onClick={closeAll}>
              <li className="text-[16px] cursor-pointer hover:text-[#f6ff7a] transition-colors">
                About
              </li>
            </Link>
            <Link href={"/Blog"}>
            <li className="text-[16px] cursor-pointer hover:text-[#f6ff7a] transition-colors">
              Blog
            </li>
            </Link>
            <li className="text-[16px] cursor-pointer hover:text-[#f6ff7a] transition-colors">
              Hiring!
            </li>
            <button className="text-[16px] bg-[#f6ff7a] text-black px-4 py-2 rounded-lg hover:bg-[#f6ff7a]/80 transition-colors">
              Get in Touch ➔
            </button>
          </ul>
        </div>
      )}

      {isDropdownOpen && (
        <div
          ref={capabilitiesRef}
          className="fixed top-0 w-full h-full lg:hidden bg-gray-900 z-40 p-4 overflow-y-auto"
        >
          <div className="flex flex-col items-center justify-start h-full text-white relative">
            <button
              onClick={closeAll}
              className="absolute top-2 right-4 text-[24px] hover:text-[#f6ff7a] transition-colors"
              style={{ lineHeight: "1.5em" }}
            >
              ×
            </button>
            <div className="flex flex-col gap-6 w-full md:max-w-none mt-12">
              <Link href="/Ai"  onClick={(e) => { e.preventDefault(); closeAll(); window.location.href = "/Ai"; }} >
                <div className="bg-gray-800 p-4 rounded-lg flex items-center hover:bg-gray-700 transition-colors">
                  <Image src="/ai.svg" alt="AI" width={48} height={48} className="mr-4 object-cover w-12 h-12" />
                  <div>
                    <h1 className="text-[1.5em] font-bold">Artificial Intelligence</h1>
                    <p className="text-gray-400 mt-2">GenAI, Custom LLMs, Machine Learning & Computer Vision</p>
                  </div>
                </div>
              </Link>

              <Link href="/DE"  onClick={(e) => { e.preventDefault(); closeAll(); window.location.href = "/DE"; }}>
                <div className="bg-gray-800 p-4 rounded-lg flex items-center hover:bg-gray-700 transition-colors">
                  <Image src="/data.svg" alt="Data" width={48} height={48} className="mr-4 object-cover w-12 h-12" />
                  <div>
                    <h1 className="text-[1.5em] font-bold">Data Engineering</h1>
                    <p className="text-gray-400 mt-2">ETL & Storage, Visualization, Processing & Enrichment</p>
                  </div>
                </div>
              </Link>
              <Link href="/CI"  onClick={(e) => { e.preventDefault(); closeAll(); window.location.href = "/CI"; }}>
                <div className="bg-gray-800 p-4 rounded-lg flex items-center hover:bg-gray-700 transition-colors">
                  <Image
                    src="/cloud.svg"
                    alt="Cloud"
                    width={48}
                    height={48}
                    className="mr-4 object-cover w-12 h-12"
                  />
                  <div>
                    <h1 className="text-[1.5em] font-bold">Cloud Infrastructure</h1>
                    <p className="text-gray-400 mt-2">Infrastructure, DevOps, APIs, Automation & Scalability</p>
                  </div>
                </div>
              </Link>
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span>React</span>
                    <span>React Native</span>
                  </div>
                  <div className="flex justify-between">
                    <span>NodeJS</span>
                    <span>Ruby on Rails</span>
                  </div>
                </div>
              </div>
              <button className="bg-[#f6ff7a] text-black px-4 py-2 rounded-lg mt-auto hover:bg-[#f6ff7a]/80 transition-colors">
                Discover More →
              </button>
            </div>
          </div>
        </div>
      )}

      {isServicedropdownOpen && (
        <div
          ref={servicesRef}
          className="fixed top-0 w-full h-full lg:hidden bg-gray-900 z-40 p-4 overflow-y-auto"
        >
          <div className="flex flex-col h-full text-white relative">
            <button
              onClick={closeAll}
              className="absolute top-2 right-4 text-[24px] hover:text-[#f6ff7a] transition-colors"
              style={{ lineHeight: "1.5em" }}
            >
              ×
            </button>
            <div className="flex flex-col gap-6 w-full md:max-w-none mt-12 flex-1">
              <Link href="/StaffAugmentation" onClick={(e) => { e.preventDefault(); closeAll(); window.location.href = "/StaffAugmentation"; }}>
                <div className="bg-gray-800 p-4 rounded-lg flex items-center hover:bg-gray-700 transition-colors">
                  <Image
                    src="/serviceimg1.jpg"
                    alt="Staff"
                    width={48}
                    height={48}
                    className="mr-4 object-cover w-12 h-12"
                  />
                  <div>
                    <h1 className="text-[1.5em] font-bold">Staff Augmentation</h1>
                    <p className="text-gray-400 mt-2">
                      We staff senior engineers and engineering pods up to 50+ people, including PMs, QA, DevOps, and Design
                    </p>
                  </div>
                </div>
              </Link>
              <Link href="/ProductStudio" onClick={(e) => { e.preventDefault(); closeAll(); window.location.href = "/ProductStudio"; }}>
                <div className="bg-gray-800 p-4 rounded-lg flex items-center hover:bg-gray-700 transition-colors">
                  <Image
                    src="/serviceimg2.jpg"
                    alt="Product"
                    width={48}
                    height={48}
                    className="mr-4 object-cover w-12 h-12"
                  />
                  <div>
                    <h1 className="text-[1.5em] font-bold">Product Studio</h1>
                    <p className="text-gray-400 mt-2">
                      We staff embedded product teams with expert Product Managers, UI/UX Designers, Front-End, Backend, Data Engineers, and QA
                    </p>
                  </div>
                </div>
              </Link>
              <div className="flex items-center justify-center gap-4 mt-auto">
                <div className="h-full w-px bg-gray-700"></div>
                <button className="bg-[#f6ff7a] text-black px-4 py-2 rounded-lg hover:bg-[#f6ff7a]/80 transition-colors">
                  Discover More →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Large screen dropdowns */}
      {isDropdownOpen && (
        <div
          ref={capabilitiesRef}
          className="hidden lg:block absolute top-16 z-30 bg-gray-900 border border-gray-800 rounded-xl p-4 mt-2"
        >
          <div className="grid grid-cols-4 gap-4">
            <Link href="/Ai" onClick={closeAll}>
              <div className="p-2">
                <Image src="/ai.svg" alt="logo" width={300} height={300} className="w-full h-auto" />
                <h1 className="text-[1.5em] font-bold mt-2">Artificial Intelligence</h1>
                <p className="text-gray-400 mt-2">
                  GenAI, Custom LLMs, Machine Learning & Computer Vision
                </p>
              </div>
            </Link>
            <Link href="/DE" onClick={closeAll}>
              <div className="p-2">
                <Image src="/data.svg" alt="logo" width={300} height={300} className="w-full h-auto" />
                <h1 className="text-[1.5em] font-bold mt-2">Data Engineering</h1>
                <p className="text-gray-400 mt-2">
                  ETL & Storage, Visualization, Processing & Enrichment
                </p>
              </div>
            </Link>
            <Link href="/CI" onClick={closeAll}>
              <div className="p-2">
                <Image src="/cloud.svg" alt="logo" width={300} height={300} className="w-full h-auto" />
                <h1 className="text-[1.5em] font-bold mt-2">Cloud Infrastructure</h1>
                <p className="text-gray-400 mt-2">
                  Infrastructure, DevOps, APIs, Automation & Scalability
                </p>
              </div>
            </Link>
            <div className="flex flex-col items-start justify-between border-l border-gray-700 pl-5">
              <ul className="flex flex-col gap-2">
                <li>React</li>
                <li>React Native</li>
                <li>NodeJS</li>
                <li>Ruby on Rails</li>
              </ul>
              <div className="mt-2">
                <button className="bg-transparent text-[20px] text-[#f6ff7a] border p-2 rounded-xl">
                  Discover More →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isServicedropdownOpen && (
        <div
          ref={servicesRef}
          className="hidden lg:block absolute top-16 z-30 bg-gray-900 border border-gray-700 rounded-xl p-4 mt-2"
        >
          <div className="grid grid-cols-3 gap-4 min-h-[200px]">
            <Link href="/StaffAugmentation" onClick={closeAll}>
              <div className="p-2">
                <Image src="/serviceimg1.jpg" alt="logo" width={300} height={300} className="w-full h-auto" />
                <h1 className="text-[1.5em] font-bold mt-2">Staff Augmentation</h1>
                <p className="text-gray-400 mt-2">
                  We staff senior engineers and engineering pods up to 50+ people, including PMs, QA, DevOps, and Design
                </p>
              </div>
            </Link>
            <Link href="/ProductStudio" onClick={closeAll}>
              <div className="p-2">
                <Image src="/serviceimg2.jpg" alt="logo" width={300} height={300} className="w-full h-auto" />
                <h1 className="text-[1.5em] font-bold mt-2">Product Studio</h1>
                <p className="text-gray-400 mt-2">
                  We staff embedded product teams with expert Product Managers, UI/UX Designers, Front-End, Backend, Data Engineers, and QA
                </p>
              </div>
            </Link>
            <div className="flex flex-col p-0">
              <div className="flex items-center gap-4 h-full">
                <div className="h-full w-px bg-gray-700"></div>
                <button className="bg-transparent text-[20px] text-white border p-2 rounded-xl self-end">
                  Discover More →
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