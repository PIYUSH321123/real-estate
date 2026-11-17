"use client";

import * as React from "react";
import { Property } from "@/types/real-estate";

interface AreasProps {
  areas: string[];
  properties: Property[];
  onSelectArea: (area: string) => void;
}

const AREA_NOTES: Record<string, string> = {
  Baner: "High Street dining & metro corridor",
  Wakad: "Expressway & IT park proximity",
  Kharadi: "EON IT Hub & luxury gated villas",
  Hinjewadi: "Pune's premier tech & retail hub",
  Hadapsar: "Magarpatta & SP Infocity belt",
  Lonavala: "Sahyadri hills & Pavna lake escapes",
};

export function Areas({ areas, properties, onSelectArea }: AreasProps) {
  const handleAreaClick = (area: string) => {
    onSelectArea(area);
    const el = document.getElementById("homes");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="gh-block" id="areas" aria-label="Explore Pune Areas">
      <div className="gh-head">
        <div>
          <span className="gh-pill-eyebrow">
            <i aria-hidden="true" />
            Where we work
          </span>
          <h2>Pick your side of Pune</h2>
        </div>
        <p>Select a neighbourhood to filter verified listings in that micro-market.</p>
      </div>

      <div className="gh-areas" role="group" aria-label="Select an area to view listings">
        {areas.map((a, idx) => {
          const count = properties.filter((l) => l.locality === a).length;
          const label = count === 1 ? "1 home" : `${count} homes`;
          const indexStr = String(idx + 1).padStart(2, "0");

          return (
            <button
              key={a}
              type="button"
              className="gh-area"
              onClick={() => handleAreaClick(a)}
              aria-label={`Show ${label} in ${a}, Pune`}
            >
              <div className="gh-area-top">
                <span className="gh-area-idx">{indexStr}</span>
                <em>{label}</em>
              </div>
              <div className="gh-area-main">
                <div>
                  <b>{a}</b>
                  <span>{AREA_NOTES[a] || "Pune"}</span>
                </div>
                <span className="gh-area-arrow" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
