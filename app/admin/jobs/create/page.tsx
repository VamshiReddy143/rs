"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import CKEditorWrapper from "@/components/CKEditorWrapper";

const inputStyle =
  "bg-[#3d3d3f] p-4 w-full rounded-lg border border-gray-600 focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white placeholder-gray-400 text-sm sm:text-base";

const CreateJobPage: React.FC = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [employmentType, setEmploymentType] = useState("Full-Time");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const isEditing = !!params.id;

  useEffect(() => {
    if (isEditing) {
      const fetchJob = async () => {
        try {
          const response = await fetch(`/api/jobs/${params.id}`);
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          const job = await response.json();
          setJobTitle(job.title || "");
          setJobLocation(job.location || "");
          setJobDescription(job.description || "");
          setEmploymentType(job.employmentType || "Full-Time");
          setDepartment(job.department || "");
        } catch (error) {
          toast.error("Error fetching job");
        }
      };
      fetchJob();
    }
  }, [isEditing, params.id]);

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Check for missing required fields, including empty CKEditor input
    const isDescriptionEmpty = !jobDescription || jobDescription.trim() === "" || jobDescription === "<p></p>";
    console.log("Validation:", {
      jobTitle,
      jobLocation,
      jobDescription,
      isDescriptionEmpty,
      department,
    }); // Debug log
    if (!jobTitle || !jobLocation || isDescriptionEmpty || !department) {
      toast.error("Please fill all required fields");
      // Delay to ensure toast renders
      setTimeout(() => {
        setLoading(false);
      }, 300);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", jobTitle);
      formData.append("location", jobLocation);
      formData.append("description", jobDescription);
      formData.append("employmentType", employmentType);
      formData.append("department", department);

      const url = isEditing ? `/api/jobs/${params.id}` : "/api/jobs";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, { method, body: formData });
      if (!response.ok) throw new Error(`Failed to ${isEditing ? "update" : "create"} job`);

      toast.success(`Job ${isEditing ? "updated" : "created"} successfully!`);
      console.log("Redirecting to /admin?tab=jobs"); // Debug log
      router.push("/admin?tab=jobs");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Error: ${message}`);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#191a1b] text-white pt-[7em] flex justify-center">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick theme="dark" />
      <div className="max-w-4xl w-full mx-auto bg-[#191a1b] rounded-xl shadow-2xl p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#f6ff7a] mb-6">
          {isEditing ? "Edit Job" : "Create Job"}
        </h1>
        <form onSubmit={handleJobSubmit} className="space-y-6 sm:space-y-8">
          <div>
            <label htmlFor="jobTitle" className="block text-base sm:text-lg font-medium mb-2 text-gray-200">
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
              className={`${inputStyle} text-sm sm:text-base`}
              placeholder="Enter job title"
            />
          </div>
          <div>
            <label htmlFor="jobLocation" className="block text-base sm:text-lg font-medium mb-2 text-gray-200">
              Location
            </label>
            <input
              type="text"
              id="jobLocation"
              value={jobLocation}
              onChange={(e) => setJobLocation(e.target.value)}
              required
              className={`${inputStyle} text-sm sm:text-base`}
              placeholder="Enter job location"
            />
          </div>
          <div>
            <label htmlFor="jobDescription" className="block text-base sm:text-lg font-medium mb-2 text-gray-200">
              Description
            </label>
            <div className="ck-editor-container">
              <CKEditorWrapper
                data={jobDescription}
                onChange={(data) => setJobDescription(data)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="employmentType" className="block text-base sm:text-lg font-medium mb-2 text-gray-200">
              Employment Type
            </label>
            <select
              id="employmentType"
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value)}
              className={`${inputStyle} text-sm sm:text-base`}
            >
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div>
            <label htmlFor="department" className="block text-base sm:text-lg font-medium mb-2 text-gray-200">
              Department
            </label>
            <select
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
              className={`${inputStyle} text-sm sm:text-base`}
            >
              <option value="" disabled>
                Select department
              </option>
              <option value="Data">Data</option>
              <option value="Design">Design</option>
              <option value="DevOps">DevOps</option>
              <option value="Engineering Team">Engineering Team</option>
              <option value="Operations">Operations</option>
              <option value="Other">Other</option>
              <option value="People Team">People Team</option>
              <option value="Product">Product</option>
              <option value="QA">QA</option>
            </select>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="flex-1 py-3 sm:py-4 bg-[#f6ff7a] hover:bg-[#AAB418] text-black font-bold rounded-lg disabled:opacity-50 text-sm sm:text-base"
            >
              {loading ? (isEditing ? "Updating..." : "Creating...") : isEditing ? "Update Job" : "Create Job"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => {
                console.log("Cancel: Redirecting to /admin?tab=jobs"); // Debug log
                router.push("/admin?tab=jobs");
              }}
              className="flex-1 py-3 sm:py-4 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500 text-sm sm:text-base"
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJobPage;