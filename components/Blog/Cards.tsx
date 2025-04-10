import Image from 'next/image';
import React from 'react';

const Cards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-[10%] mt-[5em]">
      <div className="flex flex-col min-h-[400px] bg-gray-800 rounded-xl overflow-hidden relative">
        <Image src="/aiii.png" width={900} height={900} alt="team" className="h-[50%] w-full object-cover" />
        {/* Content Container */}
        <div className="p-7 flex flex-col gap-3 flex-grow">
          <p className="text-gray-400 text-[1em]">AI / Machine Learning</p>
          <h2 className="text-[1.6em] font-bold leading-tight">
            How to build Multi-agent app for automating dependency security...
          </h2>
        </div>
        {/* Button at absolute bottom-right */}
        <button className="text-[1em] font-bold border border-gray-400 px-4 py-2 rounded-lg absolute bottom-4 right-5">
          Read ➔
        </button>
      </div>

      <div className="flex flex-col min-h-[400px] bg-gray-800 rounded-xl overflow-hidden relative">
        <Image src="/blogimg2.png" width={900} height={900} alt="team" className="h-[50%] w-full object-cover" />
        {/* Content Container */}
        <div className="p-7 flex flex-col gap-3 flex-grow">
          <p className="text-gray-400 text-[1em]">Agile</p>
          <h2 className="text-[1.6em] font-bold leading-tight">0 to 1 + 1 to n</h2>
        </div>
        {/* Button at absolute bottom-right */}
        <button className="text-[1em] font-bold border border-gray-400 px-4 py-2 rounded-lg absolute bottom-4 right-5">
          Read ➔
        </button>
      </div>

      <div className="flex flex-col min-h-[400px] bg-gray-800 rounded-xl overflow-hidden relative">
        <Image src="/blogimg3.png" width={900} height={900} alt="team" className="h-[50%] w-full object-cover" />
        {/* Content Container */}
        <div className="p-7 flex flex-col gap-3 flex-grow">
          <p className="text-gray-400 text-[1em]">AI / Machine Learning</p>
          <h2 className="text-[1.6em] font-bold leading-tight">Agents Are The New Apps</h2>
        </div>
        {/* Button at absolute bottom-right */}
        <button className="text-[1em] font-bold border border-gray-400 px-4 py-2 rounded-lg absolute bottom-4 right-5">
          Read ➔
        </button>
      </div>

      <div className="flex flex-col min-h-[400px] bg-gray-800 rounded-xl overflow-hidden relative">
        <Image src="/blogimg4.png" width={900} height={900} alt="team" className="h-[50%] w-full object-cover" />
        {/* Content Container */}
        <div className="p-7 flex flex-col gap-3 flex-grow">
          <p className="text-gray-400 text-[1em]">Development</p>
          <h2 className="text-[1.6em] font-bold leading-tight">
            Data-Driven: How Rootstrap Builds Software
          </h2>
        </div>
        {/* Button at absolute bottom-right */}
        <button className="text-[1em] font-bold border border-gray-400 px-4 py-2 rounded-lg absolute bottom-4 right-5">
          Read ➔
        </button>
      </div>

      <div className="flex flex-col min-h-[400px] bg-gray-800 rounded-xl overflow-hidden relative">
        <Image src="/blogimg5.png" width={900} height={900} alt="team" className="h-[50%] w-full object-cover" />
        {/* Content Container */}
        <div className="p-7 flex flex-col gap-3 flex-grow">
          <p className="text-gray-400 text-[1em]">AI / Machine Learning</p>
          <h2 className="text-[1.6em] font-bold leading-tight">
            What's In Our Inbox: AI Agent For Training Salespeople
          </h2>
        </div>
        {/* Button at absolute bottom-right */}
        <button className="text-[1em] font-bold border border-gray-400 px-4 py-2 rounded-lg absolute bottom-4 right-5">
          Read ➔
        </button>
      </div>

      <div className="flex flex-col min-h-[400px] bg-gray-800 rounded-xl overflow-hidden relative">
        <Image src="/blogimg6.png" width={900} height={900} alt="team" className="h-[50%] w-full object-cover" />
        {/* Content Container */}
        <div className="p-7 flex flex-col gap-3 flex-grow">
          <p className="text-gray-400 text-[1em]">AI / Machine Learning</p>
          <h2 className="text-[1.6em] font-bold leading-tight">
            AI Case Study: Driving User Engagement & Revenue for Hatch Coding
          </h2>
        </div>
        {/* Button at absolute bottom-right */}
        <button className="text-[1em] font-bold border border-gray-400 px-4 py-2 rounded-lg absolute bottom-4 right-5">
          Read ➔
        </button>
      </div>

      <div className="flex flex-col min-h-[400px] bg-gray-800 rounded-xl overflow-hidden relative">
        <Image src="/blogimg7.png" width={900} height={900} alt="team" className="h-[50%] w-full object-cover" />
        {/* Content Container */}
        <div className="p-7 flex flex-col gap-3 flex-grow">
          <p className="text-gray-400 text-[1em]">Development</p>
          <h2 className="text-[1.6em] font-bold leading-tight">
            The Expo revolution has begun: A Guide to Building Cross-Platform Mobile
          </h2>
        </div>
        {/* Button at absolute bottom-right */}
        <button className="text-[1em] font-bold border border-gray-400 px-4 py-2 rounded-lg absolute bottom-4 right-5">
          Read ➔
        </button>
      </div>

      <div className="flex flex-col min-h-[400px] bg-gray-800 rounded-xl overflow-hidden relative">
        <Image src="/blogimg9.png" width={900} height={900} alt="team" className="h-[50%] w-full object-cover" />
        {/* Content Container */}
        <div className="p-7 flex flex-col gap-3 flex-grow">
          <p className="text-gray-400 text-[1em]">AI / Machine Learning</p>
          <h2 className="text-[1.6em] font-bold leading-tight">Is AI changing the way we talk?</h2>
        </div>
        {/* Button at absolute bottom-right */}
        <button className="text-[1em] font-bold border border-gray-400 px-4 py-2 rounded-lg absolute bottom-4 right-5">
          Read ➔
        </button>
      </div>

      <div className="flex flex-col min-h-[400px] bg-gray-800 rounded-xl overflow-hidden relative">
        <Image src="/blogimg10.png" width={900} height={900} alt="team" className="h-[50%] w-full object-cover" />
        {/* Content Container */}
        <div className="p-7 flex flex-col gap-3 flex-grow">
          <p className="text-gray-400 text-[1em]">Development</p>
          <h2 className="text-[1.6em] font-bold leading-tight">SwiftUI List: A Complete Tutorial</h2>
        </div>
        {/* Button at absolute bottom-right */}
        <button className="text-[1em] font-bold border border-gray-400 px-4 py-2 rounded-lg absolute bottom-4 right-5">
          Read ➔
        </button>
      </div>
    </div>
  );
};

export default Cards;