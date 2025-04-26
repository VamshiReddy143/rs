
import { notFound } from "next/navigation";
import Blog from "@/models/Blog";
import connectToDatabase from "@/lib/connectDb";
import mongoose from "mongoose";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { User } from "lucide-react";
import Image from "next/image";

interface ContentItem {
  type: "heading" | "paragraph" | "image" | "code";
  value: string;
  language?: string;
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

// @ts-ignore: Temporary workaround for Next.js type generation issue
export default async function BlogPage({ params }: { params: any }) {
  const { id } = params;

  // Validate the ID
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    console.error("Invalid or missing ID:", id);
    notFound();
  }

  try {
    await connectToDatabase();
    const blog = await Blog.findById(id).lean() as BlogDocument | null;

    if (!blog) {
      console.warn("Blog not found for ID:", id);
      notFound();
    }

    return (
      <div className="min-h-screen p-8 bg-[#191A1B] text-white">
        <ScrollProgress className="top-[78px]" />
        {/* Blog Header */}
        <div className="max-w-7xl mx-auto pt-[5em]">
          <div className="flex gap-4 lg:text-[16px] lg:leading-[32px] font-normal text-gray-400 mb-4">
            <span className="">{blog.category}</span>
            <span>-</span>
            <span>
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div>
            <h1 className="lg:text-[36px] lg:leading-[43px] font-semibold">
              {blog.title}
            </h1>
          </div>
          <div className="flex gap-2 lg:text-[16px] lg:leading-[32px] text-gray-400 font-normal mb-8 mt-4">
            <User />
            <span>{blog.author}</span>
          </div>
          {/* Primary Image */}
          {blog.primaryImage && (
            <div className="relative w-full h-96 rounded-lg overflow-hidden mb-8">
              <Image
                src={blog.primaryImage}
                alt={blog.title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          )}

          {/* Content Sections */}
          {blog.content?.map((item, index) => (
            <div key={index} className="mb-8">
              {item.type === "heading" && (
                <h2 className="lg:text-[18px] lg:leading-[27px] font-semibold mb-4">
                  {item.value}
                </h2>
              )}
              {item.type === "paragraph" && (
                <div
                  className="text-lg prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: item.value }}
                />
              )}
              {item.type === "image" && (
                <div className="relative w-full h-64 rounded-lg overflow-hidden mt-4">
                  <Image
                    src={item.value}
                    alt={`Content image ${index}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              )}
              {item.type === "code" && (
                <SyntaxHighlighter
                  language={item.language || "javascript"}
                  style={vscDarkPlus}
                  className="rounded-lg mt-4"
                >
                  {item.value}
                </SyntaxHighlighter>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching blog:", error);
    return (
      <div className="min-h-screen p-8 bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error Loading Blog</h2>
          <p className="text-lg text-gray-400">
            An error occurred while loading the blog post. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}
