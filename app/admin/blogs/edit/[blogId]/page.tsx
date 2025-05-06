"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import BlogForm from "@/components/BlogForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import Link from "next/link";

interface Blog {
  _id: string;
  title: string;
  author: string;
  primaryImage?: string;
  category: string;
  content: {
    type: "paragraph" | "image" | "code";
    value: string;
    language?: string;
    imageUrls?: string[];
  }[];
  createdAt?: string;
}

interface ApiResponse {
  blog: Blog | null;
  randomBlogs: Pick<Blog, "_id" | "title" | "category" | "primaryImage">[];
}

const EditBlogPage: React.FC = () => {
  const [blogData, setBlogData] = useState<Blog | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const blogId = Array.isArray(params.blogId) ? params.blogId[0] : params.blogId;

  console.log("EditBlogPage: Component mounted");
  console.log("EditBlogPage: Raw params:", JSON.stringify(params, null, 2));
  console.log("EditBlogPage: Extracted blogId:", blogId);
  console.log("EditBlogPage: blogId type:", typeof blogId);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!blogId || typeof blogId !== "string") {
        console.error("EditBlogPage: Invalid or missing blogId:", blogId);
        setError("Invalid blog ID");
        toast.error("Invalid blog ID");
        return;
      }

      console.log(`EditBlogPage: Fetching blog with ID: ${blogId}`);
      try {
        const response = await fetch(`/api/blogs/${blogId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        console.log(`EditBlogPage: API response status: ${response.status} ${response.statusText}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error: ${response.status} ${response.statusText}`);
        }
        const data: ApiResponse = await response.json();
        console.log("EditBlogPage: Raw API response:", JSON.stringify(data, null, 2));

        if (!data.blog) {
          throw new Error("No blog data returned");
        }

        const sanitizedData: Blog = {
          _id: data.blog._id,
          title: data.blog.title || "Untitled Blog",
          author: data.blog.author || "Unknown Author",
          primaryImage: data.blog.primaryImage || "",
          category: data.blog.category || "General",
          content: Array.isArray(data.blog.content) ? data.blog.content : [],
          createdAt: data.blog.createdAt || new Date().toISOString(),
        };

        console.log("EditBlogPage: Sanitized blog data:", JSON.stringify(sanitizedData, null, 2));
        setBlogData(sanitizedData);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error("EditBlogPage: Fetch error:", message, error);
        setError(message);
        toast.error(`Failed to load blog: ${message}`);
      }
    };

    fetchBlog();
  }, [blogId]);

  const handleBlogUpdate = (updatedBlog: Blog) => {
    setBlogData(updatedBlog);
    toast.success("Blog updated successfully!");
    router.push("/admin?tab=Blogs");
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#191a1b] text-white pt-[7em] flex justify-center">
        <div className="text-center text-red-400 text-lg">
          Error: {error}
          <br />
          <button
            onClick={() => router.push("/admin?tab=Blogs")}
            className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!blogData) {
    return (
      <div className="min-h-screen bg-[#191a1b] text-white pt-[7em] flex justify-center">
        <div className="text-center text-lg">Loading blog data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#191a1b] text-white pt-[7em] px-4">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick theme="dark" />
      <div className="max-w-5xl mx-auto bg-[#191a1b] rounded-xl shadow-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#f6ff7a]">Edit Blog</h1>
          <Link href="/admin?tab=Blogs">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500"
            >
              Back to Dashboard
            </motion.button>
          </Link>
        </div>
        <BlogForm blogData={blogData} onUpdate={handleBlogUpdate} />
      </div>
    </div>
  );
};

export default EditBlogPage;