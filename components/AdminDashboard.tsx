"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Subscribers from "@/components/Subscribers/Subscribers";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Allprojectss from "@/components/Allprojectsss/Allprojects";
import { FaEye, FaTrash, FaTimes } from "react-icons/fa";
import { GrAnnounce, GrAddCircle } from "react-icons/gr";
import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";
import Link from "next/link";
import AdminReviews from "@/components/AdminReviews/AdminReviews";
import { Blog } from "@/types/blog";
import { Job } from "@/types/job";


interface TeamMember {
  _id: string;
  image: string;
  testimonial: string;
  name: string;
  role: string;
}

interface Application {
  _id: string;
  jobId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  linkedIn?: string;
  website?: string;
  resume: string;
  submittedAt: string;
}

const Pagination: React.FC<{
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxPageButtons = 5;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (startPage > 1) {
      pages.unshift("...");
      pages.unshift(1);
    }
    if (endPage < totalPages) {
      pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-lg text-sm sm:text-base ${currentPage === 1 ? "bg-[#3d3d3f] text-gray-400 cursor-not-allowed" : "bg-[#3d3d3f] text-[#f6ff7a] hover:bg-[#4a4a4c]"}`}
        aria-label="Previous page"
      >
        Prev
      </motion.button>
      {getPageNumbers().map((page, index) => (
        <motion.button
          key={index}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => typeof page === "number" && onPageChange(page)}
          className={`px-3 py-1 rounded-lg text-sm sm:text-base ${page === currentPage
              ? "bg-[#f6ff7a] text-black font-semibold"
              : typeof page === "number"
                ? "bg-[#3d3d3f] text-[#f6ff7a] hover:bg-[#4a4a4c]"
                : "bg-[#242425] text-gray-400 cursor-default"
            }`}
          disabled={typeof page !== "number"}
          aria-label={typeof page === "number" ? `Page ${page}` : "Ellipsis"}
        >
          {page}
        </motion.button>
      ))}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-lg text-sm sm:text-base ${currentPage === totalPages ? "bg-[#3d3d3f] text-gray-400 cursor-not-allowed" : "bg-[#3d3d3f] text-[#f6ff7a] hover:bg-[#4a4a4c]"}`}
        aria-label="Next page"
      >
        Next
      </motion.button>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Blogs" | "team" | "jobs" | "Subscribers" | "Projects" | "Reviews">("Blogs");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [filteredTeamMembers, setFilteredTeamMembers] = useState<TeamMember[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [showBroadcastForm, setShowBroadcastForm] = useState(false);
  const [broadcastSubject, setBroadcastSubject] = useState("");
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{ id: string; type: string } | null>(null);
  const [blogPage, setBlogPage] = useState(1);
  const [teamPage, setTeamPage] = useState(1);
  const [jobPage, setJobPage] = useState(1);
  const [viewingApplicationsForJob, setViewingApplicationsForJob] = useState<string | null>(null);
  const [blogSearchQuery, setBlogSearchQuery] = useState("");
  const [teamSearchQuery, setTeamSearchQuery] = useState("");
  const [jobSearchQuery, setJobSearchQuery] = useState("");
  const itemsPerPage = 5;
  const router = useRouter();
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname === "/admin") {
      setActiveTab("Blogs");
    }
  }, [pathname]);

  useEffect(() => {
    const tab = searchParams.get("tab");
    const validTabs = ["Blogs", "team", "jobs", "Subscribers", "Projects", "Reviews"];
    if (tab && validTabs.includes(tab)) {
      setActiveTab(tab as "Blogs" | "team" | "jobs" | "Subscribers" | "Projects" | "Reviews");
    } else {
      setActiveTab("Blogs");
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      if (activeTab === "Blogs") {
        try {
          const response = await fetch("/api/blogs/allblogs");
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          const data: Blog[] = await response.json();
          const sanitizedData = data.map((blog) => ({
            ...blog,
            title: blog.title || "",
            category: blog.category || "",
            author: blog.author || "",
            primaryImage: blog.primaryImage || "",
            content: Array.isArray(blog.content) ? blog.content : [],
          }));
          setBlogs(sanitizedData);
          setFilteredBlogs(sanitizedData);
        } catch (error) {
          const message = error instanceof Error ? error.message : "Unknown error";
          toast.error(`Error fetching blogs: ${message}`);
        }
      } else if (activeTab === "team") {
        try {
          const response = await fetch("/api/team");
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          const data: TeamMember[] = await response.json();
          setTeamMembers(data);
          setFilteredTeamMembers(data);
        } catch (error) {
          const message = error instanceof Error ? error.message : "Unknown error";
          toast.error(`Error fetching team members: ${message}`);
        }
      } else if (activeTab === "jobs") {
        try {
          const [jobsResponse, appsResponse] = await Promise.all([
            fetch("/api/jobs"),
            fetch("/api/applications"),
          ]);
          if (!jobsResponse.ok) throw new Error(`Jobs fetch failed: ${jobsResponse.status}`);
          if (!appsResponse.ok) throw new Error(`Applications fetch failed: ${appsResponse.status}`);
          const [jobsData, appsData] = await Promise.all([
            jobsResponse.json() as Promise<Job[]>,
            appsResponse.json() as Promise<Application[]>,
          ]);
          setJobs(jobsData);
          setFilteredJobs(jobsData);
          setApplications(appsData);
        } catch (error) {
          const message = error instanceof Error ? error.message : "Unknown error";
          toast.error(`Error fetching jobs or applications: ${message}`);
        }
      }
    };
    fetchData();
  }, [activeTab]);

  useEffect(() => {
    const filtered = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(blogSearchQuery.toLowerCase()) ||
        blog.category.toLowerCase().includes(blogSearchQuery.toLowerCase()) ||
        blog.author.toLowerCase().includes(blogSearchQuery.toLowerCase())
    );
    setFilteredBlogs(filtered);
    setBlogPage(1);
  }, [blogSearchQuery, blogs]);

  useEffect(() => {
    const filtered = teamMembers.filter(
      (member) =>
        member.name.toLowerCase().includes(teamSearchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(teamSearchQuery.toLowerCase()) ||
        member.testimonial.toLowerCase().includes(teamSearchQuery.toLowerCase())
    );
    setFilteredTeamMembers(filtered);
    setTeamPage(1);
  }, [teamSearchQuery, teamMembers]);

  useEffect(() => {
    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(jobSearchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(jobSearchQuery.toLowerCase()) ||
        job.employmentType.toLowerCase().includes(jobSearchQuery.toLowerCase())
    );
    setFilteredJobs(filtered);
    setJobPage(1);
  }, [jobSearchQuery, jobs]);

  const handleBlogDelete = async (blogId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/blogs/${blogId}`, { method: "DELETE" });
      if (!response.ok) throw new Error(`Failed to delete blog: ${await response.text()}`);
      setBlogs(blogs.filter((blog) => blog._id !== blogId));
      setFilteredBlogs(filteredBlogs.filter((blog) => blog._id !== blogId));
      toast.success("Blog deleted successfully!");
      setShowDeleteConfirm(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTeamDelete = async (memberId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/team/${memberId}`, { method: "DELETE" });
      if (!response.ok) throw new Error(`Failed to delete team member: ${await response.text()}`);
      setTeamMembers(teamMembers.filter((member) => member._id !== memberId));
      setFilteredTeamMembers(filteredTeamMembers.filter((member) => member._id !== memberId));
      toast.success("Team member deleted successfully!");
      setShowDeleteConfirm(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleJobDelete = async (jobId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/jobs/${jobId}`, { method: "DELETE" });
      if (!response.ok) throw new Error(`Failed to delete job: ${await response.text()}`);
      setJobs(jobs.filter((job) => job._id !== jobId));
      setFilteredJobs(filteredJobs.filter((job) => job._id !== jobId));
      toast.success("Job deleted successfully!");
      setShowDeleteConfirm(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleApplicationDelete = async (applicationId: string) => {
    if (!applicationId || !/^[0-9a-fA-F]{24}$/.test(applicationId)) {
      toast.error("Invalid application ID. Please try again.");
      setShowDeleteConfirm(null);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`/api/applications/${applicationId}`, { method: "DELETE" });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete application");
      }
      setApplications((prev) => prev.filter((app) => app._id !== applicationId));
      toast.success("Application deleted successfully!");
      setShowDeleteConfirm(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleBroadcastSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastSubject || !broadcastMessage) {
      toast.error("Please provide both a subject and a message");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject: broadcastSubject, message: broadcastMessage }),
      });
      const data: { message: string; error?: string } = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to send broadcast email");
      toast.success(data.message);
      setShowBroadcastForm(false);
      setBroadcastSubject("");
      setBroadcastMessage("");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleViewResume = (resumeUrl: string) => {
    if (!resumeUrl || !resumeUrl.startsWith("https://res.cloudinary.com")) {
      toast.error("Invalid resume URL.");
      return;
    }
    if (typeof window !== "undefined") {
      const isPdf = resumeUrl.toLowerCase().endsWith(".pdf");
      const finalUrl = isPdf ? `${resumeUrl}#view=FitH&toolbar=1` : resumeUrl;
      window.open(finalUrl, "_blank");
    }
  };

  const getPaginatedItems = <T,>(items: T[], page: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <div className="admin-dashboard min-h-screen bg-[#191a1b] text-white pt-[7em]">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick theme="dark" />
      <style jsx>{`
        .admin-dashboard {
          font-family: Poppins, sans-serif;
        }
        .no-scroll {
          overflow: hidden;
          position: fixed;
          width: 100%;
          height: 100%;
        }
        .container {
          --color-pure: #f6ff7a;
          --color-primary: #3d3d3f;
          --color-secondary: #191a1b;
          --muted: #6b7280;
          background-color: var(--color-secondary);
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        .wrap {
          --round: 10px;
          --p-x: 8px;
          --p-y: 4px;
          --w-label: 115px;
          display: flex;
          align-items: center;
          padding: var(--p-y) var(--p-x);
          position: relative;
          background: var(--color-primary);
          border-radius: var(--round);
          max-width: 100%;
          overflow-x: auto;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
          top: 0;
          z-index: 1;
        }
        .wrap input {
          height: 0;
          width: 0;
          position: absolute;
          overflow: hidden;
          display: none;
          visibility: hidden;
        }
        .label {
          cursor: pointer;
          outline: none;
          font-size: 0.860rem;
          letter-spacing: initial;
          font-weight: 500;
          color: var(--color-secondary);
          background: transparent;
          padding: 12px 16px;
          width: var(--w-label);
          min-width: var(--w-label);
          text-decoration: none;
          -webkit-user-select: none;
          user-select: none;
          transition: color 0.25s ease;
          outline-offset: -6px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
          -webkit-tap-highlight-color: transparent;
        }
        .label span {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        .wrap input[class*="rd-"]:checked + .label {
          color: var(--color-pure);
        }
        .bar {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          position: absolute;
          transform-origin: 0 0 0;
          height: 100%;
          width: var(--w-label);
          z-index: 0;
          transition: transform 0.5s cubic-bezier(0.33, 0.83, 0.99, 0.98);
        }
        .bar::before,
        .bar::after {
          content: "";
          position: absolute;
          height: 4px;
          width: 100%;
          background: var(--color-secondary);
        }
        .bar::before {
          top: 0;
          border-radius: 0 0 9999px 9999px;
        }
        .bar::after {
          bottom: 0;
          border-radius: 9999px 9999px 0 0;
        }
        .slidebar {
          position: absolute;
          height: calc(100% - (var(--p-y) * 2));
          width: var(--w-label);
          border-radius: calc(var(--round) - var(--p-y));
          background: var(--muted);
          transform-origin: 0 0 0;
          z-index: 0;
          transition: transform 0.5s cubic-bezier(0.33, 0.83, 0.99, 0.98);
        }
        .rd-1:checked ~ .bar,
        .rd-1:checked ~ .slidebar,
        .rd-1 + .label:hover ~ .slidebar {
          transform: translateX(0) scaleX(1);
        }
        .rd-2:checked ~ .bar,
        .rd-2:checked ~ .slidebar,
        .rd-2 + .label:hover ~ .slidebar {
          transform: translateX(100%) scaleX(1);
        }
        .rd-3:checked ~ .bar,
        .rd-3:checked ~ .slidebar,
        .rd-3 + .label:hover ~ .slidebar {
          transform: translateX(200%) scaleX(1);
        }
        .rd-4:checked ~ .bar,
        .rd-4:checked ~ .slidebar,
        .rd-4 + .label:hover ~ .slidebar {
          transform: translateX(300%) scaleX(1);
        }
        .rd-5:checked ~ .bar,
        .rd-5:checked ~ .slidebar,
        .rd-5 + .label:hover ~ .slidebar {
          transform: translateX(400%) scaleX(1);
        }
        .rd-6:checked ~ .bar,
        .rd-6:checked ~ .slidebar,
        .rd-6 + .label:hover ~ .slidebar {
          transform: translateX(500%) scaleX(1);
        }
        .modal-content {
          overflow-y: auto;
          max-height: 90vh;
          border-radius: 8px;
          background: #191a1b;
          padding: 24px;
          scrollbar-width: thin;
          scrollbar-color: rgba(246, 255, 122, 0.8) transparent;
        }
        .modal-content::-webkit-scrollbar {
          width: 6px;
        }
        .modal-content::-webkit-scrollbar-track {
          background: transparent;
        }
        .modal-content::-webkit-scrollbar-thumb {
          background: rgba(246, 255, 122, 0.8);
          border-radius: 3px;
        }
        .modal-content::-webkit-scrollbar-thumb:hover {
          background: rgba(246, 255, 122, 1);
        }
        .custom-scroll-content {
          overflow-y: auto;
          max-height: calc(85vh - 80px);
          height: 100%;
          scrollbar-width: thin;
          scrollbar-color: rgba(246, 255, 122, 0.8) transparent;
        }
        .custom-scroll-content::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll-content::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scroll-content::-webkit-scrollbar-thumb {
          background: rgba(246, 255, 122, 0.8);
          border-radius: 3px;
        }
        .custom-scroll-content::-webkit-scrollbar-thumb:hover {
          background: rgba(246, 255, 122, 1);
        }
        .application-item {
          transition: background-color 0.2s ease;
        }
        html {
          overflow-y: scroll;
        }
        body.no-scroll {
          overflow: hidden;
          position: fixed;
          width: 100%;
          height: 100%;
          padding-right: var(--scrollbar-width, 0);
        }
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }
        .modal-content {
          position: relative;
          background: #191a1b;
          padding: 24px;
          border-radius: 8px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        }
        .modal-content.max-w-4xl {
          max-width: 896px;
        }
        .modal-content.max-w-2xl {
          max-width: 672px;
        }
        .modal-content::-webkit-scrollbar {
          width: 6px;
        }
        .modal-content::-webkit-scrollbar-track {
          background: transparent;
        }
        .modal-content::-webkit-scrollbar-thumb {
          background: rgba(246, 255, 122, 0.8);
          border-radius: 3px;
        }
        .modal-content::-webkit-scrollbar-thumb:hover {
          background: rgba(246, 255, 122, 1);
        }
        .admin-dashboard {
          width: 100%;
          max-width: 1024px;
          margin: 0 auto;
          box-sizing: border-box;
          position: relative;
        }
        .container {
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
      <div className="max-w-4xl mx-auto bg-[#191a1b] rounded-xl shadow-2xl p-8 relative">
        <button
          onClick={() => setShowBroadcastForm(true)}
          className="absolute top-4 right-4 text-[#f6ff7a] hover:text-yellow-500 animate-bounce cursor-pointer"
          title="Send Broadcast Message"
        >
          <GrAnnounce size={26} />
        </button>
        {showBroadcastForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[50]">
            <div className="bg-[#3d3d3f] p-6 rounded-lg w-96">
              <h2 className="text-xl font-semibold text-[#f6ff7a] mb-4">Send Update to Subscribers</h2>
              <form onSubmit={handleBroadcastSubmit} className="space-y-4">
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-200">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={broadcastSubject}
                    onChange={(e) => setBroadcastSubject(e.target.value)}
                    required
                    className="bg-[#3d3d3f] p-4 w-full rounded-lg border border-gray-600 focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white placeholder-gray-400 text-sm sm:text-base"
                    placeholder="Enter email subject"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-200">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    required
                    rows={5}
                    className="bg-[#3d3d3f] p-4 w-full rounded-lg border border-gray-600 focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white placeholder-gray-400 text-sm sm:text-base"
                    placeholder="Enter your message"
                  />
                </div>
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-2 bg-[#f6ff7a] text-black font-bold rounded-lg hover:bg-yellow-500 disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send"}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setShowBroadcastForm(false)}
                    className="flex-1 py-2 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500"
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        )}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[1100] delete-modal" tabIndex={-1}>
            <div className="bg-[#3d3d3f] p-6 rounded-lg w-96 shadow-xl relative">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="absolute top-2 right-2 text-gray-200 hover:text-[#f6ff7a]"
              >
                <FaTimes size={20} />
              </button>
              <h2 className="text-xl font-semibold text-[#f6ff7a] mb-4">Confirm Deletion</h2>
              <p className="text-gray-200 mb-6">
                Are you sure you want to delete this {showDeleteConfirm.type}? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (showDeleteConfirm.type === "blog") {
                      handleBlogDelete(showDeleteConfirm.id);
                    } else if (showDeleteConfirm.type === "team") {
                      handleTeamDelete(showDeleteConfirm.id);
                    } else if (showDeleteConfirm.type === "job") {
                      handleJobDelete(showDeleteConfirm.id);
                    } else if (showDeleteConfirm.type === "application") {
                      handleApplicationDelete(showDeleteConfirm.id);
                    }
                  }}
                  disabled={loading}
                  className="flex-1 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-500 disabled:opacity-50"
                >
                  {loading ? "Deleting..." : "Delete"}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 py-2 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </motion.button>
              </div>
            </div>
          </div>
        )}
        <div className="container">
          <div className="wrap">
            <input
              type="radio"
              id="rd-1"
              name="radio"
              className="rd-1"
              checked={activeTab === "Blogs"}
              onChange={() => setActiveTab("Blogs")}
            />
            <label htmlFor="rd-1" className="label">
              <span>Blogs</span>
            </label>
            <input
              type="radio"
              id="rd-2"
              name="radio"
              className="rd-2"
              checked={activeTab === "team"}
              onChange={() => setActiveTab("team")}
            />
            <label htmlFor="rd-2" className="label">
              <span>Team</span>
            </label>
            <input
              type="radio"
              id="rd-3"
              name="radio"
              className="rd-3"
              checked={activeTab === "jobs"}
              onChange={() => setActiveTab("jobs")}
            />
            <label htmlFor="rd-3" className="label">
              <span>Jobs</span>
            </label>
            <input
              type="radio"
              id="rd-4"
              name="radio"
              className="rd-4"
              checked={activeTab === "Subscribers"}
              onChange={() => setActiveTab("Subscribers")}
            />
            <label htmlFor="rd-4" className="label">
              <span>Subscribers</span>
            </label>
            <input
              type="radio"
              id="rd-5"
              name="radio"
              className="rd-5"
              checked={activeTab === "Projects"}
              onChange={() => setActiveTab("Projects")}
            />
            <label htmlFor="rd-5" className="label">
              <span>Projects</span>
            </label>
            <input
              type="radio"
              id="rd-6"
              name="radio"
              className="rd-6"
              checked={activeTab === "Reviews"}
              onChange={() => setActiveTab("Reviews")}
            />
            <label htmlFor="rd-6" className="label">
              <span>Reviews</span>
            </label>
            <div className="bar"></div>
            <div className="slidebar"></div>
          </div>
        </div>
        {activeTab === "Blogs" && (
          <div className="space-y-6 mt-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-7">
              <h2 className="text-xl sm:text-2xl font-bold text-[#f6ff7a]">Blogs</h2>
              <div className="relative flex-1 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={blogSearchQuery}
                  onChange={(e) => setBlogSearchQuery(e.target.value)}
                  className="w-full p-2 sm:p-3 bg-[#242425] text-white rounded-lg border border-[#3d3d3f] focus:outline-none focus:border-b-2 focus:border-b-[#f6ff7a] focus:border-t-transparent focus:border-l-transparent focus:border-r-transparent placeholder-gray-400 text-sm sm:text-base"
                  aria-label="Search blogs"
                />
                {blogSearchQuery && (
                  <button
                    onClick={() => setBlogSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#f6ff7a]"
                    title="Clear search"
                    aria-label="Clear search"
                  >
                    <AiOutlineClose size={14} />
                  </button>
                )}
              </div>
              <Link href="/admin/blogs/create">
                <motion.div className="cursor-pointer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <GrAddCircle size={30} color="#f6ff7a" />
                </motion.div>
              </Link>
            </div>
            {filteredBlogs.length === 0 ? (
              <p className="text-gray-400 text-base sm:text-lg">No blogs found.</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {getPaginatedItems(filteredBlogs, blogPage).map((blog) => (
                  <div
                    key={blog._id}
                    className="bg-[#3d3d3f] p-4 sm:p-6 rounded-xl border border-gray-600 shadow-lg flex flex-col"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      {blog.primaryImage && (
                        <Image
                          src={blog.primaryImage || "/blogimg.jpg" }
                          alt={blog.title}
                          width={80}
                          height={80}
                          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg flex-shrink-0"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-200 line-clamp-2">{blog.title}</h3>
                        <p className="text-gray-400 text-sm sm:text-base">Category: {blog.category}</p>
                        <p className="text-gray-400 text-sm sm:text-base">Author: {blog.author}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4 sm:mt-6 justify-end lg:justify-start">
                      <Link href={`/admin/blogs/edit/${blog._id}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#f6ff7a] hover:bg-[#AAB418] text-black font-semibold rounded-lg text-sm sm:text-base"
                        >
                          Edit
                        </motion.button>
                      </Link>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowDeleteConfirm({ id: blog._id, type: "blog" })}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 text-sm sm:text-base"
                      >
                        Delete
                      </motion.button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Pagination
              currentPage={blogPage}
              totalItems={filteredBlogs.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setBlogPage}
            />
          </div>
        )}
        {activeTab === "team" && (
          <div className="space-y-6 mt-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-7">
              <h2 className="text-xl sm:text-2xl font-bold text-[#f6ff7a]">Team Members</h2>
              <div className="relative flex-1 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search team members..."
                  value={teamSearchQuery}
                  onChange={(e) => setTeamSearchQuery(e.target.value)}
                  className="w-full p-2 sm:p-3 bg-[#242425] text-white rounded-lg border border-[#3d3d3f] focus:outline-none focus:border-b-2 focus:border-b-[#f6ff7a] focus:border-t-transparent focus:border-l-transparent focus:border-r-transparent placeholder-gray-400 text-sm sm:text-base"
                  aria-label="Search team members"
                />
                {teamSearchQuery && (
                  <button
                    onClick={() => setTeamSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#f6ff7a]"
                    title="Clear search"
                    aria-label="Clear search"
                  >
                    <AiOutlineClose size={14} />
                  </button>
                )}
              </div>
              <Link href="/admin/team/create">
                <motion.div className="cursor-pointer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <GrAddCircle size={30} color="#f6ff7a" />
                </motion.div>
              </Link>
            </div>
            {filteredTeamMembers.length === 0 ? (
              <p className="text-gray-400 text-base sm:text-lg">No team members found.</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {getPaginatedItems(filteredTeamMembers, teamPage).map((member) => (
                  <div
                    key={member._id}
                    className="bg-[#3d3d3f] p-4 sm:p-6 rounded-xl border border-gray-600 shadow-lg flex flex-col"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <Image
                        src={member.image || "/h1c44.png"}
                        alt={member.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-200 line-clamp-2">{member.name}</h3>
                        <p className="text-gray-400 text-sm sm:text-base">Role: {member.role}</p>
                        <p className="text-gray-400 text-sm sm:text-base line-clamp-3">
                          Testimonial: {member.testimonial}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4 sm:mt-6 justify-end">
                      <Link href={`/admin/team/edit/${member._id}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#f6ff7a] hover:bg-[#AAB418] text-black font-semibold rounded-lg text-sm sm:text-base"
                        >
                          Edit
                        </motion.button>
                      </Link>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowDeleteConfirm({ id: member._id, type: "team" })}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 text-sm sm:text-base"
                      >
                        Delete
                      </motion.button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Pagination
              currentPage={teamPage}
              totalItems={filteredTeamMembers.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setTeamPage}
            />
          </div>
        )}
        {activeTab === "jobs" && (
          <div className="space-y-6 mt-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-7">
              <h2 className="text-xl sm:text-2xl font-bold text-[#f6ff7a]">Job Openings</h2>
              <div className="relative flex-1 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={jobSearchQuery}
                  onChange={(e) => setJobSearchQuery(e.target.value)}
                  className="w-full p-2 sm:p-3 bg-[#242425] text-white rounded-lg border border-[#3d3d3f] focus:outline-none focus:border-b-2 focus:border-b-[#f6ff7a] focus:border-t-transparent focus:border-l-transparent focus:border-r-transparent placeholder-gray-400 text-sm sm:text-base"
                  aria-label="Search jobs"
                />
                {jobSearchQuery && (
                  <button
                    onClick={() => setJobSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#f6ff7a]"
                    title="Clear search"
                    aria-label="Clear search"
                  >
                    <AiOutlineClose size={14} />
                  </button>
                )}
              </div>
              <Link href="/admin/jobs/create">
                <motion.div className="cursor-pointer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <GrAddCircle size={30} color="#f6ff7a" />
                </motion.div>
              </Link>
            </div>
            {filteredJobs.length === 0 ? (
              <p className="text-gray-400 text-base sm:text-lg">No jobs found.</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {getPaginatedItems(filteredJobs, jobPage).map((job) => (
                  <div
                    key={job._id}
                    className="bg-[#3d3d3f] p-4 sm:p-6 rounded-xl border border-gray-600 shadow-lg flex flex-col"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-200 line-clamp-2">{job.title}</h3>
                        <p className="text-gray-400 text-sm sm:text-base">Location: {job.location}</p>
                        <p className="text-gray-400 text-sm sm:text-base">Type: {job.employmentType}</p>
                        <p className="text-gray-400 text-sm sm:text-base">
                          Posted: {new Date(job.postedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4 sm:mt-6 justify-end lg:justify-start">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setViewingApplicationsForJob(job._id)}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 border-1 border-gray-400 text-white font-semibold rounded-lg text-sm sm:text-base"
                      >
                        View Applications
                      </motion.button>
                      <Link href={`/admin/jobs/edit/${job._id}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#f6ff7a] hover:bg-[#AAB418] text-black font-semibold rounded-lg text-sm sm:text-base"
                        >
                          Edit
                        </motion.button>
                      </Link>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowDeleteConfirm({ id: job._id, type: "job" })}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 text-sm sm:text-base"
                      >
                        Delete
                      </motion.button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Pagination
              currentPage={jobPage}
              totalItems={filteredJobs.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setJobPage}
            />
            {viewingApplicationsForJob && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
                <div className="bg-[#3d3d3f] p-4 sm:p-6 rounded-lg w-full max-w-3xl max-h-[85vh] flex flex-col relative">
                  <button
                    onClick={() => setViewingApplicationsForJob(null)}
                    className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-200 hover:text-[#f6ff7a]"
                  >
                    <FaTimes size={20} />
                  </button>
                  <h2 className="text-xl sm:text-2xl font-semibold text-[#f6ff7a] mb-4 sm:mb-6">
                    Applications for {jobs.find((job) => job._id === viewingApplicationsForJob)?.title}
                  </h2>
                  <div ref={scrollRef} className="custom-scroll-content">
                    {applications.filter((app) => app.jobId === viewingApplicationsForJob).length === 0 ? (
                      <p className="text-gray-400 text-sm sm:text-base">No applications found for this job.</p>
                    ) : (
                      applications
                        .filter((app) => app.jobId === viewingApplicationsForJob)
                        .map((application) => (
                          <div
                            key={application._id}
                            className="application-item bg-[#2d2d2f] p-3 sm:p-4 rounded-lg mb-3 sm:mb-4 border border-gray-600 hover:bg-[#353537]"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                              <div>
                                <h3 className="text-base sm:text-lg font-semibold text-gray-200">
                                  {application.firstName} {application.lastName}
                                </h3>
                                <p className="text-gray-400 text-sm">Email: {application.email}</p>
                                <p className="text-gray-400 text-sm">Phone: {application.phone}</p>
                                <p className="text-gray-400 text-sm">Country: {application.country}</p>
                                {application.linkedIn && (
                                  <p className="text-gray-400 text-sm">
                                    LinkedIn:{" "}
                                    <a
                                      href={application.linkedIn}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-[#f6ff7a] hover:underline"
                                    >
                                      View Profile
                                    </a>
                                  </p>
                                )}
                                {application.website && (
                                  <p className="text-gray-400 text-sm">
                                    Website:{" "}
                                    <a
                                      href={application.website}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-[#f6ff7a] hover:underline"
                                    >
                                      Visit Site
                                    </a>
                                  </p>
                                )}
                                <p className="text-gray-400 text-sm">
                                  Submitted: {new Date(application.submittedAt).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleViewResume(application.resume)}
                                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#f6ff7a] text-black font-semibold rounded-lg hover:bg-[#AAB418] text-sm sm:text-base flex items-center gap-2"
                                >
                                  <FaEye size={16} />
                                  View Resume
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => setShowDeleteConfirm({ id: application._id, type: "application" })}
                                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 text-sm sm:text-base flex items-center gap-2"
                                >
                                  <FaTrash size={16} />
                                  Delete
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {activeTab === "Subscribers" && (
          <div className="space-y-6 mt-6">
            <Subscribers />
          </div>
        )}
        {activeTab === "Projects" && <Allprojectss />}
        {activeTab === "Reviews" && <AdminReviews />}
      </div>
    </div>
  );
};

export default AdminDashboard;