
import React from "react";

interface HeroProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const Hero: React.FC<HeroProps> = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.trim());
  };

  const handleCategoryClick = (category: string) => {
    const normalizedCategory = category.replace(/\s+/g, "").toLowerCase(); // Remove all spaces and convert to lowercase
    const currentCategory = selectedCategory.replace(/\s+/g, "").toLowerCase();
    setSelectedCategory(normalizedCategory === currentCategory ? "" : category);
  };

  return (
    <div
      className="bg-black text-white lg:min-h-screen pt-10 lg:pt-0 md:pt-5 bg-no-repeat bg-none md:bg-[position:calc(100%+300px)_top] lg:bg-[position:calc(100%+200px)_top] lg:bg-[position:calc(100%+300px)_top] md:bg-[length:1100px_auto] lg:bg-[length:1300px_auto] md:bg-[url('https://cdn.prod.website-files.com/63f902d79a33f71d496cde07/67210c73068849a398c9bf41_blog-hero-bg.webp')]"
    >
      <div className="flex justify-between items-center">
        <div className="pt-[10%]">
          <h1 className="text-white lg:text-[4em] md:text-[3.5em] text-[2.5em] lg:w-[40%] md:w-[80%] font-bold leading-tight">
            Data-Centric News & Insights From Our Team
          </h1>
          <p className="text-[1.2em] lg:w-[40%] md:w-[80%] mt-5 text-gray-400">
            Let Rootstrap be your source for expert insights, industry trends, and product innovations. We publish blogs weekly to keep you informed on the latest in tech. Sign up for our newsletter and stay ahead in a rapidly evolving industry.
          </p>
        </div>
      </div>

      <div className="flex lg:flex-row flex-col-reverse lg:gap-[5em] gap-[2em] mt-[7em]">
        <ul className="flex flex-wrap gap-3 lg:w-[40%]">
          {[
            "AI/MachineLearning",
            "Agile",
            "Blockchain",
            "DataServices",
            "DevOps",
            "Development",
            "Marketing",
            "ProductDesign",
            "QA/Testing",
            "Security",
            "SoftSkills",
            "SoftwareArchitecture",
          ].map((category) => (
            <li
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`border-1 border-[#f6ff7a] text-[#f6ff7a] rounded-full px-3 py-1 w-fit cursor-pointer ${
                selectedCategory.replace(/\s+/g, "").toLowerCase() === category.replace(/\s+/g, "").toLowerCase()
                  ? "bg-[#f6ff7a] text-black"
                  : ""
              }`}
            >
              {category}
            </li>
          ))}
        </ul>

        <div className="w-full lg:w-[25%] relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="bg-gray-800 p-4 w-full rounded-t-lg border-b-2 border-transparent focus:outline-none focus:border-[#f6ff7a] text-white placeholder-gray-400 text-base sm:text-lg transition-all duration-300 pr-10"
            placeholder="I am looking for..."
          />
          <svg
            className="absolute right-3 lg:top-1/4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Hero;