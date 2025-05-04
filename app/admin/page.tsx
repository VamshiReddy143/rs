"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Subscribers from "@/components/Subscribers/Subscribers";
import Image from "next/image";
import CKEditorWrapper from "@/components/CKEditorWrapper";
import { useDropzone } from "react-dropzone";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { GrAnnounce, GrFormTrash } from "react-icons/gr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Allprojectss from "@/components/Allprojectsss/Allprojects";
import { FaEye, FaTrash, FaTimes, FaPlus, FaMinus } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import AdminReviews from "@/components/AdminReviews/AdminReviews";
import { motion } from 'framer-motion';

// Interfaces for data models
type Blog = {
  _id: string;
  title: string;
  author: string;
  primaryImage: string;
  image?: string;
  content: Array<{
    type: string;
    value: string | File | null;
    image?: string | null;
    imagePreview?: string | null;
    language?: string;
  }>;
  category: string;
  createdAt?: string;
  updatedAt?: string;
};

interface TeamMember {
  _id: string;
  image: string;
  testimonial: string;
  name: string;
  role: string;
}

interface Job {
  _id: string;
  title: string;
  location: string;
  description: string;
  employmentType: string;
  postedDate: string;
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

interface ContentItem {
  id: string;
  type: string;
  value: string | File | null;
  language?: string;
  imagePreview?: string;
}

interface Errors {
  [key: string]: string;
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
      pages.unshift('...');
      pages.unshift(1);
    }
    if (endPage < totalPages) {
      pages.push('...');
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
        className={`px-3 py-1 rounded-lg text-sm sm:text-base ${
          currentPage === 1 ? 'bg-[#3d3d3f] text-gray-400 cursor-not-allowed' : 'bg-[#3d3d3f] text-[#f6ff7a] hover:bg-[#4a4a4c]'
        }`}
        aria-label="Previous page"
      >
        Prev
      </motion.button>
      {getPageNumbers().map((page, index) => (
        <motion.button
          key={index}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          className={`px-3 py-1 rounded-lg text-sm sm:text-base ${
            page === currentPage
              ? 'bg-[#f6ff7a] text-black font-semibold'
              : typeof page === 'number'
              ? 'bg-[#3d3d3f] text-[#f6ff7a] hover:bg-[#4a4a4c]'
              : 'bg-[#242425] text-gray-400 cursor-default'
          }`}
          disabled={typeof page !== 'number'}
          aria-label={typeof page === 'number' ? `Page ${page}` : 'Ellipsis'}
        >
          {page}
        </motion.button>
      ))}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-lg text-sm sm:text-base ${
          currentPage === totalPages ? 'bg-[#3d3d3f] text-gray-400 cursor-not-allowed' : 'bg-[#3d3d3f] text-[#f6ff7a] hover:bg-[#4a4a4c]'
        }`}
        aria-label="Next page"
      >
        Next
      </motion.button>
    </div>
  );
};

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"create" | "team" | "jobs" | "Subscribers" | "Projects" | "Reviews">("create");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [primaryImage, setPrimaryImage] = useState<File | null>(null);
  const [primaryImagePreview, setPrimaryImagePreview] = useState("");
  const [teamImage, setTeamImage] = useState<File | null>(null);
  const [teamImagePreview, setTeamImagePreview] = useState("");
  const [testimonial, setTestimonial] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [employmentType, setEmploymentType] = useState("Full-Time");
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [newContentType, setNewContentType] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [viewingApplicationsForJob, setViewingApplicationsForJob] = useState<string | null>(null);
  const [viewResumeUrl, setViewResumeUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showBroadcastForm, setShowBroadcastForm] = useState(false);
  const [broadcastSubject, setBroadcastSubject] = useState("");
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{ id: string; type: string } | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [blogPage, setBlogPage] = useState(1);
  const [teamPage, setTeamPage] = useState(1);
  const [jobPage, setJobPage] = useState(1);
  const itemsPerPage = 5;
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Debounce utility
  const debounce = <T extends (...args: any[]) => void>(func: T, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // Scroll handling for applications modal
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollContainer.scrollTop += e.deltaY * 2;
    };

    const debouncedHandleWheel = debounce(handleWheel, 10);
    scrollContainer.addEventListener("wheel", debouncedHandleWheel, { passive: false });
    return () => scrollContainer.removeEventListener("wheel", debouncedHandleWheel);
  }, [viewingApplicationsForJob]);

  // Fetch data for blogs, team, and jobs
  useEffect(() => {
    const fetchData = async () => {
      if (activeTab === "create") {
        try {
          const response = await fetch("/api/blogs/allblogs");
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          const data: Blog[] = await response.json();
          const sanitizedData = data.map((blog) => ({
            ...blog,
            title: blog.title || "",
            category: blog.category || "",
            author: blog.author || "",
            primaryImage: blog.primaryImage || blog.image || "",
            content: Array.isArray(blog.content)
              ? blog.content.map((item) => ({
                  type: item.type || "paragraph",
                  value: typeof item.value === "string" ? item.value : "",
                  language: item.language || (item.type === "code" ? "javascript" : undefined),
                  imagePreview: item.imagePreview || item.image || "",
                }))
              : [],
          }));
          setBlogs(sanitizedData);
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
          setApplications(appsData);
        } catch (error) {
          const message = error instanceof Error ? error.message : "Unknown error";
          toast.error(`Error fetching jobs or applications: ${message}`);
        }
      }
    };
    fetchData();
  }, [activeTab]);

  // Form validation
  useEffect(() => {
    const newErrors: Errors = {};
    if (activeTab === "create") {
      if (title && title.length < 3) newErrors.title = "Title must be at least 3 characters";
      if (author && author.length < 2) newErrors.author = "Author name must be at least 2 characters";
      if (category === "Other" && customCategory.length < 2)
        newErrors.customCategory = "Custom category must be at least 2 characters";
    } else if (activeTab === "team") {
      if (name && name.length < 2) newErrors.name = "Name must be at least 2 characters";
      if (role && role.length < 2) newErrors.role = "Role must be at least 2 characters";
      if (testimonial) {
        const lines = testimonial.split("\n");
        if (lines.length > 5) newErrors.testimonial = "Testimonial cannot exceed 5 lines";
        else if (testimonial.length > 500)
          newErrors.testimonial = "Testimonial cannot exceed 500 characters";
      }
    } else if (activeTab === "jobs") {
      if (jobTitle && jobTitle.length < 3) newErrors.jobTitle = "Job title must be at least 3 characters";
      if (jobLocation && jobLocation.length < 3) newErrors.jobLocation = "Location must be at least 3 characters";
      if (jobDescription && jobDescription.length === 0)
        newErrors.jobDescription = "Description cannot be empty";
    }
    setErrors(newErrors);
  }, [title, author, category, customCategory, name, role, testimonial, jobTitle, jobLocation, jobDescription, activeTab]);

  // Clean up image previews on unmount
  useEffect(() => {
    return () => {
      content.forEach((item) => {
        if (item.type === "image" && item.imagePreview && item.imagePreview.startsWith("blob:")) {
          console.log(`Cleaning up blob URL for item ${item.id}:`, item.imagePreview);
          URL.revokeObjectURL(item.imagePreview);
        }
      });
    };
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    if (e.target.value !== "Other") setCustomCategory("");
  };

  const handlePrimaryImageChange = (file: File | null) => {
    if (file) {
      setPrimaryImage(file);
      setPrimaryImagePreview(URL.createObjectURL(file));
    } else {
      setPrimaryImage(null);
      setPrimaryImagePreview(editingBlog?.primaryImage || "");
    }
  };

  const handleTeamImageChange = (file: File | null) => {
    if (file) {
      setTeamImage(file);
      setTeamImagePreview(URL.createObjectURL(file));
    } else {
      setTeamImage(null);
      setTeamImagePreview(editingTeamMember?.image || "");
    }
  };

  const handlePrimaryImageDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) handlePrimaryImageChange(file);
    },
    []
  );

  const handleTeamImageDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) handleTeamImageChange(file);
    },
    []
  );

  const addBlogContentItem = (type: ContentItem['type']) => {
    console.log(`Attempting to add content item of type: ${type}`);
    const newItem: ContentItem = {
      id: uuidv4(),
      type,
      value: type === "image" ? null : "",
      language: type === "code" ? "javascript" : undefined,
      imagePreview: type === "image" ? "" : undefined,
    };
    setContent((prev) => {
      const newContent = [...prev, newItem];
      console.log(`Updated content array:`, newContent);
      return newContent;
    });
    setNewContentType('');
  };

  const handleContentChange = (index: number, field: string, value: string | File | null) => {
    console.log(`handleContentChange index ${index}, field: ${field}, value:`, value);
    setContent((prevContent) => {
      const updatedContent = [...prevContent];
      const updatedItem = { ...updatedContent[index] };

      if (field === "value") {
        if (updatedItem.type === "image") {
          if (updatedItem.imagePreview && updatedItem.imagePreview.startsWith("blob:")) {
            console.log(`Revoking old blob URL for index ${index}:`, updatedItem.imagePreview);
            URL.revokeObjectURL(updatedItem.imagePreview);
          }

          if (value instanceof File) {
            const previewUrl = URL.createObjectURL(value);
            updatedItem.value = value;
            updatedItem.imagePreview = previewUrl;
            console.log(`Set new imagePreview for index ${index}:`, previewUrl);
          } else {
            updatedItem.value = null;
            updatedItem.imagePreview = "";
            console.log(`Cleared imagePreview for index ${index}`);
          }
        } else {
          updatedItem.value = value;
          if (updatedItem.imagePreview !== undefined) {
            console.warn(`Removing unexpected imagePreview for ${updatedItem.type} at index ${index}`);
            updatedItem.imagePreview = undefined;
          }
        }
      } else if (field === "language" && typeof value === "string") {
        updatedItem.language = value;
      }

      updatedContent[index] = updatedItem;
      console.log(`Updated content[${index}]:`, updatedItem);
      console.log(`Full content state:`, updatedContent);
      return updatedContent;
    });
  };

  const removeContentItem = (index: number) => {
    if (index < 0 || index >= content.length) {
      console.error(`Invalid index ${index} for content array of length ${content.length}`);
      toast.error("Cannot remove content item: Invalid index");
      return;
    }

    const updatedContent = [...content];
    const item = updatedContent[index];

    if (item && item.type === "image" && item.imagePreview && item.imagePreview.startsWith("blob:")) {
      try {
        URL.revokeObjectURL(item.imagePreview);
        console.log(`Revoked blob URL for content item ${item.id}: ${item.imagePreview}`);
      } catch (error) {
        console.error(`Error revoking blob URL for item ${item.id}:`, error);
      }
    }

    updatedContent.splice(index, 1);
    setContent(updatedContent);
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);

    if (typeof window !== "undefined") {
      document.body.style.overflow = "hidden";
    }

    try {
      if (!title || !category || !author) throw new Error("Title, category, and author are required");
      const effectiveCategory = category === "Other" ? customCategory : category;
      if (!effectiveCategory) throw new Error("Please specify a category");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", effectiveCategory);
      formData.append("author", author);
      if (primaryImage) formData.append("primaryImage", primaryImage);

      const processedContent = content.map((item, index) => ({
        type: item.type,
        value: item.type === "image" && item.value instanceof File ? `image-${index}` : item.value,
        language: item.language,
      }));

      console.log("Sending content:", JSON.stringify(processedContent, null, 2));
      formData.append("content", JSON.stringify(processedContent));
      content.forEach((item, index) => {
        if (item.type === "image" && item.value instanceof File) {
          formData.append(`image-${index}`, item.value);
        }
      });

      const url = editingBlog ? `/api/blogs/${editingBlog._id}` : "/api/blogs/create";
      const method = editingBlog ? "PUT" : "POST";

      const response = await fetch(url, { method, body: formData });
      if (!response.ok) throw new Error(`Failed to ${editingBlog ? "update" : "create"} blog: ${await response.text()}`);

      const responseData = await response.json();
      const updatedBlog: Blog = {
        _id: responseData._id || (editingBlog ? editingBlog._id : uuidv4()),
        title,
        category: effectiveCategory,
        author,
        primaryImage: responseData.primaryImage || primaryImagePreview || "",
        content: Array.isArray(responseData.content)
          ? responseData.content.map((item: any, index: number) => ({
              type: item.type || processedContent[index]?.type || "paragraph",
              value: item.type === "image" ? (item.image || item.value || "") : (item.value || ""),
              language: item.language || processedContent[index]?.language,
              imagePreview: item.type === "image" ? (item.image || item.value || "") : undefined,
            }))
          : processedContent.map((item, index) => ({
              type: item.type,
              value: item.type === "image" ? (responseData.uploadedImages?.[index] || "") : (item.value || ""),
              language: item.language,
              imagePreview: item.type === "image" ? (responseData.uploadedImages?.[index] || "") : undefined,
            })),
        createdAt: responseData.createdAt || new Date().toISOString(),
        updatedAt: responseData.updatedAt || new Date().toISOString(),
      };
      setBlogs((prev) => {
        if (editingBlog) {
          return prev.map((blog) => (blog._id === editingBlog._id ? updatedBlog : blog));
        } else {
          return [updatedBlog, ...prev];
        }
      });

      toast.success(`Blog ${editingBlog ? "updated" : "created"} successfully!`);
      resetBlogForm();
      setShowCreateForm(false);
      setEditingBlog(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Error: ${message}`);
    } finally {
      setLoading(false);
      if (typeof window !== "undefined") {
        document.body.style.overflow = "";
      }
    }
  };

  const handleTeamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (Object.keys(errors).length > 0) {
      toast.error("Please fix form errors before submitting");
      return;
    }
    setLoading(true);
    if (typeof window !== "undefined") {
      document.body.style.overflow = "hidden";
    }
    try {
      if (!teamImage && !editingTeamMember) throw new Error("Image is required");
      if (!testimonial || !name || !role) throw new Error("Testimonial, name, and role are required");

      const formData = new FormData();
      formData.append("testimonial", testimonial);
      formData.append("name", name);
      formData.append("role", role);
      if (teamImage) formData.append("image", teamImage);

      const url = editingTeamMember ? `/api/team/${editingTeamMember._id}` : "/api/team";
      const method = editingTeamMember ? "PUT" : "POST";

      const response = await fetch(url, { method, body: formData });
      if (!response.ok)
        throw new Error(`Failed to ${editingTeamMember ? "update" : "create"} team member: ${await response.text()}`);

      const data: { teamMember: TeamMember } = await response.json();
      if (!editingTeamMember) {
        setTeamMembers((prev) => [
          {
            _id: data.teamMember?._id,
            image: data.teamMember?.image,
            testimonial,
            name,
            role,
          },
          ...prev,
        ]);
      }

      toast.success(`Team member ${editingTeamMember ? "updated" : "created"} successfully!`);
      resetTeamForm();
      setShowTeamForm(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Error: ${message}`);
    } finally {
      setLoading(false);
      if (typeof window !== "undefined") {
        document.body.style.overflow = "";
      }
    }
  };

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (Object.keys(errors).length > 0) {
      toast.error("Please fix form errors before submitting");
      return;
    }
    setLoading(true);
    if (typeof window !== "undefined") {
      document.body.style.overflow = "hidden";
    }
    try {
      console.log("Submitting job:", { jobTitle, jobLocation, jobDescription, employmentType, editingJob });
      if (!editingJob && (!jobTitle || !jobLocation || !jobDescription)) {
        throw new Error("Title, location, and description are required");
      }

      const formData = new FormData();
      formData.append("title", jobTitle);
      formData.append("location", jobLocation);
      formData.append("description", jobDescription);
      formData.append("employmentType", employmentType);

      const url = editingJob ? `/api/jobs/${editingJob._id}` : "/api/jobs";
      const method = editingJob ? "PUT" : "POST";

      const response = await fetch(url, { method, body: formData });
      if (!response.ok) {
        throw new Error(`Failed to ${editingJob ? "update" : "create"} job: ${await response.text()}`);
      }

      const data = await response.json();
      console.log("API response:", JSON.stringify(data, null, 2));

      if (!editingJob) {
        const newJob = data.job || data;
        if (!newJob || !newJob._id) {
          throw new Error("Invalid API response: Job ID is missing");
        }

        setJobs((prev) => [
          {
            _id: newJob._id,
            title: newJob.title || jobTitle,
            location: newJob.location || jobLocation,
            description: newJob.description || jobDescription,
            employmentType: newJob.employmentType || employmentType,
            postedDate: newJob.postedDate || new Date().toISOString(),
          },
          ...prev,
        ]);
      } else {
        setJobs((prev) =>
          prev.map((job) =>
            job._id === editingJob._id
              ? {
                  ...job,
                  title: jobTitle,
                  location: jobLocation,
                  description: jobDescription,
                  employmentType: employmentType,
                }
              : job
          )
        );
      }

      toast.success(`Job ${editingJob ? "updated" : "created"} successfully!`);
      resetJobForm();
      setShowJobForm(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.error("Error in handleJobSubmit:", message);
      toast.error(`Error: ${message}`);
    } finally {
      setLoading(false);
      if (typeof window !== "undefined") {
        document.body.style.overflow = "";
      }
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

  const handleBlogDelete = async (blogId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/blogs/${blogId}`, { method: "DELETE" });
      if (!response.ok) throw new Error(`Failed to delete blog: ${await response.text()}`);
      setBlogs(blogs.filter((blog) => blog._id !== blogId));
      toast.success("Blog deleted successfully!");
      setShowDeleteConfirm(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
    setTitle(blog.title || "");
    setCategory(blog.category || "");
    setCustomCategory(
      blog.category &&
        ![
          "AI / Machine Learning",
          "Agile",
          "Blockchain",
          "Data Services",
          "DevOps",
          "Development",
          "Marketing",
          "Product Design",
          "QA / Testing",
          "Security",
          "Soft Skills",
          "Software Architecture",
        ].includes(blog.category)
        ? blog.category
        : ""
    );
    const authorValue = blog.author || "";
    setAuthor(authorValue);
    setPrimaryImagePreview(blog.primaryImage || blog.image || "");

 const isValidImageUrl = (url: string) =>
  typeof url === 'string' && (url.startsWith('/') || url.startsWith('http://') || url.startsWith('https://'));

const blogContent = Array.isArray(blog.content)
  ? blog.content.map((item) => {
      const baseItem = {
        id: uuidv4(),
        type: item.type || "paragraph",
        value: typeof item.value === "string" ? item.value : "",
        language: item.language || (item.type === "code" ? "javascript" : undefined),
      };
      if (item.type === "image") {
        const potentialUrl = item.image || (typeof item.value === 'string' ? item.value : '') || item.imagePreview || '';
        return {
          ...baseItem,
          imagePreview: isValidImageUrl(potentialUrl) ? potentialUrl : "",
        };
      }
      return baseItem;
    })
  : [];
    console.log("Setting content for edit:", blogContent);
    setContent(blogContent);
    setShowCreateForm(true);
    // Scroll to top
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleJobDelete = async (jobId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/jobs/${jobId}`, { method: "DELETE" });
      if (!response.ok) throw new Error(`Failed to delete job: ${await response.text()}`);
      setJobs(jobs.filter((job) => job._id !== jobId));
      toast.success("Job deleted successfully!");
      setShowDeleteConfirm(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditJob = (job: Job) => {
    console.log("Editing job:", job);
    setEditingJob(job);
    setJobTitle(job.title || "");
    setJobLocation(job.location || "");
    setJobDescription(job.description || "");
    setEmploymentType(job.employmentType || "Full-Time");
    setShowJobForm(true);
    // Scroll to top
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleTeamDelete = async (memberId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/team/${memberId}`, { method: "DELETE" });
      if (!response.ok) throw new Error(`Failed to delete team member: ${await response.text()}`);
      setTeamMembers(teamMembers.filter((member) => member._id !== memberId));
      toast.success("Team member deleted successfully!");
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

  const handleEditTeamMember = (member: TeamMember) => {
    setTeamMembers((prev) => {
      const updatedMembers = prev.filter((m) => m._id !== member._id);
      return [member, ...updatedMembers];
    });
    setEditingTeamMember(member);
    setTeamImagePreview(member.image);
    setTestimonial(member.testimonial);
    setName(member.name);
    setRole(member.role);
    setShowTeamForm(true);
    // Scroll to top
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const resetBlogForm = () => {
    content.forEach((item) => {
      if (item.type === "image" && item.imagePreview && item.imagePreview.startsWith("blob:")) {
        console.log(`Revoking blob URL for item ${item.id}:`, item.imagePreview);
        URL.revokeObjectURL(item.imagePreview);
      }
    });

    setEditingBlog(null);
    setTitle("");
    setCategory("");
    setCustomCategory("");
    setAuthor("");
    setPrimaryImage(null);
    setPrimaryImagePreview("");
    setContent([]);
    setErrors({});
    setNewContentType("");

    document.querySelectorAll<HTMLInputElement>('input[type="file"]').forEach((input) => {
      input.value = "";
    });
  };

  const resetTeamForm = () => {
    setEditingTeamMember(null);
    setTeamImage(null);
    setTeamImagePreview("");
    setTestimonial("");
    setName("");
    setRole("");
    setErrors({});
  };

  const resetJobForm = () => {
    setEditingJob(null);
    setJobTitle("");
    setJobLocation("");
    setJobDescription("");
    setEmploymentType("Full-Time");
    setErrors({});
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

  const closeModal = () => {
    setViewResumeUrl(null);
    setErrorMessage(null);
    setViewingApplicationsForJob(null);
  };

  const ImageDropzone = ({ index }: { index: number }) => {
    const onDrop = useCallback(
      (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file && file.type.startsWith("image/")) {
          console.log(`ImageDropzone ${index} selected file:`, {
            name: file.name,
            type: file.type,
            size: file.size,
          });
          handleContentChange(index, "value", file);
        } else {
          console.warn(`ImageDropzone ${index} invalid file or no file selected`);
          toast.error("Please select a valid image file (JPEG, PNG, or GIF)");
        }
      },
      [index]
    );

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
      accept: { "image/*": [".jpeg", ".jpg", ".png", ".gif"] },
      maxSize: 5 * 1024 * 1024,
      multiple: false,
      onDrop,
      onDropRejected: (fileRejections) => {
        fileRejections.forEach((rejection) => {
          const error = rejection.errors[0]?.code;
          if (error === "file-too-large") {
            toast.error("Image must be smaller than 5MB");
          } else if (error === "file-invalid-type") {
            toast.error("Only JPEG, PNG, or GIF images are allowed");
          } else {
            toast.error("Failed to upload image");
          }
        });
      },
    });

    return (
      <div
        {...getRootProps({
          className: `border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${
            isDragActive ? "border-[#f6ff7a] bg-[#f6ff7a]/10" : "border-gray-600 hover:border-gray-500"
          }`,
        })}
      >
        <input {...getInputProps()} />
        <p className="text-gray-200 text-sm sm:text-base">
          {isDragActive ? "Drop the image here" : "Drag & drop an image, or click to select"}
        </p>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            console.log(`ImageDropzone ${index} select button clicked`);
            open();
          }}
          className="mt-2 px-4 py-2 bg-[#f6ff7a] text-black font-semibold rounded-lg hover:bg-yellow-500 text-sm sm:text-base"
        >
          Select Image
        </button>
     {content[index]?.imagePreview && (
  <div className="mt-4">
    <Image
      src={content[index].imagePreview}
      alt={`Content image ${index + 1}`}
      width={900}
      height={900}
      style={{ maxWidth: "300px", height: "200px", objectFit: "cover" }}
      className="mx-auto rounded-lg h-40 w-40 lg:h-60 lg:w-60 shadow-md"
      onError={(e) => {
        console.error(`ImageDropzone ${index} failed to load image:`, content[index].imagePreview);
        toast.error(`Failed to load image preview for content item ${index + 1}`);
        handleContentChange(index, "value", null);
        e.currentTarget.style.display = "none";
      }}
      onLoad={() => console.log(`ImageDropzone ${index} image loaded successfully`)}
    />
    <button
      type="button"
      onClick={() => handleContentChange(index, "value", null)}
      className="mt-2 text-red-400 hover:text-red-500 text-sm sm:text-base"
    >
      Remove Image
    </button>
  </div>
)}
{!content[index]?.imagePreview && (
  <p className="mt-4 text-gray-400 text-sm sm:text-base">No image selected</p>
)}
      </div>
    );
  };

  const inputStyle =
    "bg-[#3d3d3f] p-4 w-full rounded-lg border border-gray-600 focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white placeholder-gray-400 text-sm sm:text-base";

  // Pagination helper
  const getPaginatedItems = <T,>(items: T[], page: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }} className="min-h-screen bg-[#191a1b] text-white pt-[7em]">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick theme="dark" />
      <style jsx>{`
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
          height: calc(100% - (var(--p moults: 2)));
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
        .custom-scroll-content {
          overflow-y: auto;
          max-height: calc(85vh - 80px);
          height: 100%;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: rgba(246, 255, 122, 0.5) transparent;
        }
        .custom-scroll-content::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll-content::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scroll-content::-webkit-scrollbar-thumb {
          background: rgba(246, 255, 122, 0.5);
          border-radius: 3px;
        }
        .custom-scroll-content::-webkit-scrollbar-thumb:hover {
          background: rgba(246, 255, 122, 0.7);
        }
        .application-item {
          transition: background-color 0.2s ease;
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
                    className={inputStyle}
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
                    className={`${inputStyle} rounded-lg`}
                    placeholder="Enter your message"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-2 bg-[#f6ff7a] text-black font-bold rounded-lg hover:bg-yellow-500 disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBroadcastForm(false)}
                    className="flex-1 py-2 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500"
                  >
                    Cancel
                  </button>
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
        <button
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
        </button>
        <button
          onClick={() => setShowDeleteConfirm(null)}
          className="flex-1 py-2 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500"
        >
          Cancel
        </button>
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
              checked={activeTab === "create"}
              onChange={() => {
                setActiveTab("create");
                resetBlogForm();
              }}
            />
            <label htmlFor="rd-1" className="label">
              <span>Create</span>
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
        {activeTab === "create" && (
          <div className="space-y-6 mt-6">
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="flex items-center gap-2 px-4 py-2 bg-[#f6ff7a] text-black font-semibold rounded-lg"
            >
              {showCreateForm ? <FaMinus size={16} /> : <FaPlus size={16} />}
              {showCreateForm ? "Close Form" : "Add New Blog"}
            </button>
            {showCreateForm && (
              <form onSubmit={handleBlogSubmit} className="space-y-8">
                <div>
                  <label htmlFor="category" className="block text-lg font-medium mb-2 text-gray-200">
                    Category
                  </label>
                  <select id="category" value={category} onChange={handleCategoryChange} required className={inputStyle}>
                    <option value="">Select a category</option>
                    <option value="AI / Machine Learning">AI / Machine Learning</option>
                    <option value="Agile">Agile</option>
                    <option value="Blockchain">Blockchain</option>
                    <option value="Data Services">Data Services</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Development">Development</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Product Design">Product Design</option>
                    <option value="QA / Testing">QA / Testing</option>
                    <option value="Security">Security</option>
                    <option value="Soft Skills">Soft Skills</option>
                    <option value="Software Architecture">Software Architecture</option>
                    <option value="Other">Other</option>
                  </select>
                  {category === "Other" && (
                    <>
                      <input
                        type="text"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        placeholder="Enter custom category"
                        className={`${inputStyle} mt-2`}
                      />
                      {errors.customCategory && <p className="text-red-400 text-sm mt-1">{errors.customCategory}</p>}
                    </>
                  )}
                </div>
                <div>
                  <label htmlFor="title" className="block text-lg font-medium mb-2 text-gray-200">
                    Blog Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className={inputStyle}
                    placeholder="Enter your blog title"
                  />
                  {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
                </div>
                <div>
                  <label htmlFor="author" className="block text-lg font-medium mb-2 text-gray-200">
                    Author Name
                  </label>
                  <input
                    type="text"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                    className={inputStyle}
                    placeholder="Enter author name"
                  />
                  {errors.author && <p className="text-red-400 text-sm mt-1">{errors.author}</p>}
                </div>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                  <label htmlFor="primary-image" className="block text-lg font-medium mb-2 text-gray-200">
                    Primary Blog Image (Drag & Drop or Click)
                  </label>
                  <input
                    type="file"
                    id="primary-image"
                    accept="image/*"
                    onChange={(e) => handlePrimaryImageChange(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  <label
                    htmlFor="primary-image"
                    className="cursor-pointer inline-block px-6 py-3 bg-[#f6ff7a] hover:bg-[#AAB418] text-black font-semibold rounded-lg"
                  >
                    Select Image
                  </label>
                  {primaryImagePreview && (
                    <div className="mt-4">
                      <Image
                        src={primaryImagePreview}
                        alt="Primary Preview"
                        width={900}
                        height={900}
                        className="max-w-xs mx-auto h-40 w-40 lg:h-90 lg:w-full  rounded-lg shadow-md object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handlePrimaryImageChange(null)}
                        className="mt-2 text-red-400 hover:text-red-500"
                      >
                        Remove Image
                      </button>
                    </div>
                  )}
                  <div onDrop={handlePrimaryImageDrop} onDragOver={(e) => e.preventDefault()} className="h-20" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-[#f6ff7a]">Blog Content</h2>
                  {content.length > 0 ? (
                    content.map((item, index) => (
                      <div
                        key={item.id}
                        className="border border-gray-600 rounded-xl p-6 mb-6 bg-[#2d2d2f] shadow-lg"
                      >
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-xl font-semibold text-gray-200">
                            {item.type.charAt(0).toUpperCase() + item.type.slice(1)} {index + 1}
                          </h3>
                          <button
                            onClick={() => removeContentItem(index)}
                            className="text-red-400 hover:text-red-500 flex items-center gap-2"
                          >
                            <GrFormTrash size={18} />
                            <span className="text-sm">Remove</span>
                          </button>
                        </div>
                        {item.type === 'heading' && (
                          <input
                            type="text"
                            value={typeof item.value === 'string' ? item.value : ''}
                            onChange={(e) => handleContentChange(index, 'value', e.target.value)}
                            required
                            className={inputStyle}
                            placeholder="Enter heading"
                          />
                        )}
                        {item.type === 'paragraph' && (
                          <div className="ck-editor-container">
                            <CKEditorWrapper
                              data={typeof item.value === 'string' ? item.value : ''}
                              onChange={(data) => handleContentChange(index, 'value', data)}
                              index={index}
                            />
                          </div>
                        )}
                        {item.type === 'image' && (
                          <ImageDropzone index={index} />
                        )}
                        {item.type === 'code' && (
                          <div className="space-y-4">
                            <select
                              value={item.language || 'javascript'}
                              onChange={(e) => handleContentChange(index, 'language', e.target.value)}
                              className={inputStyle}
                            >
                              <option value="javascript">JavaScript</option>
                              <option value="python">Python</option>
                              <option value="java">Java</option>
                              <option value="cpp">C++</option>
                              <option value="html">HTML</option>
                              <option value="css">CSS</option>
                            </select>
                            <textarea
                              value={typeof item.value === 'string' ? item.value : ''}
                              onChange={(e) => handleContentChange(index, 'value', e.target.value)}
                              className={`${inputStyle} rounded-lg h-40`}
                              placeholder="Enter your code"
                            />
                            {typeof item.value === 'string' && item.value && (
                              <SyntaxHighlighter
                                language={item.language || 'javascript'}
                                style={vscDarkPlus}
                                className="mt-2 rounded-lg"
                              >
                                {item.value}
                              </SyntaxHighlighter>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm sm:text-base">No content added yet.</p>
                  )}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <select
                      value={newContentType}
                      onChange={(e) => setNewContentType(e.target.value)}
                      className={inputStyle}
                    >
                      <option value="">Select content to add</option>
                      <option value="heading">Add Heading</option>
                      <option value="paragraph">Add Paragraph</option>
                      <option value="image">Add Image</option>
                      <option value="code">Add Code</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => {
                        if (newContentType) {
                          addBlogContentItem(newContentType);
                        } else {
                          toast.error("Please select a content type");
                        }
                      }}
                      disabled={!newContentType}
                      className="px-6 py-3 bg-[#f6ff7a] hover:bg-[#AAB418] text-black font-semibold rounded-lg disabled:opacity-50"
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading || Object.keys(errors).length > 0}
                    className="flex-1 py-4 text-black font-bold rounded-lg bg-[#f6ff7a] hover:bg-[#AAB418] disabled:opacity-50"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleBlogSubmit(e);
                    }}
                  >
                    {loading ? (editingBlog ? "Updating..." : "Creating...") : editingBlog ? "Update Blog" : "Create Blog"}
                  </button>
                  {editingBlog && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        resetBlogForm();
                        setShowCreateForm(false);
                      }}
                      className="flex-1 py-4 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            )}
            <div className="space-y-6 mt-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#f6ff7a]">Your Blogs</h2>
              {blogs.length === 0 ? (
                <p className="text-gray-400 text-base sm:text-lg">No blogs found.</p>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  {getPaginatedItems(blogs, blogPage).map((blog) => (
                    <div
                      key={blog._id}
                      className="bg-[#3d3d3f] p-4 sm:p-6 rounded-xl border border-gray-600 shadow-lg flex flex-col"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        {blog.primaryImage && (
                          <Image
                            src={blog.primaryImage}
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
                        <button
                          onClick={() => handleEditBlog(blog)}
                          className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#f6ff7a] hover:bg-[#AAB418] text-black font-semibold rounded-lg text-sm sm:text-base"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm({ id: blog._id, type: "blog" })}
                          className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 text-sm sm:text-base"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <Pagination
                currentPage={blogPage}
                totalItems={blogs.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setBlogPage}
              />
            </div>
          </div>
        )}
        {activeTab === "team" && (
          <div className="space-y-6 mt-6">
            <button
              onClick={() => setShowTeamForm(!showTeamForm)}
              className="flex items-center gap-2 px-4 py-2 bg-[#f6ff7a] text-black font-semibold rounded-lg"
            >
              {showTeamForm ? <FaMinus size={16} /> : <FaPlus size={16} />}
              {showTeamForm ? "Close Form" : "Add New Team Member"}
            </button>
            {showTeamForm && (
              <form onSubmit={handleTeamSubmit} className="space-y-6 sm:space-y-8">
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 sm:p-6 text-center">
                  <label
                    htmlFor="team-image"
                    className="block text-base sm:text-lg font-medium mb-2 text-gray-200"
                  >
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
                  <div
                    onDrop={handleTeamImageDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className="h-16 sm:h-20"
                  />
                </div>
                <div>
                  <label
                    htmlFor="testimonial"
                    className="block text-base sm:text-lg font-medium mb-2 text-gray-200"
                  >
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
                  {errors.testimonial && (
                    <p className="text-red-400 text-sm mt-1">{errors.testimonial}</p>
                  )}
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
                  <button
                    type="submit"
                    disabled={loading || Object.keys(errors).length > 0}
                    className="flex-1 py-3 sm:py-4 bg-[#f6ff7a] hover:bg-[#AAB418] text-black font-bold rounded-lg disabled:opacity-50 text-sm sm:text-base"
                  >
                    {loading
                      ? editingTeamMember
                        ? "Updating..."
                        : "Creating..."
                      : editingTeamMember
                        ? "Update Team Member"
                        : "Create Team Member"}
                  </button>
                  {editingTeamMember && (
                    <button
                      type="button"
                      onClick={() => {
                        resetTeamForm();
                        setShowTeamForm(false);
                      }}
                      className="flex-1 py-3 sm:py-4 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500 text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            )}
            <h2 className="text-2xl sm:text-3xl font-bold mt-8 text-[#f6ff7a]">
              Current Team Members
            </h2>
            {teamMembers.length === 0 ? (
              <p className="text-gray-400 text-base sm:text-lg">No team members found.</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {getPaginatedItems(teamMembers, teamPage).map((member, index) => (
                  <div
                    key={index}
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
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-200 line-clamp-2">
                          {member.name}
                        </h3>
                        <p className="text-gray-400 text-sm sm:text-base">Role: {member.role}</p>
                        <p className="text-gray-400 text-sm sm:text-base line-clamp-3">
                          Testimonial: {member.testimonial}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4 sm:mt-6 justify-end">
                      <button
                        onClick={() => handleEditTeamMember(member)}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#f6ff7a] hover:bg-[#AAB418] text-black font-semibold rounded-lg text-sm sm:text-base"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm({ id: member._id, type: "team" })}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 text-sm sm:text-base"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Pagination
              currentPage={teamPage}
              totalItems={teamMembers.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setTeamPage}
            />
          </div>
        )}
        {activeTab === "jobs" && (
          <div className="space-y-6 mt-6">
            <button
              onClick={() => setShowJobForm(!showJobForm)}
              className="flex items-center gap-2 px-4 py-2 bg-[#f6ff7a] text-black font-semibold rounded-lg"
            >
              {showJobForm ? <FaMinus size={16} /> : <FaPlus size={16} />}
              {showJobForm ? "Close Form" : "Add New Job"}
            </button>
            {showJobForm && (
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
                  <label htmlFor="jobDescription" className="block text-base sm:text-lg font-medium mb-2 text-gray-200">
                    Description
                  </label>
                  <textarea
                    id="jobDescription"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    required
                    rows={5}
                    className={`${inputStyle} rounded-lg text-sm sm:text-base`}
                    placeholder="Enter job description"
                  />
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
                    className={`${inputStyle} text-sm sm:text-base`}
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={loading || Object.keys(errors).length > 0}
                    className="flex-1 py-3 sm:py-4 bg-[#f6ff7a] hover:bg-[#AAB418] text-black font-bold rounded-lg disabled:opacity-50 text-sm sm:text-base"
                  >
                    {loading ? (editingJob ? "Updating..." : "Creating...") : editingJob ? "Update Job" : "Create Job"}
                  </button>
                  {editingJob && (
                    <button
                      type="button"
                      onClick={() => {
                        resetJobForm();
                        setShowJobForm(false);
                      }}
                      className="flex-1 py-3 sm:py-4 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500 text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            )}
            <h2 className="text-2xl sm:text-3xl font-bold mt-8 text-[#f6ff7a]">Current Job Openings</h2>
            {jobs.length === 0 ? (
              <p className="text-gray-400 text-base sm:text-lg">No jobs found.</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {getPaginatedItems(jobs, jobPage).map((job) => (
                  <div
                    key={job._id}
                    className="bg-[#3d3d3f] p-4 sm:p-6 rounded-xl border border-gray-600 shadow-lg flex flex-col">
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
    <div className="flex-1">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-200 line-clamp-2">{job.title}</h3>
      <p className="text-gray-400 text-sm sm:text-base">Location: {job.location}</p>
      <p className="text-gray-400 text-sm sm:text-base">Type: {job.employmentType}</p>
      <p className="text-gray-400 text-sm sm:text-base">Posted: {new Date(job.postedDate).toLocaleDateString()}</p>
    </div>
  </div>
  <div className="flex gap-2 mt-4 sm:mt-6 justify-end lg:justify-start">
  <button
      onClick={() => setViewingApplicationsForJob(job._id)}
      className="px-3 py-1.5 sm:px-4 sm:py-2 border-1  border-gray-400  text-white font-semibold rounded-lg  text-sm sm:text-base"
    >
      View Applications
    </button>
    <button
      onClick={() => handleEditJob(job)}
      className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#f6ff7a] hover:bg-[#AAB418] text-black font-semibold rounded-lg text-sm sm:text-base"
    >
      Edit
    </button>
   
    <button
      onClick={() => setShowDeleteConfirm({ id: job._id, type: "job" })}
      className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 text-sm sm:text-base"
    >
      Delete
    </button>
  </div>
</div>
))}
</div>
)}
<Pagination
  currentPage={jobPage}
  totalItems={jobs.length}
  itemsPerPage={itemsPerPage}
  onPageChange={setJobPage}
/>
{viewingApplicationsForJob && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
    <div className="bg-[#3d3d3f] p-4 sm:p-6 rounded-lg w-full max-w-3xl max-h-[85vh] flex flex-col relative">
      <button
        onClick={closeModal}
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
                    <button
                      onClick={() => handleViewResume(application.resume)}
                      className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#f6ff7a] text-black font-semibold rounded-lg hover:bg-[#AAB418] text-sm sm:text-base flex items-center gap-2"
                    >
                      <FaEye size={16} />
                      View Resume
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm({ id: application._id, type: "application" })}
                      className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 text-sm sm:text-base flex items-center gap-2"
                    >
                      <FaTrash size={16} />
                      Delete
                    </button>
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
{activeTab === "Projects" && (
  <div className="space-y-6 mt-6">
    <Allprojectss />
  </div>
)}
{activeTab === "Reviews" && (
  <div className="space-y-6 mt-6">
    <AdminReviews />
  </div>
)}
</div>
</div>

);
}
export default AdminDashboard;
                      