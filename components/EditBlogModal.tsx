// components/EditBlogModal.tsx
import BlogForm from "@/components/BlogForm";
import { FaTimes } from "react-icons/fa";

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

interface EditBlogModalProps {
  blogData: Blog;
  onUpdate: (updatedBlog: Blog) => void;
  onCancel: () => void;
}

const EditBlogModal: React.FC<EditBlogModalProps> = ({ blogData, onUpdate, onCancel }) => {
  return (
    <div
      className="fixed inset-0 bg-[#191A1B] bg-opacity-50 flex items-center justify-center z-[1000]"
      onClick={onCancel}
    >
      <div
        className="bg-[#191A1B] rounded-lg w-full max-w-4xl min-h-[50vh] max-h-[90vh] overflow-y-auto p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-200 hover:text-[#f6ff7a] z-10"
        >
          <FaTimes size={24} />
        </button>
        <BlogForm blogData={blogData} onUpdate={onUpdate} onCancel={onCancel} />
      </div>
    </div>
  );
};

export default EditBlogModal;