"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

// Card variants for staggered animation
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
};

export default function SelectTemplate() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const templates = [
    {
      href: "/templates/template1/create",
      label: "Template 1 (Predefined)",
      bgColor: "bg-red-600",
      hoverBgColor: "hover:bg-red-500",
    },
    {
      href: "/templates/template3/create",
      label: "Template 2 (Predefined)",
      bgColor: "bg-gray-800",
      hoverBgColor: "hover:bg-gray-700",
    },
    {
      href: "/templates/custom/create",
      label: "Custom Template",
      bgColor: "bg-black",
      hoverBgColor: "hover:bg-gray-800",
    },
  ];

  return (
    <div
      style={{ fontFamily: "Poppins, sans-serif" }}
      className="min-h-screen bg-[#191a1b] flex flex-col items-center justify-center p-6"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-[3em] font-bold text-[#f6ff7a] mb-10"
      >
        Choose a Template
      </motion.h1>
      <div className="flex flex-col gap-6 w-full max-w-md">
        {templates.map((template, index) => (
          <motion.div
            key={template.href}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`relative rounded-lg shadow-lg transition-all duration-300 ${
              hoveredIndex !== null && hoveredIndex !== index
                ? "filter blur-[2px] opacity-70"
                : "filter-none opacity-100"
            }`}
          >
            <Link href={template.href}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`text-gray-200 py-4 px-8 rounded-lg text-[1.5em] text-center ${template.bgColor} ${template.hoverBgColor} bg-opacity-90`}
              >
                {template.label}
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}