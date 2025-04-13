// "use client";

// import Clients from '@/components/Hiring/Clients';
// import Fun from '@/components/Hiring/Fun';
// import Hero from '@/components/Hiring/Hero';
// import Team from '@/components/Hiring/Team';
// import Challenges from '@/components/Hiring/Challenges';
// import Community from '@/components/Hiring/Community';
// import Footer from '@/components/Hiring/Footer';
// import React, { useEffect, useRef, useState } from 'react';
// import dynamic from 'next/dynamic';

// // Define Locomotive Scroll instance interface
// interface LocomotiveScrollInstance {
//   update: () => void;
//   destroy: () => void;
// }

// // Define Locomotive Scroll constructor type
// interface LocomotiveScrollConstructor {
//   new (options: {
//     el: HTMLElement;
//     smooth: boolean;
//     multiplier: number;
//     lerp: number;
//     getDirection: boolean;
//   }): LocomotiveScrollInstance;
// }

// // Dynamic import for Locomotive Scroll
// const LocomotiveScroll = dynamic(
//   () => import('locomotive-scroll').then((mod) => mod.default as unknown as React.ComponentType),
//   { ssr: false }
// );

// const Page: React.FC = () => {
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const locoScrollRef = useRef<LocomotiveScrollInstance | null>(null);
//   const [isClient, setIsClient] = useState<boolean>(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   useEffect(() => {
//     if (!isClient || !scrollRef.current) return;

//     let resizeObserver: ResizeObserver | undefined;

//     import('locomotive-scroll').then((LocomotiveScrollModule) => {
//       const LocomotiveScroll: LocomotiveScrollConstructor = LocomotiveScrollModule.default;

//       locoScrollRef.current = new LocomotiveScroll({
//         el: scrollRef.current as HTMLDivElement,
//         smooth: true,
//         multiplier: 1,
//         lerp: 0.1,
//         getDirection: true,
//         // Ensure smooth height transitions
//         smoothMobile: true,
//         resetNativeScroll: true,
//       });

//       // Update scroll after initialization with a slightly longer delay
//       setTimeout(() => {
//         if (locoScrollRef.current) {
//           locoScrollRef.current.update();
//         }
//       }, 500); // Increased from 300ms to 500ms for better initialization

//       // Observe resize changes to update scroll
//       resizeObserver = new ResizeObserver(() => {
//         if (locoScrollRef.current) {
//           locoScrollRef.current.update();
//         }
//       });
//       resizeObserver.observe(scrollRef.current as HTMLDivElement);

//       // Inner cleanup
//       return () => {
//         if (locoScrollRef.current) {
//           locoScrollRef.current.destroy();
//           locoScrollRef.current = null;
//         }
//         if (resizeObserver) {
//           resizeObserver.disconnect();
//           resizeObserver = undefined;
//         }
//       };
//     });

//     // Outer cleanup
//     return () => {
//       if (locoScrollRef.current) {
//         locoScrollRef.current.destroy();
//         locoScrollRef.current = null;
//       }
//       if (resizeObserver) {
//         resizeObserver.disconnect();
//         resizeObserver = undefined;
//       }
//     };
//   }, [isClient]);

//   if (!isClient) {
//     return (
//       <div className="min-h-screen flex flex-col">
//         <Hero />
//         <Clients />
//         <Team />
//         <Fun />
//         <Challenges />
//         <Community />
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div
//       ref={scrollRef}
//       data-scroll-container
//       className="bg-gray-200" // Removed min-h-screen to let content dictate height
//       style={{ overflow: 'hidden' }}
//     >
//       <section data-scroll data-scroll-speed="2" className="w-full">
//         <Hero />
//       </section>
//       <section data-scroll data-scroll-speed="1.5" className="w-full">
//         <Clients />
//       </section>
//       <section data-scroll data-scroll-speed="1.5" className="w-full">
//         <Team />
//       </section>
//       <section data-scroll data-scroll-speed="1" className="w-full">
//         <Fun />
//       </section>
//       <section data-scroll data-scroll-speed="2" className="w-full">
//         <Challenges />
//       </section>
//       <section data-scroll data-scroll-speed="1" className="w-full">
//         <Community />
//       </section>
//       <section data-scroll data-scroll-speed="1" className="w-full">
//         <Footer />
//       </section>
//     </div>
//   );
// };

// export default Page;


import Clients from '@/components/Hiring/Clients';
import Fun from '@/components/Hiring/Fun';
import Hero from '@/components/Hiring/Hero';
import Team from '@/components/Hiring/Team';
import Challenges from '@/components/Hiring/Challenges';
import Community from '@/components/Hiring/Community';
import Footer from '@/components/Hiring/Footer';


import React from 'react'


const page = () => {
  return (
  
     <div className=''>
      <Hero />
       <Clients />
       <div className=' lg:max-w-[90em] mx-auto lg:px-[6em] px-3'>

    
        <Team />
        </div>
        
       <Fun />
       <Challenges />
       <Community />
      <Footer />
    
     </div>
  )
}

export default page