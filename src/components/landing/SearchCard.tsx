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
    <form
      className="gh-search"
      id="search"
      aria-label="Search verified homes"
      onSubmit={handleSubmit}
    >
      <div className="gh-field">
        <label htmlFor="s-area">Area</label>
        <select
          id="s-area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          aria-label="Filter by locality in Pune"
        >
          <option value="any">All areas</option>
          {areas.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      <div className="gh-field">
        <label htmlFor="s-type">Home type</label>
        <select
          id="s-type"
          value={homeType}
          onChange={(e) => setHomeType(e.target.value)}
          aria-label="Filter by BHK or configuration"
        >
          <option value="any">Any type</option>
          <option value="1 BHK">1 BHK</option>
          <option value="2 BHK">2 BHK</option>
          <option value="3 BHK">3 BHK</option>
          <option value="4 BHK">4 BHK</option>
          <option value="Plot">Plot</option>
          <option value="Commercial">Commercial</option>
        </select>
      </div>

      <div className="gh-field">
        <label htmlFor="s-budget">Budget</label>
        <select
          id="s-budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          aria-label="Filter by price budget range"
        >
          <option value="any">Any budget</option>
          <option value="lt50">Under ₹50 L</option>
          <option value="50-100">₹50 L to ₹1 Cr</option>
          <option value="100-200">₹1 Cr to ₹2 Cr</option>
          <option value="gt200">Above ₹2 Cr</option>
        </select>
      </div>

      <button className="gh-btn gh-btn-brand" type="submit">
        Search homes
      </button>
    </form>
  );
}
