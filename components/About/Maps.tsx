"use client";

import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const CountryMap = () => {
  // Revert to original country list from your last code
  const countryList = [
    { name: "Uruguay", city: "Montevideo", id: "URY" },
    { name: "Argentina", city: "Buenos Aires", id: "ARG" },
    { name: "Colombia", city: "Medellin", id: "COL" },
    { name: "USA", city: "Los Angeles", id: "USA" },
    { name: "Around the World", id: "ALL" },
  ];

  // Updated company locations with additional countries and cities for worldwide dots
  const companyLocations = {
    URY: [
      { name: "Montevideo", lat: -34.9011, lng: -56.1645 },
    ],
    ARG: [
      { name: "Buenos Aires", lat: -34.6037, lng: -58.3816 },
    ],
    COL: [
      { name: "Medellin", lat: 6.2442, lng: -75.5812 },
    ],
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

  // Mapping between GeoJSON IDs and ISO Alpha-3 codes
  const idMapping = {
    "858": "URY", // Uruguay
    "032": "ARG", // Argentina
    "170": "COL", // Colombia
    "840": "USA", // United States
    "124": "CAN", // Canada
    "276": "DEU", // Germany
    "036": "AUS", // Australia
    "156": "CHN", // China
  };

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);

  return (
    <div className="lg:flex min-h-screen bg-[#1a1a1a] text-white lg:pl-[10%] bg-black">
      {/* Left Side: List of Countries */}
      <div className="lg:w-[30%] p-8 relative">
        {/* Title */}
        <div className="mb-12">
          <h3 className="lg:text-4xl text-3xl font-light mb-2">Our</h3>
          <h1 className="lg:text-6xl text-4xl font-bold text-[#FFB800]">Hubs</h1>
          <div className="lg:w-20 w-15 h-0.5 bg-white mt-8" />
        </div>

        {/* Countries List */}
        <div className="relative">
          <div className="absolute left-0 top-0 w-0.5 h-full bg-white/20" />
          <ul className="space-y-8">
            {countryList.map((country) => (
              <li
                key={country.id}
                className="pl-8 cursor-pointer group"
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
                <div className={`relative transition-all duration-300
                  ${selectedCountry === country.id ? "text-[#FFB800]" : "text-white/60 hover:text-white"}
                `}>
                  {/* Highlight bar */}
                  <div className={`absolute left-0 top-0 w-0.5 h-full bg-[#FFB800] transition-opacity duration-300
                    ${selectedCountry === country.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
                  `} style={{ transform: "translateX(-2rem)" }} />
                  
                  {country.id === "ALL" ? (
                    <span className="lg:text-3xl text-2xl font-light">{country.name}</span>
                  ) : (
                    <>
                      <div className="lg:text-3xl text-2xl font-light mb-1">{country.name}</div>
                      <div className="lg:text-lg text-sm font-light">{country.city}</div>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Side: Map (keeping the existing map code) */}
      <div className="flex-1">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 150 }}
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
                const isSelected =
                  selectedCountry !== "ALL" && idMapping[geo.id] === selectedCountry;
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
                    r={1} // Very small dots
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
                    r={1} // Very small dots
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
                    stroke="rgba(255, 184, 0, 0.2)" // Existing selected country line
                    strokeWidth={1}
                    transform={`translate(0, -90)`}
                  />
                </Marker>
                {(hoveredCountry || selectedCountry) && (hoveredCountry || selectedCountry) !== "ALL" && companyLocations[selectedCountry || hoveredCountry]?.map((hoverLocation, hoverIndex) => (
                  <Marker key={`hover-${hoverIndex}`} coordinates={[hoverLocation.lng, 90]}>
                    <line
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="-180"
                      stroke="rgba(255, 255, 255, 0.5)" // Thin white line on hover or click
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