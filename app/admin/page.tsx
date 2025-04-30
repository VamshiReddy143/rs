"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Subscribers from "@/components/Subscribers/Subscribers";
import Image from "next/image";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { HeadingNode, $createHeadingNode, $isHeadingNode } from "@lexical/rich-text";
import {
  ListNode,
  ListItemNode,
  $isListNode,
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { $getRoot } from "lexical";
import { LinkNode, $createLinkNode } from "@lexical/link";
import { CodeNode, $createCodeNode } from "@lexical/code";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  $isTextNode,
  FORMAT_TEXT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  $isElementNode,
} from "lexical";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { GrAnnounce, GrTrash } from "react-icons/gr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import { lexicalToHtml } from "@/utils/lexicalToHtml";
import { $wrapNodes } from "@lexical/selection";
import SelectTemplate from "../SelectTemplate/page";
import Allprojectss from "@/components/Allprojectsss/Allprojects"
import { FaEye, FaTrash, FaTimes } from 'react-icons/fa';


const LexicalErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  try {
    return <>{children}</>;
  } catch (error) {
    console.error("Lexical Error:", error);
    return <div>Something went wrong in the editor.</div>;
  }
};

// Lexical theme configuration
const theme = {
  heading: {
    h1: "font-bold text-[32px] leading-[40px] my-4 text-white",
    h2: "font-semibold text-[24px] leading-[32px] my-3 text-white",
    h3: "font-semibold text-[20px] leading-[28px] my-2 text-white",
  },
  paragraph: "text-[16px] leading-[24px] my-2 text-white",
  list: {
    ul: "list-disc list-outside ml-6 my-2 text-white",
    ol: "list-decimal list-outside ml-6 my-2 text-white",
    listitem: "text-[16px] leading-[24px] text-white",
  },
  link: "text-[#f6ff7a] underline",
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    code: "font-mono bg-[#2d2d2f] px-1 rounded text-[#f6ff7a]",
  },
  code: "font-mono bg-[#2d2d2f] p-4 rounded block text-[#f6ff7a] text-[14px] overflow-x-auto",
};

// Debug Plugin to display HTML output
function DebugPlugin() {
  const [editor] = useLexicalComposerContext();
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    const updateHtml = () => {
      editor.read(() => {
        const root = editor.getRootElement();
        setHtml(root?.innerHTML || "No content");
      });
    };
    updateHtml();
    const unregister = editor.registerUpdateListener(() => updateHtml());
    return () => unregister();
  }, [editor]);

  return null;
}

// Toolbar Plugin with formatting controls
function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [showLinkInput, setShowLinkInput] = useState<boolean>(false);
  const [linkUrl, setLinkUrl] = useState<string>("");
  const [activeBlocks, setActiveBlocks] = useState<Set<string>>(new Set());
  const [activeMarks, setActiveMarks] = useState<Set<string>>(new Set());

  // Update active blocks and marks
  useEffect(() => {
    const updateActiveStates = () => {
      editor.getEditorState().read(() => {
        const selection = $getSelection();
        const newActiveBlocks = new Set<string>();
        const newActiveMarks = new Set<string>();

        if ($isRangeSelection(selection)) {
          const anchorNode = selection.anchor.getNode();
          const element =
            anchorNode.getKey() === "root"
              ? anchorNode
              : anchorNode.getTopLevelElementOrThrow();

          // Detect block types
          if ($isHeadingNode(element)) {
            newActiveBlocks.add(element.getTag());
          } else if (element.getType() === "paragraph") {
            newActiveBlocks.add("paragraph");
          } else if ($isListNode(element)) {
            newActiveBlocks.add(element.getListType());
          } else if (element.getType() === "code") {
            newActiveBlocks.add("code");
          }

          // Detect marks
          if (selection.hasFormat("bold")) newActiveMarks.add("bold");
          if (selection.hasFormat("italic")) newActiveMarks.add("italic");
          if (selection.hasFormat("underline")) newActiveMarks.add("underline");
          if (selection.hasFormat("code")) newActiveMarks.add("code");
        }

        setActiveBlocks(newActiveBlocks);
        setActiveMarks(newActiveMarks);
      });
    };

    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateActiveStates();
      });
    });
  }, [editor]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case "b":
            event.preventDefault();
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
            break;
          case "i":
            event.preventDefault();
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
            break;
          case "u":
            event.preventDefault();
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
            break;
          case "z":
            event.preventDefault();
            editor.dispatchCommand(UNDO_COMMAND, undefined);
            break;
          case "y":
          case "Z":
            event.preventDefault();
            editor.dispatchCommand(REDO_COMMAND, undefined);
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [editor]);

  const setBlockType = (type: "h1" | "h2" | "h3" | "paragraph" | "code") => (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          let newNode;
          if (type === "paragraph") {
            newNode = $createParagraphNode();
          } else if (type === "code") {
            newNode = $createCodeNode();
          } else {
            newNode = $createHeadingNode(type);
          }
          $wrapNodes(selection, () => newNode);
        }
      });
      editor.focus();
    } catch (error) {
      console.error(`Error setting block type ${type}:`, error);
      toast.error("Failed to apply formatting", { theme: "dark" });
    }
  };



  const toggleList = (listType: "bullet" | "number") => (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      editor.update(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) {
          // Handle empty selection by creating a new list
          const paragraph = $createParagraphNode();
          const listNode = new ListNode(listType === "bullet" ? "bullet" : "number");
          const listItem = new ListItemNode(); // Use new ListItemNode() instead of $createListItemNode
          listItem.append(paragraph);
          listNode.append(listItem);
          const root = $getRoot(); // Use $getRoot() instead of editor.getRoot()
          root.append(listNode);
          listItem.select();
          return;
        }

        const anchorNode = selection.anchor.getNode();
        const element = anchorNode.getTopLevelElementOrThrow();
        const isList = $isListNode(element) && element.getListType() === listType;

        if (isList) {
          // Convert list to paragraphs
          editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
        } else {
          // Convert to list
          const command = listType === "bullet" ? INSERT_UNORDERED_LIST_COMMAND : INSERT_ORDERED_LIST_COMMAND;
          editor.dispatchCommand(command, undefined);
        }
      });
      editor.focus();
    } catch (error) {
      console.error(`Error toggling ${listType} list:`, error);
      toast.error("Failed to toggle list", { theme: "dark" });
    }
  };

  const toggleMark = (mark: "bold" | "italic" | "underline" | "code") => (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, mark);
      editor.focus();
    } catch (error) {
      console.error(`Error toggling ${mark}:`, error);
      toast.error("Failed to apply formatting", { theme: "dark" });
    }
  };

  const handleLinkSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!linkUrl) {
      toast.error("Please enter a valid URL", { theme: "dark" });
      return;
    }
    try {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const linkNode = $createLinkNode(linkUrl);
          $wrapNodes(selection, () => linkNode);
        }
      });
      setLinkUrl("");
      setShowLinkInput(false);
      toast.success("Link added successfully!", { theme: "dark" });
      editor.focus();
    } catch (error) {
      console.error("Error adding link:", error);
      toast.error("Failed to add link", { theme: "dark" });
    }
  };

  return (
    <div className="flex gap-2 mb-4 flex-wrap bg-[#2d2d2f] p-2 rounded-t-lg">
      <button
        onClick={setBlockType("h1")}
        className={`px-4 py-2 rounded font-semibold text-[16px] min-w-[60px] ${activeBlocks.has("h1") ? "bg-[#f6ff7a] text-black" : "bg-gray-600 text-white"
          } hover:bg-[#f6ff7a] hover:text-black`}
        aria-label="Heading 1"
      >
        H1
      </button>
      <button
        onClick={setBlockType("h2")}
        className={`px-4 py-2 rounded font-semibold text-[16px] min-w-[60px] ${activeBlocks.has("h2") ? "bg-[#f6ff7a] text-black" : "bg-gray-600 text-white"
          } hover:bg-[#f6ff7a] hover:text-black`}
        aria-label="Heading 2"
      >
        H2
      </button>
      <button
        onClick={setBlockType("h3")}
        className={`px-4 py-2 rounded font-semibold text-[16px] min-w-[60px] ${activeBlocks.has("h3") ? "bg-[#f6ff7a] text-black" : "bg-gray-600 text-white"
          } hover:bg-[#f6ff7a] hover:text-black`}
        aria-label="Heading 3"
      >
        H3
      </button>
      <button
        onClick={setBlockType("paragraph")}
        className={`px-4 py-2 rounded font-semibold text-[16px] min-w-[100px] ${activeBlocks.has("paragraph") ? "bg-[#f6ff7a] text-black" : "bg-gray-600 text-white"
          } hover:bg-[#f6ff7a] hover:text-black`}
        aria-label="Paragraph"
      >
        Paragraph
      </button>
      <button
        onClick={toggleList("bullet")}
        className={`px-4 py-2 rounded font-semibold text-[16px] min-w-[100px] ${activeBlocks.has("bullet") ? "bg-[#f6ff7a] text-black" : "bg-gray-600 text-white"
          } hover:bg-[#f6ff7a] hover:text-black`}
        aria-label="Bullet List"
      >
        Bullet List
      </button>
      <button
        onClick={toggleList("number")}
        className={`px-4 py-2 rounded font-semibold text-[16px] min-w-[100px] ${activeBlocks.has("number") ? "bg-[#f6ff7a] text-black" : "bg-gray-600 text-white"
          } hover:bg-[#f6ff7a] hover:text-black`}
        aria-label="Ordered List"
      >
        Ordered List
      </button>
      <button
        onClick={setBlockType("code")}
        className={`px-4 py-2 rounded font-semibold text-[16px] min-w-[100px] ${activeBlocks.has("code") ? "bg-[#f6ff7a] text-black" : "bg-gray-600 text-white"
          } hover:bg-[#f6ff7a] hover:text-black`}
        aria-label="Code Block"
      >
        Code Block
      </button>
      <button
        onClick={toggleMark("bold")}
        className={`px-4 py-2 rounded font-semibold text-[16px] min-w-[60px] ${activeMarks.has("bold") ? "bg-[#f6ff7a] text-black" : "bg-gray-600 text-white"
          } hover:bg-[#f6ff7a] hover:text-black`}
        aria-label="Bold"
      >
        Bold
      </button>
      <button
        onClick={toggleMark("italic")}
        className={`px-4 py-2 rounded font-semibold text-[16px] min-w-[60px] ${activeMarks.has("italic") ? "bg-[#f6ff7a] text-black" : "bg-gray-600 text-white"
          } hover:bg-[#f6ff7a] hover:text-black`}
        aria-label="Italic"
      >
        Italic
      </button>
      <button
        onClick={toggleMark("underline")}
        className={`px-4 py-2 rounded font-semibold text-[16px] min-w-[60px] ${activeMarks.has("underline") ? "bg-[#f6ff7a] text-black" : "bg-gray-600 text-white"
          } hover:bg-[#f6ff7a] hover:text-black`}
        aria-label="Underline"
      >
        Underline
      </button>
      <button
        onClick={toggleMark("code")}
        className={`px-4 py-2 rounded font-semibold text-[16px] min-w-[60px] ${activeMarks.has("code") ? "bg-[#f6ff7a] text-black" : "bg-gray-600 text-white"
          } hover:bg-[#f6ff7a] hover:text-black`}
        aria-label="Inline Code"
      >
        Code
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          setShowLinkInput(true);
          editor.focus();
        }}
        className="px-4 py-2 rounded font-semibold text-[16px] min-w-[60px] bg-gray-600 text-white hover:bg-[#f6ff7a] hover:text-black"
        aria-label="Link"
      >
        Link
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.dispatchCommand(UNDO_COMMAND, undefined);
          editor.focus();
        }}
        className="px-4 py-2 rounded font-semibold text-[16px] min-w-[60px] bg-gray-600 text-white hover:bg-[#f6ff7a] hover:text-black"
        aria-label="Undo"
      >
        Undo
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.dispatchCommand(REDO_COMMAND, undefined);
          editor.focus();
        }}
        className="px-4 py-2 rounded font-semibold text-[16px] min-w-[60px] bg-gray-600 text-white hover:bg-[#f6ff7a] hover:text-black"
        aria-label="Redo"
      >
        Redo
      </button>
      {showLinkInput && (
        <div className="flex gap-2 mt-2 w-full">
          <input
            type="text"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="Enter URL"
            className="flex-1 px-4 py-2 bg-[#3d3d3f] text-white rounded text-[16px]"
            aria-label="Link URL"
          />
          <button
            onClick={handleLinkSubmit}
            className="px-4 py-2 bg-[#f6ff7a] text-black rounded hover:bg-yellow-500 font-semibold text-[16px]"
            aria-label="Add Link"
          >
            Add
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowLinkInput(false);
              editor.focus();
            }}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 font-semibold text-[16px]"
            aria-label="Cancel Link"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

// Lexical Editor Component
interface LexicalEditorProps {
  index: number;
  initialValue: string;
  onChange: (value: string) => void;
}

function LexicalEditor({ index, initialValue, onChange }: LexicalEditorProps) {
  const initialConfig = {
    namespace: `Editor-${index}`,
    theme,
    nodes: [HeadingNode, ListNode, ListItemNode, LinkNode, CodeNode],
    onError: (error: Error) => console.error("Lexical Error:", error),
    editorState: initialValue ? initialValue : undefined,
  };

  return (
    <div className="bg-gray-700 rounded-lg border border-gray-600">
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="lexical-editor min-h-[260px] p-4 focus:outline-none" />
          }
          placeholder={
            <div className="absolute top-4 left-4 text-gray-400 pointer-events-none">
              
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <ListPlugin />
        <DebugPlugin />
        <OnChangePlugin onChange={onChange} />
      </LexicalComposer>
    </div>
  );
}

// OnChange Plugin to capture editor state
function OnChangePlugin({ onChange }: { onChange: (value: string) => void }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const unregister = editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const json = editorState.toJSON();
        onChange(JSON.stringify(json));
      });
    });
    return () => unregister();
  }, [editor, onChange]);

  return null;
}

// Interfaces for data models
interface Blog {
  _id: string;
  title: string;
  category: string;
  author: string;
  primaryImage?: string;
  content: Array<{
    type: string;
    value: string;
    language?: string;
    imagePreview?: string;
  }>;
}

interface TeamMember {
  _id: string;
  image: string;
  testimonial: string;
  name: string;
  role: string;
}

interface Job {
  _id: string;
  title: string;
  location: string;
  description: string;
  employmentType: string;
  postedDate: string;
}

interface Application {
  _id: string;
  jobId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  linkedIn?: string;
  website?: string;
  resume: string;
  submittedAt: string;
}

interface ContentItem {
  type: string;
  value: string | File | null;
  language?: string;
  imagePreview?: string;
}

interface Errors {
  [key: string]: string;
}

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"create" | "blogs" | "team" | "jobs" | "Subscribers" | "Projects">("create");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [primaryImage, setPrimaryImage] = useState<File | null>(null);
  const [primaryImagePreview, setPrimaryImagePreview] = useState("");
  const [teamImage, setTeamImage] = useState<File | null>(null);
  const [teamImagePreview, setTeamImagePreview] = useState("");
  const [testimonial, setTestimonial] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [employmentType, setEmploymentType] = useState("Full-Time");
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [newContentType, setNewContentType] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [viewingApplicationsForJob, setViewingApplicationsForJob] = useState<string | null>(null);
  const [viewResumeUrl, setViewResumeUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showBroadcastForm, setShowBroadcastForm] = useState(false);
  const [broadcastSubject, setBroadcastSubject] = useState("");
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{ id: string; type: string } | null>(null);
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  const debounce = <T extends (...args: any[]) => void>(func: T, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollContainer.scrollTop += e.deltaY * 2;
    };

    const debouncedHandleWheel = debounce(handleWheel, 10);

    scrollContainer.addEventListener("wheel", debouncedHandleWheel, { passive: false });
    return () => scrollContainer.removeEventListener("wheel", debouncedHandleWheel);
  }, [viewingApplicationsForJob]);

  useEffect(() => {
    const fetchData = async () => {
      if (activeTab === "blogs") {
        try {
          const response = await fetch("/api/blogs/allblogs");
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          const data: Blog[] = await response.json();
          setBlogs(data);
          console.log("Fetched blogs:", data);
        } catch (error) {
          const message = error instanceof Error ? error.message : "Unknown error";
          toast.error(`Error fetching blogs: ${message}`);
        }
      } else if (activeTab === "team") {
        try {
          const response = await fetch("/api/team");
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          const data: TeamMember[] = await response.json();
          setTeamMembers(data);
          console.log("Fetched team members:", data);
        } catch (error) {
          const message = error instanceof Error ? error.message : "Unknown error";
          toast.error(`Error fetching team members: ${message}`);
        }
      } else if (activeTab === "jobs") {
        try {
          const [jobsResponse, appsResponse] = await Promise.all([
            fetch("/api/jobs"),
            fetch("/api/applications"),
          ]);
          if (!jobsResponse.ok) throw new Error(`Jobs fetch failed: ${jobsResponse.status}`);
          if (!appsResponse.ok) throw new Error(`Applications fetch failed: ${appsResponse.status}`);
          const [jobsData, appsData] = await Promise.all([
            jobsResponse.json() as Promise<Job[]>,
            appsResponse.json() as Promise<Application[]>,
          ]);
          setJobs(jobsData);
          setApplications(appsData);
          console.log("Fetched jobs:", jobsData);
          console.log("Fetched applications:", appsData);
        } catch (error) {
          const message = error instanceof Error ? error.message : "Unknown error";
          toast.error(`Error fetching jobs or applications: ${message}`);
        }
      }
    };
    fetchData();
  }, [activeTab]);

  useEffect(() => {
    const newErrors: Errors = {};
    if (activeTab === "create") {
      if (title && title.length < 3) newErrors.title = "Title must be at least 3 characters";
      if (author && author.length < 2) newErrors.author = "Author name must be at least 2 characters";
      if (category === "Other" && customCategory.length < 2)
        newErrors.customCategory = "Custom category must be at least 2 characters";
    } else if (activeTab === "team") {
      if (name && name.length < 2) newErrors.name = "Name must be at least 2 characters";
      if (role && role.length < 2) newErrors.role = "Role must be at least 2 characters";
      if (testimonial) {
        const lines = testimonial.split("\n");
        if (lines.length > 5) newErrors.testimonial = "Testimonial cannot exceed 5 lines";
        else if (testimonial.length > 500)
          newErrors.testimonial = "Testimonial cannot exceed 500 characters";
      }
    } else if (activeTab === "jobs") {
      if (jobTitle && jobTitle.length < 3) newErrors.jobTitle = "Job title must be at least 3 characters";
      if (jobLocation && jobLocation.length < 3) newErrors.jobLocation = "Location must be at least 3 characters";
      if (jobDescription && JSON.parse(jobDescription).root.children.length === 0)
        newErrors.jobDescription = "Description cannot be empty";
    }
    setErrors(newErrors);
  }, [title, author, category, customCategory, name, role, testimonial, jobTitle, jobLocation, jobDescription, activeTab]);

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
      setPrimaryImagePreview(editingBlog?.primaryImage || "");
    }
  };

  const handleTeamImageChange = (file: File | null) => {
    if (file) {
      setTeamImage(file);
      setTeamImagePreview(URL.createObjectURL(file));
    } else {
      setTeamImage(null);
      setTeamImagePreview(editingTeamMember?.image || "");
    }
  };

  const handlePrimaryImageDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) handlePrimaryImageChange(file);
    },
    []
  );

  const handleTeamImageDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) handleTeamImageChange(file);
    },
    []
  );

  const handleImageDrop = useCallback(
    (index: number, e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) handleContentChange(index, "value", file);
    },
    []
  );

  const addContentItem = (type: string) => {
    let newItem: ContentItem = { type, value: "" };
    if (type === "image") newItem = { type, value: null, imagePreview: "" };
    else if (type === "code") newItem = { type, value: "", language: "javascript" };
    setContent([...content, newItem]);
    setNewContentType("");
  };

  const handleContentChange = (index: number, field: string, value: string | File | null) => {
    const updatedContent = [...content];
    if (field === "value") {
      updatedContent[index].value = value;
      if (updatedContent[index].type === "image" && value instanceof File) {
        updatedContent[index].imagePreview = URL.createObjectURL(value);
      } else if (updatedContent[index].type === "image" && value === null) {
        updatedContent[index].imagePreview = "";
      }
    } else if (field === "language" && typeof value === "string") {
      updatedContent[index].language = value;
    }
    setContent(updatedContent);
  };

  const removeContentItem = (index: number) => {
    const updatedContent = [...content];
    updatedContent.splice(index, 1);
    setContent(updatedContent);
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      toast.error("Please fix form errors before submitting");
      return;
    }
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

      // Process content array, converting Lexical JSON to HTML where applicable
      const processedContent = content.map((item, index) => {
        if (item.type === "image") {
          // Image: Keep as placeholder
          return {
            type: item.type,
            value: `image-${index}`,
            language: item.language,
          };
        } else {
          // Non-image (e.g., text): Convert Lexical JSON to HTML
          const htmlValue = typeof item.value === "string" ? lexicalToHtml(item.value) : item.value;
          return {
            type: item.type,
            value: htmlValue,
            language: item.language,
          };
        }
      });

      formData.append("content", JSON.stringify(processedContent));
      content.forEach((item, index) => {
        if (item.type === "image" && item.value instanceof File) {
          formData.append(`image-${index}`, item.value);
        }
      });

      const url = editingBlog ? `/api/blogs/${editingBlog._id}` : "/api/blogs/create";
      const method = editingBlog ? "PUT" : "POST";

      const response = await fetch(url, { method, body: formData });
      if (!response.ok) throw new Error(`Failed to ${editingBlog ? "update" : "create"} blog: ${await response.text()}`);

      toast.success(`Blog ${editingBlog ? "updated" : "created"} successfully!`);
      resetBlogForm(); // Reset form fields after successful submission
      if (editingBlog) {
        setEditingBlog(null);
        setActiveTab("blogs");
      } else {
        router.push("#");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTeamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      toast.error("Please fix form errors before submitting");
      return;
    }
    setLoading(true);
    try {
      if (!teamImage && !editingTeamMember) throw new Error("Image is required");
      if (!testimonial || !name || !role) throw new Error("Testimonial, name, and role are required");

      const formData = new FormData();
      formData.append("testimonial", testimonial);
      formData.append("name", name);
      formData.append("role", role);
      if (teamImage) formData.append("image", teamImage);

      const url = editingTeamMember ? `/api/team/${editingTeamMember._id}` : "/api/team";
      const method = editingTeamMember ? "PUT" : "POST";

      const response = await fetch(url, { method, body: formData });
      if (!response.ok)
        throw new Error(`Failed to ${editingTeamMember ? "update" : "create"} team member: ${await response.text()}`);

      const data: { teamMember: TeamMember } = await response.json();
      if (!editingTeamMember) {
        setTeamMembers((prev) => [
          {
            _id: data.teamMember?._id,
            image: data.teamMember?.image,
            testimonial,
            name,
            role,
          },
          ...prev,
        ]);
      }

      toast.success(`Team member ${editingTeamMember ? "updated" : "created"} successfully!`);
      resetTeamForm();
      setActiveTab("team");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      toast.error("Please fix form errors before submitting");
      return;
    }
    setLoading(true);
    try {
      if (!jobTitle || !jobLocation || !jobDescription) {
        throw new Error("Title, location, and description are required");
      }

      // Convert Lexical JSON to HTML
      const descriptionHtml = lexicalToHtml(jobDescription);

      const formData = new FormData();
      formData.append("title", jobTitle);
      formData.append("location", jobLocation);
      formData.append("description", descriptionHtml); // Send HTML instead of JSON
      formData.append("employmentType", employmentType);

      const url = editingJob ? `/api/jobs/${editingJob._id}` : "/api/jobs";
      const method = editingJob ? "PUT" : "POST";

      const response = await fetch(url, { method, body: formData });
      if (!response.ok) {
        throw new Error(`Failed to ${editingJob ? "update" : "create"} job: ${await response.text()}`);
      }

      toast.success(`Job ${editingJob ? "updated" : "created"} successfully!`);
      resetJobForm();
      setActiveTab("jobs");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleBroadcastSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastSubject || !broadcastMessage) {
      toast.error("Please provide both a subject and a message");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject: broadcastSubject, message: broadcastMessage }),
      });
      const data: { message: string; error?: string } = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to send broadcast email");
      toast.success(data.message);
      setShowBroadcastForm(false);
      setBroadcastSubject("");
      setBroadcastMessage("");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleBlogDelete = async (blogId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/blogs/${blogId}`, { method: "DELETE" });
      if (!response.ok) throw new Error(`Failed to delete blog: ${await response.text()}`);
      setBlogs(blogs.filter((blog) => blog._id !== blogId));
      toast.success("Blog deleted successfully!");
      setShowDeleteConfirm(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setCategory(blog.category);
    setCustomCategory(blog.category === "Other" ? blog.category : "");
    setAuthor(blog.author);
    setPrimaryImagePreview(blog.primaryImage || "");
    setContent(
      blog.content?.map((item) => ({
        ...item,
        imagePreview: item.type === "image" && typeof item.value === "string" ? item.value : item.imagePreview,
      }))
    );
    setActiveTab("create");
  };

  const handleJobDelete = async (jobId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/jobs/${jobId}`, { method: "DELETE" });
      if (!response.ok) throw new Error(`Failed to delete job: ${await response.text()}`);
      setJobs(jobs.filter((job) => job._id !== jobId));
      toast.success("Job deleted successfully!");
      setShowDeleteConfirm(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setJobTitle(job.title);
    setJobLocation(job.location);
    setJobDescription(job.description);
    setEmploymentType(job.employmentType);
    setActiveTab("jobs");
  };

  const handleTeamDelete = async (memberId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/team/${memberId}`, { method: "DELETE" });
      if (!response.ok) throw new Error(`Failed to delete team member: ${await response.text()}`);
      setTeamMembers(teamMembers.filter((member) => member._id !== memberId));
      toast.success("Team member deleted successfully!");
      setShowDeleteConfirm(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleApplicationDelete = async (applicationId: string) => {
    if (!applicationId || !/^[0-9a-fA-F]{24}$/.test(applicationId)) {
      toast.error("Invalid application ID. Please try again.");
      setShowDeleteConfirm(null);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`/api/applications/${applicationId}`, { method: "DELETE" });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete application");
      }
      setApplications((prev) => prev.filter((app) => app._id !== applicationId));
      toast.success("Application deleted successfully!");
      setShowDeleteConfirm(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditTeamMember = (member: TeamMember) => {
    // Move the selected member to the top of the list
    setTeamMembers((prev) => {
      const updatedMembers = prev.filter((m) => m._id !== member._id); // Remove the member from its current position
      return [member, ...updatedMembers]; // Add it to the top
    });

    // Populate the form fields for editing
    setEditingTeamMember(member);
    setTeamImagePreview(member.image);
    setTestimonial(member.testimonial);
    setName(member.name);
    setRole(member.role);

    // Switch to the "team" tab
    setActiveTab("team");

    // Scroll to the top of the screen
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100); // Small delay to ensure the DOM updates before scrolling
  };

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
  };

  const resetTeamForm = () => {
    setEditingTeamMember(null);
    setTeamImage(null);
    setTeamImagePreview("");
    setTestimonial("");
    setName("");
    setRole("");
    setErrors({});
  };

  const resetJobForm = () => {
    setEditingJob(null);
    setJobTitle("");
    setJobLocation("");
    setJobDescription("");
    setEmploymentType("Full-Time");
    setErrors({});
  };

  const handleViewResume = (resumeUrl: string) => {
    if (!resumeUrl || !resumeUrl.startsWith("https://res.cloudinary.com")) {
      console.error("Invalid resume URL:", resumeUrl);
      toast.error("Invalid resume URL.");
      return;
    }
    const isPdf = resumeUrl.toLowerCase().endsWith(".pdf");
    const finalUrl = isPdf ? `${resumeUrl}#view=FitH&toolbar=1` : resumeUrl;
    console.log("Opening URL:", finalUrl);
    window.open(finalUrl, "_blank");
  };

  const closeModal = () => {
    setViewResumeUrl(null);
    setErrorMessage(null);
    setViewingApplicationsForJob(null);
  };

  const inputStyle =
    "bg-[#3d3d3f] p-4 w-full rounded-t-lg border-b-2 border-transparent focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white placeholder-gray-400";

  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }} className="min-h-screen bg-[#191a1b] text-white pt-[7em]">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick theme="dark" />
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
        .rd-4:checked ~ .bar,
        .rd-4:checked ~ .slidebar,
        .rd-4 + .label:hover ~ .slidebar {
          transform: translateX(300%) scaleX(1);
        }
             
        .rd-5:checked ~ .bar,
.rd-5:checked ~ .slidebar,
.rd-5 + .label:hover ~ .slidebar {
  transform: translateX(400%) scaleX(1);
}
   .rd-6:checked ~ .bar,
.rd-6:checked ~ .slidebar,
.rd-6 + .label:hover ~ .slidebar {
  transform: translateX(500%) scaleX(1);
}
      
   
        .custom-scroll-content {
          overflow-y: auto;
          max-height: calc(85vh - 80px);
          height: 100%;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: rgba(246, 255, 122, 0.5) transparent;
          will-change: scroll-position;
        }
        .custom-scroll-content::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll-content::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scroll-content::-webkit-scrollbar-thumb {
          background: rgba(246, 255, 122, 0.5);
          border-radius: 3px;
        }
        .custom-scroll-content::-webkit-scrollbar-thumb:hover {
          background: rgba(246, 255, 122, 0.7);
        }
        .application-item {
          transition: background-color 0.2s ease;
        }
        .lexical-editor {
          background: #1e1e1e;
          color: #ffffff;
          padding: 16px;
          border: 1px solid #444;
          border-radius: 4px;
        }
        .lexical-editor h1 {
          font-size: 32px !important;
          line-height: 40px !important;
          font-weight: 700 !important;
          margin: 16px 0 8px !important;
          color: #ffffff !important;
        }
        .lexical-editor h2 {
          font-size: 24px !important;
          line-height: 32px !important;
          font-weight: 600 !important;
          margin: 12px 0 6px !important;
          color: #ffffff !important;
        }
        .lexical-editor h3 {
          font-size: 20px !important;
          line-height: 28px !important;
          font-weight: 600 !important;
          margin: 10px 0 5px !important;
          color: #ffffff !important;
        }
        .lexical-editor p {
          font-size: 16px !important;
          line-height: 24px !important;
          margin: 8px 0 !important;
          color: #ffffff !important;
        }
        .lexical-editor ul {
          list-style: disc !important;
          margin-left: 24px !important;
          margin: 8px 0 !important;
          color: #ffffff !important;
        }
        .lexical-editor ol {
          list-style: decimal !important;
          margin-left: 24px !important;
          margin: 8px 0 !important;
          color: #ffffff !important;
        }
        .lexical-editor li {
          font-size: 16px !important;
          line-height: 24px !important;
          color: #ffffff !important;
        }
        .lexical-editor a {
          color: #f6ff7a !important;
          text-decoration: underline !important;
        }
        .lexical-editor pre {
          font-family: monospace !important;
          background: #2d2d2f !important;
          padding: 16px !important;
          border-radius: 4px !important;
          color: #f6ff7a !important;
          overflow-x: auto !important;
        }
      `}</style>
      <div className="max-w-4xl mx-auto bg-[#191a1b] rounded-xl shadow-2xl p-8 relative">
        <button
          onClick={() => setShowBroadcastForm(true)}
          className="absolute top-4 right-4 animate-bounce text-[#f6ff7a] hover:text-yellow-500 cursor-pointer"
          title="Send Broadcast Message"
        >
          <GrAnnounce size={26} />
        </button>
        {showBroadcastForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[50]">
            <div className="bg-[#3d3d3f] p-6 rounded-lg w-96">
              <h2 className="text-xl font-semibold text-[#f6ff7a] mb-4">Send Update to Subscribers</h2>
              <form onSubmit={handleBroadcastSubmit} className="space-y-4">
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-200">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={broadcastSubject}
                    onChange={(e) => setBroadcastSubject(e.target.value)}
                    required
                    className={inputStyle}
                    placeholder="Enter email subject"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-200">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    required
                    rows={5}
                    className={`${inputStyle} rounded-lg`}
                    placeholder="Enter your message"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-2 bg-[#f6ff7a] text-black font-bold rounded-lg hover:bg-yellow-500 disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBroadcastForm(false)}
                    className="flex-1 py-2 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-[#3d3d3f] p-6 rounded-lg w-96 shadow-xl"
            >
              <h2 className="text-xl font-semibold text-[#f6ff7a] mb-4">Confirm Deletion</h2>
              <p className="text-gray-200 mb-6">
                Are you sure you want to delete this {showDeleteConfirm.type}? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (showDeleteConfirm.type === "blog") {
                      handleBlogDelete(showDeleteConfirm.id);
                    } else if (showDeleteConfirm.type === "team") {
                      handleTeamDelete(showDeleteConfirm.id);
                    } else if (showDeleteConfirm.type === "job") {
                      handleJobDelete(showDeleteConfirm.id);
                    } else if (showDeleteConfirm.type === "application") {
                      handleApplicationDelete(showDeleteConfirm.id);
                    }
                  }}
                  disabled={loading}
                  className="flex-1 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-500 disabled:opacity-50"
                >
                  {loading ? "Deleting..." : "Delete"}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 py-2 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
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
  <input
    type="radio"
    id="rd-4"
    name="radio"
    className="rd-4"
    checked={activeTab === "jobs"}
    onChange={() => setActiveTab("jobs")}
  />
  <label htmlFor="rd-4" className="label">
    <span>Jobs</span>
  </label>
  <input
    type="radio"
    id="rd-5"
    name="radio"
    className="rd-5"
    checked={activeTab === "Subscribers"}
    onChange={() => setActiveTab("Subscribers")}
  />
  <label htmlFor="rd-5" className="label">
    <span>Subscribers</span>
  </label>

  
  <input
    type="radio"
    id="rd-6"
    name="radio"
    className="rd-6"
    checked={activeTab === "Projects"}
    onChange={() => setActiveTab("Projects")}
  />
  <label htmlFor="rd-6" className="label">
    <span>Projects</span>
  </label>
  <div className="bar"></div>
  <div className="slidebar"></div>
</div>
        </div>
        {activeTab === "create" && (
          <form onSubmit={handleBlogSubmit} className="space-y-8 mt-6">
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
                className="cursor-pointer inline-block px-6 py-3 bg-[#f6ff7a] text-black font-semibold rounded-lg hover:bg-yellow-500"
              >
                Select Image
              </label>
              {primaryImagePreview && (
                <div className="mt-4">
                  <Image
                    src={primaryImagePreview}
                    alt="Primary Preview"
                    width={300}
                    height={200}
                    className="max-w-xs mx-auto rounded-lg shadow-md object-cover"
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
              {content?.map((item, index) => (
                <div key={index} className="border border-gray-600 rounded-xl p-6 mb-6 bg-gray-900 shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-gray-200">
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)} {index + 1}
                  </h3>
                  {item.type === "heading" && (
                    <input
                      type="text"
                      value={typeof item.value === "string" ? item.value : ""}
                      onChange={(e) => handleContentChange(index, "value", e.target.value)}
                      required
                      className={inputStyle}
                      placeholder="Enter heading"
                    />
                  )}
                  {item.type === "paragraph" && (
                    <LexicalEditor
                      index={index}
                      initialValue={typeof item.value === "string" ? item.value : ""}
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
                        onChange={(e) => handleContentChange(index, "value", e.target.files?.[0] || null)}
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
                          <Image
                            src={item.imagePreview}
                            alt="Preview"
                            width={300}
                            height={200}
                            className="max-w-xs mx-auto rounded-lg shadow-md object-cover"
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
                  <button
                    type="button"
                    onClick={() => removeContentItem(index)}
                    className="mt-4 text-red-400 hover:text-red-500"
                  >
                    Remove {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </button>
                </div>
              ))}
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
                  onClick={() => newContentType && addContentItem(newContentType)}
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
                {loading ? (editingBlog ? "Updating..." : "Creating...") : editingBlog ? "Update Blog" : "Create Blog"}
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


{activeTab === "Projects" && (
  <div className="space-y-6 mt-6">
    <Allprojectss/>
  </div>
)}

        {activeTab === "Subscribers" && (
          <div className="space-y-6 mt-6">
   
            <Subscribers />
          </div>
        )}



{activeTab === "blogs" && (
  <div className="space-y-6 mt-6">
    <h2 className="text-2xl sm:text-3xl font-bold text-[#f6ff7a]">
      Your Blogs
    </h2>
    {blogs.length === 0 ? (
      <p className="text-gray-400 text-base sm:text-lg">No blogs found.</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-[#3d3d3f] p-4 sm:p-6 rounded-xl border border-gray-600 shadow-lg flex flex-col"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {blog.primaryImage && (
                <Image
                  src={blog.primaryImage}
                  alt={blog.title}
                  width={80}
                  height={80}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg flex-shrink-0"
                />
              )}
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-200 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base">
                  Category: {blog.category}
                </p>
                <p className="text-gray-400 text-sm sm:text-base">
                  Author: {blog.author}
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-6 justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleEditBlog(blog)}
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#f6ff7a] text-black font-semibold rounded-lg hover:bg-yellow-500 text-sm sm:text-base"
              >
                Edit
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  setShowDeleteConfirm({ id: blog._id, type: "blog" })
                }
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 text-sm sm:text-base"
              >
                Delete
              </motion.button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
)}



{activeTab === "team" && (
  <div className="space-y-6 mt-6">
    <h2 className="text-2xl sm:text-3xl font-bold text-[#f6ff7a]">Team Members</h2>
    <form onSubmit={handleTeamSubmit} className="space-y-6 sm:space-y-8">
      <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 sm:p-6 text-center">
        <label
          htmlFor="team-image"
          className="block text-base sm:text-lg font-medium mb-2 text-gray-200"
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
          className="cursor-pointer inline-block px-4 py-2 sm:px-6 sm:py-3 bg-[#f6ff7a] text-black font-semibold rounded-lg hover:bg-yellow-500 text-sm sm:text-base"
        >
          Select Image
        </label>
        {teamImagePreview && (
          <div className="mt-4">
            <Image
              src={teamImagePreview}
              alt="Team Member Preview"
              width={96}
              height={96}
              className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full object-cover"
            />
            <button
              type="button"
              onClick={() => handleTeamImageChange(null)}
              className="mt-2 text-red-400 hover:text-red-500 text-sm sm:text-base"
            >
              Remove Image
            </button>
          </div>
        )}
        <div
          onDrop={handleTeamImageDrop}
          onDragOver={(e) => e.preventDefault()}
          className="h-16 sm:h-20"
        />
      </div>
      <div>
        <label
          htmlFor="testimonial"
          className="block text-base sm:text-lg font-medium mb-2 text-gray-200"
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
          className={`${inputStyle} rounded-lg text-sm sm:text-base`}
          placeholder="Enter team member testimonial"
        />
        {errors.testimonial && (
          <p className="text-red-400 text-sm mt-1">{errors.testimonial}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="name"
          className="block text-base sm:text-lg font-medium mb-2 text-gray-200"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={`${inputStyle} text-sm sm:text-base`}
          placeholder="Enter team member name"
        />
        {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
      </div>
      <div>
        <label
          htmlFor="role"
          className="block text-base sm:text-lg font-medium mb-2 text-gray-200"
        >
          Role
        </label>
        <input
          type="text"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          className={`${inputStyle} text-sm sm:text-base`}
          placeholder="Enter team member role"
        />
        {errors.role && <p className="text-red-400 text-sm mt-1">{errors.role}</p>}
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="submit"
          disabled={loading || Object.keys(errors).length > 0}
          className="flex-1 py-3 sm:py-4 bg-[#f6ff7a] text-black font-bold rounded-lg hover:bg-yellow-500 disabled:opacity-50 text-sm sm:text-base"
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
            className="flex-1 py-3 sm:py-4 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500 text-sm sm:text-base"
          >
            Cancel
          </button>
        )}
      </div>
    </form>

    <h2 className="text-2xl sm:text-3xl font-bold mt-8 text-[#f6ff7a]">
      Current Team Members
    </h2>
    {teamMembers.length === 0 ? (
      <p className="text-gray-400 text-base sm:text-lg">No team members found.</p>
    ) : (
      <div className="grid grid-cols-1  gap-4 sm:gap-6">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-[#3d3d3f] p-4 sm:p-6 rounded-xl border border-gray-600 shadow-lg flex flex-col"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Image
                src={member.image || "/h1c44.png"}
                alt={member.name}
                width={80}
                height={80}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-200 line-clamp-2">
                  {member.name}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base">
                  Role: {member.role}
                </p>
                <p className="text-gray-400 text-sm sm:text-base line-clamp-3">
                  Testimonial: {member.testimonial}
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-6 justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleEditTeamMember(member)}
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#f6ff7a] text-black font-semibold rounded-lg hover:bg-yellow-500 text-sm sm:text-base"
              >
                Edit
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  setShowDeleteConfirm({ id: member._id, type: "team" })
                }
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 text-sm sm:text-base"
              >
                Delete
              </motion.button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
)}



        {activeTab === "jobs" && (
          <div className="space-y-6 mt-6">
            <h2 className="text-2xl font-bold text-[#f6ff7a]">
              {editingJob ? "Edit Job Posting" : "Create New Job Posting"}
            </h2>
            <form onSubmit={handleJobSubmit} className="space-y-8">
              <div>
                <label htmlFor="job-title" className="block text-lg font-medium mb-2 text-gray-200">
                  Job Title
                </label>
                <input
                  type="text"
                  id="job-title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                  className={inputStyle}
                  placeholder="Enter job title"
                />
                {errors.jobTitle && <p className="text-red-400 text-sm mt-1">{errors.jobTitle}</p>}
              </div>
              <div>
                <label htmlFor="job-location" className="block text-lg font-medium mb-2 text-gray-200">
                  Location
                </label>
                <input
                  type="text"
                  id="job-location"
                  value={jobLocation}
                  onChange={(e) => setJobLocation(e.target.value)}
                  required
                  className={inputStyle}
                  placeholder="Enter job location"
                />
                {errors.jobLocation && <p className="text-red-400 text-sm mt-1">{errors.jobLocation}</p>}
              </div>
              <div>
                <label htmlFor="job-description" className="block text-lg font-medium mb-2 text-gray-200">
                  Job Description
                </label>
                <LexicalEditor
                  index={0}
                  initialValue={jobDescription}
                  onChange={(value) => setJobDescription(value)}
                />
                {errors.jobDescription && <p className="text-red-400 text-sm mt-1">{errors.jobDescription}</p>}
              </div>
              <div>
                <label htmlFor="employment-type" className="block text-lg font-medium mb-2 text-gray-200">
                  Employment Type
                </label>
                <select
                  id="employment-type"
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  required
                  className={inputStyle}
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading || Object.keys(errors).length > 0}
                  className="flex-1 py-4 bg-[#f6ff7a] text-black font-bold rounded-lg hover:bg-yellow-500 disabled:opacity-50"
                >
                  {loading ? (editingJob ? "Updating..." : "Creating...") : editingJob ? "Update Job" : "Create Job"}
                </button>
                {editingJob && (
                  <button
                    type="button"
                    onClick={resetJobForm}
                    className="flex-1 py-4 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
            <h2 className="text-2xl font-bold mt-8 text-[#f6ff7a]">Current Job Postings</h2>
            {jobs.length === 0 ? (
              <p className="text-gray-400">No jobs found.</p>
            ) : (

<div className="grid grid-cols-1 gap-4 sm:gap-6">
  {jobs.map((job) => (
    <div
      key={job._id}
      className="bg-[#3d3d3f] p-4 sm:p-6 rounded-xl border border-gray-600 shadow-lg min-w-0"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-200 truncate">
            {job.title}
          </h3>
          <p className="text-sm sm:text-base text-gray-400">Location: {job.location}</p>
          <p className="text-sm sm:text-base text-gray-400">Type: {job.employmentType}</p>
          <p className="text-sm sm:text-base text-gray-400">
            Posted: {new Date(job.postedDate).toLocaleDateString()}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleEditJob(job)}
            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#f6ff7a] text-black font-semibold text-sm sm:text-base rounded-lg hover:bg-yellow-500 min-w-[80px] focus:outline-none focus:ring-2 focus:ring-[#f6ff7a]"
          >
            Edit
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDeleteConfirm({ id: job._id, type: "job" })}
            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 text-white font-semibold text-sm sm:text-base rounded-lg hover:bg-red-500 min-w-[80px] focus:outline-none focus:ring-2 focus:ring-[#f6ff7a]"
          >
            Delete
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewingApplicationsForJob(job._id)}
            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-transparent text-white border border-gray-600 font-semibold text-sm sm:text-base rounded-lg hover:bg-gray-600 hover:border-gray-600 min-w-[80px] focus:outline-none focus:ring-2 focus:ring-[#f6ff7a]"
          >
            View Applications
          </motion.button>
        </div>
      </div>
    </div>
  ))}
</div>
 )}
  


  <AnimatePresence>
  {viewingApplicationsForJob && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black bg-opacity-60 flex pt-[5em] items-center justify-center z-[50] px-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        ref={scrollRef}
        className="bg-[#3d3d3f]/80 backdrop-blur-md p-6 sm:p-8 rounded-xl w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] max-h-[80vh] overflow-y-auto custom-scroll-content shadow-xl"
      >
        <div className="relative">
          <h2
            style={{ fontFamily: 'Poppins, sans-serif' }}
            className="text-2xl sm:text-3xl font-semibold text-[#f6ff7a] mb-6"
          >
            Applications for{' '}
            {jobs.find((job) => job._id === viewingApplicationsForJob)?.title}
          </h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={closeModal}
            className="absolute top-4 right-4 bg-[#f6ff7a]/20 text-white p-2 rounded-full hover:bg-[#f6ff7a]/40 transition-colors"
            aria-label="Close applications modal"
          >
            <FaTimes size={18} />
          </motion.button>
        </div>

        {(() => {
          const filteredApplications = applications.filter(
            (app) => app.jobId === viewingApplicationsForJob
          );
          console.log('viewingApplicationsForJob:', viewingApplicationsForJob);
          console.log('Filtered applications:', filteredApplications);
          console.log('All applications:', applications);
          return filteredApplications.length === 0 ? (
            <p className="text-gray-400 text-center py-6">No applications found for this job.</p>
          ) : (
            <div className="space-y-4">
              {filteredApplications.map((application, index) => (
                <motion.div
                  key={application._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }} // Reduced delay for performance
                  className="application-item bg-[#2d2d2f] p-5 rounded-xl border border-gray-600 hover:bg-[#404042] transition-all duration-300 shadow-md"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div className="space-y-1.5">
                      <p className="text-gray-200 text-lg font-semibold">
                        {application.firstName} {application.lastName}
                      </p>
                      <p className="text-gray-400">
                        <strong>Email:</strong> {application.email}
                      </p>
                      <p className="text-gray-400">
                        <strong>Phone:</strong> {application.phone}
                      </p>
                      <p className="text-gray-400">
                        <strong>Country:</strong> {application.country}
                      </p>
                      {application.linkedIn && (
                        <p className="text-gray-400">
                          <strong>LinkedIn:</strong>{' '}
                          <a
                            href={application.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#f6ff7a] hover:underline"
                          >
                            Profile
                          </a>
                        </p>
                      )}
                      {application.website && (
                        <p className="text-gray-400">
                          <strong>Website:</strong>{' '}
                          <a
                            href={application.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#f6ff7a] hover:underline"
                          >
                            Link
                          </a>
                        </p>
                      )}
                      <p className="text-gray-400">
                        <strong>Submitted:</strong>{' '}
                        {new Date(application.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2 mt-4 sm:mt-0">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleViewResume(application.resume)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#f6ff7a] to-[#d4e04d] text-black font-semibold rounded-lg hover:from-[#e0e56b] hover:to-[#c0cc44] transition-all"
                      >
                        <FaEye size={16} />
                        View Resume
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          setShowDeleteConfirm({ id: application._id, type: 'application' })
                        }
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-500 hover:to-red-600 transition-all"
                      >
                        <FaTrash size={16} />
                        Delete
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          );
        })()}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>




{viewResumeUrl && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
    <div className="bg-[#3d3d3f] p-6 rounded-lg w-[95%] max-w-5xl relative overflow-auto max-h-[90vh]">
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-gray-200 hover:text-gray-400 z-10"
      >
        Close
      </button>
      {errorMessage ? (
        <div className="text-red-400">
          <p>{errorMessage}</p>
          <a
            href={viewResumeUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#f6ff7a] underline"
          >
            Open PDF in new tab
          </a>
        </div>
      ) : (
        <iframe
          src={viewResumeUrl}
          title="Resume"
          className="w-full min-h-[80vh] rounded-lg"
          allowFullScreen
        />
      )}
    </div>
  </div>
)}


          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;