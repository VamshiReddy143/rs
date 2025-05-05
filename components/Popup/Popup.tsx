// 'use client';

// import Image from 'next/image';
// import React, { useState } from 'react';
// import { X } from 'lucide-react';

// const Popup = ({ onClose }: { onClose: () => void }) => {
//   const [email, setEmail] = useState('');
//   const [subscribed, setSubscribed] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubscribe = async (email: string) => {
//     try {
//       const response = await fetch('/api/subscribe', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email }),
//       });

//       if (!response.ok) {
//         const { error } = await response.json();
//         throw new Error(error || 'Failed to subscribe');
//       }

//       setSubscribed(true);
//       setError('');
//     } catch (err) {
//       const errorMessage = err instanceof Error ? err.message : 'Failed to subscribe';
//       setError(errorMessage);
//     }
//   };

//   return (
//     <div  style={{ fontFamily: 'Poppins, sans-serif' }} className="bg-[#242425] rounded-xl relative w-[90%] max-w-[600px]">
//       {/* Close button */}
//       <button
//         onClick={onClose}
//         className="absolute top-3 right-3 text-white rounded-full p-1 z-10"
//         aria-label="Close"
//       >
//         <X size={24} />
//       </button>

//       <div className="w-full h-auto">
//         <Image
//           src={"/popup.jpg"}
//           alt="tools"
//           width={900}
//           height={600}
//           className="w-full h-auto object-cover rounded-t-xl"
//         />
//       </div>

//       <div className="p-5 sm:p-6 md:p-8">
//         <div className="text-center py-4 flex flex-col gap-4">
//           <h1 className="font-semibold text-xl sm:text-2xl md:text-[28px] leading-tight">
//             Never Miss an update!
//           </h1>
//           <h3 className="text-sm sm:text-base md:text-[18px] font-normal leading-relaxed text-[#BCBCC0]">
//             Join our community of insiders and never miss out on exciting news, product launches, and more.
//           </h3>
//         </div>

//         <div className="flex flex-col gap-4 mt-4">
//           {subscribed ? (
//             <div className="flex items-center gap-4 justify-center">
//               <Image src={"/greentick.svg"} alt="check" width={900} height={900} className="h-8 w-8" />
//               <p className="text-[#90D982] text-[18px] font-semibold">Thanks for subscribing!</p>
//             </div>
//           ) : (
//             <>
//               <input
//                 type="text"
//                 placeholder="Enter your Email here *"
//                 className="w-full py-3 px-3 rounded-t-lg bg-[#3D3D3F] text-white placeholder:text-[#a1a1a1] border-b-2 border-transparent focus:outline-none focus:border-[#f6ff7a] transition-all duration-300"
//                 value={email}
//                 required
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <button
//                 className="w-full bg-[#f6ff7a] hover:bg-[#AAB418] text-black py-3 font-semibold rounded-lg"
//                 onClick={() => handleSubscribe(email)}
//               >
//                 Subscribe
//               </button>
//             </>
//           )}
//           {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Popup;









'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { CheckCircle } from 'lucide-react';

const Popup = ({ onClose }: { onClose: () => void }) => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [error, setError] = useState('');

    const handleSubscribe = async (email: string) => {
        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const { error } = await response.json();
                throw new Error(error || 'Failed to subscribe');
            }

            setSubscribed(true);
            setError('');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to subscribe';
            setError(errorMessage);
        }
    };

    return (
        <div style={{ fontFamily: 'Poppins, sans-serif' }} className="bg-[#242425] rounded-xl relative w-[90%] max-w-[600px]">
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-3 right-3 text-white rounded-full p-1 z-10"
                aria-label="Close"
            >
                <X size={24} />
            </button>

            <div className="w-full h-auto">
                <Image
                    src={"/popup.jpg"}
                    alt="tools"
                    width={900}
                    height={600}
                    className="w-full h-auto object-cover rounded-t-xl"
                />
            </div>

            <div className="p-5 sm:p-6 md:p-8">


                <div className="flex flex-col text-center gap-4 py-4 mt-4">
                    {subscribed ? (
                        <div className="flex flex-col items-center gap-4">
                            <Image src={"/greentick.svg"} alt="check" width={900} height={900} className="h-20 w-20" />
                            <div className="flex flex-col gap-4">
                                <p className="font-semibold text-xl sm:text-2xl md:text-[30px] leading-tight">
                                    Thanks for subscribing!
                                </p>
                                <p className="text-[#BCBCC0] text-sm sm:text-base md:text-[20px] font-normal leading-relaxed">
                                    We’re thrilled to have you with us—exciting things are coming your way!
                                </p>
                            </div>
                        </div>
                    ) : (
                        <>

                            <div className="text-center py-2 pb-5 flex flex-col gap-4">
                                <h1 className="font-semibold text-xl sm:text-2xl md:text-[28px] leading-tight">
                                    Never Miss an update!
                                </h1>
                                <h3 className="text-sm sm:text-base md:text-[18px] font-normal leading-relaxed text-[#BCBCC0]">
                                    Join our community of insiders and never miss out on exciting news, product launches, and more.
                                </h3>
                            </div>
                            <input
                                type="email"
                                placeholder="Enter your Email here *"
                                className="w-full py-3 px-3 rounded-t-lg bg-[#3D3D3F] text-white placeholder:text-[#a1a1a1] border-b-2 border-transparent focus:outline-none focus:border-[#f6ff7a] transition-all duration-300"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button
                                className="w-full bg-[#f6ff7a] hover:bg-[#AAB418] text-black py-3 mt-1 font-semibold rounded-lg"
                                onClick={() => handleSubscribe(email)}
                            >
                                Subscribe
                            </button>
                        </>
                    )}
                    {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Popup;