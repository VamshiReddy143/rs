import React from "react";

interface HeroProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategories: string[]; // Array of strings, non-nullable
  setSelectedCategories: (categories: string[]) => void;
}

const Hero: React.FC<HeroProps> = ({ searchTerm, setSearchTerm, selectedCategories, setSelectedCategories }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.trim());
  };

  const handleCategoryClick = (category: string) => {
    console.log("handleCategoryClick - Category:", category);
    console.log("handleCategoryClick - SelectedCategories:", selectedCategories);

    if (!category || typeof category !== "string") {
      console.warn("Invalid category:", category);
      return;
    }

    const normalizedCategory = category.replace(/\s+/g, "").toLowerCase();
    
    // Ensure selectedCategories is an array
    const validCategories = Array.isArray(selectedCategories)
      ? selectedCategories.filter(cat => cat && typeof cat === "string")
      : [];
    
    if (validCategories.some(cat => cat.replace(/\s+/g, "").toLowerCase() === normalizedCategory)) {
      setSelectedCategories(validCategories.filter(cat => 
        cat.replace(/\s+/g, "").toLowerCase() !== normalizedCategory
      ));
    } else {
      setSelectedCategories([...validCategories, category]);
    }
  };

  const categories = [
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
  ];

  return (
    <div className="bg-[#191a1b] text-white pt-10 lg:pt-0 md:pt-5 bg-no-repeat bg-none md:bg-[position:calc(100%+300px)_top] lg:bg-[position:calc(100%+50px)_top] md:bg-[length:1100px_auto] lg:bg-[length:1000px_auto] md:bg-[url('https://cdn.prod.website-files.com/63f902d79a33f71d496cde07/67210c73068849a398c9bf41_blog-hero-bg.webp')]">
      <div className="lg:max-w-[90em] mx-auto lg:px-[6em] px-3">
        <div className="flex justify-between items-center">
          <div className="lg:pt-[4%] pt-[5em]">
            <h1
              style={{ fontFamily: "Poppins, sans-serif" }}
              className="text-white lg:text-[4em] md:text-[3.5em] text-[40px] leading-[48px] lg:w-[50%] md:w-[80%] font-bold lg:leading-[74px]"
            >
              Data-Centric News & Insights From Our Team
            </h1>
            <p className="text-[16px] lg:w-[41%] md:w-[80%] mt-5 text-[#98989b] leading-[32px]">
              Let Rootstrap be your source for expert insights, industry trends, and product innovations. We publish blogs
              weekly to keep you informed on the latest in tech. Sign up for our newsletter and stay ahead in a rapidly
              evolving industry.
            </p>
          </div>
        </div>

        <div className="flex lg:flex-row flex-col-reverse lg:gap-[5em] gap-[2em] mt-[7em]">
          <ul className="flex flex-wrap gap-3 lg:w-[50%] w-[80%]">
            {categories.map((category) => {
              console.log("Rendering category:", category);
              console.log("Current selectedCategories:", selectedCategories);
              
              if (!category || typeof category !== "string") {
                console.warn("Skipping invalid category:", category);
                return null;
              }

              // Ensure selectedCategories is an array
              const validCategories = Array.isArray(selectedCategories)
                ? selectedCategories.filter(cat => cat && typeof cat === "string")
                : [];

              return (
                <li
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`border-1 border-[#FBFFC7] text-[#FBFFC7] text-[15px] rounded-full px-4 py-2 w-fit cursor-pointer ${
                    validCategories
                      .map(cat => cat.replace(/\s+/g, "").toLowerCase())
                      .includes(category.replace(/\s+/g, "").toLowerCase())
                      ? "border-yellow-300 text-yellow-300 "
                      : ""
                  }`}
                >
                  {category}
                </li>
              );
            })}
          </ul>

          <div className="w-full lg:w-[35%] relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="bg-[#3d3d3f] p-4 w-full max-w-[25em] rounded-t-lg border-b-2 border-transparent focus:outline-none focus:border-[#f6ff7a] text-white placeholder-gray-400 text-base sm:text-lg transition-all duration-300 pr-12"
              placeholder="I am looking for..."
            />
            <svg
              className="absolute right-3 lg:top-1/5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-300 z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;