"use client";

import Image from "next/image";
import React from "react";
import line1 from "../public/lineimg1.png";
import line2 from "../public/lineimg2.png";
import line3 from "../public/lineimg3.png";
import line4 from "../public/lineimg4.png";
import line5 from "../public/lineimg5.png";
import line6 from "../public/lineimg6.png";
import { motion } from "framer-motion";

// Test if images are loading correctly
console.log({ line1, line2, line3, line4, line5, line6 });

const Capabilities = () => {
  return (
    <div id="capabilities" className="min-h-screen mt-4 sm:mt-8 md:mt-12 lg:mt-20">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div
          className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-7 bg-gray-100 border border-red-500" // Debug: Red border to visualize grid
        >
          {/* Mobile (≤ 639px): 1 column */}
          {/* Small Tablet (640px–767px): 1 column */}
          {/* Medium (768px–1023px): 2 columns */}
          {/* Large (≥ 1024px): 3 columns */}
          <div className="hidden sm:block md:hidden"></div> {/* Force sm breakpoint test */}
          <div className="hidden md:block lg:hidden"></div> {/* Force md breakpoint test */}

          {/* Card 1: Artificial Intelligence */}
          <motion.div
            className="relative rounded-xl overflow-hidden group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-full h-[200px] sm:h-[250px] md:h-[300px] overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Image
                src={line1}
                alt="Artificial Intelligence"
                width={900}
                height={900}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </motion.div>

            <motion.div
              className="relative z-10 transition-all duration-300 group-hover:-translate-y-[80px] sm:group-hover:-translate-y-[100px] md:group-hover:-translate-y-[120px]"
            >
              <div className="p-3 sm:p-4 md:p-5 bg-gray-900 rounded-b-xl">
                <h1 className="text-lg sm:text-2xl md:text-[2em] font-bold">Artificial Intelligence</h1>
                <p className="text-gray-400 mt-2 sm:mt-3 md:mt-5">
                  Gen AI, Custom LLMs, Machine Learning & Computer Vision
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 mt-6 sm:mt-8 md:mt-12">
                  <p className="bg-gray-700 w-fit px-2 py-1 sm:px-2 sm:py-1 md:p-2 rounded-xl text-sm sm:text-base md:text-base">
                    OpenAI
                  </p>
                  <p className="bg-gray-700 w-fit px-2 py-1 sm:px-2 sm:py-1 md:p-2 rounded-xl text-sm sm:text-base md:text-base">
                    Claude
                  </p>
                  <p className="bg-gray-700 w-fit px-2 py-1 sm:px-2 sm:py-1 md:p-2 rounded-xl text-sm sm:text-base md:text-base">
                    Llama
                  </p>
                  <p className="bg-gray-700 w-fit px-2 py-1 sm:px-2 sm:py-1 md:p-2 rounded-xl text-sm sm:text-base md:text-base">
                    Langchain
                  </p>
                  <p className="bg-gray-700 w-fit px-2 py-1 sm:px-2 sm:py-1 md:p-2 rounded-xl text-sm sm:text-base md:text-base">
                    TensorFlow
                  </p>
                  <p className="bg-gray-700 w-fit px-2 py-1 sm:px-2 sm:py-1 md:p-2 rounded-xl text-sm sm:text-base md:text-base">
                    Python
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="absolute bg-black h-[8em] sm:h-[9em] md:h-[11em] w-full bottom-0 z-20" />
          </motion.div>

          {/* Card 2: Data */}
          <motion.div
            className="relative rounded-xl overflow-hidden group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.div
              className="w-full h-[200px] sm:h-[250px] md:h-[300px] overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Image
                src={line2}
                alt="Data"
                width={900}
                height={900}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </motion.div>

            <motion.div
              className="relative z-10 transition-all duration-300 group-hover:-translate-y-[100px] sm:group-hover:-translate-y-[130px] md:group-hover:-translate-y-[170px]"
            >
              <div className="p-3 sm:p-4 md:p-5 bg-gray-900 rounded-b-xl">
                <h1 className="text-xl sm:text-2xl md:text-[2em] font-bold">Data</h1>
                <p className="text-gray-400 mt-2 sm:mt-3 md:mt-5">
                  ETL & Storage, Visualization, Processing & Enrichment
                </p>
                <div className="gap-2 sm:gap-3 md:gap-4 mt-6 sm:mt-8 md:mt-12">
                  <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                    <p className="bg-gray-700 w-fit px-2 py-1 sm:px-2 sm:py-1 md:p-2 rounded-xl text-sm sm:text-base md:text-base">
                      AWS Redshift
                    </p>
                    <p className="bg-gray-700 w-fit px-2 py-1 sm:px-2 sm:py-1 md:p-2 rounded-xl text-sm sm:text-base md:text-base">
                      Snowflake
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mt-2 sm:mt-3 md:mt-4">
                    <p className="bg-gray-700 w-fit px-2 py-1 sm:px-2 sm:py-1 md:p-2 rounded-xl text-sm sm:text-base md:text-base">
                      Databricks
                    </p>
                    <p className="bg-gray-700 w-fit px-2 py-1 sm:px-2 sm:py-1 md:p-2 rounded-xl text-sm sm:text-base md:text-base">
                      Apache
                    </p>
                  </div>
                  <p className="bg-gray-700 w-fit px-2 py-1 sm:px-2 sm:py-1 md:p-2 rounded-xl text-sm sm:text-base md:text-base mt-2 sm:mt-3 md:mt-4">
                    Google BigQuery
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="absolute bg-black h-[8em] sm:h-[9em] md:h-[11em] w-full bottom-0 z-20" />
          </motion.div>

          {/* Card 3: Cloud */}
          <motion.div
            className="relative rounded-xl overflow-hidden group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              className="w-full h-[200px] sm:h-[250px] md:h-[300px] overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Image
                src={line3}
                alt="Cloud"
                width={900}
                height={900}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </motion.div>

            <motion.div
              className="relative z-10 transition-all duration-300 group-hover:-translate-y-[80px] sm:group-hover:-translate-y-[100px] md:group-hover:-translate-y-[120px]"
            >
              <div className="p-3 sm:p-4 md:p-5 bg-gray-900 rounded-b-xl">
                <h1 className="text-xl sm:text-2xl md:text-[2em] font-bold">Cloud</h1>
                <p className="text-gray-400 mt-2 sm:mt-3 md:mt-5">
                  Infrastructure, DevOps, APIs Automation & Scalability
                </p>
                <div className="gap-2 sm:gap-3 md:gap-4 mt-6 sm:mt-8 md:mt-12">
                  <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                    <p className="bg-gray-700 w-fit px-2 py-1 sm:px-2 sm:py-1 md:p-2 rounded-xl text-sm sm:text-base md:text-base">
                      AWS
                    </p>
                    <p className="bg-gray-700 w-fit px-2 py-1 sm:px-2 sm:py-1 md:p-2 rounded-xl text-sm sm:text-base md:text-base">
                      Heroku
                    </p>
                    <p className="bg-gray-700 w-fit px-2 py-1 sm:px-2 sm:py-1 md:p-2 rounded-xl text-sm sm:text-base md:text-base">
                      GCP
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mt-2 sm:mt-3 md:mt-4">
                    <p className="bg-gray-700 w-fit px-2 py-1 sm:px-2 sm:py-1 md:p-2 rounded-xl text-sm sm:text-base md:text-base">
                      Azure
                    </p>
                    <p className="bg-gray-700 w-fit px-2 py-1 sm:px-2 sm:py-1 md:p-2 rounded-xl text-sm sm:text-base md:text-base">
                      Vercel
                    </p>
                    <p className="bg-gray-700 w-fit px-2 py-1 sm:px-2 sm:py-1 md:p-2 rounded-xl text-sm sm:text-base md:text-base">
                      Contentful
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="absolute bg-black h-[8em] sm:h-[9em] md:h-[11em] w-full bottom-0 z-20" />
          </motion.div>

          {/* Card 4: Web Development */}
          <motion.div
            className="relative rounded-xl overflow-hidden group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              className="w-full h-[200px] sm:h-[250px] md:h-[300px] overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Image
                src={line4}
                alt="Web Development"
                width={900}
                height={900}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </motion.div>

            <motion.div
              className="relative z-10 transition-all duration-300 group-hover:-translate-y-[100px] sm:group-hover:-translate-y-[130px] md:group-hover:-translate-y-[170px]"
            >
              <div className="p-3 sm:p-4 md:p-5 bg-gray-900 rounded-b-xl">
                <h1 className="text-xl sm:text-2xl md:text-[2em] font-bold">Web Development</h1>
                <p className="text-gray-400 mt-2 sm:mt-3 md:mt-5">
                  Content, Media & Video, Ecommerce, SaaS, & Websites
                </p>
                <div className="gap-2 sm:gap-3 md:gap-4 mt-6 sm:mt-8 md:mt-12">
                  <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                    <p className="bg-gray-700 w-fit px-2 py-1 sm:px-2 sm:py-1 md:p-2 rounded-xl text-sm sm:text-base md:text-base">
                      React & NextJS
                    </p>
                    <p className="bg-gray-700 w-fit px-2 py-1 sm:px-2 sm:py-1 md:p-2 rounded-xl text-sm sm:text-base md:text-base">
                      Ruby on Rails
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mt-2 sm:mt-3 md:mt-4">
                    <p className="bg-gray-700 w-fit px-2 py-1 sm:px-2 sm:py-1 md:p-2 rounded-xl text-sm sm:text-base md:text-base">
                      NodeJS
                    </p>
                    <p className="bg-gray-700 w-fit px-2 py-1 sm:px-2 sm:py-1 md:p-2 rounded-xl text-sm sm:text-base md:text-base">
                      Shopify
                    </p>
                    <p className="bg-gray-700 w-fit px-2 py-1 sm:px-2 sm:py-1 md:p-2 rounded-xl text-sm sm:text-base md:text-base">
                      Webflow
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mt-2 sm:mt-3 md:mt-4">
                    <p className="bg-gray-700 w-fit px-2 py-1 sm:px-2 sm:py-1 md:p-2 rounded-xl text-sm sm:text-base md:text-base">
                      Wordpress
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="absolute bg-black h-[8em] sm:h-[9em] md:h-[11em] w-full bottom-0 z-20" />
          </motion.div>

          {/* Card 5: Mobile Development */}
          <motion.div
            className="relative rounded-xl overflow-hidden group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.div
              className="w-full h-[200px] sm:h-[250px] md:h-[300px] overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Image
                src={line5}
                alt="Mobile Development"
                width={900}
                height={900}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </motion.div>

            <motion.div
              className="relative z-10 transition-all duration-300 group-hover:-translate-y-[80px] sm:group-hover:-translate-y-[100px] md:group-hover:-translate-y-[120px]"
            >
              <div className="p-3 sm:p-4 md:p-5 bg-gray-900 rounded-b-xl">
                <h1 className="text-xl sm:text-2xl md:text-[2em] font-bold">Mobile Development</h1>
                <p className="text-gray-400 mt-2 sm:mt-3 md:mt-5">
                  Native iOS, Android & Hybrid Mobile Apps, Wearables & IoT
                </p>
                <div className="gap-2 sm:gap-3 md:gap-4 mt-6 sm:mt-8 md:mt-12">
                  <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                    <p className="bg-gray-700 w-fit px-2 py-1 sm:px-2 sm:py-1 md:p-2 rounded-xl text-sm sm:text-base md:text-base">
                      iOS
                    </p>
                    <p className="bg-gray-700 w-fit px-2 py-1 sm:px-2 sm:py-1 md:p-2 rounded-xl text-sm sm:text-base md:text-base">
                      Kotlin
                    </p>
                    <p className="bg-gray-700 w-fit px-2 py-1 sm:px-2 sm:py-1 md:p-2 rounded-xl text-sm sm:text-base md:text-base">
                      ReactNative
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mt-2 sm:mt-3 md:mt-4">
                    <p className="bg-gray-700 w-fit px-2 py-1 sm:px-2 sm:py-1 md:p-2 rounded-xl text-sm sm:text-base md:text-base">
                      Flutter
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="absolute bg-black h-[8em] sm:h-[9em] md:h-[11em] w-full bottom-0 z-20" />
          </motion.div>

          {/* Card 6: UX/UI Design */}
          <motion.div
            className="relative rounded-xl overflow-hidden group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.div
              className="w-full h-[200px] sm:h-[250px] md:h-[300px] overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Image
                src={line6}
                alt="UX/UI Design"
                width={900}
                height={900}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </motion.div>

            <motion.div
              className="relative z-10 transition-all duration-300 group-hover:-translate-y-[100px] sm:group-hover:-translate-y-[130px] md:group-hover:-translate-y-[170px]"
            >
              <div className="p-3 sm:p-4 md:p-5 bg-gray-900 rounded-b-xl">
                <h1 className="text-xl sm:text-2xl md:text-[2em] font-bold">UX/UI Design</h1>
                <p className="text-gray-400 mt-2 sm:mt-3 md:mt-5">
                  User Research, Wireframes, Prototypes & User Validation
                </p>
                <div className="gap-2 sm:gap-3 md:gap-4 mt-6 sm:mt-8 md:mt-12">
                  <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                    <p className="bg-gray-700 w-fit px-2 py-1 sm:px-2 sm:py-1 md:p-2 rounded-xl text-sm sm:text-base md:text-base">
                      Figma
                    </p>
                    <p className="bg-gray-700 w-fit px-2 py-1 sm:px-2 sm:py-1 md:p-2 rounded-xl text-sm sm:text-base md:text-base">
                      Adobe InDesign
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mt-2 sm:mt-3 md:mt-4">
                    <p className="bg-gray-700 w-fit px-2 py-1 sm:px-2 sm:py-1 md:p-2 rounded-xl text-sm sm:text-base md:text-base">
                      Material Design
                    </p>
                    <p className="bg-gray-700 w-fit px-2 py-1 sm:px-2 sm:py-1 md:p-2 rounded-xl text-sm sm:text-base md:text-base">
                      Tailwind
                    </p>
                  </div>
                  <p className="bg-gray-700 w-fit px-2 py-1 sm:px-2 sm:py-1 md:p-2 rounded-xl text-sm sm:text-base md:text-base mt-2 sm:mt-3 md:mt-4">
                    Sketch
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="absolute bg-black h-[8em] sm:h-[9em] md:h-[11em] w-full bottom-0 z-20" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Capabilities;