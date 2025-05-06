"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import EditTeamModal from "@/components/EditTeam/editteam";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import Link from "next/link";

interface TeamMember {
  _id: string;
  image: string;
  testimonial: string;
  name: string;
  role: string;
}

const EditTeamPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const teamId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [teamData, setTeamData] = useState<TeamMember | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamMember = async () => {
      if (!teamId || typeof teamId !== "string" || !/^[0-9a-fA-F]{24}$/.test(teamId)) {
        console.error("EditTeamPage: Invalid or missing teamId:", teamId);
        setError("Invalid team member ID");
        toast.error("Invalid team member ID", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "dark",
        });
        setTimeout(() => {
          router.push("/admin?tab=team");
        }, 5000);
        return;
      }

      console.log(`EditTeamPage: Fetching team member with ID: ${teamId}`);
      try {
        const response = await fetch(`/api/team/${teamId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        console.log(`EditTeamPage: API response status: ${response.status} ${response.statusText}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error: ${response.status} ${response.statusText}`);
        }
        const data: TeamMember = await response.json();
        console.log("EditTeamPage: Fetched team member data:", JSON.stringify(data, null, 2));
        if (!data._id || !data.name) {
          throw new Error("Invalid team member data: missing _id or name");
        }
        // Sanitize data
        const sanitizedData: TeamMember = {
          _id: data._id,
          image: data.image || "",
          testimonial: data.testimonial || "",
          name: data.name || "",
          role: data.role || "",
        };
     
        setTeamData(sanitizedData);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error("EditTeamPage: Fetch error:", message, error);
        setError(message);
        toast.error(`Failed to load team member: ${message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "dark",
        });
        setTimeout(() => {
          router.push("/admin?tab=team");
        }, 5000);
      }
    };

    fetchTeamMember();
  }, [teamId, router]);

  const handleUpdate = (updatedTeam: TeamMember) => {
    console.log("EditTeamPage: handleUpdate called with:", updatedTeam);
    toast.success("Team member updated successfully!", {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      theme: "dark",
      onClose: () => {
        setTimeout(() => {
          router.push("/admin?tab=team");
        }, 1000); // Additional delay after toast closes
      },
    });
  };

  const handleCancel = () => {
    router.push("/admin?tab=team");
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#191a1b] text-white pt-[7em] flex justify-center">
        <div className="text-center text-red-400 text-lg">Error: {error}</div>
      </div>
    );
  }

  if (!teamData) {
    return (
      <div className="min-h-screen bg-[#191a1b] text-white pt-[7em] flex justify-center">
        <div className="text-center text-lg">Loading team member data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#191a1b] text-white pt-[7em] px-4">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        theme="dark"
        style={{ zIndex: 9999, fontFamily: "Poppins, sans-serif" }}
        toastStyle={{ backgroundColor: "#3d3d3f", color: "#f6ff7a" }}
      />
      <div className="max-w-5xl mx-auto bg-[#191a1b] rounded-xl shadow-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#f6ff7a]">Edit Team Member</h1>
          <Link href="/admin?tab=team">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500"
            >
              Back to Dashboard
            </motion.button>
          </Link>
        </div>
        <EditTeamModal teamData={teamData} onUpdate={handleUpdate} onCancel={handleCancel} />
      </div>
    </div>
  );
};

export default EditTeamPage;