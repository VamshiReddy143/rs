import Image from 'next/image'
import React from 'react'

const projects = [
  {
    image: '/cleo.jpg',
    title: 'Cleo',
    description: 'Creating a seamless app-based communication experience to assist working parents',
    padding: '',
  },
  {
    image: '/car.jpg',
    title: 'Fisker',
    description: 'Revolutionizing transportation advertising with fisker',
    padding: 'md:pt-[4em] lg:pt-[7em]',
  },
  {
    image: '/brook.jpg',
    title: 'Watter',
    description: 'Helping WalletJoy launch a personal finance platform',
    padding: 'md:pt-[1em] lg:pt-[4em]',
  },
  {
    image: '/mrbesat.jpg',
    title: 'Tony Robbins',
    description: 'Breakingthrough: digitizing Tony Robbins\'s coaching empire',
    padding: '',
  },
  {
    image: '/d.jpg',
    title: 'DAOFY',
    description: 'Shaping the future of NFTs',
    padding: 'md:pt-[4em] lg:pt-[7em]',
  },
  {
    image: '/light.jpg',
    title: 'Avanti',
    description: 'Increasing online retail sales via AI',
    padding: 'md:pt-[1em] lg:pt-[4em]',
  },
  {
    image: '/shitzu.jpg',
    title: 'The Farmers Dog',
    description: 'Building revenue streams for leading online pet food startup',
    padding: '',
  },
  {
    image: '/summun.jpg',
    title: 'summun',
    description: 'Building a mobile application that is redefining the healthcare system in South America',
    padding: 'md:pt-[4em] lg:pt-[7em]',
  },
  {
    image: '/universe.jpg',
    title: 'Universe Innovations',
    description: 'Leveraging AI to assist parents in rearing their children during their early stages.',
    padding: 'md:pt-[1em] lg:pt-[4em]',
  },
  {
    image: '/betterup.jpg',
    title: 'BetterUp',
    description: 'Building a People Experience Platform for a leading ed-tech startup',
    padding: '',
  },
  {
    image: '/bw.jpg',
    title: 'Brightwheel',
    description: 'Building the #1 early education platform',
    padding: 'md:pt-[4em] lg:pt-[7em]',
  },
  {
    image: '/brenner.jpg',
    title: 'R&G Brenner',
    description: 'Increasing client engagement and satisfaction at R&G Brenner with a new app experience',
    padding: 'md:pt-[1em] lg:pt-[4em]',
  },


  {
    image: '/gp.jpg',
    title: 'Globalization Partners',
    description: 'Helping Globalization Partners automate manual processes and achieve a 95% client satisfaction rate with custom',
    padding: '',
  },
  {
    image: '/bildsy.jpg',
    title: 'Bildsy',
    description: 'Accessible 3D Modeling with iOS',
    padding: 'md:pt-[4em] lg:pt-[7em]',
  },
  {
    image: '/coding.jpg',
    title: 'Hatch Coding',
    description: 'Leveraging AI to teach students between the ages of 8 - 15 how to code',
    padding: 'md:pt-[1em] lg:pt-[4em]',
  },

  {
    image: '/exi.jpg',
    title: 'Exi',
    description: 'Pioneering the future of healthcare with data-driven insights',
    padding: '',
  },
  {
    image: '/ds.jpg',
    title: 'Doorspace',
    description: 'Building an automated employee and recruitment management platform for a healthcare startup',
    padding: 'md:pt-[4em] lg:pt-[7em]',
  },
  {
    image: '/eye.jpg',
    title: 'Eye Level Learning',
    description: 'Improved Tutoring App Functionality and User Experience',
    padding: 'md:pt-[1em] lg:pt-[4em]',
  },
]

const Allprojects = () => {
  return (
    <div className='bg-gray-100 text-black lg:py-[10em] py-[5em] mt-[5em]'>
      <div className='flex justify-between'>
        <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className='lg:text-[64px] text-[42px] leading-[50px] font-medium'>
          All Projects
        </h1>
        <div className='mdg:flex gap-3 items-center md:mt-[10em] mt-[5em]'>
          <p style={{ fontFamily: 'Poppins, sans-serif' }}  className='text-[16px] font-normal'>Sort by</p>
          <select style={{ fontFamily: 'Poppins, sans-serif' }}  name="" id="" className='border border-gray-400 p-1 font-normal mt-3 lg:mt-0 text-[14px] focus:border-none focus:outline-1 focus:outline-[#FFDF00]'>
            <option value="">Most recent</option>
            <option value="">Oldest</option>    
          </select>
        </div>
      </div>

      <div className='grid md:grid-cols-3 gap-[3em] mt-[1em]'>
        {projects.map((project, index) => (
          <div key={index} className={`group flex flex-col gap-3 ${project.padding}`}>
            <div className='relative w-full lg:h-[32em] h-[25em] overflow-hidden bg-transparent group-hover:outline group-hover:outline-5 group-hover:outline-[#FFDF00]'>
              <Image
                src={project.image}
                fill
                alt={project.title}
                className='object-cover transition-all duration-300 group-hover:scale-110'
              />
            </div>
            <h1
              style={{ fontFamily: 'Poppins, sans-serif' }}
              className='lg:text-[32px] text-[2em] font-medium'
            >
              {project.title}
            </h1>
            <p className='lg:text-[20px] font-normal md:text-[1em] text-[1.3em] text-[#6f6f6e]'>
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Allprojects