"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  const todayRef = useRef(new Date());
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [timezone, setTimezone] = useState("EST");
  const [loading, setLoading] = useState(false);
  const [formStatus, setFormStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Date selector states
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [availableDates, setAvailableDates] = useState<{ day: string; date: string }[]>([]);
  const dateContainerRef = useRef<HTMLDivElement>(null);
  const [dateCount, setDateCount] = useState(3); // Default to 3 for small screens
  const velocityRef = useRef(0);
  const lastTouchXRef = useRef(0);
  const isDraggingRef = useRef(false);

  const router = useRouter();

  // Time slots
  const timeSlots = [
    "11:30 AM - 12:00 PM",
    "12:00 PM - 12:30 PM",
    "12:30 PM - 01:00 PM",
    "01:00 PM - 01:30 PM",
    "02:00 PM - 02:30 PM",
    "02:30 PM - 03:00 PM",
    "03:00 PM - 03:30 PM",
    "03:30 PM - 04:00 PM",
    "04:00 PM - 04:30 PM",
    "04:30 PM - 05:00 PM",
  ];

  // Update dateCount based on screen size
  useEffect(() => {
    const updateDateCount = () => {
      if (window.innerWidth >= 1024) {
        setDateCount(6); // lg screens
      } else if (window.innerWidth >= 768) {
        setDateCount(5); // md screens
      } else {
        setDateCount(3); // small screens
      }
    };

    updateDateCount();
    window.addEventListener("resize", updateDateCount);
    return () => window.removeEventListener("resize", updateDateCount);
  }, []);

  useEffect(() => {
    if (formStatus?.type === "success") {
      const timer = setTimeout(() => {
        setFormStatus(null);
        router.push("/SuccessPage");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [formStatus, router]);

  const getFutureWeekdays = () => {
    const dates: { day: string; date: string }[] = [];
    const currentDate = new Date();
    todayRef.current = new Date();

    for (let i = 0; i < 84; i++) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + i);

      if (
        nextDate >= new Date(currentDate.setHours(0, 0, 0, 0)) &&
        nextDate.getDay() !== 0 &&
        nextDate.getDay() !== 6
      ) {
        const dayName = days[nextDate.getDay()];
        const month = nextDate.toLocaleString("en-US", { month: "short" });
        const date = nextDate.getDate();
        dates.push({ day: dayName, date: `${month} ${date}` });
      }
    }
    return dates;
  };

  useEffect(() => {
    const updateDates = () => {
      const newDates = getFutureWeekdays();
      setAvailableDates(newDates);
      if (currentIndex >= newDates.length - dateCount) {
        setCurrentIndex(Math.max(0, newDates.length - dateCount));
      }
    };

    updateDates();

    const interval = setInterval(() => {
      const today = new Date();
      if (today.getDate() !== todayRef.current.getDate()) {
        updateDates();
      }
    }, 1000 * 60 * 60);

    return () => clearInterval(interval);
  }, [currentIndex, dateCount]);

  useEffect(() => {
    if (dateContainerRef.current) {
      const itemWidth = dateContainerRef.current.querySelector("button")?.clientWidth || 0;
      const gapWidth = 16; // 4rem in pixels
      const translateAmount = currentIndex * (itemWidth + gapWidth);
      dateContainerRef.current.style.transform = `translateX(-${translateAmount}px)`;
    }
  }, [currentIndex, dateCount]);

  const prevDate = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const nextDate = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentIndex < availableDates.length - dateCount) setCurrentIndex(currentIndex + 1);
  };

  const handleDateSelect = (e: React.MouseEvent, date: string) => {
    e.preventDefault();
    setSelectedDate(date);
    setSelectedTime(timeSlots[0]); // Automatically select the first time slot
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    lastTouchXRef.current = e.touches[0].clientX;
    velocityRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - lastTouchXRef.current;
    velocityRef.current = deltaX;
    lastTouchXRef.current = currentX;

    if (dateContainerRef.current) {
      const itemWidth = dateContainerRef.current.querySelector("button")?.clientWidth || 0;
      const gapWidth = 16;
      const maxIndex = Math.max(0, availableDates.length - dateCount);
      const currentTranslate = currentIndex * (itemWidth + gapWidth);
      const newTranslate = currentTranslate - deltaX;
      const newIndex = Math.round(newTranslate / (itemWidth + gapWidth));
      if (newIndex >= 0 && newIndex <= maxIndex) {
        dateContainerRef.current.style.transform = `translateX(-${newTranslate}px)`;
      }
    }
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    if (dateContainerRef.current) {
      const itemWidth = dateContainerRef.current.querySelector("button")?.clientWidth || 0;
      const gapWidth = 16;
      const maxIndex = Math.max(0, availableDates.length - dateCount);
      const momentum = velocityRef.current * 0.1;
      const currentTranslate = currentIndex * (itemWidth + gapWidth) - momentum;
      let newIndex = Math.round(currentTranslate / (itemWidth + gapWidth));
      newIndex = Math.max(0, Math.min(newIndex, maxIndex));
      setCurrentIndex(newIndex);
    }
  };

  const handleTimeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "") {
      setSelectedTime("");
    } else {
      setSelectedTime(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormStatus(null);

    const missingFields: string[] = [];
    if (!name) missingFields.push("Name");
    if (!email) missingFields.push("Email");
    if (!company) missingFields.push("Company");
    if (!message) missingFields.push("Message");
    if (selectedDate && !selectedTime) missingFields.push("Time slot");

    if (missingFields.length > 0) {
      const formattedMessage =
        missingFields.length === 1
          ? `${missingFields[0]} is required.`
          : `${missingFields.slice(0, -1).join(", ")} and ${missingFields[missingFields.length - 1]} are required.`;
      setFormStatus({ type: "error", message: formattedMessage });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/send-contactmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          company,
          message,
          date: selectedDate || "Not selected",
          time: selectedTime || "Not selected",
          timezone,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setFormStatus({ type: "success", message: "Message sent successfully!" });
        setName("");
        setEmail("");
        setCompany("");
        setMessage("");
        setSelectedDate("");
        setSelectedTime("");
        setTimezone("EST");
      } else {
        throw new Error(result.message || "Failed to send message.");
      }
    } catch (error: any) {
      setFormStatus({ type: "error", message: error.message || "Failed to send message." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:pt-[10%] md:mt-[4em] mt-10 p-5 lg:min-h-screen px-2 text-white bg-[#191a1b]">
      <div className="flex flex-col lg:flex-row justify-between gap-8 pt-5 lg:pt-0">
        <div className="w-full lg:w-1/2">
          <h1 style={{ fontFamily: "Poppins, sans-serif" }} className="lg:text-[3em] text-[2em] font-bold">
            Let's Build Together
          </h1>
          <p className="lg:text-[18px] text-[15px] text-[#BCBCC0] mt-10">
            Tell us about your project and we’ll get back to you as soon as possible:
          </p>
          <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-2">
            <input
              type="text"
              className="bg-[#3d3d3f] p-4 w-full rounded-t-lg border-b-2 border-transparent focus:outline-none focus:border-[#f6ff7a] transition-all duration-300"
              placeholder="Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              className="bg-[#3d3d3f] p-4 w-full rounded-t-lg border-b-2 border-transparent focus:outline-none focus:border-[#f6ff7a] transition-all duration-300"
              placeholder="Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              className="bg-[#3d3d3f] p-4 w-full rounded-t-lg border-b-2 border-transparent focus:outline-none focus:border-[#f6ff7a] transition-all duration-300"
              placeholder="Company *"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
            <textarea
              className="bg-[#3d3d3f] p-4 w-full rounded-t-lg border-b-2 border-transparent focus:outline-none focus:border-[#f6ff7a] transition-all duration-300"
              placeholder="Tell us what you're looking for? *"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
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
                <div className="flex items-center justify-between mt-7">
                  <button
                    type="button"
                    onClick={prevDate}
                    className="text-gray-400 bg-[#242425] lg:px-4 hover:text-white focus:outline-none cursor-pointer"
                    disabled={currentIndex === 0}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <div
                    className="overflow-hidden flex-1 touch-pan-y relative"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    <div
                      ref={dateContainerRef}
                      className="flex gap-4 date-container"
                      style={{ transition: "transform 0.4s ease-out" }}
                    >
                      {availableDates.length === 0 ? (
                        <p className="text-[#969699]  text-sm">No available dates.</p>
                      ) : (
                        availableDates.map((day, index) => (
                          <button
                            key={`${day.day}-${day.date}-${index}`}
                            type="button"
                            className={`bg-[#242425] rounded-lg text-[14px] border-1 py-1  flex-shrink-0 snap-center w-[calc((100%-32px)/3)] md:w-[calc((100%-64px)/5)] lg:w-[calc((100%-80px)/6)] ${
                              selectedDate === `${day.day}, ${day.date}`
                                ? "bg-[#BCBCC0] text-[#3D3D3F]"
                                : "border-[#969699] text-[#969699]"
                            }`}
                            onClick={(e) => handleDateSelect(e, `${day.day}, ${day.date}`)}
                          >
                            <span className="text-[14px] leading-[24px] font-bold md:text-[16px] md:leading-[28px]">{day.day}</span>
                            <br />
                            <span className="text-[12px] leading-[20px] md:text-[14px] md:leading-[22px]">{day.date}</span>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={nextDate}
                    className="text-gray-400 bg-[#242425] lg:px-4 hover:text-white focus:outline-none cursor-pointer"
                    disabled={currentIndex >= availableDates.length - dateCount}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                <div className="md:flex md:items-center gap-[3em] mt-5 text-sm">
                  <div className="flex items-center">
                    <p style={{ fontFamily: "Poppins, sans-serif" }} className="text-[#969699]">Timezone-</p>
                    <select
                      className="rounded-lg outline-none font-bold text-[#f6ff7a]"
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                    >
                      <option>EST</option>
                      <option>PST</option>
                      <option>GMT</option>
                    </select>
                  </div>
                  <div
                    style={{ fontFamily: "Poppins, sans-serif" }}
                    className="rounded-lg mt-5 md:mt-0 text-left outline-none text-sm text-[#969699]"
                  >
                    <select
                      className="rounded-lg outline-none w-fit text-[#969699] p-1"
                      value={selectedTime}
                      onChange={handleTimeSelect}
                      required={!!selectedDate}
                    >
                      {!selectedDate && (
                        <option value="" className="placeholder-option">
                          Schedule Meeting
                        </option>
                      )}
                      {selectedDate &&
                        timeSlots.map((slot, index) => (
                          <option key={index} value={slot} className="text-gray-500 w-[50%]">
                            {slot}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {formStatus && (
              <p
                className={`mt-2 text-sm ${
                  formStatus.type === "success" ? "text-green-400" : "text-red-400"
                }`}
              >
                {formStatus.message}
              </p>
            )}
            <button
              type="submit"
              className="bg-[#f6ff7a] text-black p-3 w-full mt-2 rounded-lg text-[1em] transition-colors duration-300 hover:bg-[#AAB418] font-bold"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
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
            <h2 style={{ fontFamily: "Poppins, sans-serif" }} className="text-[22px] font-semibold">
              What will happen next?
            </h2>
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

      <style jsx>{`
        .date-container {
          display: flex;
          transition: transform 0.4s ease-out;
          scroll-snap-type: x mandatory;
          overscroll-behavior-x: contain;
          touch-action: pan-x;
        }
        .date-container > button {
          scroll-snap-align: start;
          flex: 0 0 auto;
          box-sizing: border-box;
          text-align: center;
          min-width: 0;
        }
        .date-container::-webkit-scrollbar {
          display: none;
        }
        .placeholder-option {
          color: #ffffff !important;
          background-color: #3b82f6 !important;
        }
        .touch-pan-y {
          position: relative;
          overflow: hidden;
          max-width: calc(100% - 64px); /* Adjust for arrow buttons */
        }
      `}</style>
    </div>
  );
};

export default Hero;