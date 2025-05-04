'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

interface Review {
  _id: string;
  text: string;
  name: string;
  position: string;
  userId: string;
  image?: string;
  createdAt: string;
}

const Clients = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        if (!response.ok) {
          throw new Error(`Failed to fetch reviews: ${response.status}`);
        }
        const data = await response.json();

        // Extract reviews array from response
        const reviewsArray = Array.isArray(data.reviews) ? data.reviews : [];
        if (!Array.isArray(reviewsArray)) {
          throw new Error('API response.reviews is not an array');
        }

        setReviews(reviewsArray);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('Failed to load reviews. Please try again later.');
        setReviews([]); // Ensure reviews is an empty array on error
      }
    };
    fetchReviews();
  }, []);

  return (
    <div id="clients" className="pt-[20] pb-[6em]">
      <h1
        style={{ fontFamily: 'Poppins, sans-serif' }}
        className="lg:text-[36px] text-[36px] text-center lg:text-left font-semibold leading-tight mt-10"
      >
        Clients Love Working With Rootstrap
      </h1>

      {error ? (
        <p className="text-red-400 text-center mt-10">{error}</p>
      ) : reviews.length === 0 ? (
        <div
          style={{ fontFamily: "Poppins, sans-serif" }}
          className="col-span-full text-center text-gray-600 py-[1em] lg:text-[5em] text-[2em] font-bold"
        >
          No Reviews found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-3">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-[#242425] p-7 rounded-xl flex flex-col justify-between min-h-[220px]"
            >
              {/* Review Text */}
              <p className="text-[#bcbcc0] line-clamp-4">“{review.text}”</p>

              {/* Image and Name/Position */}
              <div className="flex items-center gap-4 mt-5">
                <Image
                  src={review.image || '/h1c44.png'}
                  alt={`${review.name}'s profile`}
                  width={900}
                  height={900}
                  className="h-13 w-13 rounded-lg object-cover"
                />
                <div>
                  <h2 className="font-bold text-[16px]">{review.name}</h2>
                  <p className="text-[#bcbcc0] text-[16px]">{review.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Link href="/reviews">
        <div className="flex flex-col items-center justify-center gap-4 text-center mt-12">
          <button className="border-1 border-white text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-white/10 hover:border-white/10 hover:text-white/70 transition-colors">
            Read All Reviews
          </button>
        </div>
      </Link>
    </div>
  );
};

export default Clients;