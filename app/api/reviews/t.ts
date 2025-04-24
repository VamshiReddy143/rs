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
  createdAt: Date;
}

export default function Clients() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data: Review[] = await response.json();
        console.log('Fetched reviews data:', data);
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('Failed to load reviews. Please try again later.');
      }
    };
    fetchReviews();
  }, []);

  return (
    <div id="clients" className="min-h-screen mt-20 lg:max-w-[90em] lg:px-[6em] lg:mx-auto px-3">
      <h1
        style={{ fontFamily: 'Poppins, sans-serif' }}
        className="lg:text-[36px] text-[36px] text-center lg:text-left font-semibold leading-tight mt-10"
      >
        Clients Love Working With Rootstrap
      </h1>

      {error ? (
        <p className="text-red-400 text-center mt-10">{error}</p>
      ) : reviews.length === 0 ? (
        <p className="text-[#bcbcc0] text-center mt-10">No reviews available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-3">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-[#242425] p-7 rounded-xl flex flex-col h-[300px]" // Fixed height for consistency
            >
              <p className="text-[#bcbcc0] flex-grow overflow-hidden text-ellipsis">
                {`"${review.text}"`}
              </p>
              <div className="flex items-center gap-4 mt-5">
                {review.image ? (
                  <Image
                    src={review.image}
                    alt={review.name}
                    width={52}
                    height={52}
                    className="h-13 w-13 rounded-lg"
                    onError={(e) => {
                      console.error(`Image load failed for ${review.image}:`, e);
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="h-13 w-13 rounded-lg bg-gray-500 flex items-center justify-center text-white">
                    {review.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h2 className="font-bold text-[16px]">{review.name}</h2>
                  <p className="text-[#bcbcc0] text-[16px]">{review.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col items-center justify-center gap-4 text-center mt-12">
        <Link href="/reviews">
          <button className="border-1 border-white text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-white/10 hover:border-white/10 hover:text-white/70 transition-colors">
            Write a Review
          </button>
        </Link>
      </div>
    </div>
  );
}