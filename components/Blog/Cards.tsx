"use client";

import Image from "next/image";
import React, { useState } from "react";

interface Card {
  image: string;
  category: string;
  title: string;
}

interface CardsProps {
  searchTerm: string;
  selectedCategory: string;
}

const Cards: React.FC<CardsProps> = ({ searchTerm, selectedCategory }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const cardsPerPage = 9;

  // Sample data for cards with normalized categories
  const cardData: Card[] = [
    {
      image: "/aiii.png",
      category: "AI/MachineLearning",
      title: "How to build Multi-agent app for automating dependency security...",
    },
    {
      image: "/blogimg2.png",
      category: "Agile",
      title: "0 to 1 + 1 to n",
    },
    {
      image: "/blogimg3.png",
      category: "AI/MachineLearning",
      title: "Agents Are The New Apps",
    },
    {
      image: "/blogimg4.png",
      category: "Development",
      title: "Data-Driven: How Rootstrap Builds Software",
    },
    {
      image: "/blogimg5.png",
      category: "AI/MachineLearning",
      title: "What's In Our Inbox: AI Agent For Training Salespeople",
    },
    {
      image: "/blogimg6.png",
      category: "AI/MachineLearning",
      title: "AI Case Study: Driving User Engagement & Revenue for Hatch Coding",
    },
    {
      image: "/blogimg7.png",
      category: "Development",
      title: "The Expo revolution has begun: A Guide to Building Cross-Platform Mobile",
    },
    {
      image: "/blogimg9.png",
      category: "AI/MachineLearning",
      title: "Is AI changing the way we talk?",
    },
    {
      image: "/blogimg10.png",
      category: "Development",
      title: "SwiftUI List: A Complete Tutorial",
    },
  ];

  // Filter cards based on search term and category
  const filteredCards = cardData.filter((card) => {
    const normalizedSearch = searchTerm.replace(/\s+/g, "").toLowerCase();
    const normalizedTitle = card.title.replace(/\s+/g, "").toLowerCase();
    const matchesSearch = normalizedSearch === "" || normalizedTitle.includes(normalizedSearch);
    const normalizedCategory = card.category.replace(/\s+/g, "").toLowerCase();
    const normalizedSelected = selectedCategory.replace(/\s+/g, "").toLowerCase();
    const matchesCategory = normalizedSelected === "" || normalizedCategory === normalizedSelected;
    return matchesSearch && matchesCategory;
  });

  // Calculate the index of the first and last card for the current page
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

  // Calculate total pages based on filtered results
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle previous/next page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="mt-[5em]">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentCards.map((card, index) => (
          <div
            key={index}
            className="flex flex-col min-h-[400px] bg-gray-800 rounded-xl overflow-hidden relative"
          >
            <Image
              src={card.image}
              width={900}
              height={900}
              alt="team"
              className="h-[50%] w-full object-cover"
            />
            {/* Content Container */}
            <div className="p-7 flex flex-col gap-3 flex-grow">
              <p className="text-gray-400 text-[1em]">{card.category}</p>
              <h2 className="text-[1.6em] font-bold leading-tight">{card.title}</h2>
            </div>
            {/* Button at absolute bottom-right */}
            <button className="text-[1em] font-bold border border-gray-400 px-4 py-2 rounded-lg absolute bottom-4 right-5 hover:bg-gray-700 transition-colors">
              Read ➔
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-10 space-x-2">
        {/* Previous Button */}
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg font-semibold text-gray-300 border border-gray-600 bg-gray-800 hover:bg-gray-700 transition-colors ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Previous
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              currentPage === page
                ? "bg-gray-600 text-white border border-gray-600"
                : "bg-gray-800 text-gray-300 border border-gray-600 hover:bg-gray-700"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg font-semibold text-gray-300 border border-gray-600 bg-gray-800 hover:bg-gray-700 transition-colors ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Cards;