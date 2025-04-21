
"use client";

import Image from "next/image";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    {
      image: "/blogimg11.png",
      category: "Development",
      title: "Android LiveData vs Flow",
    },
    {
      image: "/blogimg12.png",
      category: "DevOps",
      title: "Transforming Taxation with AWS: An R&G...",
    },
    {
      image: "/blogimg13.png",
      category: "Development",
      title: "Flutter vs React Native: A Comprehensiv...",
    },
    {
      image: "/blogimg14.png",
      category: "Agile",
      title: "QA & Dev Teams in Scrum Cycles",
    },
    {
      image: "/blogimg15.png",
      category: "AI / Machine Learning",
      title: "How to Create an AI Agent Using LangC...",
    },
    {
      image: "/blogimg15.png",
      category: "Agile",
      title: "Agile isn't just Scrum",
    },
    {
      image: "/blogimg16.png",
      category: "AI / Machine Learning",
      title: "iOS app with AI: Automating Rootperks...",
    },
    {
      image: "/blogimg17.png",
      category: "Development",
      title: "How to start learning about Cybersecurity",
    },
    {
      image: "/blogimg18.png",
      category: "Development",
      title: "How to Set Up Material-UI (MUI)",
    },
    {
      image: "/blogimg20.png",
      category: "AI / Machine Learning",
      title: "Mastering Prompt Engineering:...",
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
        pageNumbers.push('...');
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
        pageNumbers.push('...');
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

  return (
    <div className="mt-[5em]">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentCards.map((card, index) => (
          <div
            key={index}
            className="flex flex-col min-h-[500px] bg-[#242425] rounded-xl overflow-hidden relative"
          >
            <Image
              src={card.image}
              width={900}
              height={900}
              alt="team"
              className="h-[55%] w-full object-cover"
            />
            {/* Content Container */}
            <div className="flex flex-col gap-4">
              <div className="p-7 flex flex-col gap-4 flex-grow">
                <p className="text-[#bcbcc0] text-[16px]">{card.category}</p>
                <h2
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                  className="text-[24px] font-semibold leading-tight"
                >
                  {card.title}
                </h2>
              </div>
              {/* Button at absolute bottom-right */}
              <div className="pb-10">
                <button className="text-[16px] hover:border-[#bcbcc0] hover:text-[#bcbcc0] font-bold border border-gray-400 px-4 py-2 rounded-lg absolute bottom-4 right-5 transition-colors">
                  Read ➔
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Advanced Pagination */}
      <nav aria-label="Pagination" className="flex justify-center mt-10">
        <div className="inline-flex rounded-lg border-1 border-[#bcbcc0] bg-transparent text-white overflow-hidden">
          {/* Previous Button (hidden when on page 1) */}
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className={`
                flex items-center justify-center h-12 px-4 transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-300
                text-gray-300 cursor-pointer
              `}
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
              onClick={() => page !== '...' && handlePageChange(page as number)}
              className={`
                flex items-center justify-center h-12 px-4 transition-colors duration-200
                focus:outline-none 
                border-r border-gray-700
                ${page === currentPage ? 'text-[#FFDF00] font-medium bg-gray-800' : 'text-gray-300 '}
                ${typeof page === 'string' ? 'cursor-default' : 'cursor-pointer'}
              `}
              disabled={typeof page === 'string'}
              aria-current={page === currentPage ? 'page' : undefined}
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
              ${currentPage >= totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <span className="text-lg flex items-center">
              <span className="mr-2">Next</span>
              <ChevronRight size={16} />
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Cards;
