"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaSearch, FaSyncAlt, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

interface Subscriber {
  _id: string;
  email: string;
  name: string;
  image: string;
  createdAt: string;
}

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [subscriberToDelete, setSubscriberToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch subscribers
  const fetchSubscribers = async (query: string = "") => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/subscribers${query ? `?query=${encodeURIComponent(query)}` : ""}`);
      if (!response.ok) {
        throw new Error("Failed to fetch subscribers");
      }
      const data = await response.json();
      setSubscribers(data.subscribers);
      setCurrentPage(1); // Reset to first page on new search
    } catch (err: any) {
      setError(err.message);
      toast.error(`Error: ${err.message}`, { theme: "dark" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers(searchQuery);
  }, [searchQuery]);

  // Open delete modal
  const openDeleteModal = (id: string) => {
    setSubscriberToDelete(id);
    setShowDeleteModal(true);
  };

  // Close delete modal
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSubscriberToDelete(null);
  };

  // Handle delete subscriber
  const handleDelete = async () => {
    if (!subscriberToDelete) return;

    try {
      const response = await fetch(`/api/subscribers/${subscriberToDelete}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Failed to delete subscriber");
      }
      setSubscribers(subscribers.filter((sub) => sub._id !== subscriberToDelete));
      toast.success("Subscriber deleted successfully!", { theme: "dark" });
      closeDeleteModal();
    } catch (err: any) {
      setError(err.message);
      toast.error(`Error: ${err.message}`, { theme: "dark" });
      closeDeleteModal();
    }
  };

  // Handle refresh
  const handleRefresh = () => {
    setSearchQuery("");
    fetchSubscribers();
  };

  // Handle error dismissal
  const dismissError = () => setError(null);

  // Pagination helper
  const getPaginatedItems = (items: Subscriber[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  // Pagination component
  const Pagination = () => {
    const totalItems = subscribers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const maxPageButtons = 5;

    const getPageNumbers = () => {
      const pages: (number | string)[] = [];
      let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
      let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

      if (endPage - startPage + 1 < maxPageButtons) {
        startPage = Math.max(1, endPage - maxPageButtons + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (startPage > 1) {
        pages.unshift("...");
        pages.unshift(1);
      }
      if (endPage < totalPages) {
        pages.push("...");
        pages.push(totalPages);
      }

      return pages;
    };

    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center items-center gap-2 mt-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-lg text-sm sm:text-base ${
            currentPage === 1
              ? "bg-[#3d3d3f] text-gray-400 cursor-not-allowed"
              : "bg-[#3d3d3f] text-[#f6ff7a] hover:bg-[#4a4a4c]"
          }`}
          aria-label="Previous page"
        >
          Prev
        </motion.button>
        {getPageNumbers().map((page, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => typeof page === "number" && setCurrentPage(page)}
            className={`px-3 py-1 rounded-lg text-sm sm:text-base ${
              page === currentPage
                ? "bg-[#f6ff7a] text-black font-semibold"
                : typeof page === "number"
                ? "bg-[#3d3d3f] text-[#f6ff7a] hover:bg-[#4a4a4c]"
                : "bg-[#242425] text-gray-400 cursor-default"
            }`}
            disabled={typeof page !== "number"}
            aria-label={typeof page === "number" ? `Page ${page}` : "Ellipsis"}
          >
            {page}
          </motion.button>
        ))}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-lg text-sm sm:text-base ${
            currentPage === totalPages
              ? "bg-[#3d3d3f] text-gray-400 cursor-not-allowed"
              : "bg-[#3d3d3f] text-[#f6ff7a] hover:bg-[#4a4a4c]"
          }`}
          aria-label="Next page"
        >
          Next
        </motion.button>
      </div>
    );
  };

  return (
    <div className="font-poppins bg-[#191a1b] text-white">
      <style jsx>{`
        .font-poppins {
          font-family: "Poppins", sans-serif;
        }
        .input-style {
          background-color: #3d3d3f;
          padding: 1rem;
          width: 100%;
          border-radius: 0.5rem 0.5rem 0 0;
          border-bottom: 2px solid transparent;
          outline: none;
          transition: all 0.3s;
          color: white;
        }
        .input-style:focus {
          border-bottom: 2px solid #f6ff7a;
        }
        .input-style::placeholder {
          color: #6b7280;
        }
        .table-container {
          overflow-x: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(246, 255, 122, 0.5) transparent;
        }
        .table-container::-webkit-scrollbar {
          height: 6px;
        }
        .table-container::-webkit-scrollbar-track {
          background: transparent;
        }
        .table-container::-webkit-scrollbar-thumb {
          background: rgba(246, 255, 122, 0.5);
          border-radius: 3px;
        }
        .table-container::-webkit-scrollbar-thumb:hover {
          background: rgba(246, 255, 122, 0.7);
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background: #3d3d3f;
          padding: 24px;
          border-radius: 12px;
          max-width: 400px;
          width: 100%;
          text-align: center;
        }
      `}</style>
      <div className="max-w-4xl mx-auto bg-[#3d3d3f] rounded-xl shadow-2xl p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#f6ff7a]">Subscribers List</h2>
          <button
            onClick={handleRefresh}
            className="p-2 text-gray-400 hover:text-[#f6ff7a] transition-colors"
            title="Refresh"
          >
            <FaSyncAlt className="text-lg" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-style pl-10 pr-4 py-3 text-gray-200"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900 border-l-4 border-red-500 text-red-200 rounded-lg flex justify-between items-center">
            <p>{error}</p>
            <button onClick={dismissError} className="text-red-200 hover:text-red-400">
              ×
            </button>
          </div>
        )}

        {/* Subscribers Table */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-gray-600 h-10 w-10"></div>
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-600 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : subscribers.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400 text-lg">No subscribers found.</p>
            <button
              onClick={handleRefresh}
              className="mt-4 text-[#f6ff7a] hover:text-yellow-500 underline"
            >
              Try refreshing
            </button>
          </div>
        ) : (
          <div className="table-container">
            <table className="min-w-full divide-y divide-gray-600">
              <thead className="bg-[#2d2d2f]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-600">
                {getPaginatedItems(subscribers).map((subscriber, index) => (
                  <tr
                    key={subscriber._id}
                    className={`transition-colors ${
                      index % 2 === 0 ? "bg-[#3d3d3f]" : "bg-[#2d2d2f]"
                    } hover:bg-[#353537]`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative h-10 w-10">
                        <Image
                          src={subscriber.image}
                          alt={subscriber.name}
                          fill
                          className="rounded-full object-cover"
                          unoptimized
                          onError={(e) => {
                            e.currentTarget.src = "/ph.jpg"; // Fallback image
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-200">
                      {subscriber.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                      {subscriber.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                      {new Date(subscriber.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => openDeleteModal(subscriber._id)}
                        className="flex items-center text-red-400 hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <FaTrash className="mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <Pagination />

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 className="text-xl font-semibold text-[#f6ff7a] mb-4">Confirm Deletion</h3>
              <p className="text-gray-200 mb-6">
                Are you sure you want to delete this subscriber? This action cannot be undone.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={closeDeleteModal}
                  className="px-4 py-2 bg-gray-600 text-gray-200 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}