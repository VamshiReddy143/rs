// app/blogs/[id]/page.tsx
import BlogContent from "./BlogContent/page";
import { notFound } from "next/navigation";
import { Blog } from "@/types/blog";

interface ApiResponse {
  blog: Blog | null;
  randomBlogs: Pick<Blog, "_id" | "title" | "category" | "primaryImage">[];
}

async function fetchBlogData(id: string): Promise<ApiResponse> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ;
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

    return responseData;
  } catch (err: any) {
    console.error("Error fetching blog:", err.message, err.stack);
    throw err;
  }
}

export default async function BlogPage({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params; // Await params to resolve the ID
    const data = await fetchBlogData(id);
    return <BlogContent blog={data.blog} randomBlogs={data.randomBlogs} />;
  } catch (err) {
    notFound();
  }
}