"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import BlogForm from "@/components/BlogForm";
import { toast } from "react-toastify";

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

const EditBlogPage: React.FC = () => {
  const [blogData, setBlogData] = useState<Blog | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const blogId = Array.isArray(params.blogId) ? params.blogId[0] : params.blogId;

  useEffect(() => {
    const fetchBlog = async () => {
      if (!blogId || typeof blogId !== "string") {
        console.error("EditBlogPage: Invalid or missing blogId:", blogId);
        setError("Invalid blog ID");
        toast.error("Invalid blog ID");
        router.push("/admin");
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
          throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
        }
        const data: Blog = await response.json();
        console.log("EditBlogPage: Fetched blog data:", JSON.stringify(data, null, 2));
        if (!data._id || !data.title) {
          throw new Error("Invalid blog data: missing _id or title");
        }
        setBlogData(data);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error("EditBlogPage: Fetch error:", message);
        setError(message);
        toast.error(`Failed to load blog: ${message}`);
        router.push("/admin");
      }
    };

    fetchBlog();
  }, [blogId, router]);

  if (error) {
    return <div className="text-white text-center pt-20 text-red-400">Error: {error}</div>;
  }

  if (!blogData) {
    return <div className="text-white text-center pt-20">Loading blog data...</div>;
  }

  return <BlogForm blogData={blogData} />;
};

export default EditBlogPage;