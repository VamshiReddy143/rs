"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Job {
  _id: string;
  title: string;
  location: string;
  employmentType: string;
}

const Challenges: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/jobs");
        if (!response.ok) throw new Error("Failed to fetch jobs");
        const data = await response.json();
        setJobs(data);
      } catch (error: any) {
        console.error("Error fetching jobs:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div id="jobs" style={{ fontFamily: "Poppins, sans-serif" }} className="lg:p-[10%] p-5 lg:min-h-screen flex flex-col lg:flex-row justify-between px-2 bg-gray-100 pt-[7em] text-black">
      <div className="w-full lg:w-[40%] mb-6 lg:mb-0">
        <h2 className="lg:text-[1.5rem] text-[21px] md:text-[32px] font-medium lg:leading-[38px]">Are you up for these</h2>
        <h1 className="lg:text-[2rem] text-[42px] md:text-[64px] font-semibold lg:leading-[77px]">challenges?</h1>
        <div className="h-[3px] w-[60px] bg-black rounded-full mt-4" />
      </div>

      <div className="w-full lg:w-[60%]">
        {loading ? (
          <p className="text-[#6f6f6e] text-[1rem] md:text-[20px]">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-[#6f6f6e] text-[1rem] md:text-[20px]">No jobs available.</p>
        ) : (
          jobs.map((job) => (
            <div key={job._id}>
              <div className="lg:flex justify-between items-center p-3 pt-5">
                <div>
                  <h2 className="text-[1.5rem] md:text-[32px] font-medium leading-[48px]">{job.title}</h2>
                  <p className="text-[#6f6f6e] text-[1rem] md:text-[20px] leading-[30px]">{job.location} · {job.employmentType}</p>
                </div>
                <div>
                  <Link href={`/jobs/${job._id}`}>
                    <h3 className="apply-now bg-[#FFC83F] py-1 px-1 lg:bg-transparent mt-4 text-[1.2rem] md:text-[24px] font-semibold cursor-pointer leading-[36px] hover:bg-yellow-500 lg:hover:bg-[#FFC83F] lg:hover:text-black lg:hover:p-2 rounded-lg transition-all">
                      Apply now
                    </h3>
                  </Link>
                </div>
              </div>
              <div className="h-[1px] w-full bg-[#6f6f6e] rounded-full mt-3 ml-2" />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Challenges;