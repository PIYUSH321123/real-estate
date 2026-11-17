"use client";

import * as React from "react";
import { Property } from "@/types/real-estate";

interface AreasProps {
  areas: string[];
  properties: Property[];
  onSelectArea: (area: string) => void;
}

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
          <span className="gh-eyebrow">Where we work</span>
          <h2>Pick your side of Pune</h2>
        </div>
        <p>Tap an area to see only the homes there.</p>
      </div>

      <div className="gh-areas" role="group" aria-label="Select an area to view listings">
        {areas.map((a) => {
          const count = properties.filter((l) => l.locality === a).length;
          const label = count === 1 ? "1 home" : `${count} homes`;

          return (
            <button
              key={a}
              type="button"
              className="gh-area"
              onClick={() => handleAreaClick(a)}
              aria-label={`Show ${label} in ${a}, Pune`}
            >
              <div>
                <b>{a}</b>
                <span>Pune</span>
              </div>
              <em>{label}</em>
            </button>
          );
        })}
      </div>
    </section>
  );
}
