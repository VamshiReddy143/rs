"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

const Hero: React.FC = () => {
  // Stable reference to current date (April 24, 2025)
  const todayRef = useRef(new Date("2025-04-24"));
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [timezone, setTimezone] = useState("EST");
  const [loading, setLoading] = useState(false);
  const [formStatus, setFormStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Date selector states
  const [currentWeek, setCurrentWeek] = useState<number>(0);
  const [availableDates, setAvailableDates] = useState<{ day: string; date: string }[]>([]);
  const [dateCount, setDateCount] = useState(5); // Default to 5, updated by useEffect

  // Router for redirect
  const router = useRouter();

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "");
  }, []);

  // Clear success message and redirect after 5 seconds
  useEffect(() => {
    if (formStatus?.type === "success") {
      const timer = setTimeout(() => {
        setFormStatus(null);
        router.push("/SuccessPage");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [formStatus, router]);

  // Function to generate future weekdays from current date
  const getFutureWeekdays = () => {
    const dates: { day: string; date: string }[] = [];
    const currentDate = new Date(todayRef.current);

    // Look ahead for 12 weeks (84 days)
    for (let i = 0; i < 84; i++) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + i);

      // Include current day and future weekdays (exclude Sat and Sun)
      if (
        nextDate >= todayRef.current &&
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

  // Set initial available dates and handle responsive date count
  useEffect(() => {
    setAvailableDates(getFutureWeekdays());
    const handleResize = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 768) setDateCount(3); // Mobile: 3 dates
        else if (window.innerWidth < 1024) setDateCount(4); // md: 4 dates
        else setDateCount(5); // lg and above: 5 dates
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navigate to previous week
  const prevWeek = () => {
    if (currentWeek > 0) setCurrentWeek(currentWeek - 1);
  };

  // Navigate to next week
  const nextWeek = () => {
    if (currentWeek < availableDates.length - dateCount) setCurrentWeek(currentWeek + 1);
  };

  // Handle form submission with EmailJS
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormStatus(null);

    // Validate required fields
    if (!name || !email || !company || !message) {
      setFormStatus({ type: "error", message: "Please fill all required fields." });
      setLoading(false);
      return;
    }

    try {
      const templateParams = {
        name,
        email,
        company,
        message,
        date: selectedDate || "Not selected",
        timezone,
      };

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        templateParams
      );

      setFormStatus({ type: "success", message: "Message sent successfully!" });
      // Reset form
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
      setSelectedDate("");
      setTimezone("EST");
    } catch (error: any) {
      setFormStatus({ type: "error", message: "Failed to send message." });
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
                <div className="flex items-center justify-between mt-3">
                  <button
                    onClick={prevWeek}
                    className="text-gray-400 hover:text-white focus:outline-none cursor-pointer"
                    disabled={currentWeek === 0}
                  >
                    {"◁"}
                  </button>
                  <div className="flex gap-4">
                    {availableDates.length === 0 ? (
                      <p className="text-[#969699] text-sm">No available dates.</p>
                    ) : (
                      availableDates.slice(currentWeek, currentWeek + dateCount).map((day, index) => (
                        <button
                          key={index}
                          type="button"
                          className={`bg-[#242425] px-3 py-2 rounded-lg text-sm text-[#969699] border-1 ${
                            selectedDate === `${day.day}, ${day.date}`
                              ? "border-[#f6ff7a]"
                              : "border-[#969699]"
                          }`}
                          onClick={() => setSelectedDate(`${day.day}, ${day.date}`)}
                        >
                          <span className="text-[18px] leading-[32px] font-medium">{day.day}</span> <br /> {day.date}
                        </button>
                      ))
                    )}
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
                    <select
                      className="p-2 rounded-lg outline-none"
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                    >
                      <option>Timezone - EST</option>
                      <option>Timezone - PST</option>
                      <option>Timezone - GMT</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {/* Form Status */}
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
              className="bg-[#f6ff7a] text-black p-3 w-full mt-2 rounded-lg text-[1em] font-bold"
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
    </div>
  );
};

export default Hero;