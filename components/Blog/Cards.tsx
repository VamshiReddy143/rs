"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Card {
  _id: string;
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
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const cardsPerPage = 9;

  // Fetch card data from API
  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/blogs/allblogs");
        if (!response.ok) {
          throw new Error("Failed to fetch blog posts");
        }
        const data = await response.json();
        setCards(data);
        setError(null);
      } catch (err) {
        setError("An error occurred while fetching blog posts.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  // Filter cards based on search term and category
  const filteredCards = cards.filter((card) => {
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

  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];

    // Always show first page
    pageNumbers.push(1);

    // Show up to 5 pages at the start if totalPages <= 5
    if (totalPages <= 5) {
      for (let i = 2; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show ellipsis and pages around current page
      if (currentPage > 3) {
        pageNumbers.push("...");
      }

      // Pages around current page (show up to 5 pages including current)
      const startPage = Math.max(2, currentPage - 2);
      const endPage = Math.min(totalPages - 1, currentPage + 2);

      for (let i = startPage; i <= endPage; i++) {
        if (i <= totalPages - 1 && i >= 2) {
          pageNumbers.push(i);
        }
      }

      // Add ellipsis if there's a gap before the last page
      if (currentPage < totalPages - 2) {
        pageNumbers.push("...");
      }

      // Always show last page
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Render loading state with skeleton
  if (loading) {
    return (
      <div className="mt-[5em] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(cardsPerPage)].map((_, index) => (
          <div
            key={index}
            className="flex flex-col min-h-[500px] bg-[#242425] rounded-xl overflow-hidden animate-pulse"
          >
            <div className="h-[55%] w-full bg-gray-700" />
            <div className="p-7 flex flex-col gap-4">
              <div className="h-4 w-1/4 bg-gray-700 rounded" />
              <div className="h-6 w-3/4 bg-gray-700 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="mt-[5em] flex justify-center items-center min-h-[500px]">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="mt-[5em]">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentCards.length > 0 ? (
          currentCards.map((card, index) => (
            <div
              key={card._id}
              className="flex flex-col min-h-[500px] bg-[#242425] rounded-xl overflow-hidden relative"
            >
              <Image
                src={card.image}
                width={900}
                height={900}
                alt={card.title}
                className="h-[55%] w-full object-cover"
              />
              {/* Content Container */}
              <div className="flex flex-col gap-4">
                <div className="p-7 flex flex-col gap-4 flex-grow">
                  <p className="text-[#bcbcc0] text-[16px]">{card.category}</p>
                  <h2
                    style={{ fontFamily: "Poppins, sans-serif" }}
                    className="text-[24px] font-semibold leading-tight line-clamp-3"
                  >
                    {card.title}
                  </h2>
                </div>
                {/* Button at absolute bottom-right */}
                <div className="pb-10">
                  <Link href={`/blogs/${card._id}`} passHref>
                    <button className="text-[16px] hover:border-[#bcbcc0] hover:text-[#bcbcc0] font-bold border border-gray-400 px-4 py-2 rounded-lg absolute bottom-4 right-5 transition-colors">
                      Read ➔
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            style={{ fontFamily: "Poppins, sans-serif" }}
            className="col-span-full text-center text-gray-600 lg:text-[5em] text-[2em] font-bold"
          >
            No blog posts found.
          </div>
        )}
      </div>

      {/* Advanced Pagination */}
      {totalPages > 1 && (
        <nav aria-label="Pagination" className="flex justify-center mt-10">
          <div className="inline-flex rounded-lg border-1 border-[#bcbcc0] bg-transparent text-white overflow-hidden">
            {/* Previous Button */}
            {currentPage > 1 && (
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="flex items-center justify-center h-12 px-4 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-300 text-gray-300 cursor-pointer"
              >
                <span className="text-lg flex items-center">
                  <ChevronLeft size={16} />
                  <span className="ml-2">Previous</span>
                </span>
              </button>
            )}

            {/* Page Numbers */}
            {getPageNumbers().map((page, index) => (
              <button
                key={`page-${index}`}
                onClick={() => page !== "..." && handlePageChange(page as number)}
                className={`
                  flex items-center justify-center h-12 px-4 transition-colors duration-200
                  focus:outline-none border-r border-gray-700
                  ${page === currentPage ? "text-[#FFDF00] font-medium bg-gray-800" : "text-gray-300"}
                  ${typeof page === "string" ? "cursor-default" : "cursor-pointer"}
                `}
                disabled={typeof page === "string"}
                aria-current={page === currentPage ? "page" : undefined}
              >
                <span className="text-lg">{page}</span>
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className={`
                flex items-center justify-center h-12 px-4 transition-colors duration-200
                rounded-r-lg text-gray-300
                ${currentPage >= totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              `}
            >
              <span className="text-lg flex items-center">
                <span className="mr-2">Next</span>
                <ChevronRight size={16} />
              </span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Cards;