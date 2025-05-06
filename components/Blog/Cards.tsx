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
  primaryImage?: string;
}

interface CardsProps {
  searchTerm: string;
  selectedCategories: string[]; // Updated to array
}

const Cards: React.FC<CardsProps> = ({ searchTerm, selectedCategories }) => {
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
        // Validate and filter cards with valid categories
        const validCards = data.filter(
          (card: Card) => card && card._id && card.title && card.category && typeof card.category === "string"
        );
        setCards(validCards);
        
     
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

  // Filter cards based on search term and categories
  const filteredCards = cards.filter((card) => {
    // Validate card properties
    if (!card.title || !card.category || typeof card.category !== "string") {
      return false; // Skip cards with invalid title or category
    }

    const normalizedSearch = searchTerm.replace(/\s+/g, "").toLowerCase();
    const normalizedTitle = card.title.replace(/\s+/g, "").toLowerCase();
    const matchesSearch = normalizedSearch === "" || normalizedTitle.includes(normalizedSearch);

    // If no categories selected, include all valid cards
    if (selectedCategories?.length === 0) {
      return matchesSearch;
    }

    // Normalize card category
    const normalizedCategory = card.category.replace(/\s+/g, "").toLowerCase();

    // Check if card matches any selected category
    const matchesCategory = selectedCategories?.filter(cat => cat && typeof cat === "string") // Ensure valid categories
      .some(cat => cat.replace(/\s+/g, "").toLowerCase() === normalizedCategory);

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
      <div className="mt-[5em] min-h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {currentCards.length > 0 ? (
          currentCards.map((card, index) => (
            <div
              key={card._id}
              className="flex flex-col min-h-[500px] bg-[#242425] rounded-xl overflow-hidden relative"
            >
              <Image
                src={card.primaryImage || "/blogimg.jpg" || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAR0AAACxCAMAAADOHZloAAAAVFBMVEXf3992dnbi4uJycnLl5eXDw8Nvb293d3e2traDg4OTk5PT09Pd3d2srKyIiIjKysqdnZ29vb1qamrX19ejo6N9fX2pqamNjY2enp7IyMjBwcGxsbGshMmFAAADeUlEQVR4nO3b2ZKiShSFYXIwUwYBExHF93/Pk0wKVRXVVERH2XH2/110CPYFtcLcOZIkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIA30D/w7mf9ddXhB6TFo2u3X2vf/bi/zN6UV/t4lQpKJx80tVJtukerJKVjzdhalDcPu8fdiUrHKx8blffmtKfY6oPAdPycTrE1/Ifttbx03D1JajWkkxu/purtLfPQAtOptJ3TcZvuydR2c8scZaajl3S8fw5rTPztxHTCa6ATxKejmnzSXM2QTpKvFBLrziodpZaeyz6mdLZIZ6LndNaDHU068xdzOk22chZXd9rv08nDq89yJ9KZv3imY55I51PLOj2eTnfSmb9YqvJ2VVB6OnYOwn6Rjrwevf0wGuzPk75WQzrFeaWSno5/1mDlP1blcBVfd76bhQrvs9Jy46KTZnUrlTcLXafzaVcroc9apfNHpPMdyelUYbOtFzK9Xf2S3md9WFe2m1vS+6zV4GaYdWaa8c4rnSLfapLtymkjs+7YG1X5KzaNuVgd/z3u2im+GFXKSUefjDddGydVXbZDaXZuKf9feDXuo+88oeJN++4H/k26KZ3Zz5XNu5/4d+nquF8lqVmNfnKiUlw4AAAAAIC/bT3BXM0z9XiQ8qsLUS6jYxP/+ua2vLqnm2tXZo9ivNTJIyu7ayMxH+PTNPXB9cMOzbwwqnsXyjoNfljR0Xcf2iwNRtxbj5GphwX1vHWNXtLRVWjzeLMyqokXTt2HCx/ydz/r7zPjoXZ9Dv0zHdu5fDyCcQgXbVs3rgnqXGA4Szr9Kp0iZNPGjE6VvYebnF2aT2I6WltdmmJJJzasx1RibO2KU5BYbxYqjV1W7dP8WZXj7+g8V+dTyG9uaFFDny7xJ6Ta4dybyTbp9Ot0mvgh823bVu990neY+qyijIV4SecejnM6F9dcw1CUq0N/CfJ2bJaqXIWrXapyE+aXs2xp7HkqQtoeBaeTh8szHZua8ZXiONTJbOHa6WbmZKYzqGMlzsP01n4c53SxG7NFGweA+hHGXu2sRKbTDucr1HhO0KXjYYuDPQVzu9bODX2XvQV/uXahl9iyulE9DGrycvxc9treM+V8nU8Ti0OnTFkVqcDB8vzWp359ttPR7td6xnwhcbwDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPiX/Qdswj5aPi1YswAAAABJRU5ErkJggg=="}
                width={800}
                height={700}
                alt={card.title}
                className="h-[270px] w-full  object-center"
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
                    <button className="text-[16px] cursor-pointer hover:border-[#bcbcc0] hover:text-[#bcbcc0] font-bold border border-gray-400 px-4 py-2 rounded-lg absolute bottom-4 right-5 transition-colors">
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
            className="col-span-full flex items-center justify-center text-center text-gray-600 lg:text-[5em] text-[2em] font-bold"
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