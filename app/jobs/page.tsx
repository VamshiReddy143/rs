"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import Link from "next/link";

interface Job {
  _id: string;
  title: string;
  department: string;
  location: string;
  description: string;
  employmentType: string;
  postedDate: string;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedOffices, setSelectedOffices] = useState<string[]>([]);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [isOfficeOpen, setIsOfficeOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const departmentDropdownRef = useRef<HTMLDivElement>(null);
  const officeDropdownRef = useRef<HTMLDivElement>(null);

  const departments = [
    "Data",
    "Design",
    "DevOps",
    "Engineering Team",
    "Operations",
    "Other",
    "People Team",
    "Product",
    "QA",
  ];

  const offices = ["Argentina", "Colombia", "Uruguay", "Remote"];

  // Fetch jobs on mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/jobs");
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();
        setJobs(data);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Click outside handler for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        departmentDropdownRef.current &&
        !departmentDropdownRef.current.contains(event.target as Node)
      ) {
        setIsDepartmentOpen(false);
      }
      if (
        officeDropdownRef.current &&
        !officeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsOfficeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter jobs based on search query, departments, and offices
  const filteredJobs = jobs.filter((job) => {
    // Filter by department
    if (selectedDepartments.length > 0 && !selectedDepartments.includes(job.department)) {
      return false;
    }

    // Filter by office
    if (selectedOffices.length > 0) {
      const jobLocations = job.location.split("/").map((loc) => loc.trim());
      const hasMatchingOffice = selectedOffices.some((office) =>
        jobLocations.some((loc) => loc.includes(office))
      );
      if (!hasMatchingOffice) return false;
    }

    // Filter by search query
    if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    return true;
  });

  const toggleDepartment = (department: string) => {
    if (selectedDepartments.includes(department)) {
      setSelectedDepartments(selectedDepartments.filter((item) => item !== department));
    } else {
      setSelectedDepartments([...selectedDepartments, department]);
    }
  };

  const toggleOffice = (office: string) => {
    if (selectedOffices.includes(office)) {
      setSelectedOffices(selectedOffices.filter((item) => item !== office));
    } else {
      setSelectedOffices([...selectedOffices, office]);
    }
  };

  const removeDepartment = (department: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDepartments(selectedDepartments.filter((item) => item !== department));
  };

  const removeOffice = (office: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedOffices(selectedOffices.filter((item) => item !== office));
  };

  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }} className="bg-gray-100 min-h-screen text-black pt-[5em]">
      <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-[40px] leading-[52px] font-normal text-left mb-16">Current openings at Rootstrap</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Search */}
          <div>
            <h2 className="text-[13px] font-semibold leading-[18px] mb-2">Search</h2>
            <div className="relative">
              <input
                type="text"
                className="w-full border-1 border-gray-400 focus:outline-none rounded-md py-2 px-4 focus:outline-none  focus:border-b-[#FFC83F] "
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Department Dropdown */}
          <div ref={departmentDropdownRef}>
            <h2 className="text-[13px] font-semibold leading-[18px] mb-2">Department</h2>
            <div className="relative">
              <div
                className="w-full  border-1 border-gray-400 rounded-md py-2 px-4 flex items-center justify-between cursor-pointer bg-white   hover:border-b-[#FFC83F]"
                onClick={() => setIsDepartmentOpen(!isDepartmentOpen)}
              >
                <div className="flex flex-wrap gap-1">
                  {selectedDepartments.length === 0 ? (
                    <span className="text-gray-500">Select departments</span>
                  ) : (
                    selectedDepartments.map((dept) => (
                      <span
                        key={dept}
                        className="inline-flex items-center bg-gray-100 text-gray-800 px-2 py-0.5 rounded mr-1"
                      >
                        {dept}
                        <X
                          size={16}
                          className="ml-1 cursor-pointer"
                          onClick={(e) => removeDepartment(dept, e)}
                        />
                      </span>
                    ))
                  )}
                </div>
                <div>{isDepartmentOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</div>
              </div>

              {isDepartmentOpen && (
                <div className="absolute z-10 w-full mt-1 max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
                  {departments.map((dept) => (
                    <div
                      key={dept}
                      className={`px-4 py-2 cursor-pointer hover:bg-orange-100 ${
                        selectedDepartments.includes(dept) ? "bg-orange-50" : ""
                      }`}
                      onClick={() => toggleDepartment(dept)}
                    >
                      {dept}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Office Dropdown */}
          <div ref={officeDropdownRef}>
            <h2 className="text-[13px] font-semibold leading-[18px] mb-2">Office</h2>
            <div className="relative">
              <div
                className="w-full  border-1 border-gray-400 rounded-md py-2 px-4 flex items-center justify-between cursor-pointer bg-white hover:border-b-[#FFC83F]"
                onClick={() => setIsOfficeOpen(!isOfficeOpen)}
              >
                <div className="flex flex-wrap gap-1">
                  {selectedOffices.length === 0 ? (
                    <span className="text-gray-500">Select offices</span>
                  ) : (
                    selectedOffices.map((office) => (
                      <span
                        key={office}
                        className="inline-flex items-center bg-gray-100 text-gray-800 px-2 py-0.5 rounded mr-1"
                      >
                        {office}
                        <X
                          size={16}
                          className="ml-1 cursor-pointer"
                          onClick={(e) => removeOffice(office, e)}
                        />
                      </span>
                    ))
                  )}
                </div>
                <div>{isOfficeOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</div>
              </div>

              {isOfficeOpen && (
                <div className="absolute z-10 w-full mt-1 max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
                  {offices.map((office) => (
                    <div
                      key={office}
                      className={`px-4 py-2 cursor-pointer hover:bg-orange-100 ${
                        selectedOffices.includes(office) ? "bg-orange-50" : ""
                      }`}
                      onClick={() => toggleOffice(office)}
                    >
                      {office}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading jobs...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <>
              <h2 className="text-[32px] font-normal  mb-4">
                {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"}
              </h2>

              {Object.entries(
                filteredJobs.reduce((acc, job) => {
                  if (!acc[job.department]) {
                    acc[job.department] = [];
                  }
                  acc[job.department].push(job);
                  return acc;
                }, {} as Record<string, Job[]>)
              ).map(([dept, deptJobs]) => (
                <div key={dept} className="">
                  <h3 className="text-[24px] font-normal pb-10 pt-10">{dept}</h3>
                  <div className="">
                    {deptJobs.map((job) => (
                         <Link key={job._id} href={`/jobs/${job._id}`}>
                      <div  className="border-b-1 border-gray-400  cursor-pointer hover:bg-[#FFC83F] px-1 py-4 ">
                        <h4 className="text-lg font-bold hover:underline">{job.title}</h4>
                        <p className="text-gray-700">{job.location}</p>
                      </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              {filteredJobs.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No jobs found matching your criteria.</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-6 text-center text-sm text-gray-600">
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="flex items-center">
              <span>Powered by</span>
              <Link
                href="https://www.greenhouse.io"
                target="_blank"
                rel="noopener"
                className="ml-1 text-green-600 hover:underline"
              >
                greenhouse
              </Link>
            </div>
            <div>
              <span>Read our</span>
              <Link href="/PrivacyPolicy/#cookies" className="ml-1 text-gray-800 hover:underline">
                Privacy Policy
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}