
// import React from 'react'
// import Hero from "@/components/StaffAugmentation/Hero"
// import Kpi from '@/components/StaffAugmentation/Kpi'
// import Collabaration from '@/components/StaffAugmentation/Collabaration'
// import Roadmap from '@/components/StaffAugmentation/Roadmap'
// import Us from '@/components/CI/Us'
// import Footer from '@/components/Footer'

// const page = () => {
//   return (
//     <div className='text-white bg-black '>
      

//       <div className=' lg:pl-[10%] md:pl-[5%]  px-2 py-1'>
//         <Hero />
//       </div>

//       <div className=' lg:px-20 hidden md:block px-2 py-1'>
//         <Kpi />
//       </div>

//       <div className=' lg:px-20 hidden md:block px-2 py-1'>
//         <Collabaration />
//       </div>

//       <div className=' lg:px-20 px-2 py-1'>
//         <Roadmap />
//       </div>

    

//       <div className=' lg:px-20 px-2 py-1'>
//         <Us />
//       </div>

//       <div className=' lg:px-20 px-2 py-1'>
//         <Footer />
//       </div>
//     </div>
//   )
// }

// export default page






import React from 'react'
import Hero from "@/components/StaffAugmentation/Hero"
import Kpi from '@/components/StaffAugmentation/Kpi'
import Collabaration from '@/components/StaffAugmentation/Collabaration'
import Roadmap from '@/components/StaffAugmentation/Roadmap'
import Us from '@/components/CI/Us'
import Footer from '@/components/Footer'

const page = () => {
  return (
    <div className='text-white bg-black '>
      

      <div className='lg:ml-[11%] px-3 md:mt-10 lg:mt-0 py-1'>
        <Hero />
      </div>

      <div className=' lg:max-w-[90em] mx-auto lg:px-[6em] px-3'>
      <div className='  hidden md:block '>
        <Kpi />
      </div>

      <div className=' hidden md:block '>
        <Collabaration />
      </div>
        <Roadmap />
        <Us />
        <Footer />
      </div>
    </div>
  )
}

export default page