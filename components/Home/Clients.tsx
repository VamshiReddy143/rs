import Image from 'next/image'
import React from 'react'
import img1 from "@/public/pr.jpg"
import img2 from "@/public/pr2.jpg"
import img3 from "@/public/pr3.jpg"
import img4 from "@/public/pr4.jpg"
import img5 from "@/public/pr5.jpg"
import img6 from "@/public/pr6.jpg"

const Clients = () => {
  return (
    <div id="clients" className='min-h-screen mt-20'>
        <h1 className='lg:text-[2.5em] text-[1.8em] text-center lg:text-left font-bold leading-tight  mt-10'>
        Clients Love Working With Rootstrap
        </h1>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-7'>
            <div className='bg-gray-900 p-7 rounded-xl '>
                <p className='text-gray-400'>
                “Overall, the quality is fantastic. The execution speed is brilliant, code quality is solid. We do not treat them as an outsourced team. We think of them as one big team.&rdquo;
                </p>
                <div className='flex items-center gap-4 mt-5'>
                    <Image src={img1} alt="team" width={900} height={900} className='h-10 w-10 rounded-lg'/>
                    <div>
                        <h2 className='font-bold'>Mandar Bapaye</h2>
                        <p className='text-gray-400'>CTO/CPO, Masterclass</p>
                    </div>
                </div>
            </div>

            <div className='bg-gray-900 p-7 rounded-xl '>
                <p className='text-gray-400'>
                &ldquo;We work with 14 people from Rootstrap, they&apos;re our core developers. Pivotal in architecture decisions and design review. Everyone is incredibly good.&ldquo;
                </p>
                <div className='flex items-center gap-4 mt-5'>
                    <Image src={img2} alt="team" width={900} height={900} className='h-10 w-10 rounded-lg'/>
                    <div>
                        <h2 className='font-bold'>Jesse Ocon</h2>
                        <p className='text-gray-400'>VP of Engineering, Emeritus</p>
                    </div>
                </div>
            </div>


            <div className='bg-gray-900 p-7 rounded-xl '>
                <p className='text-gray-400'>
                “Rootstrap engineers are dedicated, smart, and humble. No challenge working with them, and quality is exceptional. It feels like they&apos;re a part of the team.&ldquo;
                </p>
                <div className='flex items-center gap-4 mt-5'>
                    <Image src={img3} alt="team" width={900} height={900} className='h-10 w-10 rounded-lg'/>
                    <div>
                        <h2 className='font-bold'>Samik Bhowal</h2>
                        <p className='text-gray-400'>VP of Engineering, Cleo Healthcare</p>
                    </div>
                </div>
            </div>


            <div className='bg-gray-900 p-7 rounded-xl '>
                <p className='text-gray-400'>
                &ldquo;Always on time or early. Team is communicative, flexible, thoughtful, and cognizant of our needs as a non-profit. Ultimately, the result is a product that our user-base has been thrilled to engage with.&ldquo;
                </p>
                <div className='flex items-center gap-4 mt-5'>
                    <Image src={img4} alt="team" width={900} height={900} className='h-10 w-10 rounded-lg'/>
                    <div>
                        <h2 className='font-bold'>Project Manager</h2>
                        <p className='text-gray-400'>Global Non-Profit for Special Athletes</p>
                    </div>
                </div>
            </div>

            <div className='bg-gray-900 p-7 rounded-xl '>
                <p className='text-gray-400'>
                &ldquo;Developed MVP from scratch. Delivered intuitive and streamlined product, receiving positive user feedback and keeping on budget. The partnership element they bring to the table is impressive.&ldquo;
                </p>
                <div className='flex items-center gap-4 mt-5'>
                    <Image src={img5} alt="team" width={900} height={900} className='h-10 w-10 rounded-lg'/>
                    <div>
                        <h2 className='font-bold'>Jess Chan</h2>
                        <p className='text-gray-400'>Founder & CEO, Backbone</p>
                    </div>
                </div>
            </div>


            <div className='bg-gray-900 p-7 rounded-xl '>
                <p className='text-gray-400'>
                “Everyone that has joined the team has been a high-caliber developer. They meet deadlines and stay on budget. Rootstrap&apos;s quality is strong compared to others. They have very high standards.”
                </p>
                <div className='flex items-center gap-4 mt-5'>
                    <Image src={img6} alt="team" width={900} height={900} className='h-10 w-10 rounded-lg'/>
                    <div>
                        <h2 className='font-bold'>Director of Software</h2>
                        <p className='text-gray-400'>Logistics SaaS Firm</p>
                    </div>
                </div>
            </div>
        </div>

        <div className='flex flex-col items-center justify-center gap-4 text-center mt-12'>
        <button className='border-1 border-white text-white px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-700 hover:text-white transition duration-300 ease-in-out'>
          Read All Reviews
        </button>
      </div>
    </div>
  )
}

export default Clients