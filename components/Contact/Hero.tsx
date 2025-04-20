"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

const Hero: React.FC = () => {
  // Stable reference to today's date (April 11, 2025, based on your input)
  const todayRef = useRef(new Date("2025-04-11"));
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // State to manage the current week offset, available dates, and number of dates to show
  const [currentWeek, setCurrentWeek] = useState<number>(0);
  const [availableDates, setAvailableDates] = useState<{ day: string; date: string }[]>([]);
  const [dateCount, setDateCount] = useState(5); // Default to 5, updated by useEffect

  // Function to generate future weekdays
  const getFutureWeekdays = () => {
    const dates: { day: string; date: string }[] = [];
    let currentDate = new Date(todayRef.current);
    currentDate.setDate(todayRef.current.getDate()); // Start from today

    // Look ahead for 6 weeks (42 days)
    for (let i = 0; i < 42; i++) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + i);

      // Check if date is in the future and not Saturday (6) or Sunday (0)
      if (
        nextDate > todayRef.current &&
        nextDate.getDay() !== 0 && // Sunday
        nextDate.getDay() !== 6 // Saturday
      ) {
        const dayName = days[nextDate.getDay()];
        const month = nextDate.toLocaleString("en-US", { month: "short" });
        const date = nextDate.getDate();
        dates.push({ day: dayName, date: `${month} ${date}` });
      }
    }
    return dates;
  };

  // Set initial available dates on mount and determine date count based on screen size
  useEffect(() => {
    setAvailableDates(getFutureWeekdays());
    // Set initial date count based on window width
    const handleResize = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 768) setDateCount(3); // Mobile: 3 dates
        else if (window.innerWidth < 1024) setDateCount(4); // md: 4 dates
        else setDateCount(5); // lg and above: 5 dates
      }
    };
    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize); // Update on resize
    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  // Function to navigate to previous week
  const prevWeek = () => {
    if (currentWeek > 0) setCurrentWeek(currentWeek - 1);
  };

  // Function to navigate to next week
  const nextWeek = () => {
    if (currentWeek < availableDates.length - dateCount) setCurrentWeek(currentWeek + 1);
  };

  return (
    <div className="lg:pt-[10%] md:mt-[4em] mt-10 p-5 lg:min-h-screen px-2 text-white bg-[#191a1b]">
      <div className="flex flex-col lg:flex-row justify-between gap-8 pt-5 lg:pt-0">
        <div className="w-full lg:w-1/2">
          <h1  style={{ fontFamily: 'Poppins, sans-serif' }} className="lg:text-[3em] text-[2em] font-bold">Let&apos;s Build Together</h1>
          <p className="lg:text-[18px] text-[15px] text-[#BCBCC0] mt-10">
            Tell us about your project and we’ll get back to you as soon as possible:
          </p>
          <form action="" className="mt-3 flex flex-col gap-2">
            <input
              type="text"
              className="bg-[#3d3d3f] p-4 w-full rounded-t-lg border-b-2 border-transparent focus:outline-none focus:border-[#f6ff7a] transition-all duration-300"
              placeholder="Name *"
            />
            <input
              type="text"
              className="bg-[#3d3d3f] p-4 w-full rounded-t-lg border-b-2 border-transparent focus:outline-none focus:border-[#f6ff7a] transition-all duration-300"
              placeholder="Email *"
            />
            <input
              type="text"
              className="bg-[#3d3d3f] p-4 w-full rounded-t-lg border-b-2 border-transparent focus:outline-none focus:border-[#f6ff7a] transition-all duration-300"
              placeholder="Company *"
            />
            <textarea
              className="bg-[#3d3d3f] p-4 w-full rounded-t-lg border-b-2 border-transparent focus:outline-none focus:border-[#f6ff7a] transition-all duration-300"
              placeholder="Tell us what you're looking for? *"
            />
          </form>
          {/* Date Selector Section */}
          <div className="mt-2 bg-[#3d3d3f] p-4 rounded-lg">
            <p className="text-sm text-gray-400">Schedule a meeting with our experts:</p>
            <div className="mt-2 bg-[#242425] p-5 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="text-[#969699]">Select a day</span>
                <div className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded-full bg-[#f6ff7a] z-10" />
                  <span className="text-[#969699]">30 min meeting</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <button
                  onClick={prevWeek}
                  className="text-gray-400 hover:text-white focus:outline-none cursor-pointer"
                  disabled={currentWeek === 0}
                >
                  {"◁"}
                </button>
                <div className="flex gap-4">
                  {availableDates.slice(currentWeek, currentWeek + dateCount).map((day, index) => (
                    <button
                      key={index}
                      className="bg-[#242425] px-3 py-2 rounded-lg text-sm text-[#969699] border-1 border-[#969699] "
                    >
                      <span className="text-[18px] leading-[32px] font-medium">{day.day}</span> <br /> {day.date}
                    </button>
                  ))}
                </div>
                <button
                  onClick={nextWeek}
                  className="text-gray-400 hover:text-white focus:outline-none cursor-pointer"
                  disabled={currentWeek >= availableDates.length - dateCount}
                >
                  {"▷"}
                </button>
              </div>
              <div className="flex items-center justify-between mt-5 text-sm">
                <div className="flex gap-2">
                  <select className=" p-2 rounded-lg  outline-none">
                    <option>Timezone - EST</option>
                    <option>Timezone - PST</option>
                    <option>Timezone - GMT</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <button className="bg-[#f6ff7a] text-black p-3 w-full mt-2 rounded-lg text-[1em] font-bold">
            Send
          </button>
        </div>

        <div className="lg:w-[20em] h-fit bg-[#242425] p-7 rounded-xl">
          <div>
            <div className="flex gap-7">
              <Image src="/client11.jpg" alt="team" height={900} width={900} className="lg:h-[8em] lg:w-[8em]" />
              <Image src="/client12.jpg" alt="team" height={900} width={900} className="lg:h-[8em] lg:w-[8em]" />
            </div>
            <div>
              <p className="text-[17px] font-normal text-[#969699] mt-3 w-full leading-[32px]">
                Meet our Principal Engineers for an assessment of your needs.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <h2  style={{ fontFamily: 'Poppins, sans-serif' }} className="text-[22px] font-semibold">What will happen next?</h2>
            <div className="steps-container flex flex-col gap-[3em] mt-10 relative">
              <div className="flex gap-10 items-center">
                <span className="h-3 w-3 rounded-full bg-[#f6ff7a] z-10" />
                <p className="text-[16px] font-medium text-gray-200">Technical consultation</p>
              </div>
              <div className="flex gap-10 items-center">
                <span className="h-3 w-3 rounded-full bg-[#f6ff7a] z-10" />
                <p>Connect with the team</p>
              </div>
              <div className="flex gap-10 items-center">
                <span className="h-3 w-3 rounded-full bg-[#f6ff7a] z-10" />
                <p>Onboarding the team</p>
              </div>
              <div className="flex gap-10 items-center">
                <span className="h-3 w-3 rounded-full bg-[#f6ff7a] z-10" />
                <p>Kick off your project</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;