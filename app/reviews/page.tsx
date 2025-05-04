'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { FiCheck, FiAlertCircle } from 'react-icons/fi';

interface Review {
  _id: string;
  text: string;
  name: string;
  position: string;
  userId: string;
  image?: string;
  stars?: number;
  createdAt: string;
}

interface ReviewResponse {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  hasMore: boolean;
}

const Reviews = () => {
  const { data: session } = useSession();
  const [reviewText, setReviewText] = useState('');
  const [position, setPosition] = useState('');
  const [stars, setStars] = useState<number>(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const maxLength = 500;

  // Auto-dismiss success and error messages after 3 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess('');
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/reviews?page=${page}&limit=6`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch reviews');
        }
        const data: ReviewResponse = await response.json();
        setReviews((prev) => (page === 1 ? data.reviews : [...prev, ...data.reviews]));
        setAverageRating(data.averageRating);
        setTotalReviews(data.totalReviews);
        setHasMore(data.hasMore);
      } catch (err: any) {
        toast.error(err.message || 'Failed to load reviews.', {
          style: { background: '#2d2d2f', color: '#fff' },
        });
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [page]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText || !position || stars === 0) {
      setError('All fields, including star rating, are required.');
      toast.error('Please fill in all fields and select a star rating.', {
        style: { background: '#2d2d2f', color: '#fff' },
      });
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
    formData.append('stars', stars.toString());

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit review');
      }

      setReviews((prev) => {
        const updatedReviews = [data.review, ...prev];
        return updatedReviews.sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      const newTotalReviews = totalReviews + 1;
      const newAverageRating = ((averageRating * totalReviews) + data.review.stars) / newTotalReviews;
      setAverageRating(Math.round(newAverageRating * 10) / 10);
      setTotalReviews(newTotalReviews);

      setSuccess('Review submitted successfully!');
      toast.success('Review submitted!', { style: { background: '#2d2d2f', color: '#f6ff7a' } });
      setReviewText('');
      setPosition('');
      setStars(0);
      setIsFormOpen(false);
    } catch (err: any) {
      setError(err.message || 'Failed to submit review.');
      toast.error(err.message || 'Failed to submit review.', {
        style: { background: '#2d2d2f', color: '#fff' },
      });
    }
  };

  const handleDelete = async () => {
    if (!session?.user?.id) {
      toast.error('You must be signed in to delete your review.', {
        style: { background: '#2d2d2f', color: '#fff' },
      });
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

      const deletedReview = reviews.find((review) => review.userId === session.user.id);
      setReviews((prev) => prev.filter((review) => review.userId !== session.user.id));
      if (deletedReview && deletedReview.stars && totalReviews > 1) {
        const newTotalReviews = totalReviews - 1;
        const newAverageRating = ((averageRating * totalReviews) - deletedReview.stars) / newTotalReviews;
        setAverageRating(Math.round(newAverageRating * 10) / 10);
        setTotalReviews(newTotalReviews);
      } else {
        setAverageRating(0);
        setTotalReviews(0);
      }

      setSuccess('Review deleted successfully!');
      toast.success('Review deleted!', { style: { background: '#2d2d2f', color: '#f6ff7a' } });
    } catch (err: any) {
      setError(err.message || 'Failed to delete review.');
      toast.error(err.message || 'Failed to delete review.', {
        style: { background: '#2d2d2f', color: '#fff' },
      });
    }
  };

  const renderStarInput = () => {
    const starArray = [1, 2, 3, 4, 5];
    return (
      <motion.div className="flex items-center gap-3">
        {starArray.map((star) => (
          <motion.button
            key={star}
            type="button"
            whileHover={{ scale: 1.2, y: -3, transition: { type: 'spring', stiffness: 400 } }}
            whileTap={{ scale: 0.9, transition: { duration: 0.2 } }}
            animate={star <= stars ? { scale: [1, 1.3, 1], transition: { duration: 0.3 } } : {}}
            onClick={() => setStars(star)}
            className={`text-3xl ${star <= stars ? 'text-[#f6ff7a]' : 'text-[#bcbcc0]'} cursor-pointer transition-colors duration-200`}
            aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
          >
            ★
          </motion.button>
        ))}
        <motion.span
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[#bcbcc0] text-sm font-medium"
        >
          {stars > 0 ? `${stars} Star${stars > 1 ? 's' : ''}` : 'Select rating'}
        </motion.span>
      </motion.div>
    );
  };

  const renderStars = (rating: number | undefined) => {
    const effectiveRating = rating || 0;
    const starArray = [1, 2, 3, 4, 5];
    return (
      <div className="flex items-center gap-1 mb-3">
        {starArray.map((star) => (
          <span
            key={star}
            className={`text-lg ${star <= effectiveRating ? 'text-[#f6ff7a]' : 'text-[#bcbcc0]'}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const renderAverageRating = () => {
    if (totalReviews === 0) {
      return (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[#bcbcc0] text-center text-sm font-medium"
        >
          No reviews yet. Be the first to share!
        </motion.p>
      );
    }

    const fullStars = Math.floor(averageRating);
    const hasHalfStar = averageRating % 1 >= 0.5;
    const starArray = [1, 2, 3, 4, 5];
    const percentage = (averageRating / 5) * 100;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col items-center mb-10 p-6 bg-[#242425]/30 backdrop-blur-md rounded-lg"
      >
        <div className="relative w-20 h-20 mb-3">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              className="text-[#2d2d2f] fill-none stroke-[3]"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-[#f6ff7a]  fill-none stroke-[3]"
              strokeDasharray={`${percentage}, 100`}
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[#f6ff7a] text-[40px] font-semibold">{averageRating.toFixed(1)}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {starArray.map((star) => (
            <span
              key={star}
              className={`text-xl ${
                star <= fullStars
                  ? 'text-[#f6ff7a]'
                  : star === fullStars + 1 && hasHalfStar
                  ? 'text-[#f6ff7a]/50'
                  : 'text-[#bcbcc0]'
              }`}
            >
              ★
            </span>
          ))}
        </div>
        <p className="text-[#bcbcc0] text-sm font-medium mt-2">
          Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}
        </p>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen p-4 pt-[7em] sm:p-8 lg:pt-24 bg-[#191a1b] text-white font-poppins">
      <Toaster position="top-right" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-5xl mx-auto"
      >
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 p-6 bg-[#242425]/30 backdrop-blur-md rounded-lg border border-[#bcbcc0]/20"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {session ? (
              <div className="flex items-center gap-4">
                {session.user?.image && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Image
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      width={48}
                      height={48}
                      className="rounded-full border border-[#f6ff7a]/50"
                    />
                  </motion.div>
                )}
                <div>
                  <h2 className="text-lg font-semibold text-white">{session.user?.name}</h2>
                  <p className="text-[#bcbcc0] text-sm">{session.user?.email}</p>
                </div>
              </div>
            ) : (
              <p className="text-[#bcbcc0] text-center sm:text-left text-sm font-medium">
                Sign in to share your review.
              </p>
            )}
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => (session ? signOut() : signIn('google'))}
              className="px-4 py-2 rounded-lg font-medium text-sm border border-[#f6ff7a] text-[#f6ff7a] hover:bg-[#f6ff7a]/10 transition-opacity duration-300"
            >
              {session ? 'Sign Out' : 'Sign In with Google'}
            </motion.button>
          </div>
        </motion.div>

        {/* Add Review Button or Form */}
        {session ? (
          <AnimatePresence>
            {!isFormOpen ? (
              <motion.div
                key="add-button"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="mb-8 text-center"
              >
                <motion.button
                  whileHover={{ y: -3, boxShadow: '0 4px 12px rgba(246,255,122,0.2)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsFormOpen(true)}
                  className="px-4 py-2 bg-[#f6ff7a] text-black font-medium rounded-lg transition-opacity duration-300 flex items-center justify-center gap-2 mx-auto"
                >
                  <FaPlus size={14} />
                  Add Review
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
                key="review-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateX: -10 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="space-y-6 mb-8 p-6 sm:p-8 bg-[#242425]/20 backdrop-blur-xl rounded-xl border border-[#f6ff7a]/10"
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="relative"
                >
                  <input
                    type="text"
                    id="position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="w-full p-3 bg-transparent text-white border-b border-[#bcbcc0]/50 focus:border-b-[#f6ff7a] focus:outline-none transition-all duration-300 peer placeholder-transparent"
                    placeholder="Your position and company"
                    autoComplete="off"
                    required
                    aria-required="true"
                  />
                  <motion.label
                    htmlFor="position"
                    initial={{ y: 0, scale: 1 }}
                    animate={{ y: position ? -24 : 0, scale: position ? 0.85 : 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="absolute left-0 top-3 text-[#bcbcc0] text-sm font-medium transition-all duration-300 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#f6ff7a] peer-placeholder-shown:top-3 peer-placeholder-shown:text-base"
                  >
                    Position/Company
                  </motion.label>
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-[#f6ff7a]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: position ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <label className="block text-sm font-medium mb-2 text-[#bcbcc0]">
                    Rating
                  </label>
                  {renderStarInput()}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="relative mt-10"
                >
                  <textarea
                    id="review"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full p-10 bg-transparent text-white border-b border-[#bcbcc0]/50 focus:border-b-[#f6ff7a] focus:outline-none transition-all duration-300 peer placeholder-transparent resize-none"
                    rows={4}
                    placeholder="Write your review here..."
                    required
                    autoComplete='off'
                    aria-required="true"
                  />
                  <motion.label
                    htmlFor="review"
                    initial={{ y: 0, scale: 1 }}
                    animate={{ y: reviewText ? -24 : 0, scale: reviewText ? 0.85 : 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="absolute left-0 pb-4 top-3 text-[#bcbcc0] text-sm font-medium transition-all  peer-focus:-top-2 mt-4 peer-focus:text-xs peer-focus:text-[#f6ff7a] peer-placeholder-shown:top-3 peer-placeholder-shown:text-base"
                  >
                    Review
                  </motion.label>
                  <div className="relative mt-2">
                 
                    <p className="text-xs text-[#bcbcc0] mt-1 text-right">
                      {reviewText.length}/{maxLength}
                    </p>
                  </div>
                </motion.div>

                <AnimatePresence>
                  {(error || success) && (
                    <motion.div aria-live="polite">
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, x: 30, scale: 0.95 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: 30, scale: 0.95 }}
                          transition={{ duration: 0.4, ease: 'easeOut' }}
                          whileHover={{ x: [0, -5, 5, 0], transition: { duration: 0.3 } }}
                          className="flex items-center gap-2 p-3 bg-[#f87171]/10 border border-[#f87171]/50 rounded-lg backdrop-blur-md"
                        >
                          <FiAlertCircle className="text-[#f87171]" size={16} />
                          <p className="text-[#f87171] text-sm font-medium">{error}</p>
                        </motion.div>
                      )}
                      {success && (
                        <motion.div
                          initial={{ opacity: 0, x: 30, scale: 0.95 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: 30, scale: 0.95 }}
                          transition={{ duration: 0.4, ease: 'easeOut' }}
                          className="flex items-center gap-2 p-3 bg-[#f6ff7a]/10 border border-[#f6ff7a]/50 rounded-lg backdrop-blur-md"
                        >
                          <FiCheck className="text-[#f6ff7a]" size={16} />
                          <p className="text-[#f6ff7a] text-sm font-medium">{success}</p>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <motion.button
                    type="submit"
                    whileHover={{ y: -3, boxShadow: '0 4px 12px rgba(246,255,122,0.2)' }}
                    whileTap={{ scale: 0.95 }}
                    className="relative flex-1 py-2 bg-[#f6ff7a] text-black font-medium rounded-lg transition-opacity duration-300 overflow-hidden"
                  >
                    <span className="relative z-10">Submit Review</span>
                    <motion.div
                      className="absolute inset-0 bg-[#f6ff7a]/50"
                      initial={{ scale: 0, opacity: 0 }}
                      whileTap={{ scale: 2, opacity: 0.5 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ y: -3, boxShadow: '0 4px 12px rgba(255,255,255,0.1)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsFormOpen(false)}
                    className="relative flex-1 py-2 bg-[#2d2d2f] text-white font-medium rounded-lg transition-opacity duration-300 overflow-hidden"
                  >
                    <span className="relative z-10">Cancel</span>
                    <motion.div
                      className="absolute inset-0 bg-[#2d2d2f]/50"
                      initial={{ scale: 0, opacity: 0 }}
                      whileTap={{ scale: 2, opacity: 0.5 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-[#bcbcc0] text-sm font-medium mb-8"
          >
            Please{' '}
            <motion.button
              whileHover={{ y: -2 }}
              onClick={() => signIn('google')}
              className="text-[#f6ff7a] hover:text-[#f6ff7a]/80 transition-opacity duration-300"
            >
              sign in
            </motion.button>{' '}
            to share your review.
          </motion.p>
        )}

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-semibold mb-8 text-center text-[#f6ff7a]">
            Client Testimonials
          </h2>
          {renderAverageRating()}
          {loading && reviews.length === 0 ? (
            <p className="text-center text-[#bcbcc0] animate-pulse text-sm font-medium">
              Loading testimonials...
            </p>
          ) : reviews.length === 0 ? (
            <p className="text-center text-[#bcbcc0] text-sm font-medium">
              No testimonials yet. Be the first!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <AnimatePresence>
                {reviews.map((review, index) => {
                  const isUserReview = session?.user?.id === review.userId;
                  return (
                    <motion.div
                      key={review._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className={`relative p-6 rounded-lg flex flex-col justify-between min-h-[200px] ${
                        isUserReview
                          ? 'bg-[#2d2d2f]/30 border border-[#f6ff7a]/20'
                          : 'bg-[#242425]/30'
                      } backdrop-blur-md`}
                    >
                      {isUserReview && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handleDelete}
                          className="absolute top-4 right-4 text-[#f87171] hover:text-[#f87171]/80 transition-opacity duration-200"
                          title="Delete your review"
                          aria-label="Delete your review"
                        >
                          <FaTrash size={14} />
                        </motion.button>
                      )}
                      {renderStars(review.stars)}
                      <p className="text-[#bcbcc0] text-sm italic line-clamp-5 mb-4 leading-relaxed">
                        “{review.text}”
                      </p>
                      <div className="flex items-center gap-3">
                        <Image
                          src={review.image || '/h1c44.png'}
                          alt={`${review.name}'s profile`}
                          width={40}
                          height={40}
                          className="rounded-full border border-[#bcbcc0]/50"
                        />
                        <div>
                          <h3 className="text-sm font-semibold text-white">{review.name}</h3>
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
              whileHover={{ y: -3, boxShadow: '0 4px 12px rgba(246,255,122,0.2)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPage((prev) => prev + 1)}
              className="mt-10 mx-auto block px-6 py-2 bg-[#f6ff7a] text-black font-medium rounded-lg transition-opacity duration-300"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-black" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Loading...
                </span>
              ) : (
                'Load More'
              )}
            </motion.button>
          )}
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Link href="/">
            <motion.button
              whileHover={{ y: -3, boxShadow: '0 4px 12px rgba(246,255,122,0.2)' }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 border border-[#f6ff7a] text-[#f6ff7a] font-medium rounded-lg transition-opacity duration-300"
            >
              Back to Home
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      <style jsx>{`
        :root {
          --primary: #f6ff7a;
          --secondary: #bcbcc0;
          --background: #191a1b;
          --card-bg: #242425;
          --user-card-bg: #2d2d2f;
          --error: #f87171;
        }

        .font-poppins {
          font-family: 'Poppins', sans-serif;
        }

        input:focus,
        textarea:focus {
          box-shadow: none;
        }
      `}</style>
    </div>
  );
};

export default Reviews;