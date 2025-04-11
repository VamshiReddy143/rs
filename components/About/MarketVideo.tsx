// "use client";

// import Image from 'next/image';
// import React, { useEffect, useRef } from 'react';

// const MarketVideo = () => {
//   const sectionRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             // Add the full-screen class when the section is in view
//             entry.target.classList.add('full-screen');
//           }
//         });
//       },
//       {
//         threshold: 0.5, // Trigger when 50% of the section is visible
//       }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => {
//       if (sectionRef.current) {
//         observer.unobserve(sectionRef.current);
//       }
//     };
//   }, []);

//   return (
//     <div
//       ref={sectionRef}
//       className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden transition-all duration-1000 ease-in-out"
//     >
//       {/* Video Background */}
//       <video
//         src="/videos/homevideo.mp4"
//         autoPlay
//         muted
//         loop
//         className="absolute top-0 left-0 w-full h-full object-cover z-0"
//       />

//       {/* Image Overlay */}
//       <div className="relative z-10 flex items-center justify-center w-full h-full overflow-hidden">
//         <Image
//           src="/woman.svg"
//           alt="tools"
//           width={900}
//           height={900}
//           className="w-full max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] h-auto object-contain transition-all duration-1000 ease-in-out"
//         />
//       </div>
//     </div>
//   );
// };

// export default MarketVideo;


import React from 'react'

const MarketVideo = () => {
  return (
    <div className='min-h-screen bg-white text-black flex items-center justify-center'>
        <h1>WILL BE IMPLEMENTED LATER</h1>
    </div>
  )
}

export default MarketVideo