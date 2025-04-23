"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

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

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"create" | "blogs" | "team">("create");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null);
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [customCategory, setCustomCategory] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [primaryImage, setPrimaryImage] = useState<File | null>(null);
  const [primaryImagePreview, setPrimaryImagePreview] = useState<string>("");
  const [content, setContent] = useState<ContentItem[]>([]);
  const [teamImage, setTeamImage] = useState<File | null>(null);
  const [teamImagePreview, setTeamImagePreview] = useState<string>("");
  const [testimonial, setTestimonial] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [newContentType, setNewContentType] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const quillInstancesRef = useRef<(any | null)[]>([]);

  // Fetch blogs for Blogs tab
  useEffect(() => {
    if (activeTab === "blogs") {
      const fetchBlogs = async () => {
        try {
          const response = await fetch("/api/blogs/allblogs");
          if (!response.ok) throw new Error("Failed to fetch blogs");
          const data = await response.json();
          setBlogs(data);
        } catch (error: any) {
          alert(`Error fetching blogs: ${error.message}`);
        }
      };
      fetchBlogs();
    }
  }, [activeTab]);

  // Fetch team members for Team tab
  useEffect(() => {
    if (activeTab === "team") {
      const fetchTeamMembers = async () => {
        try {
          const response = await fetch("/api/team");
          if (!response.ok) throw new Error("Failed to fetch team members");
          const data = await response.json();
          setTeamMembers(data);
        } catch (error: any) {
          alert(`Error fetching team members: ${error.message}`);
        }
      };
      fetchTeamMembers();
    }
  }, [activeTab]);

  // Real-time validation for blog form
  useEffect(() => {
    const newErrors: { [key: string]: string } = {};
    if (activeTab === "create") {
      if (title && title.length < 3) {
        newErrors.title = "Title must be at least 3 characters";
      }
      if (author && author.length < 2) {
        newErrors.author = "Author name must be at least 2 characters";
      }
      if (category === "Other" && customCategory.length < 2) {
        newErrors.customCategory = "Custom category must be at least 2 characters";
      }
    } else if (activeTab === "team") {
      if (name && name.length < 2) {
        newErrors.name = "Name must be at least 2 characters";
      }
      if (role && role.length < 2) {
        newErrors.role = "Role must be at least 2 characters";
      }
      if (testimonial) {
        const lines = testimonial.split("\n");
        if (lines.length > 5) {
          newErrors.testimonial = "Testimonial cannot exceed 5 lines";
        } else if (testimonial.length > 500) {
          newErrors.testimonial = "Testimonial cannot exceed 500 characters";
        }
      }
    }
    setErrors(newErrors);
  }, [title, author, category, customCategory, name, role, testimonial, activeTab]);

  // Handle category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    if (e.target.value !== "Other") {
      setCustomCategory("");
    }
  };

  // Handle primary image upload for blog
  const handlePrimaryImageChange = (file: File | null) => {
    if (file) {
      setPrimaryImage(file);
      setPrimaryImagePreview(URL.createObjectURL(file));
    } else {
      setPrimaryImage(null);
      setPrimaryImagePreview(editingBlog?.primaryImage || "");
    }
  };

  // Handle team image upload
  const handleTeamImageChange = (file: File | null) => {
    if (file) {
      setTeamImage(file);
      setTeamImagePreview(URL.createObjectURL(file));
    } else {
      setTeamImage(null);
      setTeamImagePreview(editingTeamMember?.image || "");
    }
  };

  // Handle drag-and-drop for primary image
  const handlePrimaryImageDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handlePrimaryImageChange(file);
    }
  }, []);

  // Handle drag-and-drop for team image
  const handleTeamImageDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleTeamImageChange(file);
    }
  }, []);

  // Add new content item for blog
  const addContentItem = (type: ContentItem["type"]) => {
    let newItem: ContentItem = { type, value: "" };
    if (type === "image") {
      newItem = { type, value: null, imagePreview: "" };
    } else if (type === "code") {
      newItem = { type, value: "", language: "javascript" };
    }
    setContent([...content, newItem]);
    quillInstancesRef.current = [...quillInstancesRef.current, null];
    setNewContentType("");
  };

  // Handle content change for blog
  const handleContentChange = (
    index: number,
    field: "value" | "language",
    value: string | File | null
  ) => {
    const updatedContent = [...content];
    updatedContent[index][field] = value;
    if (field === "value" && updatedContent[index].type === "image" && value instanceof File) {
      updatedContent[index].imagePreview = URL.createObjectURL(value);
    }
    setContent(updatedContent);
  };

  // Remove content item for blog
  const removeContentItem = (index: number) => {
    const updatedContent = [...content];
    updatedContent.splice(index, 1);
    setContent(updatedContent);
    const updatedQuills = [...quillInstancesRef.current];
    updatedQuills.splice(index, 1);
    quillInstancesRef.current = updatedQuills;
  };

  // Handle image drop for blog content sections
  const handleImageDrop = useCallback(
    (index: number, e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        handleContentChange(index, "value", file);
      }
    },
    []
  );

  // Handle blog form submission
  const handleBlogSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      alert("Please fix form errors before submitting");
      return;
    }
    setLoading(true);

    try {
      if (!title || !category || !author) {
        throw new Error("Title, category, and author are required");
      }

      const effectiveCategory = category === "Other" ? customCategory : category;
      if (!effectiveCategory) {
        throw new Error("Please specify a category");
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", effectiveCategory);
      formData.append("author", author);
      if (primaryImage) {
        formData.append("primaryImage", primaryImage);
      }

      const processedContent = content.map((item, index) => {
        const quill = quillInstancesRef.current[index];
        const value =
          item.type === "paragraph" && quill ? quill.root.innerHTML : item.value;
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

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to ${editingBlog ? "update" : "create"} blog: ${errorText}`);
      }

      alert(`Blog ${editingBlog ? "updated" : "created"} successfully!`);
      if (editingBlog) {
        setEditingBlog(null);
        setActiveTab("blogs");
      } else {
        router.push("/");
      }
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle team form submission
  const handleTeamSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      alert("Please fix form errors before submitting");
      return;
    }
    setLoading(true);

    try {
      if (!teamImage && !editingTeamMember) {
        throw new Error("Image is required");
      }
      if (!testimonial || !name || !role) {
        throw new Error("Testimonial, name, and role are required");
      }

      const formData = new FormData();
      formData.append("testimonial", testimonial);
      formData.append("name", name);
      formData.append("role", role);
      if (teamImage) {
        formData.append("image", teamImage);
      }

      const url = editingTeamMember ? `/api/team/${editingTeamMember._id}` : "/api/team";
      const method = editingTeamMember ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to ${editingTeamMember ? "update" : "create"} team member: ${errorText}`);
      }

      alert(`Team member ${editingTeamMember ? "updated" : "created"} successfully!`);
      setEditingTeamMember(null);
      setTeamImage(null);
      setTeamImagePreview("");
      setTestimonial("");
      setName("");
      setRole("");
      setActiveTab("team");
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle blog deletion
  const handleBlogDelete = async (blogId: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    setLoading(true);

    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete blog: ${errorText}`);
      }

      setBlogs(blogs.filter((blog) => blog._id !== blogId));
      alert("Blog deleted successfully!");
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle team member deletion
  const handleTeamDelete = async (teamId: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    setLoading(true);

    try {
      const response = await fetch(`/api/team/${teamId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete team member: ${errorText}`);
      }

      setTeamMembers(teamMembers.filter((member) => member._id !== teamId));
      alert("Team member deleted successfully!");
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle edit blog
  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setCategory(blog.category);
    setCustomCategory(
      blog.category !== "Technology" &&
      blog.category !== "Lifestyle" &&
      blog.category !== "Education" &&
      blog.category !== "Travel"
        ? blog.category
        : ""
    );
    setAuthor(blog.author);
    setPrimaryImage(null);
    setPrimaryImagePreview(blog.primaryImage || "");
    setContent(
      blog.content?.map((item) => ({
        ...item,
        value: item.type === "image" ? null : item.value,
        imagePreview: item.type === "image" ? item.value as string : undefined,
      }))
    );
    setActiveTab("create");
  };

  // Handle edit team member
  const handleEditTeamMember = (member: TeamMember) => {
    setEditingTeamMember(member);
    setTeamImage(null);
    setTeamImagePreview(member.image);
    setTestimonial(member.testimonial);
    setName(member.name);
    setRole(member.role);
    setActiveTab("team");
  };

  // Reset blog form
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

  // Reset team form
  const resetTeamForm = () => {
    setEditingTeamMember(null);
    setTeamImage(null);
    setTeamImagePreview("");
    setTestimonial("");
    setName("");
    setRole("");
    setErrors({});
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  const inputStyle =
    "bg-[#3d3d3f] p-4 w-full rounded-t-lg border-b-2 border-transparent focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white placeholder-gray-400";

  return (
    <div
      style={{ fontFamily: "Poppins, sans-serif" }}
      className="min-h-screen bg-[#191a1b] text-white pt-[7em]"
    >
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
      `}</style>
      <div className="max-w-4xl mx-auto bg-[#191a1b] rounded-xl shadow-2xl p-8 ">
        {/* Tabs */}
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

            <div className="bar"></div>
            <div className="slidebar"></div>
          </div>
        </div>

        {activeTab === "create" && (
          <form onSubmit={handleBlogSubmit} className="space-y-8 mt-6">
            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-lg font-medium mb-2 text-gray-200"
              >
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={handleCategoryChange}
                required
                className={inputStyle}
              >
                <option value="">Select a category</option>
                <option value="Technology">Technology</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Education">Education</option>
                <option value="Travel">Travel</option>
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
                  {errors.customCategory && (
                    <p className="text-red-400 text-sm mt-1">{errors.customCategory}</p>
                  )}
                </>
              )}
            </div>

            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-lg font-medium mb-2 text-gray-200"
              >
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
              {errors.title && (
                <p className="text-red-400 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Author */}
            <div>
              <label
                htmlFor="author"
                className="block text-lg font-medium mb-2 text-gray-200"
              >
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
              {errors.author && (
                <p className="text-red-400 text-sm mt-1">{errors.author}</p>
              )}
            </div>

            {/* Primary Image */}
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
              <label
                htmlFor="primary-image"
                className="block text-lg font-medium mb-2 text-gray-200"
              >
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
                  <img
                    src={primaryImagePreview}
                    alt="Primary Preview"
                    className="max-w-xs mx-auto rounded-lg shadow-md"
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
              <div
                onDrop={handlePrimaryImageDrop}
                onDragOver={(e) => e.preventDefault()}
                className="h-20"
              />
            </div>

            {/* Content Sections */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-[#f6ff7a]">
                Blog Content
              </h2>
              {content?.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-600 rounded-xl p-6 mb-6 bg-gray-900 shadow-lg"
                >
                  <h3 className="text-xl font-semibold mb-4 text-gray-200">
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)} {index + 1}
                  </h3>

                  {item.type === "heading" && (
                    <input
                      type="text"
                      value={typeof item.value === "string" ? item.value : ""}
                      onChange={(e) =>
                        handleContentChange(index, "value", e.target.value)
                      }
                      required
                      className={inputStyle}
                      placeholder="Enter heading"
                    />
                  )}

                  {item.type === "paragraph" && (
                    <QuillEditor
                      index={index}
                      quillInstancesRef={quillInstancesRef}
                      initialValue={
                        typeof item.value === "string" ? item.value : ""
                      }
                      modules={quillModules}
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
                        onChange={(e) =>
                          handleContentChange(
                            index,
                            "value",
                            e.target.files?.[0] || null
                          )
                        }
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
                          <img
                            src={item.imagePreview}
                            alt="Preview"
                            className="max-w-xs mx-auto rounded-lg shadow-md"
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
                        onChange={(e) =>
                          handleContentChange(index, "language", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleContentChange(index, "value", e.target.value)
                        }
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

              {/* Add New Content */}
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
                  onClick={() =>
                    newContentType &&
                    addContentItem(newContentType as ContentItem["type"])
                  }
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
                {loading
                  ? editingBlog
                    ? "Updating..."
                    : "Creating..."
                  : editingBlog
                  ? "Update Blog"
                  : "Create Blog"}
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
          <div className="space-y-6 mt-6 ">
            <h2 className="text-2xl font-bold text-[#f6ff7a]">Your Blogs</h2>
            {blogs.length === 0 ? (
              <p className="text-gray-400">No blogs found.</p>
            ) : (
              <div className="grid gap-6">
                {blogs.map((blog) => (
                  <div
                    key={blog._id}
                    className="bg-[#3d3d3f] p-6 rounded-xl border border-gray-600 shadow-lg"
                  >
                    <div className="flex items-center gap-4">
                      {blog.primaryImage && (
                        <img
                          src={blog.primaryImage}
                          alt={blog.title}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-200">
                          {blog.title}
                        </h3>
                        <p className="text-gray-400">Category: {blog.category}</p>
                        <p className="text-gray-400">Author: {blog.author}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditBlog(blog)}
                          className="px-4 py-2 bg-[#f6ff7a] text-black font-semibold rounded-lg hover:bg-yellow-500"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleBlogDelete(blog._id)}
                          className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500"
                        >
                          Delete
                        </button>
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
              {/* Team Image */}
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                <label
                  htmlFor="team-image"
                  className="block text-lg font-medium mb-2 text-gray-200"
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
                  className="cursor-pointer inline-block px-6 py-3 bg-[#f6ff7a] text-black font-semibold rounded-lg hover:bg-yellow-500"
                >
                  Select Image
                </label>
                {teamImagePreview && (
                  <div className="mt-4">
                    <img
                      src={teamImagePreview}
                      alt="Team Member Preview"
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
                <div
                  onDrop={handleTeamImageDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="h-20"
                />
              </div>

              {/* Testimonial */}
              <div>
                <label
                  htmlFor="testimonial"
                  className="block text-lg font-medium mb-2 text-gray-200"
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
                  className={`${inputStyle} rounded-lg`}
                  placeholder="Enter team member testimonial"
                />
                {errors.testimonial && (
                  <p className="text-red-400 text-sm mt-1">{errors.testimonial}</p>
                )}
              </div>

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-lg font-medium mb-2 text-gray-200"
                >
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
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Role */}
              <div>
                <label
                  htmlFor="role"
                  className="block text-lg font-medium mb-2 text-gray-200"
                >
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
                {errors.role && (
                  <p className="text-red-400 text-sm mt-1">{errors.role}</p>
                )}
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

            {/* Team Members List */}
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
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-24 h-24 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-gray-200">
                            {member.name}
                          </h4>
                          <p className="text-gray-400">{member.role}</p>
                          <p className="text-gray-300 mt-2 line-clamp-5">
                            {member.testimonial}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditTeamMember(member)}
                            className="px-4 py-2 bg-[#f6ff7a] text-black font-semibold rounded-lg hover:bg-yellow-500"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleTeamDelete(member._id)}
                            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
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

interface QuillEditorProps {
  index: number;
  quillInstancesRef: React.MutableRefObject<(any | null)[]>;
  initialValue: string;
  modules: any;
  onChange: (value: string) => void;
}

const QuillEditor: React.FC<QuillEditorProps> = ({
  index,
  quillInstancesRef,
  initialValue,
  modules,
  onChange,
}) => {
  const { quill, quillRef } = useQuill({ theme: "snow", modules });

  React.useEffect(() => {
    if (quill) {
      quill.root.innerHTML = initialValue;
      quillInstancesRef.current[index] = quill;

      const handleTextChange = () => {
        const content = quill.root.innerHTML;
        onChange(content);
      };
      quill.on("text-change", handleTextChange);

      return () => {
        quill.off("text-change", handleTextChange);
        quillInstancesRef.current[index] = null;
      };
    }
  }, [quill, index, initialValue, onChange]);

  return <div ref={quillRef} className="bg-gray-700 rounded-lg" />;
};

export default AdminDashboard;