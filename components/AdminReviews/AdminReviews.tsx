'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';

interface Review {
  _id: string;
  text: string;
  name: string;
  position: string;
  userId: string;
  image?: string;
  createdAt: string;
}

const AdminReviews = () => {
  const { data: session, status } = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/reviews');
        if (!response.ok) throw new Error('Failed to fetch reviews');
        const data: Review[] = await response.json();
        setReviews(data);
      } catch (err) {
        setError('Failed to load reviews.');
        toast.error('Failed to load reviews.', { style: { background: '#2d2d2f', color: '#fff' } });
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleDeleteClick = (reviewId: string) => {
    setSelectedReviewId(reviewId);
    setShowModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedReviewId) return;

    setDeleting(true);
    try {
      const response = await fetch(`/api/reviews/${selectedReviewId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete review');
      }

      setReviews((prev) => prev.filter((review) => review._id !== selectedReviewId));
      toast.success('Review deleted successfully!', { style: { background: '#2d2d2f', color: '#f6ff7a' } });
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to delete review.');
      toast.error(err.message || 'Failed to delete review.', { style: { background: '#2d2d2f', color: '#fff' } });
    } finally {
      setDeleting(false);
      setShowModal(false);
      setSelectedReviewId(null);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setSelectedReviewId(null);
  };

  if (status === 'loading') {
    return <div className="min-h-screen bg-[#191a1b] text-white flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-4 sm:p-8  bg-[#191a1b] text-white font-poppins">
      <Toaster position="top-right" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-5xl mx-auto"
      >
        <h1 className="text-3xl font-semibold mb-8 text-center text-[#f6ff7a]">Manage Reviews</h1>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm mb-4 text-center"
          >
            {error}
          </motion.p>
        )}

        {loading ? (
          <p className="text-center text-[#bcbcc0] animate-pulse">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-center text-[#bcbcc0] text-sm">No reviews found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {reviews.map((review, index) => (
                <motion.div
                  key={review._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  className="relative p-7 rounded-xl bg-[#242425] flex flex-col justify-between min-h-[220px]"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDeleteClick(review._id)}
                    className="absolute top-4 right-4 text-red-400 hover:text-red-500 cursor-pointer"
                    title="Delete review"
                  >
                    <FaTrash size={16} />
                  </motion.button>
                  <p className="text-[#bcbcc0] text-sm italic line-clamp-7 mb-4">“{review.text}”</p>
                  <div className="flex items-center gap-3">
                    <Image
                      src={review.image || '/h1c44.png'}
                      alt={`${review.name}'s profile`}
                      width={40}
                      height={40}
                      className="rounded-full border border-[#f6ff7a]/50"
                    />
                    <div>
                      <h3 className="text-sm font-medium text-white">{review.name}</h3>
                      <p className="text-[#bcbcc0] text-xs">{review.position}</p>
                      <p className="text-[#bcbcc0] text-xs">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-[#242425] p-6 rounded-xl max-w-sm w-full mx-4"
            >
              <h2 className="text-lg font-semibold text-white mb-4">Delete Review</h2>
              <p className="text-[#bcbcc0] text-sm mb-6">
                Are you sure you want to delete this review? This action cannot be undone.
              </p>
              {deleting ? (
                <div className="flex justify-center">
                  <div className="w-8 h-8 border-4 border-t-[#f6ff7a] border-[#3a3a3c] rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="flex justify-end gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCancel}
                    className="px-4 py-2 bg-[#3a3a3c] text-white rounded-lg hover:bg-[#4a4a4c]"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDeleteConfirm}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Confirm
                  </motion.button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .font-poppins {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default AdminReviews;