import { notFound } from "next/navigation";
import Blog from "@/models/Blog";
import connectToDatabase from "@/lib/connectDb";
import mongoose from "mongoose";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Home/Footer";

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

export default async function BlogPage({ params }: { params: any }) {
  const { id } = params;

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

    // Fetch 3 random blogs, excluding the current blog
    const randomBlogs = await Blog.aggregate([
      { $match: { _id: { $ne: new mongoose.Types.ObjectId(id) } } }, // Exclude current blog
      { $sample: { size: 3 } }, // Get 3 random documents
      {
        $project: {
          _id: 1,
          title: 1,
          category: 1,
          primaryImage: 1,
        },
      },
    ]).exec() as Pick<BlogDocument, "_id" | "title" | "category" | "primaryImage">[];

    return (
      <div className="min-h-screen p-8 bg-[#191A1B] text-[#FFFFFF]">
        <ScrollProgress className="md:top-[76px] lg:top-[80px]" />
        <div className="max-w-7xl mx-auto pt-[5em]">
          <div className="flex gap-4 lg:text-[16px] lg:leading-[32px] font-normal text-gray-400 mb-4">
            <span>{blog.category}</span>
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
            <h1 className="lg:text-[36px] text-[36px] leading-[43px] lg:leading-[43px] font-semibold">
              {blog.title}
            </h1>
          </div>
          <div className="flex gap-2 lg:text-[16px] lg:leading-[32px] text-gray-400 font-normal mb-8 mt-4">
            <User />
            <span>{blog.author}</span>
          </div>
          {blog.primaryImage && (
            <div className="relative w-full h-[600px] rounded-lg overflow-hidden mb-8">
              <Image
                src={blog.primaryImage}
                alt={blog.title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          )}
          {blog.content?.map((item, index) => (
            <div key={index} className="mb-8 pt-[3em] text-[#FFFFFF] lg:max-w-[50em] mx-auto">
              {item.type === "heading" && (
                <h2 className="lg:text-[18px] text-[#FFFFFF] text-[25px] leading-[27px] font-medium lg:leading-[27px] font-semibold mb-4">
                  {item.value}
                </h2>
              )}
              {item.type === "paragraph" && (
                <div
                  className="blog-content text-[#FFFFFF]"
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
          <div className="pt-[3em] lg:max-w-[50em] mx-auto">
            <button className="text-[16px] cursor-pointer hover:border-[#bcbcc0] hover:text-[#bcbcc0] font-bold border border-gray-400 px-4 py-2 rounded-lg transition-colors">
              <Link href="/Blog" passHref>
                ← Back to blog
              </Link>
            </button>
          </div>

          {/* Random 3 Blog Cards */}
          <div  style={{ fontFamily: "Poppins, sans-serif" }} className="py-[5em]">
            <h2 className="text-[36px] font-semibold mb-15">Featured articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {randomBlogs.length > 0 ? (
                randomBlogs.map((card) => (
                  <div
                    key={card._id}
                    className="flex flex-col min-h-[500px] bg-[#242425] rounded-xl overflow-hidden relative"
                  >
                    <Image
                      src={card.primaryImage || "/default-image.jpg"} // Fallback image
                      width={900}
                      height={900}
                      alt={card.title}
                      className="h-[250px] w-full object-cover"
                    />
                    <div className="flex flex-col gap-4">
                      <div className="p-7 flex flex-col gap-4 flex-grow">
                        <p className="text-[#bcbcc0] text-[16px]">{card.category}</p>
                        <h2
                          style={{ fontFamily: "Poppins, sans-serif" }}
                          className="text-[24px] font-semibold leading-tight line-clamp-3"
                        >
                          {card.title}
                        </h2>
                      </div>
                      <div className="pb-10">
                        <Link href={`/blogs/${card._id}`} passHref>
                          <button className="text-[16px] cursor-pointer hover:border-[#bcbcc0] hover:text-[#bcbcc0] font-bold border border-gray-400 px-4 py-2 rounded-lg absolute bottom-4 right-5 transition-colors">
                            Read ➔
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{ fontFamily: "Poppins, sans-serif" }}
                  className="col-span-full flex items-center justify-center text-center text-gray-600 lg:text-[5em] text-[2em] font-bold"
                >
                  No other blog posts found.
                </div>
              )}
            </div>
          </div>

          <div>
            <Footer />
          </div>
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