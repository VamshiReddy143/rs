
import Image from 'next/image'
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import arrow from "@/public/pr.png"
import { LuLinkedin } from 'react-icons/lu';
import Link from 'next/link'
import React from 'react'
import img1 from "@/public/team1.jpg";
import img2 from "@/public/team2.jpg";
import img3 from "@/public/team3.jpg";
import img4 from "@/public/team4.jpg";
import img5 from "@/public/team5.jpg";


const page = () => {
  return (
    <div className='text-white bg-[#191A1B] pt-[10em] min-h-screen'>
      <div className=' lg:max-w-[90em] lg:px-[6em] px-3 mx-auto flex flex-col justify-center items-center'>
        <Image src={"/rocket.svg"} width={900} height={900} alt='rocket' className='h-[6.5em] ' />
        <div style={{ fontFamily: "Poppins, sans-serif" }} className='flex flex-col justify-center items-center pt-9'>
          <h1 className='lg:text-[48px] lg:leading-[57px] font-semibold'>You´re all set!</h1>
          <h3 className='lg:text-[22px] lg:leading-[26px] font-normal text-[#BCBCC0] py-4'>We are really happy to connect with you</h3>
          <div className='mt-4 w-full h-[3px] bg-[#575759]' />
          <p className='lg:text-[16px] lg:leading-[32px] font-normal text-[#B5B5B9] pt-6'>In the meantime, check out some of our case studies:</p>
        </div>



        <div id="team" className=" mt-20">
          <div className="mt-5 lg:flex gap-5">
            <div className="relative lg:w-[70%] w-full overflow-hidden rounded-xl group">
              <Link href="/Portfolio/Featuredcases/masterclass">
                {/* Image with zoom effect on hover */}
                <Image
                  src={img1}
                  alt="team"
                  width={900}
                  height={900}
                  className="lg:h-[38em] h-[20em] w-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                />

                {/* Dark overlay that fades on hover */}
                <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-300" />

                {/* Smooth black fade at the bottom */}
                <div className="absolute bottom-0 left-0 w-full h-[4em] bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

                {/* Text on top of fade */}
                <h1 className="absolute bottom-5 left-0 z-20 pl-8 w-[70%] md:w-full lg:text-[24px] text-[20px] lg:pl-7 lg:pr-[6em] text-left font-semibold text-white">
                  Building The Most Premium Learning Experience <span className="hidden md:block"> On the Planet</span>
                </h1>

              </Link>
            </div>



            <div className="relative lg:w-[35%] overflow-hidden rounded-xl group">
              <Link href="/Portfolio/Featuredcases/farmers_dog">
                {/* Image with zoom effect */}
                <Image
                  src={img2}
                  alt="team"
                  width={900}
                  height={900}
                  className="lg:h-[40em] h-[20em] w-full object-cover transform transition-transform duration-500 group-hover:scale-[1.03]"
                />

                {/* Black overlay with fade on hover */}
                <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-300" />

                {/* Smooth gradient fade at bottom */}
                <div className="absolute bottom-0 left-0 w-full h-[4em] bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

                {/* Title text */}
                <h1 className="absolute bottom-0 left-0 z-20 pl-8 w-[70%] md:w-full lg:text-[24px] text-[1.2em] lg:pl-7 lg:pb-10 text-left font-semibold text-white">
                  Delivering Delight For The Largest Pet Startup
                </h1>
              </Link>
            </div>

          </div>

          <div className="lg:flex justify-center gap-5 rounded-xl text-center">
            <div className="flex flex-col lg:gap-6 gap-5 lg:w-[35%] mx-auto lg:mt-5 mt-5 relative">
              <div className="relative overflow-hidden group">
                <Link href="/Portfolio/Featuredcases/emeritus">
                  {/* Image with zoom on hover */}
                  <Image
                    src={img3}
                    alt="team"
                    width={900}
                    height={900}
                    className="w-full h-auto object-cover transform rounded-lg transition-transform duration-500 group-hover:scale-[1.03]"
                  />

                  {/* Dark overlay with smooth fade on hover */}
                  <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-300" />

                  {/* Black gradient at the bottom */}
                  <div className="absolute bottom-0 left-0 w-full h-[4em] bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

                  {/* Text on top of gradient */}
                  <h1 className="absolute bottom-5 left-0 z-20 pl-8 w-[75%] md:w-full lg:text-[24px] text-[1.2em] lg:pl-7 text-left font-semibold text-white">
                    Making Higher Education Accessible Online
                  </h1>
                </Link>
              </div>


              <div className="relative overflow-hidden rounded-xl group">
                <Link href="/Portfolio/Featuredcases/madison">
                  {/* Image with subtle zoom on hover */}
                  <Image
                    src={img4}
                    alt="team"
                    width={900}
                    height={900}
                    className="w-full h-auto object-cover rounded-lg transform transition-transform duration-500 group-hover:scale-[1.03]"
                  />

                  {/* Dark overlay that fades on hover */}
                  <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-300" />

                  {/* Soft bottom gradient for text readability */}
                  <div className="absolute bottom-0 left-0 w-full h-[4em] bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

                  {/* Headline text */}
                  <h1 className="absolute bottom-5 left-0 z-20 pl-8 w-[75%] md:w-full lg:text-[24px] text-[1.2em] lg:pl-7 text-left font-semibold text-white">
                    Launching a Critical Mobile App During Covid
                  </h1>
                </Link>
              </div>

            </div>

            <div className="relative lg:w-[70%] aspect-[2/2] lg:aspect-[3/2] mt-5 overflow-hidden rounded-xl group">
              <Link href="/Portfolio/Case_Studies">
                {/* Image with zoom on hover */}
                <Image
                  src={img5}
                  alt="team"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />

                {/* Fading black overlay */}
                <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-300" />

                {/* Gradient at bottom for text readability */}
                <div className="absolute bottom-0 left-0 w-full h-[4em] bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

                {/* Headline text */}
                <h1 className="absolute bottom-5 left-0 z-20 pl-8 w-[70%] md:w-full lg:text-[24px] text-[1.2em] lg:pl-7 text-left font-semibold text-white line-clamp-3">
                  Combining SaaS, Consumer & Payments into the industry&apos;s
                  <span className="lg:block">
                    #1 Platform For Early Education
                  </span>
                </h1>
              </Link>
            </div>

          </div>

          <Link href={"/Portfolio"}>
            <div className="flex flex-col items-center justify-center gap-4 text-center mt-20">
              <button className="border-1 border-white text-white px-4 py-2 text-[16px] rounded-lg cursor-pointer hover:bg-white/10 hover:border-white/10 hover:text-white/70 transition-colors">
                View All Case Studies
              </button>
            </div>
          </Link>

        </div>


        
      </div>
      

      <div className=' lg:pt-[1em] pt-[2em] pb-[2em] lg:max-w-[90em] mx-auto lg:px-[6em] px-3'>
          <div className='mt-[6em] lg:flex items-start  justify-between'>
              <div className=''>
                  <svg width={99} height={37} viewBox="0 0 99 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M90.5376 0L63.5253 26.7557C60.8408 19.6916 55.7584 13.7731 49.1498 10.0152C42.5413 6.25735 34.8185 4.89445 27.3061 6.16028C19.7938 7.42614 12.9604 11.2419 7.97807 16.9528C2.99576 22.6639 0.175105 29.9142 0 37.46H11.4703C11.6784 32.1123 13.9238 27.0413 17.7547 23.2676C21.5855 19.4937 26.7174 17.2975 32.1175 17.1207C37.5174 16.9439 42.7845 18.7998 46.8587 22.3147C50.9327 25.8297 53.5114 30.7427 54.0755 36.0651L53.9632 36.1965H54.1061C54.1061 36.6312 54.1776 37.4094 54.1878 37.4094H68.7093L98.5789 7.9145L90.5376 0Z" fill="#969699" >
                      </path>
                      <path d="M94.9736 30.231C95.669 30.231 96.2852 30.3872 96.822 30.6997C97.3711 31.0122 97.7981 31.4448 98.1031 31.9977C98.4204 32.5505 98.579 33.1695 98.579 33.8545C98.579 34.5396 98.4204 35.1585 98.1031 35.7114C97.7981 36.2522 97.3711 36.6789 96.822 36.9914C96.2852 37.3038 95.669 37.4601 94.9736 37.4601C94.2781 37.4601 93.6559 37.3038 93.1068 36.9914C92.5578 36.6789 92.1246 36.2522 91.8074 35.7114C91.5024 35.1585 91.3499 34.5396 91.3499 33.8545C91.3499 33.1695 91.5024 32.5505 91.8074 31.9977C92.1246 31.4448 92.5578 31.0122 93.1068 30.6997C93.6559 30.3872 94.2781 30.231 94.9736 30.231ZM94.9736 36.8652C95.852 36.8652 96.5597 36.5827 97.0966 36.0179C97.6456 35.453 97.9201 34.7319 97.9201 33.8545C97.9201 32.9772 97.6456 32.2561 97.0966 31.6912C96.5597 31.1263 95.852 30.8439 94.9736 30.8439C94.0829 30.8439 93.363 31.1263 92.814 31.6912C92.2771 32.2561 92.0087 32.9772 92.0087 33.8545C92.0087 34.7319 92.2771 35.453 92.814 36.0179C93.363 36.5827 94.0829 36.8652 94.9736 36.8652ZM96.5658 33.0613C96.5658 33.3618 96.4804 33.6142 96.3096 33.8185C96.1388 34.0108 95.9008 34.137 95.5958 34.1971L96.6939 35.7474L95.7605 35.7655L94.7539 34.2331H94.333V35.7655H93.546V31.8895H95.2481C95.6507 31.8895 95.968 31.9977 96.1998 32.214C96.4438 32.4183 96.5658 32.7008 96.5658 33.0613ZM94.333 33.5841H95.1932C95.364 33.5841 95.5043 33.5421 95.6141 33.4579C95.7239 33.3738 95.7788 33.2476 95.7788 33.0793C95.7788 32.9111 95.7239 32.7909 95.6141 32.7188C95.5043 32.6347 95.364 32.5926 95.1932 32.5926H94.333V33.5841Z" fill="#969699"></path>
                  </svg>
              </div>
              <div className='lg:flex gap-30 '>
                  <div>
                      <h1 className='lg:text-[18px] text-[1.2em] mt-8 lg:mt-0 font-bold text-[#969699]'>Find us</h1>
                      <div className='flex gap-4 mt-5 '>
                          <LuLinkedin
                              size={25}
                              stroke="#969699"
                              className="hover:stroke-gray-700 cursor-pointer"
                          />

                          <FaXTwitter
                              size={25}
                              className="fill-[#969699] hover:fill-gray-700 cursor-pointer"
                          />

                          <FaInstagram size={25}
                              className="fill-[#969699] hover:fill-gray-700 cursor-pointer" />
                      </div>

                  </div>

                  <div>
                      <h1 className='lg:text-[18px] text-[1.2em] font-bold text-[#969699] mt-8 lg:mt-0 leading-[32px]'>Never Miss an Update!</h1>
                      <div className="flex items-center gap-4 mt-3 ">
                          <input
                              type="text"
                              className="bg-[#3d3d3f] p-3 w-[20em] rounded-t-lg border-b-2 border-transparent focus:outline-none focus:border-[#f6ff7a] transition-all duration-300"
                              placeholder="Enter your email here *"
                          />
                          <Image src={arrow} alt="arrow" width={900} height={900} className='h-12 w-12' />

                      </div>
                  </div>

              </div>
          </div>

          <div className='lg:flex items-center justify-between mt-15'>
              <p className='text-[#969699] text-[14px]'>2025
                  © Rootstrap, Inc. All Rights Reserved.</p>
              <p className='text-[#969699] text-[14px]'>Privacy Policy</p>
          </div>

      </div>

    </div>
  )
}

export default page