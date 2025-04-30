"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { GrAddCircle, GrTrash } from "react-icons/gr";
import { AiOutlineStar, AiFillStar, AiOutlineClose } from "react-icons/ai";
import Link from "next/link";

// Interface for a unified project structure
interface UnifiedProject {
  _id: string;
  title: string;
  thumbnailText: string;
  image?: string | null;
  model: "Project" | "Template3Project" | "CustomContent";
  isFeatured: boolean;
}

const ProjectsDashboard: React.FC = () => {
  const [projects, setProjects] = useState<UnifiedProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<UnifiedProject[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{
    id: string;
    model: string;
  } | null>(null);

  // Fetch all projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/projects/allprojects");
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(data);
        setFilteredProjects(data);
      } catch (err) {
        toast.error("Failed to load projects", { theme: "dark" });
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Filter projects based on search query
  useEffect(() => {
    const filtered = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.thumbnailText.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [searchQuery, projects]);

  // Handle project deletion
  const handleDeleteProject = async (id: string, model: string) => {
    setLoading(true);
    try {
      let endpoint: string;
      switch (model) {
        case "Project":
          endpoint = `/api/projects/template1/${id}`;
          break;
        case "Template3Project":
          endpoint = `/api/projects/template3/${id}`;
          break;
        case "CustomContent":
          endpoint = `/api/projects/custom/${id}`;
          break;
        default:
          throw new Error("Invalid model type");
      }

      const response = await fetch(endpoint, { method: "DELETE" });
      if (!response.ok) throw new Error(`Failed to delete ${model}: ${await response.text()}`);

      setProjects((prev) => prev.filter((project) => project._id !== id));
      setFilteredProjects((prev) => prev.filter((project) => project._id !== id));
      toast.success(`${model} deleted successfully!`, { theme: "dark" });
      setShowDeleteConfirm(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Error: ${message}`, { theme: "dark" });
    } finally {
      setLoading(false);
    }
  };

  // Handle toggling featured status
  const handleToggleFeatured = async (id: string, model: string, isFeatured: boolean) => {
    try {
      const response = await fetch("/api/projects/feature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, model, isFeatured: !isFeatured }),
      });
      if (!response.ok) throw new Error(`Failed to update featured status: ${await response.text()}`);

      setProjects((prev) =>
        prev.map((project) =>
          project._id === id ? { ...project, isFeatured: !isFeatured } : project
        )
      );
      setFilteredProjects((prev) =>
        prev.map((project) =>
          project._id === id ? { ...project, isFeatured: !isFeatured } : project
        )
      );
      toast.success(
        !isFeatured ? "Added to featured projects!" : "Removed from featured projects!",
        { theme: "dark" }
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Error: ${message}`, { theme: "dark" });
    }
  };

  // Featured projects
  const featuredProjects = filteredProjects.filter((project) => project.isFeatured);

  return (
    <div
      style={{ fontFamily: "Poppins, sans-serif" }}
      className="min-h-screen bg-[#191a1b] text-white px-4"
    >
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick theme="dark" />

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-[#242425] p-6 rounded-xl w-96 shadow-xl border border-[#3d3d3f]"
          >
            <h2 className="text-xl font-semibold text-[#f6ff7a] mb-4">Confirm Deletion</h2>
            <p className="text-gray-200 mb-6 text-sm">
              Are you sure you want to delete this {showDeleteConfirm.model}? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDeleteProject(showDeleteConfirm.id, showDeleteConfirm.model)}
                disabled={loading}
                className="flex-1 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-500 disabled:opacity-50"
              >
                {loading ? "Deleting..." : "Delete"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 py-2 bg-[#3d3d3f] text-white font-bold rounded-lg hover:bg-[#4a4a4c]"
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-[#191a1b] rounded-xl p-8">
        {/* Header */}
        <div className="flex justify-between items-center gap-4 mb-7">
          <h2 className="text-2xl font-bold text-[#f6ff7a]">All Projects</h2>
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 bg-[#242425] text-white rounded-lg border border-[#3d3d3f] focus:outline-none focus:border-b-2 focus:border-b-[#f6ff7a] focus:border-t-transparent focus:border-l-transparent focus:border-r-transparent placeholder-gray-400"
              style={{ fontFamily: "Poppins, sans-serif" }}
              aria-label="Search projects"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#f6ff7a]"
                title="Clear search"
                aria-label="Clear search"
              >
                <AiOutlineClose size={16} />
              </button>
            )}
          </div>
          <Link href="/SelectTemplate">
            <motion.div className="cursor-pointer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <GrAddCircle size={30} color="#f6ff7a" />
            </motion.div>
          </Link>
        </div>

        {/* Featured Projects Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-[#f6ff7a] mb-4">Featured Projects</h3>
          {featuredProjects.length === 0 ? (
            <div className="bg-[#242425] p-6 rounded-xl text-gray-400 text-sm text-center shadow-lg border border-[#3d3d3f]">
              No featured projects. Star a project to showcase it here.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <div
                  key={`${project.model}-${project._id}`}
                  className="bg-[#242425] p-4 rounded-xl shadow-lg relative"
                >
                  <Link href={`/projects/${project._id}`} aria-label={`View ${project.title}`}>
                    <div className="flex flex-col gap-4">
                      <div className="relative w-full h-40">
                        <Image
                          src={project.image || "/default-project-image.png"}
                          alt={project.title}
                          fill
                          className="rounded-lg object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[#f6ff7a]">{project.title}</h3>
                        <p className="text-gray-400 text-sm line-clamp-2">{project.thumbnailText}</p>
                        <p className="text-gray-400 text-xs mt-1">Model: {project.model}</p>
                      </div>
                    </div>
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleFeatured(project._id, project.model, project.isFeatured);
                    }}
                    className={`absolute top-2 right-2 p-2 bg-[#242425] rounded-lg text-[#AAB418]`}
                    aria-label={`Remove ${project.title} from featured`}
                  >
                    <AiFillStar size={24} />
                  </motion.button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* All Projects Section */}
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-[#242425] p-4 rounded-xl shadow-lg animate-pulse">
                <div className="relative w-full h-40 bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-5 bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="bg-[#242425] p-6 rounded-xl text-gray-400 text-sm text-center shadow-lg border border-[#3d3d3f]">
            No projects found.
          </div>
        ) : (
          
         <div className="mb-8">
             <h3 className="text-lg font-semibold text-[#f6ff7a] mb-4"> All Projects</h3>
           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <div
                key={`${project.model}-${project._id}`}
                className="bg-[#242425] p-4 rounded-xl shadow-lg relative"
              >
                <Link href={`/projects/${project._id}`} aria-label={`View ${project.title}`}>
                  <div className="flex flex-col gap-4">
                    <div className="relative w-full h-40">
                      <Image
                        src={project.image || "/default-project-image.png"}
                        alt={project.title}
                        fill
                        className="rounded-lg object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#f6ff7a]">{project.title}</h3>
                      <p className="text-gray-400 text-sm line-clamp-2">{project.thumbnailText}</p>
                      <p className="text-gray-400 text-xs mt-1">Model: {project.model}</p>
                    </div>
                  </div>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleFeatured(project._id, project.model, project.isFeatured);
                  }}
                  className={`absolute top-2 right-2 p-2 bg-[#242425] rounded-lg ${
                    project.isFeatured ? "text-[#AAB418]" : "text-[#f6ff7a]"
                  }`}
                  aria-label={project.isFeatured ? `Remove ${project.title} from featured` : `Add ${project.title} to featured`}
                >
                  {project.isFeatured ? <AiFillStar size={24} /> : <AiOutlineStar size={24} />}
                </motion.button>
                <div className="flex justify-end mt-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDeleteConfirm({ id: project._id, model: project.model });
                    }}
                    className="p-2 bg-red-600 text-white rounded-full hover:bg-red-500"
                    aria-label={`Delete ${project.title}`}
                  >
                    <GrTrash size={16} />
                  </motion.button>
                </div>
              </div>
            ))}
          </div>
         </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsDashboard;