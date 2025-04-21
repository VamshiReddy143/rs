
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
    ARG: [
      { name: "Buenos Aires", lat: -34.6037, lng: -58.3816 },
      { name: "Córdoba", lat: -31.4201, lng: -64.1888 },
    ],
    COL: [
      { name: "Medellin", lat: 6.2442, lng: -75.5812 },
      { name: "Bogotá", lat: 4.7110, lng: -74.0721 },
    ],
    USA: [
      { name: "Los Angeles", lat: 34.0522, lng: -118.2437 },
      { name: "New York", lat: 40.7128, lng: -74.006 },
      { name: "San Francisco", lat: 37.7749, lng: -122.4194 },
    ],
    CAN: [
      { name: "Toronto", lat: 43.6532, lng: -79.3832 },
      { name: "Vancouver", lat: 49.2827, lng: -123.1207 },
      { name: "Montreal", lat: 45.5017, lng: -73.5673 },
    ],
    DEU: [
      { name: "Berlin", lat: 52.52, lng: 13.405 },
      { name: "Munich", lat: 48.1351, lng: 11.582 },
      { name: "Hamburg", lat: 53.5511, lng: 9.9937 },
    ],
    AUS: [
      { name: "Sydney", lat: -33.8688, lng: 151.2093 },
      { name: "Melbourne", lat: -37.8136, lng: 144.9631 },
      { name: "Brisbane", lat: -27.4698, lng: 153.0251 },
    ],
    CHN: [
      { name: "Beijing", lat: 39.9042, lng: 116.4074 },
      { name: "Shanghai", lat: 31.2304, lng: 121.4737 },
      { name: "Shenzhen", lat: 22.5431, lng: 114.0579 },
    ],
    GBR: [
      { name: "London", lat: 51.5074, lng: -0.1278 },
      { name: "Manchester", lat: 53.4808, lng: -2.2426 },
    ],
    JPN: [
      { name: "Tokyo", lat: 35.6762, lng: 139.6503 },
      { name: "Osaka", lat: 34.6937, lng: 135.5023 },
    ],
    BRA: [
      { name: "São Paulo", lat: -23.5505, lng: -46.6333 },
      { name: "Rio de Janeiro", lat: -22.9068, lng: -43.1729 },
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
    "826": "GBR",
    "392": "JPN",
    "076": "BRA",
  };

  // Default countries to show dots for when no interaction
  const defaultCountries = ["USA", "DEU", "CHN"];

  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  // Get list of country IDs with locations
  const countriesWithLocations = Object.keys(companyLocations);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#1a1a1a] pb-[10em] text-white px-4 sm:px-8 lg:pl-[6em]">
      <div className="lg:w-1/3 w-full relative lg:pt-[15em] pt-[6em]">
        <div className="mb-8 sm:mb-12">
          <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-normal leading-[38px] mb-2">Our</h3>
          <h1 className="text-3xl sm:text-4xl lg:text-[72px] font-semibold text-[#FFB800]">
            Hubs
          </h1>
          <div className="w-16 sm:w-15 h-0.5 bg-white mt-4 sm:mt-8" />
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 w-0.5 h-full bg-white/20" />
          <ul className="space-y-6 sm:space-y-8">
            {countryList.map((country) => (
              <li
                key={country.id}
                className="pl-6 sm:pl-8 cursor-pointer group"
                onMouseEnter={() => {
                  setHoveredCountry(country.id);
                }}
                onMouseLeave={() => {
                  setHoveredCountry(null);
                }}
                onClick={() => {
                  setSelectedCountry(country.id);
                  setHoveredCountry(country.id);
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
                    <span className="text-xl sm:text-2xl lg:text-[24px] font-normal leading-[36px]">
                      {country.name}
                    </span>
                  ) : (
                    <>
                      <div className="text-xl sm:text-2xl lg:text-[24px] font-normal mb-1">
                        {country.name}
                      </div>
                      <div className="text-sm sm:text-base lg:text-[16px] font-light">
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

      <div className="flex-1 w-full h-[50vh] pt-10 sm:h-[60vh] lg:h-screen">
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
                const geoId = geo.id ? geo.id.toString() : null;
                const isSelected =
                  geoId &&
                  ((hoveredCountry === "ALL" || selectedCountry === "ALL")
                    ? countriesWithLocations.includes(idMapping[geoId])
                    : idMapping[geoId] === selectedCountry || idMapping[geoId] === hoveredCountry);
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

          {/* Default markers for specified countries when no interaction */}
          {!selectedCountry && !hoveredCountry && defaultCountries.map((countryId) =>
            companyLocations[countryId]?.map((location, index) => (
              <Marker key={`default-${countryId}-${index}`} coordinates={[location.lng, location.lat]}>
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
          )}

          {/* Markers for hovered or selected country */}
          {(hoveredCountry || selectedCountry) && (
            (hoveredCountry === "ALL" || selectedCountry === "ALL" ? (
              Object.values(companyLocations)
                .flat()
                .map((location, index) => (
                  <React.Fragment key={`all-${index}`}>
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
                  </React.Fragment>
                ))
            ) : (
              companyLocations[(hoveredCountry || selectedCountry) as string]?.map((location, index) => (
                <React.Fragment key={`marker-${index}`}>
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
                </React.Fragment>
              ))
            ))
          )}

          {/* Hover/Select effect lines */}
          {(hoveredCountry || selectedCountry) &&
            companyLocations[(hoveredCountry || selectedCountry) as string]?.map((location, index) => (
              <Marker
                key={`line-${index}`}
                coordinates={[location.lng, 90]}
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
        </ComposableMap>
      </div>
    </div>
  );
};

export default CountryMap;
