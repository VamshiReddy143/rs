'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

export default function Reviews() {
  const { data: session } = useSession();
  const [reviewText, setReviewText] = useState('');
  const [position, setPosition] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText || !position) {
      setError('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('text', reviewText);
    formData.append('name', session?.user?.name || 'Anonymous'); // Use name from session
    formData.append('position', position);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to submit review');

      setSuccess('Review submitted successfully!');
      setReviewText('');
      setPosition('');
      setError('');
    } catch (err) {
      setError('Failed to submit review. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen p-8 lg:max-w-[90em] lg:px-[6em] lg:mx-auto px-3">
      <div className="max-w-4xl mx-auto">
        <h1
          style={{ fontFamily: 'Poppins, sans-serif' }}
          className="text-4xl font-semibold mb-8 text-center"
        >
          Write a Review
        </h1>

        {/* Profile Section */}
        <div className="mb-8 p-6 bg-[#242425] rounded-xl flex items-center justify-between">
          {session ? (
            <div className="flex items-center gap-4">
              {session.user?.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name || 'User'}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              )}
              <div>
                <h2 className="text-xl font-bold">{session.user?.name}</h2>
                <p className="text-[#bcbcc0]">{session.user?.email}</p>
              </div>
            </div>
          ) : (
            <p className="text-[#bcbcc0]">Please sign in to write a review.</p>
          )}
          <div>
            {session ? (
              <button
                onClick={() => signOut()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => signIn('google')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
              >
                Sign In with Google
              </button>
            )}
          </div>
        </div>

        {/* Review Form */}
        {session ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="position" className="block text-lg font-medium mb-2">
                Position/Company
              </label>
              <input
                type="text"
                id="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#3d3d3f] text-white border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your position and company"
                required
              />
            </div>
            <div>
              <label htmlFor="review" className="block text-lg font-medium mb-2">
                Review
              </label>
              <textarea
                id="review"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#3d3d3f] text-white border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={5}
                placeholder="Write your review here..."
                required
              />
            </div>
            {error && <p className="text-red-400">{error}</p>}
            {success && <p className="text-green-400">{success}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
            >
              Submit Review
            </button>
          </form>
        ) : (
          <p className="text-center text-[#bcbcc0]">
            Please{' '}
            <button
              onClick={() => signIn('google')}
              className="text-blue-400 underline"
            >
              sign in
            </button>{' '}
            to write a review.
          </p>
        )}

        <div className="mt-8 text-center">
          <Link href="/clients">
            <button className="border-1 border-white text-white px-4 py-2 rounded-lg hover:bg-white/10 hover:border-white/10 hover:text-white/70 transition-colors">
              Back to Clients Page
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}