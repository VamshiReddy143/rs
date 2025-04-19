
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
    setIsMobileMenuOpen(false); // Close mobile menu when opening dropdown
  };

  const toggleServicesDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsServicedropdownOpen((prev) => !prev);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false); // Close mobile menu when opening dropdown
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

  const goBackToMobileMenu = () => {
    setIsDropdownOpen(false);
    setIsServicedropdownOpen(false);
    setIsMobileMenuOpen(true); // Reopen mobile menu
  };

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
    <div className="fixed top-0 left-0 z-[999] bg-[#191a1b] w-full">
      <div ref={navbarRef} className="lg:max-w-[90em] lg:mx-auto px-3 lg:px-[6em] flex justify-between items-center py-5">
        <Link href="/" onClick={closeAll} className="hidden md:block">
          <div className="hidden md:block">
            <Image
              src="https://cdn.prod.website-files.com/63f902d79a33f71d496cde07/66e44bace2a664b42ac8c794_RS-Logo.png"
              alt="logo"
              width={900}
              height={900}
              className="h-[1.2em] w-auto md:h-[18px] hidden md:block"
            />
          </div>
        </Link>
        <Link href="/" onClick={closeAll}>
          <div className="md:hidden">
            <svg width={50} height={30} viewBox="0 0 99 37" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M90.5376 0L63.5253 26.7557C60.8408 19.6916 55.7584 13.7731 49.1498 10.0152C42.5413 6.25735 34.8185 4.89445 27.3061 6.16028C19.7938 7.42614 12.9604 11.2419 7.97807 16.9528C2.99576 22.6639 0.175105 29.9142 0 37.46H11.4703C11.6784 32.1123 13.9238 27.0413 17.7547 23.2676C21.5855 19.4937 26.7174 17.2975 32.1175 17.1207C37.5174 16.9439 42.7845 18.7998 46.8587 22.3147C50.9327 25.8297 53.5114 30.7427 54.0755 36.0651L53.9632 36.1965H54.1061C54.1061 36.6312 54.1776 37.4094 54.1878 37.4094H68.7093L98.5789 7.9145L90.5376 0Z"
                fill="#ffffff"
              />
              <path
                d="M94.9736 30.231C95.669 30.231 96.2852 30.3872 96.822 30.6997C97.3711 31.0122 97.7981 31.4448 98.1031 31.9977C98.4204 32.5505 98.579 33.1695 98.579 33.8545C98.579 34.5396 98.4204 35.1585 98.1031 35.7114C97.7981 36.2522 97.3711 36.6789 96.822 36.9914C96.2852 37.3038 95.669 37.4601 94.9736 37.4601C94.2781 37.4601 93.6559 37.3038 93.1068 36.9914C92.5578 36.6789 92.1246 36.2522 91.8074 35.7114C91.5024 35.1585 91.3499 34.5396 91.3499 33.8545C91.3499 33.1695 91.5024 32.5505 91.8074 31.9977C92.1246 31.4448 92.5578 31.0122 93.1068 30.6997C93.6559 30.3872 94.2781 30.231 94.9736 30.231ZM94.9736 36.8652C95.852 36.8652 96.5597 36.5827 97.0966 36.0179C97.6456 35.453 97.9201 34.7319 97.9201 33.8545C97.9201 32.9772 97.6456 32.2561 97.0966 31.6912C96.5597 31.1263 95.852 30.8439 94.9736 30.8439C94.0829 30.8439 93.363 31.1263 92.814 31.6912C92.2771 32.2561 92.0087 32.9772 92.0087 33.8545C92.0087 34.7319 92.2771 35.453 92.814 36.0179C93.363 36.5827 94.0829 36.8652 94.9736 36.8652ZM96.5658 33.0613C96.5658 33.3618 96.4804 33.6142 96.3096 33.8185C96.1388 34.0108 95.9008 34.137 95.5958 34.1971L96.6939 35.7474L95.7605 35.7655L94.7539 34.2331H94.333V35.7655H93.546V31.8895H95.2481C95.6507 31.8895 95.968 31.9977 96.1998 32.214C96.4438 32.4183 96.5658 32.7008 96.5658 33.0613ZM94.333 33.5841H95.1932C95.364 33.5841 95.5043 33.5421 95.6141 33.4579C95.7239 33.3738 95.7788 33.2476 95.7788 33.0793C95.7788 32.9111 95.7239 32.7909 95.6141 32.7188C95.5043 32.6347 95.364 32.5926 95.1932 32.5926H94.333V33.5841Z"
                fill="#ffffff"
              />
            </svg>
          </div>
        </Link>

        <div className="hidden lg:flex lg:items-center lg:gap-10">
          <ul className="flex gap-4 lg:gap-5">
            <li
              className="text-[14px] font-semibold lg:text-[14px] cursor-pointer hover:text-[#f6ff7a] transition-colors"
              onClick={toggleCapabilitiesDropdown}
            >
              Capabilities
            </li>
            <li
              className="text-[14px] font-semibold lg:text-[14px] cursor-pointer hover:text-[#f6ff7a] transition-colors"
              onClick={toggleServicesDropdown}
            >
              Services
            </li>
            <Link href="/Portfolio" onClick={closeAll}>
              <li className="text-[14px] font-semibold lg:text-[14px] cursor-pointer hover:text-[#f6ff7a] transition-colors">
                Portfolio
              </li>
            </Link>
            <Link href="/About" onClick={closeAll}>
              <li className="text-[14px] font-semibold lg:text-[14px] cursor-pointer hover:text-[#f6ff7a] transition-colors">
                About
              </li>
            </Link>
            <Link href="/Blog" onClick={closeAll}>
              <li className="text-[14px] font-semibold lg:text-[14px] cursor-pointer hover:text-[#f6ff7a] transition-colors">
                Blog
              </li>
            </Link>
            <Link href="/Hiring" onClick={closeAll}>
              <li className="text-[14px] font-semibold lg:text-[14px] text-[#f6ff7a] cursor-pointer hover:text-[#f6ff7a] transition-colors">
                Hiring!
              </li>
            </Link>
          </ul>
          <Link href="/Contact" onClick={closeAll}>
            <button className="text-[16px] lg:text-[15px] bg-[#f6ff7a] text-black px-2 py-1 lg:px-4 lg:py-2 rounded-lg cursor-pointer hover:bg-[#f6ff7a]/80 transition-colors">
              Get in Touch ➔
            </button>
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <div>
            <Link href="/Contact" onClick={closeAll}>
              <button className="text-[16px] lg:text-[15px] bg-[#f6ff7a] text-black px-2 py-1 lg:px-4 lg:py-2 rounded-lg cursor-pointer hover:bg-[#f6ff7a]/80 transition-colors">
                Get in Touch ➔
              </button>
            </Link>
          </div>
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-white text-3xl focus:outline-none z-[1000]"
            >
              {isMobileMenuOpen ? '' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed top-0 left-0 w-full h-full bg-[#191a1b] z-50 flex p-1 flex-col">
          <div className="relative p-5">
            <Link href="/" onClick={closeAll}>
              <div className="absolute top-2 left-4 z-[1001]">
                <svg width={56} height={30} viewBox="0 0 99 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M90.5376 0L63.5253 26.7557C60.8408 19.6916 55.7584 13.7731 49.1498 10.0152C42.5413 6.25735 34.8185 4.89445 27.3061 6.16028C19.7938 7.42614 12.9604 11.2419 7.97807 16.9528C2.99576 22.6639 0.175105 29.9142 0 37.46H11.4703C11.6784 32.1123 13.9238 27.0413 17.7547 23.2676C21.5855 19.4937 26.7174 17.2975 32.1175 17.1207C37.5174 16.9439 42.7845 18.7998 46.8587 22.3147C50.9327 25.8297 53.5114 30.7427 54.0755 36.0651L53.9632 36.1965H54.1061C54.1061 36.6312 54.1776 37.4094 54.1878 37.4094H68.7093L98.5789 7.9145L90.5376 0Z"
                    fill="#ffffff"
                  />
                  <path
                    d="M94.9736 30.231C95.669 30.231 96.2852 30.3872 96.822 30.6997C97.3711 31.0122 97.7981 31.4448 98.1031 31.9977C98.4204 32.5505 98.579 33.1695 98.579 33.8545C98.579 34.5396 98.4204 35.1585 98.1031 35.7114C97.7981 36.2522 97.3711 36.6789 96.822 36.9914C96.2852 37.3038 95.669 37.4601 94.9736 37.4601C94.2781 37.4601 93.6559 37.3038 93.1068 36.9914C92.5578 36.6789 92.1246 36.2522 91.8074 35.7114C91.5024 35.1585 91.3499 34.5396 91.3499 33.8545C91.3499 33.1695 91.5024 32.5505 91.8074 31.9977C92.1246 31.4448 92.5578 31.0122 93.1068 30.6997C93.6559 30.3872 94.2781 30.231 94.9736 30.231ZM94.9736 36.8652C95.852 36.8652 96.5597 36.5827 97.0966 36.0179C97.6456 35.453 97.9201 34.7319 97.9201 33.8545C97.9201 32.9772 97.6456 32.2561 97.0966 31.6912C96.5597 31.1263 95.852 30.8439 94.9736 30.8439C94.0829 30.8439 93.363 31.1263 92.814 31.6912C92.2771 32.2561 92.0087 32.9772 92.0087 33.8545C92.0087 34.7319 92.2771 35.453 92.814 36.0179C93.363 36.5827 94.0829 36.8652 94.9736 36.8652ZM96.5658 33.0613C96.5658 33.3618 96.4804 33.6142 96.3096 33.8185C96.1388 34.0108 95.9008 34.137 95.5958 34.1971L96.6939 35.7474L95.7605 35.7655L94.7539 34.2331H94.333V35.7655H93.546V31.8895H95.2481C95.6507 31.8895 95.968 31.9977 96.1998 32.214C96.4438 32.4183 96.5658 32.7008 96.5658 33.0613ZM94.333 33.5841H95.1932C95.364 33.5841 95.5043 33.5421 95.6141 33.4579C95.7239 33.3738 95.7788 33.2476 95.7788 33.0793C95.7788 32.9111 95.7239 32.7909 95.6141 32.7188C95.5043 32.6347 95.364 32.5926 95.1932 32.5926H94.333V33.5841Z"
                    fill="#ffffff"
                  />
                </svg>
              </div>
            </Link>
            <button
              onClick={toggleMobileMenu}
              className="absolute top-2 right-4 text-3xl text-white hover:text-[#f6ff7a] transition-colors z-[1001]"
            >
              ×
            </button>
          </div>
          <ul className="flex flex-col font-semibold items-center justify-center gap-3 text-white flex-1">
            <li
              className="text-[22px] cursor-pointer hover:text-[#f6ff7a] transition-colors"
              onClick={toggleCapabilitiesDropdown}
            >
              Capabilities
            </li>
            <li
              className="text-[22px] cursor-pointer hover:text-[#f6ff7a] transition-colors"
              onClick={toggleServicesDropdown}
            >
              Services
            </li>
            <Link href="/Portfolio" onClick={closeAll}>
              <li className="text-[22px] cursor-pointer hover:text-[#f6ff7a] transition-colors">
                Portfolio
              </li>
            </Link>
            <Link href="/About" onClick={closeAll}>
              <li className="text-[22px] cursor-pointer hover:text-[#f6ff7a] transition-colors">
                About
              </li>
            </Link>
            <Link href="/Blog" onClick={closeAll}>
              <li className="text-[22px] cursor-pointer hover:text-[#f6ff7a] transition-colors">
                Blog
              </li>
            </Link>
            <Link href="/Hiring" onClick={closeAll}>
              <li className="text-[22px] cursor-pointer text-[#f6ff7a] hover:text-[#f6ff7a] transition-colors">
                Hiring!
              </li>
            </Link>
            <Link href="/Contact" onClick={closeAll}>
              <button className="text-[16px] bg-[#f6ff7a] text-black px-4 py-2 rounded-lg hover:bg-[#f6ff7a]/80 transition-colors cursor-pointer">
                Get in Touch  ➔
              </button>
            </Link>
          </ul>
        </div>
      )}

      {isDropdownOpen && (
        <div
          ref={capabilitiesRef}
          className="fixed top-0 w-full h-full bg-[#191a1b] lg:hidden  z-[1000] p-2 overflow-y-auto"
        >
          <div className="flex flex-col h-full text-white relative">
            <Link href="/" onClick={closeAll}>
              <div className="absolute top-2 left-4 z-[1001]">
                <svg width={55} height={30} viewBox="0 0 99 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M90.5376 0L63.5253 26.7557C60.8408 19.6916 55.7584 13.7731 49.1498 10.0152C42.5413 6.25735 34.8185 4.89445 27.3061 6.16028C19.7938 7.42614 12.9604 11.2419 7.97807 16.9528C2.99576 22.6639 0.175105 29.9142 0 37.46H11.4703C11.6784 32.1123 13.9238 27.0413 17.7547 23.2676C21.5855 19.4937 26.7174 17.2975 32.1175 17.1207C37.5174 16.9439 42.7845 18.7998 46.8587 22.3147C50.9327 25.8297 53.5114 30.7427 54.0755 36.0651L53.9632 36.1965H54.1061C54.1061 36.6312 54.1776 37.4094 54.1878 37.4094H68.7093L98.5789 7.9145L90.5376 0Z"
                    fill="#ffffff"
                  />
                  <path
                    d="M94.9736 30.231C95.669 30.231 96.2852 30.3872 96.822 30.6997C97.3711 31.0122 97.7981 31.4448 98.1031 31.9977C98.4204 32.5505 98.579 33.1695 98.579 33.8545C98.579 34.5396 98.4204 35.1585 98.1031 35.7114C97.7981 36.2522 97.3711 36.6789 96.822 36.9914C96.2852 37.3038 95.669 37.4601 94.9736 37.4601C94.2781 37.4601 93.6559 37.3038 93.1068 36.9914C92.5578 36.6789 92.1246 36.2522 91.8074 35.7114C91.5024 35.1585 91.3499 34.5396 91.3499 33.8545C91.3499 33.1695 91.5024 32.5505 91.8074 31.9977C92.1246 31.4448 92.5578 31.0122 93.1068 30.6997C93.6559 30.3872 94.2781 30.231 94.9736 30.231ZM94.9736 36.8652C95.852 36.8652 96.5597 36.5827 97.0966 36.0179C97.6456 35.453 97.9201 34.7319 97.9201 33.8545C97.9201 32.9772 97.6456 32.2561 97.0966 31.6912C96.5597 31.1263 95.852 30.8439 94.9736 30.8439C94.0829 30.8439 93.363 31.1263 92.814 31.6912C92.2771 32.2561 92.0087 32.9772 92.0087 33.8545C92.0087 34.7319 92.2771 35.453 92.814 36.0179C93.363 36.5827 94.0829 36.8652 94.9736 36.8652ZM96.5658 33.0613C96.5658 33.3618 96.4804 33.6142 96.3096 33.8185C96.1388 34.0108 95.9008 34.137 95.5958 34.1971L96.6939 35.7474L95.7605 35.7655L94.7539 34.2331H94.333V35.7655H93.546V31.8895H95.2481C95.6507 31.8895 95.968 31.9977 96.1998 32.214C96.4438 32.4183 96.5658 32.7008 96.5658 33.0613ZM94.333 33.5841H95.1932C95.364 33.5841 95.5043 33.5421 95.6141 33.4579C95.7239 33.3738 95.7788 33.2476 95.7788 33.0793C95.7788 32.9111 95.7239 32.7909 95.6141 32.7188C95.5043 32.6347 95.364 32.5926 95.1932 32.5926H94.333V33.5841Z"
                    fill="#ffffff"
                  />
                </svg>
              </div>
            </Link>
            <button
              onClick={closeAll}
              className="absolute top-2 right-4 text-[28px] hover:text-[#f6ff7a] transition-colors z-[1001]"
              style={{ lineHeight: "1.5em" }}
            >
              ×
            </button>
            <button
              onClick={goBackToMobileMenu}
              className="absolute top-20 left-4 text-[16px] text-white hover:text-[#f6ff7a] transition-colors z-[1001]"
            >
              ← Go Back
            </button>
            <div className="flex flex-col gap-3 w-full md:max-w-none mt-[8em]">
              <Link href="/Ai" onClick={(e) => { e.preventDefault(); closeAll(); window.location.href = "/Ai"; }}>
                <div className="bg-[#242425] rounded-lg flex items-center hover:bg-gray-700 transition-colors">
                  <Image src="/ai.svg" alt="AI" width={48} height={48} className="mr-4 object-cover w-12 h-25" />
                  <div className=" py-2">
                    <h1  style={{ fontFamily: 'Poppins, sans-serif' }} className="text-[24px] font-bold">Artificial Intelligence</h1>
                    <p className="text-[#bcbcc0] text-[16px] mt-3">GenAI, Custom LLMs, Machine Learning & Computer Vision</p>
                  </div>
                </div>
              </Link>
              <Link href="/DE" onClick={(e) => { e.preventDefault(); closeAll(); window.location.href = "/DE"; }}>
                <div className="bg-[#242425]  rounded-lg flex items-center hover:bg-gray-700 transition-colors">
                  <Image src="/data.svg" alt="Data" width={48} height={48} className="mr-4 object-cover w-12 h-25" />
                  <div className=" py-2">
                    <h1  style={{ fontFamily: 'Poppins, sans-serif' }} className="text-[24px] font-bold">Data</h1>
                    <p className="text-[#bcbcc0] text-[16px] mt-3">ETL & Storage, Visualization, Processing & Enrichment</p>
                  </div>
                </div>
              </Link>
              <Link href="/CI" onClick={(e) => { e.preventDefault(); closeAll(); window.location.href = "/CI"; }}>
                <div className="bg-[#242425]  rounded-lg flex items-center hover:bg-gray-700 transition-colors">
                  <Image src="/cloud.svg" alt="Cloud" width={48} height={48} className="mr-4 object-cover w-12 h-25" />
                  <div className=" py-2">
                    <h1  style={{ fontFamily: 'Poppins, sans-serif' }} className="text-[24px] font-bold">Cloud</h1>
                    <p className="text-[#bcbcc0] text-[16px] mt-3">Infrastructure, DevOps, APIs, Automation & Scalability</p>
                  </div>
                </div>
              </Link>
              <div className="p-4 rounded-lg">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-[14px]">
                    <Link href={"/React"} onClick={(e) => { e.preventDefault(); closeAll(); window.location.href = "/React"; }}>
                      <span>React</span>
                    </Link>
                    <Link href={"/React_Native"} onClick={(e) => { e.preventDefault(); closeAll(); window.location.href = "/React_Native"; }}>
                      <span>React Native</span>
                    </Link>
                  </div>
                  <div className="flex justify-between text-[14px]">
                    <Link href={"/NodeJS"} onClick={(e) => { e.preventDefault(); closeAll(); window.location.href = "/NodeJS"; }}>
                      <span>NodeJS</span>
                    </Link>
                    <Link href={"/Ruby_on_Rails"} onClick={(e) => { e.preventDefault(); closeAll(); window.location.href = "/Ruby_on_Rails"; }}>
                      <span>Ruby on Rails</span>
                    </Link>
                  </div>
                </div>
              </div>
              <Link href={"/About"} onClick={(e) => { e.preventDefault(); closeAll(); window.location.href = "/About"; }}>
                <button className="bg-[#f6ff7a] text-black px-4 py-2 w-full rounded-lg mt-auto hover:bg-[#f6ff7a]/80 transition-colors cursor-pointer">
                  Discover More  ➔
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {isServicedropdownOpen && (
        <div
          ref={servicesRef}
          className="fixed top-0 w-full h-full lg:hidden bg-[#191a1b] z-[1000] p-4 overflow-y-auto"
        >
          <div className="flex flex-col h-full text-white relative">
            <Link href="/" onClick={closeAll}>
              <div className="absolute top-2 left-4 z-[1001]">
                <svg width={55} height={30} viewBox="0 0 99 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M90.5376 0L63.5253 26.7557C60.8408 19.6916 55.7584 13.7731 49.1498 10.0152C42.5413 6.25735 34.8185 4.89445 27.3061 6.16028C19.7938 7.42614 12.9604 11.2419 7.97807 16.9528C2.99576 22.6639 0.175105 29.9142 0 37.46H11.4703C11.6784 32.1123 13.9238 27.0413 17.7547 23.2676C21.5855 19.4937 26.7174 17.2975 32.1175 17.1207C37.5174 16.9439 42.7845 18.7998 46.8587 22.3147C50.9327 25.8297 53.5114 30.7427 54.0755 36.0651L53.9632 36.1965H54.1061C54.1061 36.6312 54.1776 37.4094 54.1878 37.4094H68.7093L98.5789 7.9145L90.5376 0Z"
                    fill="#ffffff"
                  />
                  <path
                    d="M94.9736 30.231C95.669 30.231 96.2852 30.3872 96.822 30.6997C97.3711 31.0122 97.7981 31.4448 98.1031 31.9977C98.4204 32.5505 98.579 33.1695 98.579 33.8545C98.579 34.5396 98.4204 35.1585 98.1031 35.7114C97.7981 36.2522 97.3711 36.6789 96.822 36.9914C96.2852 37.3038 95.669 37.4601 94.9736 37.4601C94.2781 37.4601 93.6559 37.3038 93.1068 36.9914C92.5578 36.6789 92.1246 36.2522 91.8074 35.7114C91.5024 35.1585 91.3499 34.5396 91.3499 33.8545C91.3499 33.1695 91.5024 32.5505 91.8074 31.9977C92.1246 31.4448 92.5578 31.0122 93.1068 30.6997C93.6559 30.3872 94.2781 30.231 94.9736 30.231ZM94.9736 36.8652C95.852 36.8652 96.5597 36.5827 97.0966 36.0179C97.6456 35.453 97.9201 34.7319 97.9201 33.8545C97.9201 32.9772 97.6456 32.2561 97.0966 31.6912C96.5597 31.1263 95.852 30.8439 94.9736 30.8439C94.0829 30.8439 93.363 31.1263 92.814 31.6912C92.2771 32.2561 92.0087 32.9772 92.0087 33.8545C92.0087 34.7319 92.2771 35.453 92.814 36.0179C93.363 36.5827 94.0829 36.8652 94.9736 36.8652ZM96.5658 33.0613C96.5658 33.3618 96.4804 33.6142 96.3096 33.8185C96.1388 34.0108 95.9008 34.137 95.5958 34.1971L96.6939 35.7474L95.7605 35.7655L94.7539 34.2331H94.333V35.7655H93.546V31.8895H95.2481C95.6507 31.8895 95.968 31.9977 96.1998 32.214C96.4438 32.4183 96.5658 32.7008 96.5658 33.0613ZM94.333 33.5841H95.1932C95.364 33.5841 95.5043 33.5421 95.6141 33.4579C95.7239 33.3738 95.7788 33.2476 95.7788 33.0793C95.7788 32.9111 95.7239 32.7909 95.6141 32.7188C95.5043 32.6347 95.364 32.5926 95.1932 32.5926H94.333V33.5841Z"
                    fill="#ffffff"
                  />
                </svg>
              </div>
            </Link>
            <button
              onClick={closeAll}
              className="absolute top-2 right-4 text-[30px] hover:text-[#f6ff7a] transition-colors z-[1001]"
              style={{ lineHeight: "1.5em" }}
            >
              ×
            </button>
            <button
              onClick={goBackToMobileMenu}
              className="absolute top-20 left-4 text-[16px] text-white hover:text-[#f6ff7a] transition-colors z-[1001]"
            >
              ← Go Back
            </button>
            <div className="flex flex-col gap-6 w-full md:max-w-none mt-[8em] flex-1">
              <Link href="/StaffAugmentation" onClick={(e) => { e.preventDefault(); closeAll(); window.location.href = "/StaffAugmentation"; }}>
                <div className="bg-[#242425]  rounded-lg flex items-center hover:bg-gray-700 transition-colors">
                  <Image src="/serviceimg1.jpg" alt="Staff" width={48} height={48} className="mr-4 object-cover w-12 h-36" />
                  <div className="py-2">
                    <h1  style={{ fontFamily: 'Poppins, sans-serif' }} className="text-[24px] font-bold">Staff Augmentation</h1>
                    <p className="text-[#bcbcc0] text-[16px] mt-3">
                      We staff senior engineers and engineering pods up to 50+ people, including PMs, QA, DevOps, and Design
                    </p>
                  </div>
                </div>
              </Link>
              <Link href="/ProductStudio" onClick={(e) => { e.preventDefault(); closeAll(); window.location.href = "/ProductStudio"; }}>
                <div className="bg-[#242425]  rounded-lg flex items-center hover:bg-gray-700 transition-colors">
                  <Image src="/serviceimg2.jpg" alt="Product" width={48} height={48} className="mr-4 object-cover w-12 h-36" />
                  <div className="py-2">
                    <h1  style={{ fontFamily: 'Poppins, sans-serif' }} className="text-[24px] font-bold">Product Studio</h1>
                    <p className="text-[#bcbcc0] text-[16px] mt-3">
                      We staff embedded product teams with expert Product Managers, UI/UX Designers, Front-End, Backend, Data Engineers, and QA
                    </p>
                  </div>
                </div>
              </Link>
              <div className="flex lg:items-center lg:justify-center gap-4  lg:mt-auto">
                <div className="h-full lg:w-px bg-gray-700 hidden lg:block"></div>
                <Link href={"/About"} onClick={(e) => { e.preventDefault(); closeAll(); window.location.href = "/About"; }} className="w-full">
                  <button className="bg-[#f6ff7a] text-black px-4 py-2 w-full rounded-lg mt-auto hover:bg-[#f6ff7a]/80 transition-colors cursor-pointer">
                    Discover More  ➔
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {isDropdownOpen && (
        <div
          ref={capabilitiesRef}
          className="hidden lg:block absolute top-16 inset-x-0 mx-auto z-30 bg-[#191a1b]  rounded-xl max-w-[85vw] p-2 "
        >



          <div className="grid [grid-template-columns:auto_auto_auto_320px] pb-8 items-center px-6 gap-5">

            <Link href="/Ai" onClick={closeAll}>
              <div className="p-2 flex flex-col gap-2">
                <Image src="/ai.svg" alt="logo" width={300} height={300} className="w-full h-[8em]" />
                <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className="text-[1.5em] font-bold mt-2">Artificial Intelligence</h1>
                <p className="text-[#bcbcc0] mt-2">
                  GenAI, Custom LLMs, Machine Learning & Computer Vision
                </p>
              </div>
            </Link>
            <Link href="/DE" onClick={closeAll}>
              <div className="p-2  flex flex-col gap-2">
                <Image src="/data.svg" alt="logo" width={300} height={300} className="w-full h-[8em]" />
                <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className="text-[1.5em] font-bold mt-2">Data </h1>
                <p className="text-[#bcbcc0] mt-2">
                  ETL & Storage, Visualization, Processing & Enrichment
                </p>
              </div>
            </Link>
            <Link href="/CI" onClick={closeAll}>
              <div className="p-2  flex flex-col gap-2">
                <Image src="/cloud.svg" alt="logo" width={300} height={300} className="w-full h-[8em]" />
                <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className="text-[1.5em] font-bold mt-2">Cloud </h1>
                <p className="text-[#bcbcc0] mt-2">
                  Infrastructure, DevOps, APIs, Automation & Scalability
                </p>
              </div>
            </Link>
            <div className="flex flex-col items-start justify-between border-l h-full border-[#3d3d3f] pl-5">
              <ul className="flex flex-col gap-2 text-[14px] mt-7">
                <Link href="/React" onClick={(e) => { e.preventDefault(); closeAll(); window.location.href = "/React"; }}>
                  <li>React</li>
                </Link>
                <Link href="/React_Native" onClick={(e) => { e.preventDefault(); closeAll(); window.location.href = "/React_Native"; }}>
                  <li>React Native</li>
                </Link>
                <Link href="/NodeJS" onClick={(e) => { e.preventDefault(); closeAll(); window.location.href = "/NodeJS"; }}>
                  <li>NodeJS</li>
                </Link>
                <Link href="/Ruby_on_Rails" onClick={(e) => { e.preventDefault(); closeAll(); window.location.href = "/Ruby_on_Rails"; }}>
                  <li>Ruby on Rails</li>
                </Link>
              </ul>
              <div className="mt-2">
                <Link href="/About" onClick={(e) => { e.preventDefault(); closeAll(); window.location.href = "/About"; }}>
                  <button className="bg-transparent text-[16px]  border p-2 rounded-lg cursor-pointer hover:bg-white/10 hover:border-white/10 hover:text-white/70 transition-colors">
                    Discover More  ➔
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {isServicedropdownOpen && (
        <div
          ref={servicesRef}
                   className="hidden lg:block absolute top-16 inset-x-0 mx-auto z-30 bg-[#191a1b]  rounded-xl max-w-[85vw] px-2"
        >
          <div className="grid  [grid-template-columns:auto_auto_320px] gap-2 pb-6 items-center  min-h-[200px]">
            <Link href="/StaffAugmentation" onClick={closeAll}>
              <div className="p-2 mb-6">
                <Image src="/serviceimg1.jpg" alt="logo" width={300} height={300} className="w-full h-[8em] " />
                <h1 className="text-[1.7em] font-bold mt-4">Staff Augmentation</h1>
                <p className="text-[#bcbcc0] text-[16px] mt-3">
                  We staff senior engineers and engineering pods up to 50+ people, including PMs, QA, DevOps, and Design
                </p>
              </div>
            </Link>
            <Link href="/ProductStudio" onClick={closeAll}>
              <div className="p-2">
                <Image src="/serviceimg2.jpg" alt="logo" width={300} height={300} className="w-full h-[8em] " />
                <h1 className="text-[1.7em] font-bold mt-1">Product Studio</h1>
                <p className="text-[#bcbcc0] text-[16px] mt-2">
                  We staff embedded product teams with expert Product Managers, UI/UX Designers, Front-End, Backend, Data Engineers, and QA
                </p>
              </div>
            </Link>
            <div className="flex flex-col p-0 border-l h-full border-[#3d3d3f]">
              <div className="flex items-center gap-4 h-full">
                <div className="h-full w-px bg-gray-700"></div>
                <Link href="/About" onClick={(e) => { e.preventDefault(); closeAll(); window.location.href = "/About"; }}>
                  <button className="bg-transparent text-[16px] text-white border absolute bottom-10 p-2 rounded-lg self-end cursor-pointer hover:bg-white/10 hover:border-white/10 hover:text-white/70 transition-colors">
                    Discover More  ➔
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
