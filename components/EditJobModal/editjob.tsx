"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import CKEditorWrapper from "@/components/CKEditorWrapper";

import { Job } from "@/types/job";

interface Errors {
  [key: string]: string;
}

interface EditJobModalProps {
  jobData: Job;
  onUpdate: (updatedJob: Job) => void;
  onCancel: () => void;
}

const inputStyle =
  "bg-[#3d3d3f] p-4 w-full rounded-lg border border-gray-600 focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white placeholder-gray-400 text-sm sm:text-base";

const EditJobModal: React.FC<EditJobModalProps> = ({ jobData, onUpdate, onCancel }) => {
  const [jobTitle, setJobTitle] = useState(jobData.title);
  const [jobLocation, setJobLocation] = useState(jobData.location);
  const [jobDescription, setJobDescription] = useState(jobData.description);
  const [employmentType, setEmploymentType] = useState(jobData.employmentType || "Full-Time");
  const [department, setDepartment] = useState(jobData.department || "Other");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  // Define valid departments and employment types to match Job model enums
  const validDepartments = [
    "Design",
    "DevOps",
    "Engineering Team",
    "Operations",
    "Other",
    "People Team",
    "Product",
    "QA",
  ];
  const validEmploymentTypes = ["Full-Time", "Part-Time", "Contract", "Internship"];

  // Debug: Log jobData and validate department and employmentType
  useEffect(() => {
    console.log("jobData received:", jobData);
    // Validate department
    if (jobData.department && !validDepartments.includes(jobData.department)) {
      console.warn(`Invalid department value: ${jobData.department}. Defaulting to "Other".`);
      setDepartment("Other");
      toast.warn(`Invalid department "${jobData.department}" received. Defaulted to "Other".`);
    }
    // Validate employmentType
    if (jobData.employmentType && !validEmploymentTypes.includes(jobData.employmentType)) {
      console.warn(`Invalid employmentType value: ${jobData.employmentType}. Defaulting to "Full-Time".`);
      setEmploymentType("Full-Time");
      toast.warn(`Invalid employment type "${jobData.employmentType}" received. Defaulted to "Full-Time".`);
    }
  }, [jobData]);

  useEffect(() => {
    const newErrors: Errors = {};
    if (jobTitle && jobTitle.length < 3) newErrors.jobTitle = "Job title must be at least 3 characters";
    if (jobLocation && jobLocation.length < 3) newErrors.jobLocation = "Location must be at least 3 characters";
    if (jobDescription) {
      const strippedDescription = jobDescription.replace(/<[^>]+>/g, "").trim();
      if (strippedDescription.length === 0) newErrors.jobDescription = "Description cannot be empty";
    }
    if (!department) newErrors.department = "Department is required";
    if (!employmentType) newErrors.employmentType = "Employment type is required";
    setErrors(newErrors);
  }, [jobTitle, jobLocation, jobDescription, department, employmentType]);

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      toast.error("Please fix form errors before submitting");
      return;
    }
    setLoading(true);
    try {
      if (!jobTitle || !jobLocation || !jobDescription || !department || !employmentType) {
        throw new Error("Title, location, description, department, and employment type are required");
      }

      // Validate department and employmentType
      if (!validDepartments.includes(department)) {
        throw new Error(`Invalid department: ${department}`);
      }
      if (!validEmploymentTypes.includes(employmentType)) {
        throw new Error(`Invalid employment type: ${employmentType}`);
      }

      const formData = new FormData();
      formData.append("title", jobTitle);
      formData.append("location", jobLocation);
      formData.append("description", jobDescription);
      formData.append("employmentType", employmentType);
      formData.append("department", department);

      const response = await fetch(`/api/jobs/${jobData._id}`, {
        method: "PUT",
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update job");
      }

      const updatedJob = await response.json();
      onUpdate({
        ...jobData,
        title: jobTitle,
        location: jobLocation,
        description: jobDescription,
        employmentType: employmentType,
        department: department,
      });
      toast.success("Job updated successfully!"); // Toast displayed here
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#f6ff7a] mb-6">Edit Job</h1>
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
          {errors.jobTitle && <p className="text-red-400 text-sm mt-1">{errors.jobTitle}</p>}
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
          {errors.jobLocation && <p className="text-red-400 text-sm mt-1">{errors.jobLocation}</p>}
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
            <option value="">Select Department</option>
            {validDepartments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {errors.department && <p className="text-red-400 text-sm mt-1">{errors.department}</p>}
        </div>
        <div>
          <label htmlFor="jobDescription" className="block text-base sm:text-lg font-medium mb-2 text-gray-200">
            Description
          </label>
          <div className="rounded-lg overflow-hidden">
            <CKEditorWrapper
              data={jobDescription}
              onChange={(data) => setJobDescription(data)}
              index={0}
            />
          </div>
          {errors.jobDescription && <p className="text-red-400 text-sm mt-1">{errors.jobDescription}</p>}
        </div>
        <div>
          <label htmlFor="employmentType" className="block text-base sm:text-lg font-medium mb-2 text-gray-200">
            Employment Type
          </label>
          <select
            id="employmentType"
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
            required
            className={`${inputStyle} text-sm sm:text-base`}
          >
            <option value="">Select Employment Type</option>
            {validEmploymentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.employmentType && <p className="text-red-400 text-sm mt-1">{errors.employmentType}</p>}
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading || Object.keys(errors).length > 0}
            className="flex-1 py-3 sm:py-4 bg-[#f6ff7a] hover:bg-[#AAB418] text-black font-bold rounded-lg disabled:opacity-50 text-sm sm:text-base"
          >
            {loading ? "Updating..." : "Update Job"}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 sm:py-4 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500 text-sm sm:text-base"
          >
            Cancel
          </motion.button>
        </div>
      </form>
      <style jsx global>{`
        .ck-editor__editable {
          background-color: #3d3d3f !important;
          color: white !important;
          border: 1px solid #4b5563 !important;
          border-radius: 0.5rem !important;
          min-height: 150px !important;
          padding: 1rem !important;
        }
        .ck-editor__editable:focus {
          border-color: #f6ff7a !important;
          outline: none !important;
        }
        .ck-toolbar {
          background-color: #2d2d2f !important;
          border: 1px solid #4b5563 !important;
          border-bottom: none !important;
          border-radius: 0.5rem 0.5rem 0 0 !important;
        }
        .ck-button {
          color: white !important;
        }
        .ck-button:hover {
          background-color: #4b5563 !important;
        }
        .ck-content p {
          margin: 1em 0;
        }
        .ck-content h1,
        .ck-content h2,
        .ck-content h3 {
          margin: 1.2em 0 0.6em;
          line-height: 1.3;
          font-weight: 600;
        }
        .ck-content ul {
          list-style: disc;
          margin: 1em 0;
          padding-left: 2em;
        }
        .ck-content ol {
          list-style: decimal;
          margin: 1em 0;
          padding-left: 2em;
        }
        .ck-content li {
          margin-bottom: 0.5em;
        }
      `}</style>
    </div>
  );
};

export default EditJobModal;