
"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { GrAnnounce, GrTrash } from "react-icons/gr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import Quill from "quill";

interface ContentItem {
  type: "heading" | "paragraph" | "image" | "code";
  value: string | File | null;
  imagePreview?: string;
  language?: string;
}

interface Blog {
  _id: string;
  title: string;
  category: string;
  author: string;
  primaryImage?: string;
  content: ContentItem[];
}

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
  resume: string;
  linkedIn?: string;
  website?: string;
  country: string;
  knewRootstrap: string;
  heardFrom?: string;
  heardFromDetails?: string;
  submittedAt: string;
}

interface QuillEditorProps {
  index?: number;
  quillInstancesRef?: React.MutableRefObject<(Quill | null)[]>;
  initialValue: string;
  onChange: (value: string) => void;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ index, quillInstancesRef, initialValue, onChange }) => {
  const { quill, quillRef } = useQuill({
    theme: "snow",
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
        ["clean"],
      ],
    },
  });

  useEffect(() => {
    if (quill) {
      console.log("Quill initialized, setting initial value:", initialValue);
      quill.root.innerHTML = initialValue;
      if (quillInstancesRef && index !== undefined) {
        quillInstancesRef.current[index] = quill;
      }
      const handleTextChange = () => {
        console.log("Text changed:", quill.root.innerHTML);
        onChange(quill.root.innerHTML);
      };
      quill.on("text-change", handleTextChange);
      return () => {
        quill.off("text-change", handleTextChange);
        if (quillInstancesRef && index !== undefined) {
          quillInstancesRef.current[index] = null;
        }
      };
    }
  }, [quill, index, initialValue, onChange, quillInstancesRef]);

  return (
    <div
      ref={quillRef}
      className="bg-gray-700 rounded-lg"
      style={{
        direction: "ltr",
        height: "300px",
        backgroundColor: "#1e1e1e",
        color: "#ffffff",
      }}
    />
  );
};

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"create" | "blogs" | "team" | "jobs">("create");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [customCategory, setCustomCategory] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [primaryImage, setPrimaryImage] = useState<File | null>(null);
  const [primaryImagePreview, setPrimaryImagePreview] = useState<string>("");
  const [teamImage, setTeamImage] = useState<File | null>(null);
  const [teamImagePreview, setTeamImagePreview] = useState<string>("");
  const [testimonial, setTestimonial] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const [jobLocation, setJobLocation] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [employmentType, setEmploymentType] = useState<string>("Full-Time");
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [newContentType, setNewContentType] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [viewingApplicationsForJob, setViewingApplicationsForJob] = useState<string | null>(null);
  const [viewResumeUrl, setViewResumeUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showBroadcastForm, setShowBroadcastForm] = useState<boolean>(false);
  const [broadcastSubject, setBroadcastSubject] = useState<string>("");
  const [broadcastMessage, setBroadcastMessage] = useState<string>("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{
    id: string;
    type: "blog" | "team" | "job" | "application";
  } | null>(null);
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const quillInstancesRef = useRef<(Quill | null)[]>([]);

  const debounce = <T extends (...args: any[]) => void>(func: T, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

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

  useEffect(() => {
    const fetchData = async () => {
      if (activeTab === "blogs") {
        try {
          const response = await fetch("/api/blogs/allblogs");
          if (!response.ok) throw new Error("Failed to fetch blogs");
          const data: Blog[] = await response.json();
          setBlogs(data);
        } catch (error: unknown) {
          const message = error instanceof Error ? error.message : "Unknown error";
          toast.error(`Error fetching blogs: ${message}`);
        }
      } else if (activeTab === "team") {
        try {
          const response = await fetch("/api/team");
          if (!response.ok) throw new Error("Failed to fetch team members");
          const data: TeamMember[] = await response.json();
          setTeamMembers(data);
        } catch (error: unknown) {
          const message = error instanceof Error ? error.message : "Unknown error";
          toast.error(`Error fetching team members: ${message}`);
        }
      } else if (activeTab === "jobs") {
        try {
          const [jobsResponse, appsResponse] = await Promise.all([
            fetch("/api/jobs"),
            fetch("/api/applications"),
          ]);
          if (!jobsResponse.ok) throw new Error("Failed to fetch jobs");
          if (!appsResponse.ok) throw new Error("Failed to fetch applications");
          const [jobsData, appsData]: [Job[], Application[]] = await Promise.all([
            jobsResponse.json(),
            appsResponse.json(),
          ]);
          setJobs(jobsData);
          setApplications(appsData);
        } catch (error: unknown) {
          const message = error instanceof Error ? error.message : "Unknown error";
          toast.error(`Error fetching jobs or applications: ${message}`);
        }
      }
    };
    fetchData();
  }, [activeTab]);

  useEffect(() => {
    const newErrors: { [key: string]: string } = {};
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
      if (jobDescription && jobDescription.length < 10)
        newErrors.jobDescription = "Description must be at least 10 characters";
    }
    setErrors(newErrors);
  }, [title, author, category, customCategory, name, role, testimonial, jobTitle, jobLocation, jobDescription]);

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

  const handleImageDrop = useCallback(
    (index: number, e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) handleContentChange(index, "value", file);
    },
    []
  );

  const addContentItem = (type: ContentItem["type"]) => {
    let newItem: ContentItem = { type, value: "" };
    if (type === "image") newItem = { type, value: null, imagePreview: "" };
    else if (type === "code") newItem = { type, value: "", language: "javascript" };
    setContent([...content, newItem]);
    quillInstancesRef.current = [...quillInstancesRef.current, null];
    setNewContentType("");
  };

  const handleContentChange = (
    index: number,
    field: "value" | "language",
    value: string | File | null
  ) => {
    const updatedContent = [...content];
    if (field === "value") {
      updatedContent[index].value = value;
      if (updatedContent[index].type === "image" && value instanceof File) {
        updatedContent[index].imagePreview = URL.createObjectURL(value);
      } else if (updatedContent[index].type === "image" && value === null) {
        updatedContent[index].imagePreview = "";
      }
    } else if (field === "language" && typeof value === "string") {
      updatedContent[index].language = value;
    }
    setContent(updatedContent);
  };

  const removeContentItem = (index: number) => {
    const updatedContent = [...content];
    updatedContent.splice(index, 1);
    setContent(updatedContent);
    const updatedQuills = [...quillInstancesRef.current];
    updatedQuills.splice(index, 1);
    quillInstancesRef.current = updatedQuills;
  };

  const handleBlogSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      toast.error("Please fix form errors before submitting");
      return;
    }
    setLoading(true);
    try {
      if (!title || !category || !author) throw new Error("Title, category, and author are required");
      const effectiveCategory = category === "Other" ? customCategory : category;
      if (!effectiveCategory) throw new Error("Please specify a category");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", effectiveCategory);
      formData.append("author", author);
      if (primaryImage) formData.append("primaryImage", primaryImage);

      const processedContent = content.map((item, index) => {
        const quill = quillInstancesRef.current[index];
        const value = item.type === "paragraph" && quill ? quill.root.innerHTML : item.value;
        return {
          type: item.type,
          value: typeof value === "string" ? value : `image-${index}`,
          language: item.language,
        };
      });

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

      toast.success(`Blog ${editingBlog ? "updated" : "created"} successfully!`);
      if (editingBlog) {
        setEditingBlog(null);
        setActiveTab("blogs");
      } else {
        router.push("/");
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTeamSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      toast.error("Please fix form errors before submitting");
      return;
    }
    setLoading(true);
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

      toast.success(`Team member ${editingTeamMember ? "updated" : "created"} successfully!`);
      resetTeamForm();
      setActiveTab("team");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleJobSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      toast.error("Please fix form errors before submitting");
      return;
    }
    setLoading(true);
    try {
      if (!jobTitle || !jobLocation || !jobDescription)
        throw new Error("Title, location, and description are required");

      const formData = new FormData();
      formData.append("title", jobTitle);
      formData.append("location", jobLocation);
      formData.append("description", jobDescription);
      formData.append("employmentType", employmentType);

      const url = editingJob ? `/api/jobs/${editingJob._id}` : "/api/jobs";
      const method = editingJob ? "PUT" : "POST";

      const response = await fetch(url, { method, body: formData });
      if (!response.ok) throw new Error(`Failed to ${editingJob ? "update" : "create"} job: ${await response.text()}`);

      toast.success(`Job ${editingJob ? "updated" : "created"} successfully!`);
      resetJobForm();
      setActiveTab("jobs");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleBroadcastSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      const data: { error?: string; message?: string } = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to send broadcast email");
      toast.success(data.message);
      setShowBroadcastForm(false);
      setBroadcastSubject("");
      setBroadcastMessage("");
    } catch (error: unknown) {
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
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setCategory(blog.category);
    setCustomCategory(blog.category === "Other" ? blog.category : "");
    setAuthor(blog.author);
    setPrimaryImagePreview(blog.primaryImage || "");
    setContent(
      blog.content.map((item) => ({
        ...item,
        imagePreview: item.type === "image" && typeof item.value === "string" ? item.value : item.imagePreview,
      }))
    );
    setActiveTab("create");
    quillInstancesRef.current = blog.content.map(() => null);
  };

  const handleJobDelete = async (jobId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/jobs/${jobId}`, { method: "DELETE" });
      if (!response.ok) throw new Error(`Failed to delete job: ${await response.text()}`);
      setJobs(jobs.filter((job) => job._id !== jobId));
      toast.success("Job deleted successfully!");
      setShowDeleteConfirm(null);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setJobTitle(job.title);
    setJobLocation(job.location);
    setJobDescription(job.description);
    setEmploymentType(job.employmentType);
    setActiveTab("jobs");
  };

  const handleTeamDelete = async (memberId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/team/${memberId}`, { method: "DELETE" });
      if (!response.ok) throw new Error(`Failed to delete team member: ${await response.text()}`);
      setTeamMembers(teamMembers.filter((member) => member._id !== memberId));
      toast.success("Team member deleted successfully!");
      setShowDeleteConfirm(null);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleApplicationDelete = async (
    applicationId: string,
    setApplications: React.Dispatch<React.SetStateAction<Application[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setShowDeleteConfirm: React.Dispatch<
      React.SetStateAction<{ id: string; type: "blog" | "team" | "job" | "application" } | null>
    >
  ) => {
    console.log("Attempting to delete application with ID:", applicationId);
    if (!applicationId || !/^[0-9a-fA-F]{24}$/.test(applicationId)) {
      console.error("Invalid applicationId format:", applicationId);
      toast.error("Invalid application ID. Please try again.");
      setShowDeleteConfirm(null);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`/api/applications/${applicationId}`, { method: "DELETE" });
      if (!response.ok) {
        const errorData: { error?: string } = await response.json();
        throw new Error(errorData.error || "Failed to delete application");
      }
      setApplications((prev) => prev.filter((app) => app._id !== applicationId));
      toast.success("Application deleted successfully!");
      setShowDeleteConfirm(null);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.error("Deletion error:", error);
      toast.error(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditTeamMember = (member: TeamMember) => {
    setEditingTeamMember(member);
    setTeamImagePreview(member.image);
    setTestimonial(member.testimonial);
    setName(member.name);
    setRole(member.role);
    setActiveTab("team");
  };

  const resetBlogForm = () => {
    setEditingBlog(null);
    setTitle("");
    setCategory("");
    setCustomCategory("");
    setAuthor("");
    setPrimaryImage(null);
    setPrimaryImagePreview("");
    setContent([]);
    setErrors({});
    quillInstancesRef.current = [];
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
    setErrorMessage(null);
    if (!resumeUrl || !resumeUrl.startsWith("https://res.cloudinary.com")) {
      setErrorMessage("Invalid resume URL. Please check the database entry.");
      return;
    }

    const baseUrl = resumeUrl.split("?")[0];
    const inlineUrl = `${baseUrl}/fl_attachment:false,fl_inline,f_pdf`;
    setViewResumeUrl(inlineUrl);
  };

  const closeModal = () => {
    setViewResumeUrl(null);
    setErrorMessage(null);
    setViewingApplicationsForJob(null);
  };

  const inputStyle =
    "bg-[#3d3d3f] p-4 w-full rounded-t-lg border-b-2 border-transparent focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white placeholder-gray-400";

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
          --w-label: 100px;
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
          font-size: 0.875rem;
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
          height: calc(100% - (var(--p-y) * 4));
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
        .custom-scroll-content {
          overflow-y: auto;
          max-height: calc(85vh - 80px);
          height: 100%;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: rgba(246, 255, 122, 0.5) transparent;
          will-change: scroll-position;
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
        .ql-container {
          background-color: #1e1e1e !important;
          color: #ffffff !important;
          border-radius: 0.5rem;
        }
        .ql-editor {
          min-height: 260px;
          color: #ffffff !important;
        }
        .ql-toolbar {
          background-color: #2d2d2f !important;
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
        }
        .ql-container.ql-snow {
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
        }
      `}</style>
      <div className="max-w-4xl mx-auto bg-[#191a1b] rounded-xl shadow-2xl p-8 relative">
        <button
          onClick={() => setShowBroadcastForm(true)}
          className="absolute top-4 right-4 animate-bounce text-[#f6ff7a] hover:text-yellow-500 cursor-pointer"
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-[#3d3d3f] p-6 rounded-lg w-96 shadow-xl"
            >
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
                      handleApplicationDelete(
                        showDeleteConfirm.id,
                        setApplications,
                        setLoading,
                        setShowDeleteConfirm
                      );
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
            </motion.div>
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
              checked={activeTab === "blogs"}
              onChange={() => setActiveTab("blogs")}
            />
            <label htmlFor="rd-2" className="label">
              <span>Blogs</span>
            </label>
            <input
              type="radio"
              id="rd-3"
              name="radio"
              className="rd-3"
              checked={activeTab === "team"}
              onChange={() => setActiveTab("team")}
            />
            <label htmlFor="rd-3" className="label">
              <span>Team</span>
            </label>
            <input
              type="radio"
              id="rd-4"
              name="radio"
              className="rd-4"
              checked={activeTab === "jobs"}
              onChange={() => setActiveTab("jobs")}
            />
            <label htmlFor="rd-4" className="label">
              <span>Jobs</span>
            </label>
            <div className="bar"></div>
            <div className="slidebar"></div>
          </div>
        </div>
        {activeTab === "create" && (
          <form onSubmit={handleBlogSubmit} className="space-y-8 mt-6">
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
                className="cursor-pointer inline-block px-6 py-3 bg-[#f6ff7a] text-black font-semibold rounded-lg hover:bg-yellow-500"
              >
                Select Image
              </label>
              {primaryImagePreview && (
                <div className="mt-4">
                  <Image
                    src={primaryImagePreview}
                    alt="Primary Preview"
                    width={300}
                    height={200}
                    className="max-w-xs mx-auto rounded-lg shadow-md object-cover"
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
              {content.map((item, index) => (
                <div key={index} className="border border-gray-600 rounded-xl p-6 mb-6 bg-gray-900 shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-gray-200">
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)} {index + 1}
                  </h3>
                  {item.type === "heading" && (
                    <input
                      type="text"
                      value={typeof item.value === "string" ? item.value : ""}
                      onChange={(e) => handleContentChange(index, "value", e.target.value)}
                      required
                      className={inputStyle}
                      placeholder="Enter heading"
                    />
                  )}
                  {item.type === "paragraph" && (
                    <QuillEditor
                      index={index}
                      quillInstancesRef={quillInstancesRef}
                      initialValue={typeof item.value === "string" ? item.value : ""}
                      onChange={(value) => handleContentChange(index, "value", value)}
                    />
                  )}
                  {item.type === "image" && (
                    <div
                      className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center"
                      onDrop={(e) => handleImageDrop(index, e)}
                      onDragOver={(e) => e.preventDefault()}
                    >
                      <input
                        type="file"
                        id={`image-${index}`}
                        accept="image/*"
                        onChange={(e) => handleContentChange(index, "value", e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <label
                        htmlFor={`image-${index}`}
                        className="cursor-pointer inline-block px-6 py-3 bg-[#f6ff7a] text-black font-semibold rounded-lg hover:bg-yellow-500"
                      >
                        Select Image
                      </label>
                      {item.imagePreview && (
                        <div className="mt-4">
                          <Image
                            src={item.imagePreview}
                            alt="Preview"
                            width={300}
                            height={200}
                            className="max-w-xs mx-auto rounded-lg shadow-md object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleContentChange(index, "value", null)}
                            className="mt-2 text-red-400 hover:text-red-500"
                          >
                            Remove Image
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  {item.type === "code" && (
                    <div>
                      <select
                        value={item.language || "javascript"}
                        onChange={(e) => handleContentChange(index, "language", e.target.value)}
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
                        value={typeof item.value === "string" ? item.value : ""}
                        onChange={(e) => handleContentChange(index, "value", e.target.value)}
                        className={`${inputStyle} rounded-lg h-40`}
                        placeholder="Enter your code"
                      />
                      {typeof item.value === "string" && item.value && (
                        <SyntaxHighlighter
                          language={item.language || "javascript"}
                          style={vscDarkPlus}
                          className="mt-2 rounded-lg"
                        >
                          {item.value}
                        </SyntaxHighlighter>
                      )}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => removeContentItem(index)}
                    className="mt-4 text-red-400 hover:text-red-500"
                  >
                    Remove {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </button>
                </div>
              ))}
              <div className="flex gap-4">
                <select
                  value={newContentType}
                  onChange={(e) => setNewContentType(e.target.value)}
                  className={inputStyle}
                >
                  <option value="">Select content to add</option>
                  <option value="heading">Add Title</option>
                  <option value="paragraph">Add Paragraph</option>
                  <option value="image">Add Image</option>
                  <option value="code">Add Code</option>
                </select>
                <button
                  type="button"
                  onClick={() => newContentType && addContentItem(newContentType as ContentItem["type"])}
                  disabled={!newContentType}
                  className="px-6 py-3 bg-[#f6ff7a] text-black font-semibold rounded-lg hover:bg-yellow-500 disabled:opacity-50"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading || Object.keys(errors).length > 0}
                className="flex-1 py-4 bg-[#f6ff7a] text-black font-bold rounded-lg hover:bg-yellow-500 disabled:opacity-50"
              >
                {loading ? (editingBlog ? "Updating..." : "Creating...") : editingBlog ? "Update Blog" : "Create Blog"}
              </button>
              {editingBlog && (
                <button
                  type="button"
                  onClick={resetBlogForm}
                  className="flex-1 py-4 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        )}
        {activeTab === "blogs" && (
          <div className="space-y-6 mt-6">
            <h2 className="text-2xl font-bold text-[#f6ff7a]">Your Blogs</h2>
            {blogs.length === 0 ? (
              <p className="text-gray-400">No blogs found.</p>
            ) : (
              <div className="grid gap-6">
                {blogs.map((blog) => (
                  <div key={blog._id} className="bg-[#3d3d3f] p-6 rounded-xl border border-gray-600 shadow-lg">
                    <div className="flex items-center gap-4">
                      {blog.primaryImage && (
                        <Image
                          src={blog.primaryImage}
                          alt={blog.title}
                          width={96}
                          height={96}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-200">{blog.title}</h3>
                        <p className="text-gray-400">Category: {blog.category}</p>
                        <p className="text-gray-400">Author: {blog.author}</p>
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleEditBlog(blog)}
                          className="px-4 py-2 bg-[#f6ff7a] text-black font-semibold rounded-lg hover:bg-yellow-500"
                        >
                          Edit
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowDeleteConfirm({ id: blog._id, type: "blog" })}
                          className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500"
                        >
                          Delete
                        </motion.button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {activeTab === "team" && (
          <div className="space-y-6 mt-6">
            <h2 className="text-2xl font-bold text-[#f6ff7a]">Team Members</h2>
            <form onSubmit={handleTeamSubmit} className="space-y-8">
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                <label htmlFor="team-image" className="block text-lg font-medium mb-2 text-gray-200">
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
                  className="cursor-pointer inline-block px-6 py-3 bg-[#f6ff7a] text-black font-semibold rounded-lg hover:bg-yellow-500"
                >
                  Select Image
                </label>
                {teamImagePreview && (
                  <div className="mt-4">
                    <Image
                      src={teamImagePreview}
                      alt="Team Member Preview"
                      width={128}
                      height={128}
                      className="w-32 h-32 mx-auto rounded-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleTeamImageChange(null)}
                      className="mt-2 text-red-400 hover:text-red-500"
                    >
                      Remove Image
                    </button>
                  </div>
                )}
                <div onDrop={handleTeamImageDrop} onDragOver={(e) => e.preventDefault()} className="h-20" />
              </div>
              <div>
                <label htmlFor="testimonial" className="block text-lg font-medium mb-2 text-gray-200">
                  Testimonial (Max 5 lines, 500 characters)
                </label>
                <textarea
                  id="testimonial"
                  value={testimonial}
                  onChange={(e) => setTestimonial(e.target.value)}
                  required
                  rows={5}
                  maxLength={500}
                  className={`${inputStyle} rounded-lg`}
                  placeholder="Enter team member testimonial"
                />
                {errors.testimonial && <p className="text-red-400 text-sm mt-1">{errors.testimonial}</p>}
              </div>
              <div>
                <label htmlFor="name" className="block text-lg font-medium mb-2 text-gray-200">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={inputStyle}
                  placeholder="Enter team member name"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="role" className="block text-lg font-medium mb-2 text-gray-200">
                  Role
                </label>
                <input
                  type="text"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className={inputStyle}
                  placeholder="Enter team member role"
                />
                {errors.role && <p className="text-red-400 text-sm mt-1">{errors.role}</p>}
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading || Object.keys(errors).length > 0}
                  className="flex-1 py-4 bg-[#f6ff7a] text-black font-bold rounded-lg hover:bg-yellow-500 disabled:opacity-50"
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
                    onClick={resetTeamForm}
                    className="flex-1 py-4 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-200 mb-4">Team Members</h3>
              {teamMembers.length === 0 ? (
                <p className="text-gray-400">No team members found.</p>
              ) : (
                <div className="grid gap-6">
                  {teamMembers.map((member) => (
                    <div
                      key={member._id}
                      className="bg-gray-900 p-6 rounded-xl border border-gray-600 shadow-lg"
                    >
                      <div className="flex items-center gap-4">
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={96}
                          height={96}
                          className="w-24 h-24 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-gray-200">{member.name}</h4>
                          <p className="text-gray-400">{member.role}</p>
                          <p className="text-gray-300 mt-2 line-clamp-5">{member.testimonial}</p>
                        </div>
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleEditTeamMember(member)}
                            className="px-4 py-2 bg-[#f6ff7a] text-black font-semibold rounded-lg hover:bg-yellow-500"
                          >
                            Edit
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowDeleteConfirm({ id: member._id, type: "team" })}
                            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500"
                          >
                            Delete
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        {activeTab === "jobs" && (
          <div className="space-y-6 mt-6">
            <h2 className="text-2xl font-bold text-[#f6ff7a]">Job Postings</h2>
            <form onSubmit={handleJobSubmit} className="space-y-8">
              <div>
                <label htmlFor="jobTitle" className="block text-lg font-medium mb-2 text-gray-200">
                  Job Title
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                  className={inputStyle}
                  placeholder="Enter job title"
                />
                {errors.jobTitle && <p className="text-red-400 text-sm mt-1">{errors.jobTitle}</p>}
              </div>
              <div>
                <label htmlFor="jobLocation" className="block text-lg font-medium mb-2 text-gray-200">
                  Location
                </label>
                <input
                  type="text"
                  id="jobLocation"
                  value={jobLocation}
                  onChange={(e) => setJobLocation(e.target.value)}
                  required
                  className={inputStyle}
                  placeholder="Enter location (e.g., Argentina/Colombia)"
                />
                {errors.jobLocation && <p className="text-red-400 text-sm mt-1">{errors.jobLocation}</p>}
              </div>
              <div>
  <label htmlFor="jobDescription" className="block text-lg font-medium mb-2 text-gray-200">
    Description
  </label>

  {/* Add wrapper for styling */}
  <div className="quill-wrapper">
    <QuillEditor initialValue={jobDescription} onChange={setJobDescription} />
  </div>

  {errors.jobDescription && (
    <p className="text-red-400 text-sm mt-1">{errors.jobDescription}</p>
  )}
</div>


              <div>
                <label htmlFor="employmentType" className="block text-lg font-medium mb-2 text-gray-200">
                  Employment Type
                </label>
                <select
                  id="employmentType"
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  required
                  className={inputStyle}
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading || Object.keys(errors).length > 0}
                  className="flex-1 py-4 bg-[#f6ff7a] text-black font-bold rounded-lg hover:bg-yellow-500 disabled:opacity-50"
                >
                  {loading ? (editingJob ? "Updating..." : "Creating...") : editingJob ? "Update Job" : "Create Job"}
                </button>
                {editingJob && (
                  <button
                    type="button"
                    onClick={resetJobForm}
                    className="flex-1 py-4 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-200 mb-4">Posted Jobs</h3>
              {jobs.length === 0 ? (
                <p className="text-gray-400">No jobs found.</p>
              ) : (
                <div className="grid gap-6">
                  {jobs.map((job) => (
                    <div
                      key={job._id}
                      className="bg-gray-900 p-6 rounded-xl border border-gray-600 shadow-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-gray-200">{job.title}</h4>
                          <p className="text-gray-400">
                            {job.location} · {job.employmentType}
                          </p>
                          <p className="text-gray-400">Posted: {new Date(job.postedDate).toLocaleDateString()}</p>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              setViewingApplicationsForJob(
                                viewingApplicationsForJob === job._id ? null : job._id
                              )
                            }
                            className="mt-2 text-[#f6ff7a] hover:text-yellow-500 font-semibold"
                          >
                            {viewingApplicationsForJob === job._id ? "Hide Applications" : "View Applications"} (
                            {applications.filter((app) => app.jobId === job._id).length})
                          </motion.button>
                        </div>
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleEditJob(job)}
                            className="px-4 py-2 bg-[#f6ff7a] text-black font-semibold rounded-lg hover:bg-yellow-500"
                          >
                            Edit
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowDeleteConfirm({ id: job._id, type: "job" })}
                            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500"
                          >
                            Delete
                          </motion.button>
                        </div>
                      </div>
                      <AnimatePresence>
                        {viewingApplicationsForJob === job._id && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[50]"
                          >
                            <motion.div
                              initial={{ y: -100, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: -100, opacity: 0 }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                              className="bg-[#2d2d2f] p-8 rounded-2xl w-11/12 max-w-3xl h-[85vh] flex flex-col shadow-2xl border border-gray-700"
                            >
                              <div className="flex justify-between items-center mb-6 flex-shrink-0">
                                <h5 className="text-2xl font-bold text-[#f6ff7a]">
                                  Applications for {job.title}
                                </h5>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => setViewingApplicationsForJob(null)}
                                  className="text-gray-400 hover:text-gray-200"
                                >
                                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </motion.button>
                              </div>
                              <div ref={scrollRef} className="custom-scroll-content flex-1">
                                {applications.filter((app) => app.jobId === job._id).length === 0 ? (
                                  <p className="text-gray-400 text-center py-8">No applications yet.</p>
                                ) : (
                                  <div className="space-y-4">
                                    {applications
                                      .filter((app) => {
                                        const isValid = app.jobId === job._id && app._id && /^[0-9a-fA-F]{24}$/.test(app._id);
                                        if (!isValid) {
                                          console.error("Skipping invalid application:", app);
                                        }
                                        return isValid;
                                      })
                                      .map((app) => (
                                        <div
                                          key={app._id}
                                          className="application-item bg-[#3d3d3f] p-6 rounded-xl relative hover:bg-[#454547]"
                                        >
                                          <motion.button
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => {
                                              console.log("Delete clicked for application:", app._id);
                                              setShowDeleteConfirm({ id: app._id, type: "application" });
                                            }}
                                            className="absolute top-4 right-4 text-red-400 hover:text-red-500"
                                            disabled={loading}
                                          >
                                            <GrTrash size={20} />
                                          </motion.button>
                                          <div className="flex flex-col gap-2">
                                            <p className="text-gray-200">
                                              <strong>Name:</strong> {app.firstName} {app.lastName}
                                            </p>
                                            <p className="text-gray-200">
                                              <strong>Email:</strong> {app.email}
                                            </p>
                                            <p className="text-gray-200">
                                              <strong>Phone:</strong> {app.phone}
                                            </p>
                                            <p className="text-gray-200">
                                              <strong>Country:</strong> {app.country}
                                            </p>
                                            {app.linkedIn && (
                                              <p className="text-gray-200">
                                                <strong>LinkedIn:</strong>{" "}
                                                <a
                                                  href={app.linkedIn}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="text-[#f6ff7a] hover:underline"
                                                >
                                                  Profile
                                                </a>
                                              </p>
                                            )}
                                            {app.website && (
                                              <p className="text-gray-200">
                                                <strong>Website:</strong>{" "}
                                                <a
                                                  href={app.website}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="text-[#f6ff7a] hover:underline"
                                                >
                                                  Visit
                                                </a>
                                              </p>
                                            )}
                                            <p className="text-gray-200">
                                              <strong>Submitted:</strong>{" "}
                                              {new Date(app.submittedAt).toLocaleDateString()}
                                            </p>
                                            <motion.button
                                              whileHover={{ scale: 1.05 }}
                                              whileTap={{ scale: 0.95 }}
                                              onClick={() => handleViewResume(app.resume)}
                                              className="mt-2 px-4 py-2 bg-[#f6ff7a] text-black font-semibold rounded-lg hover:bg-yellow-500 w-fit"
                                            >
                                              View Resume
                                            </motion.button>
                                          </div>
                                        </div>
                                      ))}
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {viewResumeUrl && (
                        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[50]">
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="bg-white p-4 rounded-xl w-3/4 h-3/4 relative shadow-xl"
                          >
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={closeModal}
                              className="absolute top-4 right-4 text-black font-bold"
                            >
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </motion.button>
                            {errorMessage ? (
                              <div className="text-red-500 text-center">
                                {errorMessage}
                                <br />
                                <a
                                  href={viewResumeUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-500 underline mt-2 block"
                                >
                                  Download Resume
                                </a>
                              </div>
                            ) : (
                              <iframe
                                src={viewResumeUrl}
                                className="w-full h-full border-0 rounded-lg"
                                title="Resume Viewer"
                                onError={() =>
                                  setErrorMessage("Failed to load resume in iframe. Please download instead.")
                                }
                              />
                            )}
                          </motion.div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
