// app/not-found.tsx
'use client'


import Footer from '@/components/Hiring/Footer'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
      <div>
    <div style={{ fontFamily: 'Poppins, sans-serif' }} className="min-h-screen flex flex-col justify-center items-center bg-white text-black   text-center px-4">

        <div>
<Image src={"/rootlogo.svg"}  alt="Rootstrap Logo" width={900} height={900} className='c-filter__light  w-[350px] mb-8' />
        </div>
      <h1 className="text-[40px] leading-[60px]  font-normal mb-2">Page Not Found</h1>
      <p className="text-[24px] text-gray-900 mb-6 leading-[36px] font-normal">
      The page you are looking for doesn't exist or has been moved.
      </p>
      <Link href="/">
        <button className=" text-[18px] leading-[21px] font-normal  px-6 py-3 bg-yellow-400 text-black   hover:bg-yellow-500 transition">
          Back to Homepage
        </button>
      </Link>

      
     
    
    </div>

    <div>
        <Footer/>
      </div>
    </div>
  )
}
