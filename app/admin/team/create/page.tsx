"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

interface Errors {
  [key: string]: string;
}

const inputStyle =
  "bg-[#3d3d3f] p-4 w-full rounded-lg border border-gray-600 focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white placeholder-gray-400 text-sm sm:text-base";

const CreateTeamPage: React.FC = () => {
  const [teamImage, setTeamImage] = useState<File | null>(null);
  const [teamImagePreview, setTeamImagePreview] = useState("");
  const [testimonial, setTestimonial] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const router = useRouter();
  const params = useParams();
  const isEditing = !!params.id;

  useEffect(() => {
    if (isEditing) {
      const fetchTeamMember = async () => {
        try {
          const response = await fetch(`/api/team/${params.id}`);
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          const member = await response.json();
          setTeamImagePreview(member.image || "");
          setTestimonial(member.testimonial || "");
          setName(member.name || "");
          setRole(member.role || "");
        } catch (error) {
          toast.error("Error fetching team member");
        }
      };
      fetchTeamMember();
    }
  }, [isEditing, params.id]);

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
      setTeamImagePreview("");
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
      if (!teamImage && !isEditing) throw new Error("Image is required");

      const formData = new FormData();
      formData.append("testimonial", testimonial);
      formData.append("name", name);
      formData.append("role", role);
      if (teamImage) formData.append("image", teamImage);

      const url = isEditing ? `/api/team/${params.id}` : "/api/team";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, { method, body: formData });
      if (!response.ok) throw new Error(`Failed to ${isEditing ? "update" : "create"} team member`);

      toast.success(`Team member ${isEditing ? "updated" : "created"} successfully!`);
      router.push("/admin");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#191a1b] text-white pt-[7em] flex justify-center">
      <div className="max-w-4xl w-full mx-auto bg-[#191a1b] rounded-xl shadow-2xl p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#f6ff7a] mb-6">
          {isEditing ? "Edit Team Member" : "Create Team Member"}
        </h1>
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
              {loading ? (isEditing ? "Updating..." : "Creating...") : isEditing ? "Update Team Member" : "Create Team Member"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => router.push("/admin")}
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

export default CreateTeamPage;