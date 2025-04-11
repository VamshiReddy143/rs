import React from 'react'

const Community = () => {
    return (

        <div
            className="bg-black text-white  lg:pl-[10%] px-5  bg-no-repeat
            bg-none
                   md:bg-[position:center_top]
                   lg:bg-[position:center_bottom]
                   md:bg-[length:1700px_auto]
                   md:bg-[url('https://cdn.prod.website-files.com/63f902d79a33f71d496cde07/65ef0c28b34fbaf07ae56ceb_careers-banner-bg-ezgif.com-png-to-webp-converter.webp')]"
        >
            <div className='flex flex-col justify-center  h-screen lg:w-[40%]'>
               <div className='leading-tight'>
               <h1 className='lg:text-[5em] text-[3em]'>Talent <span className='text-[#ffc83f]'>✩</span></h1>
              
               <h1  className='lg:text-[5em] text-[3em]'>Community!</h1>
               </div>
                <p  className='lg:text-[2em] text-[1.5em] mt-5'>Subscribe to our community and be the first to hear about our news and special updates from our team.</p>
            <div>
                <button className='text-[1.5em]  border border-[#ffc83f] text-[#ffc83f] px-7 py-2  mt-[4em]'>Join the community →</button>
            </div>
            </div>
        </div>



    )
}

export default Community