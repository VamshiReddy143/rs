"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import EditJobModal from "@/components/EditJobModal/editjob";
import { Job } from "@/types/job";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import Link from "next/link";

const EditJobPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const jobId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [jobData, setJobData] = useState<Job | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      if (!jobId || typeof jobId !== "string" || !/^[0-9a-fA-F]{24}$/.test(jobId)) {
        console.error("EditJobPage: Invalid or missing jobId:", jobId);
        setError("Invalid job ID");
        toast.error("Invalid job ID");
        router.push("/admin?tab=jobs");
        return;
      }

  
      try {
        const response = await fetch(`/api/jobs/${jobId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        console.log(`EditJobPage: API response status: ${response.status} ${response.statusText}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error: ${response.status} ${response.statusText}`);
        }
        const data: Job = await response.json();
        console.log("EditJobPage: Fetched job data:", JSON.stringify(data, null, 2));
        if (!data._id || !data.title) {
          throw new Error("Invalid job data: missing _id or title");
        }
        // Sanitize data
        const sanitizedData: Job = {
          _id: data._id,
          title: data.title || "",
          location: data.location || "",
          description: data.description || "",
          employmentType: data.employmentType || "Full-Time",
          department: data.department || "Other",
          postedDate: data.postedDate || new Date().toISOString(),
        };
        setJobData(sanitizedData);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error("EditJobPage: Fetch error:", message, error);
        setError(message);
        toast.error(`Failed to load job: ${message}`);
        router.push("/admin?tab=jobs");
      }
    };

    fetchJob();
  }, [jobId, router]);

  const handleUpdate = (updatedJob: Job) => {
 
    router.push("/admin?tab=jobs");
  };

  const handleCancel = () => {
    router.push("/admin?tab=jobs");
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#191a1b] text-white pt-[7em] flex justify-center">
        <div className="text-center text-red-400 text-lg">Error: {error}</div>
      </div>
    );
  }

  if (!jobData) {
    return (
      <div className="min-h-screen bg-[#191a1b] text-white pt-[7em] flex justify-center">
        <div className="text-center text-lg">Loading job data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#191a1b] text-white pt-[7em] px-4">

      <div className="max-w-5xl mx-auto bg-[#191a1b] rounded-xl shadow-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#f6ff7a]">Edit Job</h1>
          <Link href="/admin?tab=jobs">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500"
            >
              Back to Dashboard
            </motion.button>
          </Link>
        </div>
        <EditJobModal jobData={jobData} onUpdate={handleUpdate} onCancel={handleCancel} />
      </div>
    </div>
  );
};

export default EditJobPage;