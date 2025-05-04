"use client";

import Cards from "@/components/Blog/Cards";
import Hero from "@/components/Blog/Hero";
import React, { useState } from "react";
import Scroller from "@/components/Blog/BlogScroller";
import Footer from "@/components/Home/Footer";

const Page: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleSetSelectedCategories = (categories: string[]) => {
    const validCategories = categories.filter(cat => cat && typeof cat === "string");
    console.log("Setting selectedCategories:", validCategories);
    setSelectedCategories(validCategories);
  };

  console.log("Page selectedCategories:", selectedCategories); // Log state

  return (
    <div className="bg-[#191a1b] pb-10">
      <div className="px-3 md:mt-10 mt-0">
        <Hero
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategories={selectedCategories}
          setSelectedCategories={handleSetSelectedCategories}
        />
      </div>
      <div className="lg:max-w-[90em] mx-auto lg:px-[6em] px-3">
        <Cards
          searchTerm={searchTerm}
          selectedCategories={selectedCategories}
        />
      </div>
      <div className="mx-auto px-3">
        <Scroller />
      </div>
      <div className="lg:max-w-[90em] mx-auto lg:px-[6em] px-3">
        <Footer />
      </div>
    </div>
  );
};

export default Page;