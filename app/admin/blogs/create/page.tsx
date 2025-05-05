// app/admin/blogs/create/page.tsx
import { Blog } from "@/types/blog";
import BlogForm from "@/components/BlogForm";
import { redirect } from "next/navigation";

// Remove the existing Blog interface
// interface Blog { ... } // Delete this

async function fetchBlogById(blogId: string): Promise<Blog | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${blogId}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      console.error(`Failed to fetch blog ${blogId}: ${response.status} ${response.statusText}`);
      return null;
    }
    const blog: Blog = await response.json();
    return blog;
  } catch (error) {
    console.error(`Error fetching blog ${blogId}:`, error);
    return null;
  }
}

export default async function BlogCreateOrEditPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const blogId = typeof resolvedSearchParams?.blogId === "string" ? resolvedSearchParams.blogId : undefined;
  let blogData: Blog | undefined = undefined;

  if (blogId) {
    const blog = await fetchBlogById(blogId);
    if (!blog) {
      redirect("/admin");
    }
    blogData = blog;
  }

  return <BlogForm blogData={blogData} />;
}