"use client";

import * as React from "react";

interface SearchCardProps {
  areas: string[];
  area: string;
  setArea: (a: string) => void;
  homeType: string;
  setHomeType: (t: string) => void;
  budget: string;
  setBudget: (b: string) => void;
  onSearch: () => void;
}

export function SearchCard({
  areas,
  area,
  setArea,
  homeType,
  setHomeType,
  budget,
  setBudget,
  onSearch,
}: SearchCardProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
    const el = document.getElementById("homes");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="gh-search-offset">
      <form
        className="gh-search"
        id="search"
        aria-label="Search verified homes"
        onSubmit={handleSubmit}
      >
        {/* Solid Obsidian Search Icon Box */}
        <div className="gh-search-icon-box" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>

        {/* Location */}
        <div className="gh-search-col">
          <label htmlFor="s-area">Location</label>
          <select
            id="s-area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            aria-label="Filter by locality in Pune"
          >
            <option value="any">All areas (Pune)</option>
            {areas.map((a) => (
              <option key={a} value={a}>
                {a}, Pune
              </option>
            ))}
          </select>
        </div>

        {/* Home Type */}
        <div className="gh-search-col">
          <label htmlFor="s-type">Property Type</label>
          <select
            id="s-type"
            value={homeType}
            onChange={(e) => setHomeType(e.target.value)}
            aria-label="Filter by BHK or configuration"
          >
            <option value="any">All Types</option>
            <option value="1 BHK">1 BHK</option>
            <option value="2 BHK">2 BHK</option>
            <option value="3 BHK">3 BHK</option>
            <option value="4 BHK">4 BHK</option>
            <option value="Plot">Plot</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>

        {/* Budget */}
        <div className="gh-search-col">
          <label htmlFor="s-budget">Price Range</label>
          <select
            id="s-budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            aria-label="Filter by price budget range"
          >
            <option value="any">Any Budget</option>
            <option value="lt50">Under ₹50 L</option>
            <option value="50-100">₹50 L to ₹1 Cr</option>
            <option value="100-200">₹1 Cr to ₹2 Cr</option>
            <option value="gt200">Above ₹2 Cr</option>
          </select>
        </div>

        <button className="gh-btn" type="submit">
          Search Properties
        </button>
      </form>
    </div>
  );
}
