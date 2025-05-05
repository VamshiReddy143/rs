"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

interface TeamMember {
  _id: string;
  image: string;
  testimonial: string;
  name: string;
  role: string;
}

interface Errors {
  [key: string]: string;
}

interface EditTeamModalProps {
  teamData: TeamMember;
  onUpdate: (updatedTeam: TeamMember) => void;
  onCancel: () => void;
}

const inputStyle =
  "bg-[#3d3d3f] p-4 w-full rounded-lg border border-gray-600 focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white placeholder-gray-400 text-sm sm:text-base";

const EditTeamModal: React.FC<EditTeamModalProps> = ({ teamData, onUpdate, onCancel }) => {
  const [teamImage, setTeamImage] = useState<File | null>(null);
  const [teamImagePreview, setTeamImagePreview] = useState(teamData.image || "");
  const [testimonial, setTestimonial] = useState(teamData.testimonial);
  const [name, setName] = useState(teamData.name);
  const [role, setRole] = useState(teamData.role);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    const newErrors: Errors = {};
    if (name && name.length < 2) newErrors.name = "Name must be at least 2 characters";
    if (role && role.length < 2) newErrors.role = "Role must be at least 2 characters";
    if (testimonial) {
      const lines = testimonial.split("\n");
      if (lines.length > 5) newErrors.testimonial = "Testimonial cannot exceed 5 lines";
      else if (testimonial.length > 500) newErrors.testimonial = "Testimonial cannot exceed 500 characters";
    }
    setErrors(newErrors);
  }, [name, role, testimonial]);

  useEffect(() => {
    return () => {
      if (teamImagePreview && teamImagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(teamImagePreview);
      }
    };
  }, [teamImagePreview]);

  const handleTeamImageChange = (file: File | null) => {
    if (file) {
      setTeamImage(file);
      setTeamImagePreview(URL.createObjectURL(file));
    } else {
      setTeamImage(null);
      setTeamImagePreview(teamData.image || "");
    }
  };

  const handleTeamImageDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleTeamImageChange(file);
  }, []);

  const handleTeamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      toast.error("Please fix form errors before submitting");
      return;
    }
    setLoading(true);
    try {
      if (!testimonial || !name || !role) throw new Error("Testimonial, name, and role are required");

      const formData = new FormData();
      formData.append("testimonial", testimonial);
      formData.append("name", name);
      formData.append("role", role);
      if (teamImage) formData.append("image", teamImage);

      const response = await fetch(`/api/team/${teamData._id}`, {
        method: "PUT",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to update team member");

      const updatedTeam = await response.json();
      onUpdate({ ...teamData, ...updatedTeam });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#f6ff7a] mb-6">Edit Team Member</h1>
      <form onSubmit={handleTeamSubmit} className="space-y-6 sm:space-y-8">
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 sm:p-6 text-center">
          <label htmlFor="team-image" className="block text-base sm:text-lg font-medium mb-2 text-gray-200">
            Team Member Image (Drag & Drop or Click)
          </label>
          <input
            type="file"
            id="team-image"
            accept="image/*"
            onChange={(e) => handleTeamImageChange(e.target.files?.[0] || null)}
            className="hidden"
          />
          <label
            htmlFor="team-image"
            className="cursor-pointer inline-block px-4 py-2 sm:px-6 sm:py-3 bg-[#f6ff7a] hover:bg-[#AAB418] text-black font-semibold rounded-lg text-sm sm:text-base"
          >
            Select Image
          </label>
          {teamImagePreview && (
            <div className="mt-4">
              <Image
                src={teamImagePreview}
                alt="Team Member Preview"
                width={96}
                height={96}
                className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleTeamImageChange(null)}
                className="mt-2 text-red-400 hover:text-red-500 text-sm sm:text-base"
              >
                Remove Image
              </button>
            </div>
          )}
          <div onDrop={handleTeamImageDrop} onDragOver={(e) => e.preventDefault()} className="h-16 sm:h-20" />
        </div>
        <div>
          <label htmlFor="testimonial" className="block text-base sm:text-lg font-medium mb-2 text-gray-200">
            Testimonial (Max 5 lines, 500 characters)
          </label>
          <textarea
            id="testimonial"
            value={testimonial}
            onChange={(e) => setTestimonial(e.target.value)}
            required
            rows={5}
            maxLength={500}
            className={`${inputStyle} rounded-lg text-sm sm:text-base`}
            placeholder="Enter team member testimonial"
          />
          {errors.testimonial && <p className="text-red-400 text-sm mt-1">{errors.testimonial}</p>}
        </div>
        <div>
          <label htmlFor="name" className="block text-base sm:text-lg font-medium mb-2 text-gray-200">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={`${inputStyle} text-sm sm:text-base`}
            placeholder="Enter team member name"
          />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="role" className="block text-base sm:text-lg font-medium mb-2 text-gray-200">
            Role
          </label>
          <input
            type="text"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className={`${inputStyle} text-sm sm:text-base`}
            placeholder="Enter team member role"
          />
          {errors.role && <p className="text-red-400 text-sm mt-1">{errors.role}</p>}
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading || Object.keys(errors).length > 0}
            className="flex-1 py-3 sm:py-4 bg-[#f6ff7a] hover:bg-[#AAB418] text-black font-bold rounded-lg disabled:opacity-50 text-sm sm:text-base"
          >
            {loading ? "Updating..." : "Update Team Member"}
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
    </div>
  );
};

export default EditTeamModal;