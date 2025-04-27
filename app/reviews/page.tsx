'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
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

const Reviews = () => {
  const { data: session } = useSession();
  const [reviewText, setReviewText] = useState('');
  const [position, setPosition] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const maxLength = 500;

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/reviews?page=${page}&limit=6`);
        if (!response.ok) throw new Error('Failed to fetch reviews');
        const data: Review[] = await response.json();
        console.log('Fetched reviews:', data.map(r => ({ _id: r._id, createdAt: r.createdAt })));
        setReviews((prev) => (page === 1 ? data : [...prev, ...data]));
        setHasMore(data.length === 6);
      } catch (err) {
        toast.error('Failed to load reviews.', { style: { background: '#2d2d2f', color: '#fff' } });
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [page]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText || !position) {
      setError('All fields are required.');
      toast.error('Please fill in all fields.', { style: { background: '#2d2d2f', color: '#fff' } });
      return;
    }
    if (reviewText.length > maxLength) {
      setError('Review exceeds maximum length.');
      toast.error('Review is too long.', { style: { background: '#2d2d2f', color: '#fff' } });
      return;
    }

    const formData = new FormData();
    formData.append('text', reviewText);
    formData.append('name', session?.user?.name || 'Anonymous');
    formData.append('position', position);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit review');
      }

      // Add the new review to the state
      setReviews((prev) => {
        const updatedReviews = [data.review, ...prev];
        // Sort by createdAt descending (newest first)
        return updatedReviews.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      setSuccess('Review submitted successfully!');
      toast.success('Review submitted!', { style: { background: '#2d2d2f', color: '#f6ff7a' } });
      setReviewText('');
      setPosition('');
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to submit review.');
      toast.error(err.message || 'Failed to submit review.', { style: { background: '#2d2d2f', color: '#fff' } });
      setSuccess('');
    }
  };

  const handleDelete = async () => {
    if (!session?.user?.id) {
      toast.error('You must be signed in to delete your review.', { style: { background: '#2d2d2f', color: '#fff' } });
      return;
    }

    try {
      const response = await fetch('/api/reviews', {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete review');
      }

      // Remove the deleted review from the state
      setReviews((prev) => prev.filter((review) => review.userId !== session.user.id));

      setSuccess('Review deleted successfully!');
      toast.success('Review deleted!', { style: { background: '#2d2d2f', color: '#f6ff7a' } });
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to delete review.');
      toast.error(err.message || 'Failed to delete review.', { style: { background: '#2d2d2f', color: '#fff' } });
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 lg:pt-[8em] bg-[#191a1b] text-white font-poppins">
      <Toaster position="top-right" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-5xl mx-auto"
      >
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 p-6 bg-[#242425] rounded-lg flex flex-col sm:flex-row items-center justify-between shadow-md"
        >
          {session ? (
            <div className="flex items-center gap-4">
              {session.user?.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name || 'User'}
                  width={50}
                  height={50}
                  className="rounded-full border-2 border-[#f6ff7a]/70"
                />
              )}
              <div>
                <h2 className="text-lg font-medium text-white">{session.user?.name}</h2>
                <p className="text-[#bcbcc0] text-sm">{session.user?.email}</p>
              </div>
            </div>
          ) : (
            <p className="text-[#bcbcc0] text-center sm:text-left">Sign in to share your review.</p>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (session ? signOut() : signIn('google'))}
            className={`px-5 py-2 rounded-lg font-medium text-sm ${
              session ? 'bg-red-600 hover:bg-red-500 text-white' : 'bg-[#f6ff7a] hover:bg-yellow-500 text-black'
            }`}
          >
            {session ? 'Sign Out' : 'Sign In with Google'}
          </motion.button>
        </motion.div>

        {/* Review Form */}
        {session ? (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="space-y-6 bg-[#242425] p-6 rounded-lg shadow-md"
          >
            <div>
              <label htmlFor="position" className="block text-sm font-medium mb-2 text-[#f6ff7a]">
                Position/Company
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full p-2 bg-transparent text-white border-b-2 border-[#f6ff7a]/50 focus:border-[#f6ff7a] focus:outline-none transition-colors placeholder-[#bcbcc0]/70"
                  placeholder="Your position and company"
                  required
                />
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-[#f6ff7a]"
                  initial={{ width: 0 }}
                  animate={{ width: position ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
            <div>
              <label htmlFor="review" className="block text-sm font-medium mb-2 text-[#f6ff7a]">
                Review
              </label>
              <div className="relative">
                <textarea
                  id="review"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full p-2 bg-transparent text-white border-b-2 border-[#f6ff7a]/50 focus:border-[#f6ff7a] focus:outline-none transition-colors placeholder-[#bcbcc0]/70 resize-none"
                  rows={5}
                  placeholder="Write your review here..."
                  required
                />
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-[#f6ff7a]"
                  initial={{ width: 0 }}
                  animate={{ width: reviewText ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-xs text-[#bcbcc0] mt-1 text-right">
                {reviewText.length}/{maxLength}
              </p>
            </div>
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-red-400 text-sm"
                >
                  {error}
                </motion.p>
              )}
              {success && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-[#f6ff7a] text-sm"
                >
                  {success}
                </motion.p>
              )}
            </AnimatePresence>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-2 bg-[#f6ff7a] text-black font-medium rounded-lg hover:bg-yellow-500 transition-colors"
            >
              Submit Review
            </motion.button>
          </motion.form>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-[#bcbcc0] text-sm"
          >
            Please{' '}
            <button
              onClick={() => signIn('google')}
              className="text-[#f6ff7a] underline hover:text-yellow-500"
            >
              sign in
            </button>{' '}
            to share your review.
          </motion.p>
        )}

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-[#f6ff7a] tracking-tight">
            Client Testimonials
          </h2>
          {loading && reviews.length === 0 ? (
            <p className="text-center text-[#bcbcc0] animate-pulse">Loading testimonials...</p>
          ) : reviews.length === 0 ? (
            <p className="text-center text-[#bcbcc0] text-sm">No testimonials yet. Be the first!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {reviews.map((review, index) => {
                  const isUserReview = session?.user?.id === review.userId;
                  return (
                    <motion.div
                      key={review._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                      className={`relative p-7 rounded-xl flex flex-col justify-between min-h-[220px] ${
                        isUserReview
                          ? 'bg-[#2d2d2f] border-2 border-[#f6ff7a]/50 shadow-lg'
                          : 'bg-[#242425]'
                      }`}
                    >
                      {isUserReview && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handleDelete}
                          className="absolute top-4 right-4 text-red-400 hover:text-red-500"
                          title="Delete your review"
                        >
                          <FaTrash size={16} />
                        </motion.button>
                      )}
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
                  );
                })}
              </AnimatePresence>
            </div>
          )}
          {hasMore && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPage((prev) => prev + 1)}
              className="mt-8 mx-auto block px-6 py-2 bg-[#f6ff7a] text-black font-medium rounded-lg hover:bg-yellow-500 transition-colors"
            >
              {loading ? 'Loading...' : 'Load More'}
            </motion.button>
          )}
        </motion.div>

        {/* Back to Clients */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 border border-[#f6ff7a] text-[#f6ff7a] font-medium rounded-lg hover:bg-[#f6ff7a] hover:text-black transition-colors"
            >
              Back to Home
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .font-poppins {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default Reviews;