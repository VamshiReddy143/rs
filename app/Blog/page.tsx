"use client"


import Cards from "@/components/Blog/Cards";
import Hero from "@/components/Blog/Hero";
import React, { useState } from "react";
import Scroller from "@/components/Blog/BlogScroller";
import Footer from "@/components/Home/Footer";


const Page: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  return (
    <div className="bg-[#191a1b] pb-10">
      <div className="lg:ml-[11%] px-3 md:mt-10 mt-0 py-1">
        <Hero
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      <div className="lg:max-w-[90em] mx-auto lg:px-[6em] px-3">
        <Cards
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
        />
      </div>
      <div className="mx-auto hidden md:block px-3">
        <Scroller />
      </div>
      <div className="lg:max-w-[90em] mx-auto lg:px-[6em] px-3">
        <Footer />
      </div>
    </div>
  );
};

export default Page;