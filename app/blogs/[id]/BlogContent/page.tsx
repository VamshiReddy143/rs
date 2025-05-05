

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Home/Footer";

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

const CKEditorStyles = `
  .blog-content {
    line-height: 1.6;
    color: #FFFFFF;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
  }
  .blog-content p {
    margin: 1em 0;
    padding: 0;
  }
  .blog-content h1, .blog-content h2, .blog-content h3,
  .blog-content h4, .blog-content h5, .blog-content h6 {
    margin: 1.2em 0 0.6em;
    line-height: 1.3;
    font-weight: 600;
  }
  .blog-content h1 { font-size: 2em; }
  .blog-content h2 { font-size: 1.75em; }
  .blog-content h3 { font-size: 1.5em; }
  .blog-content h4 { font-size: 1.25em; }
  .blog-content h5 { font-size: 1.1em; }
  .blog-content h6 { font-size: 1em; }
  .blog-content ul, .blog-content ol {
    margin: 1em 0;
    padding-left: 2em;
  }
  .blog-content ul {
    list-style: disc;
  }
  .blog-content ol {
    list-style: decimal;
  }
  .blog-content li {
    margin-bottom: 0.5em;
  }
  .blog-content img {
    max-width: 100% !important;
    height: auto !important;
    margin: 1em 0;
    display: block;
    border-radius: 8px;
  }
  .blog-content img.align-left, .blog-content img.image-style-align-left {
    float: left;
    margin-right: 1em;
    margin-bottom: 1em;
  }
  .blog-content img.align-right, .blog-content img.image-style-align-right, .blog-content img.image-style-side {
    float: right;
    margin-left: 1em;
    margin-bottom: 1em;
  }
  .blog-content img.align-center, .blog-content img.image-style-align-center {
    margin-left: auto;
    margin-right: auto;
  }
  .blog-content figure.image {
    margin: 1em 0;
    text-align: center;
    max-width: 100%;
  }
  .blog-content figcaption {
    font-size: 0.9em;
    color: #bcbcc0;
    margin-top: 0.5em;
  }
  .blog-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 1em 0;
  }
  .blog-content th, .blog-content td {
    border: 1px solid #444;
    padding: 0.5em;
    text-align: left;
  }
  .blog-content blockquote {
    border-left: 4px solid #444;
    padding-left: 1em;
    margin: 1em 0;
    color: #bcbcc0;
    font-style: italic;
  }
  .blog-content pre {
    background: #1e1e1e;
    padding: 1em;
    border-radius: 4px;
    overflow-x: auto;
  }
  .blog-content code {
    background: #1e1e1e;
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
  }
  .blog-content a {
    color: #1e90ff;
    text-decoration: underline;
  }
  .blog-content a:hover {
    color: #63b3ed;
  }
  .blog-content iframe {
    max-width: 100%;
    border: none;
    margin: 1em 0;
  }
  .blog-content .ck-content {
    white-space: normal;
  }
  .content-container {
    max-width: 100%;
    overflow-x: hidden;
  }
  .content-image-container {
    max-width: 100%;
    margin: 1em 0;
    overflow: hidden;
    display: block;
    border-radius: 8px;
  }
  .content-image {
    max-width: 100% !important;
    height: auto !important;
    display: block;
    border-radius: 8px;
  }
  .blog-content img[style*="width"], .blog-content img[style*="height"] {
    width: 100% !important;
    height: auto !important;
    max-width: 100% !important;
  }
`;

// Example fetch functions (replace with your actual data-fetching logic)
async function fetchBlogById(id: string): Promise<BlogDocument | null> {
    try {
        // Replace with your actual database/API call
        const response = await fetch(`https://your-api/blogs/${id}`);
        if (!response.ok) return null;
        const blog: BlogDocument = await response.json();
        return blog;
    } catch (error) {
        console.error("Error fetching blog:", error);
        return null;
    }
}

async function fetchRandomBlogs(): Promise<
    Pick<BlogDocument, "_id" | "title" | "category" | "primaryImage">[]
> {
    try {
        // Replace with your actual database/API call
        const response = await fetch(`https://your-api/blogs/random?limit=3`);
        if (!response.ok) return [];
        const blogs: Pick<
            BlogDocument,
            "_id" | "title" | "category" | "primaryImage"
        >[] = await response.json();
        return blogs;
    } catch (error) {
        console.error("Error fetching random blogs:", error);
        return [];
    }
}

interface BlogContentPageProps {
    params: { id: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function BlogContent({ params }: BlogContentPageProps) {
    const blog = await fetchBlogById(params.id);
    const randomBlogs = await fetchRandomBlogs();

    if (!blog) {
        return (
            <div className="min-h-screen p-8 bg-gray-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Blog Not Found</h2>
                    <p className="text-lg text-gray-400">
                        The requested blog post could not be found.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8 bg-[#191A1B] text-[#FFFFFF]">
            <style jsx global>{CKEditorStyles}</style>
            <ScrollProgress className="md:top-[76px] lg:top-[80px]" />
            <div className="max-w-[80em] mx-auto pt-[5em]">
                <div className="flex gap-4 lg:text-[16px] lg:leading-[32px] font-normal text-gray-400 mb-4">
                    <span>{blog.category || "Uncategorized"}</span>
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
                    <span>{blog.author || "Unknown Author"}</span>
                </div>
                {blog.primaryImage && (
                    <div className="relative rounded-lg">
                        <Image
                            src={blog.primaryImage}
                            alt={blog.title}
                            height={900}
                            width={900}
                            className="w-[100vw] h-[800px] rounded-xl"
                        />
                    </div>
                )}
                {blog.content?.
map((item, index) => (
                    <div
                        key={index}
                        className="mb-8 pt-[4em] text-[#FFFFFF] lg:max-w-[50em] mx-auto"
                    >
                        {item.type === "paragraph" && (
                            <div
                                className="blog-content prose prose-invert text-[#FFFFFF]"
                                style={{ whiteSpace: "pre-wrap" }}
                                dangerouslySetInnerHTML={{ __html: item.value }}
                            />
                        )}
                        {item.type === "image" && item.value && (
                            <div className="content-image-container">
                                <Image
                                    src={item.value}
                                    width={900}
                                    height={900}
                                    alt={`Content image ${index}`}
                                    className="content-image"
                                    style={{
                                        maxWidth: "50%",
                                        height: "auto",
                                        display: "block",
                                        borderRadius: "8px",
                                    }}
                                />
                            </div>
                        )}
                        {item.type === "code" && (
                            <SyntaxHighlighter
                                language={item.language || "javascript"}
                                style={vscDarkPlus}
                                className="rounded-lg mt-4"
                                customStyle={{
                                    fontSize: "14px",
                                    lineHeight: "1.5",
                                    padding: "1em",
                                }}
                            >
                                {item.value}
                            </SyntaxHighlighter>
                        )}
                    </div>
                ))}
                <div className="pt-[3em] lg:max-w-[50em] mx-auto">
                    <button className="text-[16px] cursor-pointer hover:border-[#bcbcc0] hover:text-[#bcbcc0] font-bold border border-gray-400 px-4 py-2 rounded-lg transition-colors">
                        <Link href="/Blog">← Back to blog</Link>
                    </button>
                </div>

                <div style={{ fontFamily: "Poppins, sans-serif" }} className="py-[5em]">
                    <h2 className="text-[36px] font-semibold mb-15">Featured articles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {randomBlogs.length > 0 ? (
                            randomBlogs.map((card) => (
                                <div
                                    key={card._id}
                                    className="flex flex-col min-h-[500px] bg-[#242425] rounded-xl overflow-hidden relative"
                                >
                                    <Image
                                        src={card.primaryImage || "/default-image.jpg"}
                                        width={900}
                                        height={900}
                                        alt={card.title}
                                        className="h-[250px] w-full object-cover"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                    <div className="flex flex-col gap-4">
                                        <div className="p-7 flex flex-col gap-4 flex-grow">
                                            <p className="text-[#bcbcc0] text-[16px]">
                                                {card.category || "Uncategorized"}
                                            </p>
                                            <h2
                                                style={{ fontFamily: "Poppins, sans-serif" }}
                                                className="text-[24px] font-semibold leading-tight line-clamp-3"
                                            >
                                                {card.title}
                                            </h2>
                                        </div>
                                        <div className="pb-10">
                                            <Link href={`/blogs/${card._id}`}>
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

                <Footer />
            </div>
        </div>
    );
}