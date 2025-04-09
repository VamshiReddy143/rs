"use client"

import React from 'react'

const MaskedVideo = () => {
  return (
    <div className='relative w-full h-screen bg-white overflow-hidden flex items-center justify-center'>
      {/* SVG Masks */}
      <svg width="0" height="0" className="absolute">
        <defs>
          {/* Award-Winning "D" Shape with Artistic Flair */}
          <clipPath id="dMask" clipPathUnits="objectBoundingBox">
            <path
              d="
                M 0 0
                V 1
                H 0.9
                A 0.45 0.5 0 0 1 0.5 0.9
                Q 0.3 0.7 0.1 0.5
                Q 0.2 0.3 0.4 0.1
                Z
              "
            />
          </clipPath>
          {/* Award-Winning "O" Shape with Layered Elegance */}
          <clipPath id="circleMask" clipPathUnits="objectBoundingBox">
            <path
              d="
                M 0.5 0
                A 0.5 0.5 0 0 1 1 0.5
                A 0.5 0.5 0 0 1 0.5 1
                A 0.48 0.48 0 0 0 0 0.5
                A 0.48 0.48 0 0 0 0.5 0
                Z
              "
            />
          </clipPath>
        </defs>
      </svg>

      {/* Video Container */}
      <div className='relative w-[1200px] h-[300px] overflow-hidden flex items-center justify-between'>
        {/* Video 1 - "D" Shape */}
        <div
          className='relative w-[300px] h-[300px] overflow-hidden border-4 border-gold-500 bg-gray-200 transition-all duration-300 hover:border-opacity-100'
          style={{ clipPath: 'url(#dMask)', WebkitClipPath: 'url(#dMask)' }}
        >
          <video
            src="/videos/homevideo.mp4" // Replace with your video path
            autoPlay
            muted
            loop
            playsInline
            className='w-full h-full object-cover'
          />
          <div className='absolute top-0 left-0 text-white bg-black bg-opacity-50 text-sm'>D1</div>
        </div>

        {/* Video 2 - "D" Shape */}
        <div
          className='relative w-[300px] h-[300px] overflow-hidden border-4 border-gold-500 bg-gray-200 transition-all duration-300 hover:border-opacity-100'
          style={{ clipPath: 'url(#dMask)', WebkitClipPath: 'url(#dMask)' }}
        >
          <video
            src="/videos/homevideo.mp4" // Same video
            autoPlay
            muted
            loop
            playsInline
            className='w-full h-full object-cover'
          />
          <div className='absolute top-0 left-0 text-white bg-black bg-opacity-50 text-sm'>D2</div>
        </div>

        {/* Video 3 - "D" Shape */}
        <div
          className='relative w-[300px] h-[300px] overflow-hidden border-4 border-gold-500 bg-gray-200 transition-all duration-300 hover:border-opacity-100'
          style={{ clipPath: 'url(#dMask)', WebkitClipPath: 'url(#dMask)' }}
        >
          <video
            src="/videos/homevideo.mp4" // Same video
            autoPlay
            muted
            loop
            playsInline
            className='w-full h-full object-cover'
          />
          <div className='absolute top-0 left-0 text-white bg-black bg-opacity-50 text-sm'>D3</div>
        </div>

        {/* Video 4 - "O" Shape (Full Circle) */}
        <div
          className='relative w-[300px] h-[300px] overflow-hidden border-4 border-gold-500 bg-gray-200 transition-all duration-300 hover:border-opacity-100'
          style={{ clipPath: 'url(#circleMask)', WebkitClipPath: 'url(#circleMask)' }}
        >
          <video
            src="/videos/homevideo.mp4" // Same video
            autoPlay
            muted
            loop
            playsInline
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 flex items-center justify-center text-white text-xl font-bold bg-black bg-opacity-50'>
            Our Product Is
          </div>
          <div className='absolute top-0 left-0 text-white bg-black bg-opacity-50 text-sm'>O</div>
        </div>
      </div>

      {/* Add more content to enable scrolling (optional) */}
      <div className='h-[1000px]'></div>
    </div>
  )
}

export default MaskedVideo