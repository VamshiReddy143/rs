"use client";

import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

// Define interfaces
interface Location {
  name: string;
  lat: number;
  lng: number;
}

interface Country {
  name: string;
  city?: string;
  id: string;
}

// Define companyLocations type
type CompanyLocations = {
  [key: string]: Location[];
};

// Define idMapping type
type IdMapping = {
  [key: string]: string;
};

const CountryMap = () => {
  const countryList: Country[] = [
    { name: "Uruguay", city: "Montevideo", id: "URY" },
    { name: "Argentina", city: "Buenos Aires", id: "ARG" },
    { name: "Colombia", city: "Medellin", id: "COL" },
    { name: "USA", city: "Los Angeles", id: "USA" },
    { name: "Around the World", id: "ALL" },
  ];

  const companyLocations: CompanyLocations = {
    URY: [{ name: "Montevideo", lat: -34.9011, lng: -56.1645 }],
    ARG: [{ name: "Buenos Aires", lat: -34.6037, lng: -58.3816 }],
    COL: [{ name: "Medellin", lat: 6.2442, lng: -75.5812 }],
    USA: [
      { name: "Los Angeles", lat: 34.0522, lng: -118.2437 },
      { name: "New York", lat: 40.7128, lng: -74.006 },
    ],
    CAN: [
      { name: "Toronto", lat: 43.6532, lng: -79.3832 },
      { name: "Vancouver", lat: 49.2827, lng: -123.1207 },
    ],
    DEU: [
      { name: "Berlin", lat: 52.52, lng: 13.405 },
      { name: "Munich", lat: 48.1351, lng: 11.582 },
    ],
    AUS: [
      { name: "Sydney", lat: -33.8688, lng: 151.2093 },
      { name: "Melbourne", lat: -37.8136, lng: 144.9631 },
    ],
    CHN: [
      { name: "Beijing", lat: 39.9042, lng: 116.4074 },
      { name: "Shanghai", lat: 31.2304, lng: 121.4737 },
    ],
  };

  const idMapping: IdMapping = {
    "858": "URY",
    "032": "ARG",
    "170": "COL",
    "840": "USA",
    "124": "CAN",
    "276": "DEU",
    "036": "AUS",
    "156": "CHN",
  };

  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#1a1a1a] text-white px-4 sm:px-8 lg:px-16">
      <div className="lg:w-1/3 w-full p-4 sm:p-8 relative">
        <div className="mb-8 sm:mb-12">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-2">Our</h3>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-[#FFB800]">
            Hubs
          </h1>
          <div className="w-16 sm:w-20 h-0.5 bg-white mt-4 sm:mt-8" />
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 w-0.5 h-full bg-white/20" />
          <ul className="space-y-6 sm:space-y-8">
            {countryList.map((country) => (
              <li
                key={country.id}
                className="pl-6 sm:pl-8 cursor-pointer group"
                onMouseEnter={() => {
                  if (country.id !== "ALL") setHoveredCountry(country.id);
                }}
                onMouseLeave={() => {
                  setHoveredCountry(null);
                }}
                onClick={() => {
                  if (country.id === "ALL") {
                    setSelectedCountry(country.id);
                    setHoveredCountry(null);
                  } else {
                    setSelectedCountry(country.id);
                    setHoveredCountry(country.id);
                  }
                }}
              >
                <div
                  className={`relative transition-all duration-300 ${
                    selectedCountry === country.id
                      ? "text-[#FFB800]"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <div
                    className={`absolute left-0 top-0 w-0.5 h-full bg-[#FFB800] transition-opacity duration-300 ${
                      selectedCountry === country.id
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                    style={{ transform: "translateX(-2rem)" }}
                  />
                  {country.id === "ALL" ? (
                    <span className="text-xl sm:text-2xl lg:text-3xl font-light">
                      {country.name}
                    </span>
                  ) : (
                    <>
                      <div className="text-xl sm:text-2xl lg:text-3xl font-light mb-1">
                        {country.name}
                      </div>
                      <div className="text-sm sm:text-base lg:text-lg font-light">
                        {country.city}
                      </div>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex-1 w-full h-[50vh] sm:h-[60vh] lg:h-screen">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 120, center: [0, 20] }}
          style={{ width: "100%", height: "100%" }}
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
            {({ geographies }) =>
              geographies.map((geo) => {
                const geoId = geo.id ? geo.id.toString() : null; // Safeguard for undefined id
                const isSelected =
                  geoId &&
                  selectedCountry !== "ALL" &&
                  idMapping[geoId] === selectedCountry;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isSelected ? "#444444" : "#222222"}
                    stroke="#333333"
                    strokeWidth={0.5}
                  />
                );
              })
            }
          </Geographies>

          {selectedCountry === "ALL" ? (
            Object.values(companyLocations)
              .flat()
              .map((location, index) => (
                <Marker key={index} coordinates={[location.lng, location.lat]}>
                  <circle
                    r={1}
                    fill="#FFB800"
                    stroke="#FFB800"
                    strokeWidth={1}
                    filter="url(#glow)"
                    className="animate-pulse"
                  />
                </Marker>
              ))
          ) : (
            selectedCountry &&
            companyLocations[selectedCountry]?.map((location, index) => (
              <React.Fragment key={index}>
                <Marker coordinates={[location.lng, location.lat]}>
                  <circle
                    r={1}
                    fill="#FFB800"
                    stroke="#FFB800"
                    strokeWidth={1}
                    filter="url(#glow)"
                    className="animate-pulse"
                  />
                </Marker>
                <Marker coordinates={[location.lng, 90]}>
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="-180"
                    stroke="rgba(255, 184, 0, 0.2)"
                    strokeWidth={1}
                    transform={`translate(0, -90)`}
                  />
                </Marker>
                {(hoveredCountry || selectedCountry) &&
                  (hoveredCountry || selectedCountry) !== "ALL" &&
                  companyLocations[
                    (selectedCountry || hoveredCountry) as string
                  ]?.map((hoverLocation, hoverIndex) => (
                    <Marker
                      key={`hover-${hoverIndex}`}
                      coordinates={[hoverLocation.lng, 90]}
                    >
                      <line
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="-180"
                        stroke="rgba(255, 255, 255, 0.5)"
                        strokeWidth={0.9}
                        transform={`translate(0, -90)`}
                      />
                    </Marker>
                  ))}
              </React.Fragment>
            ))
          )}
        </ComposableMap>
      </div>
    </div>
  );
};

export default CountryMap;