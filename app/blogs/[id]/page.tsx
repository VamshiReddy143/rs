
"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import BlogContent from "./BlogContent/page";

interface ContentItem {
  type: "paragraph" | "image" | "code";
  value: string;
  language?: string;
  imageUrls?: string[];
}

interface BlogDocument {
  _id: string;
  title: string;
  category: string;
  author: string;
  primaryImage?: string;
  content: ContentItem[];
  createdAt: string;
}

interface ApiResponse {
  blog: BlogDocument | null;
  randomBlogs: Pick<BlogDocument, "_id" | "title" | "category" | "primaryImage">[];
}

export default function BlogPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      console.warn("No blog ID provided in params");
      setError("Invalid blog ID");
      setLoading(false);
      return;
    }

    const fetchBlog = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
        console.log("Fetching blog with ID via API:", id);
        const response = await fetch(`${baseUrl}/api/blogs/${encodeURIComponent(id)}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
        });

        if (!response.ok) {
          console.warn(`API responded with status: ${response.status}`);
          const errorData = await response.json();
          console.warn("API error response:", JSON.stringify(errorData, null, 2));
          if (response.status === 404 || response.status === 400) {
            console.warn("Blog not found for ID:", id);
            notFound();
          }
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const responseData: ApiResponse = await response.json();
        console.log("API response:", JSON.stringify(responseData, null, 2));

        if (!responseData.blog) {
          console.warn("Blog not found in API response for ID:", id);
          notFound();
        }

        setData(responseData);
      } catch (err: any) {
        console.error("Error fetching blog:", err.message, err.stack);
        setError(err.message || "Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen p-8 bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-8 bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error Loading Blog</h2>
          <p className="text-lg text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!data || !data.blog) {
    notFound();
  }

  return <BlogContent blog={data.blog} randomBlogs={data.randomBlogs} />;
}
