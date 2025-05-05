"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CKEditorWrapper from "@/components/CKEditorWrapper";
import { useDropzone } from "react-dropzone";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { GrFormTrash } from "react-icons/gr";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";

interface ContentItem {
  id: string;
  type: string;
  value: string | File | null;
  language?: string;
  imagePreview?: string;
}

interface Errors {
  [key: string]: string;
}

interface Blog {
  _id: string;
  title: string;
  author: string;
  primaryImage: string;
  category: string;
  content: any[];
}

interface BlogFormProps {
  blogData?: Blog;
  onUpdate?: (updatedBlog: Blog) => void;
  onCancel?: () => void;
}

const inputStyle =
  "bg-[#3d3d3f] p-4 w-full rounded-lg border border-gray-600 focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white placeholder-gray-400 text-sm sm:text-base";

const BlogForm: React.FC<BlogFormProps> = ({ blogData, onUpdate, onCancel }) => {
  const [title, setTitle] = useState(blogData?.title || "");
  const [category, setCategory] = useState(blogData?.category || "");
  const [customCategory, setCustomCategory] = useState("");
  const [author, setAuthor] = useState(blogData?.author || "");
  const [primaryImage, setPrimaryImage] = useState<File | null>(null);
  const [primaryImagePreview, setPrimaryImagePreview] = useState(blogData?.primaryImage || "");
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [newContentType, setNewContentType] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const router = useRouter();
  const isEditing = !!blogData;

  useEffect(() => {
    if (isEditing && blogData) {
      console.log("BlogForm received blogData:", JSON.stringify(blogData, null, 2));
      setTitle(blogData.title || "");
      setCategory(blogData.category || "");
      setCustomCategory(
        blogData.category &&
          ![
            "AI / Machine Learning",
            "Agile",
            "Blockchain",
            "Data Services",
            "DevOps",
            "Development",
            "Marketing",
            "Product Design",
            "QA / Testing",
            "Security",
            "Soft Skills",
            "Software Architecture",
          ].includes(blogData.category)
          ? blogData.category
          : ""
      );
      setAuthor(blogData.author || "");
      setPrimaryImagePreview(blogData.primaryImage || "");
      const blogContent = Array.isArray(blogData.content)
        ? blogData.content.map((item: any) => {
            const contentItem: ContentItem = {
              id: uuidv4(),
              type: item.type || "paragraph",
              value: typeof item.value === "string" ? item.value : "",
              language: item.language || (item.type === "code" ? "javascript" : undefined),
            };
            if (item.type === "image") {
              contentItem.imagePreview =
                item.image || item.value || item.imagePreview || (Array.isArray(item.imageUrls) ? item.imageUrls[0] : "") || "";
              contentItem.value = null; // Image files need to be re-uploaded
            }
            return contentItem;
          })
        : [];
      setContent(blogContent);
      console.log("Initialized form state:", {
        title: blogData.title,
        category: blogData.category,
        customCategory,
        author: blogData.author,
        primaryImagePreview: blogData.primaryImage,
        content: blogContent,
      });
      if (!blogData.author) {
        toast.warn("Author field is missing for this blog.");
      }
      if (!blogData.content || blogData.content.length === 0) {
        toast.warn("No content found for this blog. Add new content as needed.");
      }
    } else {
      console.log("BlogForm in create mode, no blogData provided");
    }
  }, [isEditing, blogData]);

  useEffect(() => {
    const newErrors: Errors = {};
    if (title && title.length < 3) newErrors.title = "Title must be at least 3 characters";
    if (author && author.length < 2) newErrors.author = "Author name must be at least 2 characters";
    if (category === "Other" && customCategory.length < 2)
      newErrors.customCategory = "Custom category must be at least 2 characters";
    setErrors(newErrors);
  }, [title, author, category, customCategory]);

  useEffect(() => {
    return () => {
      content.forEach((item) => {
        if (item.type === "image" && item.imagePreview && item.imagePreview.startsWith("blob:")) {
          URL.revokeObjectURL(item.imagePreview);
        }
      });
      if (primaryImagePreview && primaryImagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(primaryImagePreview);
      }
    };
  }, [content, primaryImagePreview]);

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
      setPrimaryImagePreview("");
    }
  };

  const handlePrimaryImageDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handlePrimaryImageChange(file);
  }, []);

  const addBlogContentItem = (type: ContentItem["type"]) => {
    const newItem: ContentItem = {
      id: uuidv4(),
      type,
      value: type === "image" ? null : "",
      language: type === "code" ? "javascript" : undefined,
      imagePreview: type === "image" ? "" : undefined,
    };
    setContent((prev) => [...prev, newItem]);
    setNewContentType("");
  };

  const handleContentChange = (index: number, field: string, value: string | File | null) => {
    setContent((prevContent) => {
      const updatedContent = [...prevContent];
      const updatedItem = { ...updatedContent[index] };

      if (field === "value") {
        if (updatedItem.type === "image") {
          if (updatedItem.imagePreview && updatedItem.imagePreview.startsWith("blob:")) {
            URL.revokeObjectURL(updatedItem.imagePreview);
          }
          if (value instanceof File) {
            const previewUrl = URL.createObjectURL(value);
            updatedItem.value = value;
            updatedItem.imagePreview = previewUrl;
          } else {
            updatedItem.value = null;
            updatedItem.imagePreview = "";
          }
        } else {
          updatedItem.value = value;
          if (updatedItem.imagePreview !== undefined) {
            updatedItem.imagePreview = undefined;
          }
        }
      } else if (field === "language" && typeof value === "string") {
        updatedItem.language = value;
      }

      updatedContent[index] = updatedItem;
      return updatedContent;
    });
  };

  const removeContentItem = (index: number) => {
    setContent((prevContent) => {
      const updatedContent = [...prevContent];
      const item = updatedContent[index];
      if (item.type === "image" && item.imagePreview && item.imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(item.imagePreview);
      }
      updatedContent.splice(index, 1);
      return updatedContent;
    });
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        if (item.type === "image" && item.value instanceof File) {
          return {
            type: item.type,
            value: `image-${index}`,
            imagePreview: item.imagePreview,
          };
        } else if (item.type === "paragraph" && typeof item.value === "string") {
          const parser = new DOMParser();
          const doc = parser.parseFromString(item.value, "text/html");
          const images = doc.querySelectorAll("img");
          const imageUrls: string[] = [];
          images.forEach((img) => {
            const src = img.getAttribute("src");
            if (src) imageUrls.push(src);
          });
          return {
            type: item.type,
            value: item.value,
            imageUrls,
          };
        }
        return {
          type: item.type,
          value: item.value,
          language: item.language,
        };
      });

      formData.append("content", JSON.stringify(processedContent));
      content.forEach((item, index) => {
        if (item.type === "image" && item.value instanceof File) {
          formData.append(`image-${index}`, item.value);
        }
      });

      const url = isEditing ? `/api/blogs/${blogData?._id}` : "/api/blogs/create";
      const method = isEditing ? "PUT" : "POST";

      console.log(`Submitting to ${url} with method ${method}`, {
        title,
        category: effectiveCategory,
        author,
        hasPrimaryImage: !!primaryImage,
        content: processedContent,
      });

      const response = await fetch(url, { method, body: formData });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to ${isEditing ? "update" : "create"} blog: ${errorData.message || response.statusText}`);
      }

      const updatedBlog = await response.json();
      if (isEditing && onUpdate) {
        onUpdate({
          _id: blogData!._id,
          title,
          category: effectiveCategory,
          author,
          primaryImage: primaryImagePreview || blogData!.primaryImage,
          content: processedContent,
        });
      } else {
        toast.success(`Blog ${isEditing ? "updated" : "created"} successfully!`);
        router.push("/admin");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Error: ${message}`);
      console.error("Submission error:", message);
    } finally {
      setLoading(false);
    }
  };

  const ImageDropzone = ({ index }: { index: number }) => {
    const onDrop = useCallback(
      (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file && file.type.startsWith("image/")) {
          handleContentChange(index, "value", file);
        } else {
          toast.error("Please select a valid image file (JPEG, PNG, or GIF)");
        }
      },
      [index]
    );

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
      accept: { "image/*": [".jpeg", ".jpg", ".png", ".gif"] },
      maxSize: 5 * 1024 * 1024,
      multiple: false,
      onDrop,
      onDropRejected: (fileRejections) => {
        fileRejections.forEach((rejection) => {
          const error = rejection.errors[0]?.code;
          if (error === "file-too-large") {
            toast.error("Image must be smaller than 5MB");
          } else if (error === "file-invalid-type") {
            toast.error("Only JPEG, PNG, or GIF images are allowed");
          } else {
            toast.error("Failed to upload image");
          }
        });
      },
    });

    return (
      <div
        {...getRootProps({
          className: `border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${
            isDragActive ? "border-[#f6ff7a] bg-[#f6ff7a]/10" : "border-gray-600 hover:border-gray-500"
          }`,
        })}
      >
        <input {...getInputProps()} />
        <p className="text-gray-200 text-sm sm:text-base">
          {isDragActive ? "Drop the image here" : "Drag & drop an image, or click to select"}
        </p>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            open();
          }}
          className="mt-2 px-4 py-2 bg-[#f6ff7a] text-black font-semibold rounded-lg hover:bg-yellow-500 text-sm sm:text-base"
        >
          Select Image
        </button>
        {content[index]?.imagePreview && (
          <div className="mt-4">
            <Image
              src={content[index].imagePreview}
              alt={`Content image ${index + 1}`}
              width={900}
              height={900}
              style={{ maxWidth: "300px", height: "200px", objectFit: "cover" }}
              className="mx-auto rounded-lg h-40 w-40 lg:h-60 lg:w-60 shadow-md"
              onError={() => {
                toast.error(`Failed to load image preview for content item ${index + 1}`);
                handleContentChange(index, "value", null);
              }}
            />
            <button
              type="button"
              onClick={() => handleContentChange(index, "value", null)}
              className="mt-2 text-red-400 hover:text-red-500 text-sm sm:text-base"
            >
              Remove Image
            </button>
          </div>
        )}
        {!content[index]?.imagePreview && (
          <p className="mt-4 text-gray-400 text-sm sm:text-base">No image selected</p>
        )}
      </div>
    );
  };

  return (
    <div
      className={`text-white max-w-3xl bg-[#191A1B] shadow-md p-9 mx-auto flex ${
        isEditing ? "pt-0 pb-0" : "pt-[6em] pb-[3em]"
      } justify-center`}
    >
      <div className="w-full">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#f6ff7a] mb-6">
          {isEditing ? "Edit Blog" : "Create Blog"}
        </h1>
        <form onSubmit={handleBlogSubmit} className="space-y-8">
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
              className="cursor-pointer inline-block px-6 py-3 bg-[#f6ff7a] hover:bg-[#AAB418] text-black font-semibold rounded-lg"
            >
              Select Image
            </label>
            {primaryImagePreview && (
              <div className="mt-4">
                <Image
                  src={primaryImagePreview}
                  alt="Primary Preview"
                  width={900}
                  height={900}
                  className="max-w-xs mx-auto h-40 w-40 lg:h-90 lg:w-full rounded-lg shadow-md object-cover"
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
            {content.length > 0 ? (
              content.map((item, index) => (
                <div key={item.id} className="border border-gray-600 rounded-xl p-6 mb-6 bg-[#2d2d2f] shadow-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-200">
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)} {index + 1}
                    </h3>
                    <button
                      onClick={() => removeContentItem(index)}
                      className="text-red-400 hover:text-red-500 flex items-center gap-2"
                    >
                      <GrFormTrash size={18} />
                      <span className="text-sm">Remove</span>
                    </button>
                  </div>
                  {item.type === "paragraph" && (
                    <div className="ck-editor-container">
                      <CKEditorWrapper
                        data={typeof item.value === "string" ? item.value : ""}
                        onChange={(data) => handleContentChange(index, "value", data)}
                        index={index}
                      />
                    </div>
                  )}
                  {item.type === "code" && (
                    <div className="space-y-4">
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
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm sm:text-base">No content added yet.</p>
            )}
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={newContentType}
                onChange={(e) => setNewContentType(e.target.value)}
                className={inputStyle}
              >
                <option value="">Select content to add</option>
                <option value="paragraph">Add Paragraph</option>
                <option value="code">Add Code</option>
              </select>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => {
                  if (newContentType) {
                    addBlogContentItem(newContentType);
                  } else {
                    toast.error("Please select a content type");
                  }
                }}
                disabled={!newContentType}
                className="px-6 py-3 bg-[#f6ff7a] hover:bg-[#AAB418] text-black font-semibold rounded-lg disabled:opacity-50"
              >
                Add
              </motion.button>
            </div>
          </div>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading || Object.keys(errors).length > 0}
              className="flex-1 py-4 text-black font-bold rounded-lg bg-[#f6ff7a] hover:bg-[#AAB418] disabled:opacity-50"
            >
              {loading ? (isEditing ? "Updating..." : "Creating...") : isEditing ? "Update Blog" : "Create Blog"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => (isEditing && onCancel ? onCancel() : router.push("/admin"))}
              className="flex-1 py-4 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500"
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;