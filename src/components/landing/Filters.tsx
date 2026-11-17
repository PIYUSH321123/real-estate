"use client";

import * as React from "react";

export type FilterChipKey = "all" | "ready" | "uc" | "plot" | "commercial";

interface FiltersProps {
  activeChip: FilterChipKey;
  onSelectChip: (key: FilterChipKey) => void;
  totalCount: number;
  filteredCount: number;
}

const CHIPS: [FilterChipKey, string][] = [
  ["all", "All homes"],
  ["ready", "Ready to move"],
  ["uc", "Under construction"],
  ["plot", "Plots"],
  ["commercial", "Commercial"],
];

export function Filters({
  activeChip,
  onSelectChip,
  totalCount,
  filteredCount,
}: FiltersProps) {
  return (
    <>
      <div className="gh-head">
        <div>
          <span className="gh-eyebrow">Featured homes</span>
          <h2>Inspected, price-locked, ready to visit</h2>
        </div>

        <div className="gh-chips" role="group" aria-label="Filter listings by status or category">
          {CHIPS.map(([key, label]) => (
            <button
              key={key}
              type="button"
              className="gh-chip"
              aria-pressed={activeChip === key}
              onClick={() => onSelectChip(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <p className="gh-count" aria-live="polite">
        Showing {filteredCount} of {totalCount} homes
      </p>
    </>
  );
}
