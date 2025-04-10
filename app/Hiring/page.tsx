"use client";

import Clients from '@/components/Hiring/Clients';
import Fun from '@/components/Hiring/Fun';
import Hero from '@/components/Hiring/Hero';
import Team from '@/components/Hiring/Team';
import Challenges from '@/components/Hiring/Challenges';
import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const LocomotiveScroll = dynamic(() => import('locomotive-scroll'), {
  ssr: false,
});

const Page = () => {
  const scrollRef = useRef(null);
  const locoScrollRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !scrollRef.current) return;

    import('locomotive-scroll').then((LocomotiveScrollModule) => {
      const LocomotiveScroll = LocomotiveScrollModule.default;
      
      locoScrollRef.current = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        multiplier: 1,
        lerp: 0.06,
      });

      // Update scroll height after initialization
      setTimeout(() => {
        if (locoScrollRef.current) {
          locoScrollRef.current.update();
        }
      }, 100);

      return () => {
        if (locoScrollRef.current) {
          locoScrollRef.current.destroy();
        }
      };
    });
  }, [isClient]);

  if (!isClient) {
    return (
      <div className=''>
        <Hero />
        <Clients />
        <Team />
        <Fun />
        <Challenges />
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      data-scroll-container
      className="bg-white"
    >
      <div data-scroll data-scroll-speed="2" data-scroll-position="top">
        <Hero />
      </div>
      <div data-scroll data-scroll-speed="1.5" data-scroll-position="top">
        <Clients />
      </div>
      <div data-scroll data-scroll-speed="1.5" data-scroll-position="top">
        <Team />
      </div>
      <div data-scroll data-scroll-speed="1" data-scroll-position="top">
        <Fun />
      </div>
      <div data-scroll data-scroll-speed="2" data-scroll-position="top">
        <Challenges />
      </div>
    </div>
  );
};

export default Page;