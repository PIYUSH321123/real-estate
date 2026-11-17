"use client";

import * as React from "react";
import { Property } from "@/types/real-estate";

interface PropertyCardProps {
  property: Property;
  isSaved: boolean;
  onToggleSave: (id: string, title: string) => void;
  onViewDetails: (property: Property) => void;
  onBookVisit: (property: Property) => void;
}

export function PropertyCard({
  property,
  isSaved,
  onToggleSave,
  onViewDetails,
  onBookVisit,
}: PropertyCardProps) {
  const psf = Math.round(property.price / Math.max(property.sqft, 1)).toLocaleString("en-IN");

  const statusClass =
    property.status === "Ready"
      ? "ready"
      : property.status === "Under construction"
      ? "uc"
      : "av";

  const slug = property.slug || property.id;
  const rawSrc = property.imageUrl || `/properties/${slug}-1.jpg`;
  const imgSrc = rawSrc.includes("?") ? rawSrc : `${rawSrc}?v=2`;

  return (
    <article className="gh-card">
      <div className="gh-card-art">
        <img
          src={imgSrc}
          alt={`Exterior view of ${property.title} in ${property.locality}, ${property.city}`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover block gh-card-img"
        />

        <div className="gh-card-scrim" aria-hidden="true" />

        <span className={`gh-badge ${statusClass}`}>{property.status}</span>

        <button
          type="button"
          className="gh-save"
          aria-pressed={isSaved}
          aria-label={
            isSaved ? `Remove ${property.title} from saved homes` : `Save ${property.title}`
          }
          onClick={() => onToggleSave(property.id, property.title)}
        >
          <svg
            viewBox="0 0 24 24"
            fill={isSaved ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4.5"
            aria-hidden="true"
          >
            <path d="M12 20s-7-4.4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.6-9 9-9 9Z" />
          </svg>
        </button>

        <div className="gh-card-photo-meta">
          <span className="gh-card-photo-loc">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-3.5 shrink-0"
              aria-hidden="true"
            >
              <path d="M12 21s7-6.2 7-11.5a7 7 0 1 0-14 0C5 14.8 12 21 12 21Z" />
              <circle cx="12" cy="9.5" r="2.5" />
            </svg>
            {property.locality}, {property.city}
          </span>
          <span className="gh-card-photo-tag">{property.type}</span>
        </div>
      </div>

      <div className="gh-card-body">
        <div className="gh-price-row">
          <span className="gh-price">{property.priceDisplay}</span>
          <span className="gh-psf">₹{psf} / sq ft</span>
        </div>

        <h3>{property.title}</h3>

        <div className="gh-specs">
          <span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
              aria-hidden="true"
            >
              <path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5" />
              <circle cx="7" cy="11" r="1.5" />
            </svg>
            {property.bhk}
          </span>
          <span className="gh-spec-dot" aria-hidden="true" />
          <span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
              aria-hidden="true"
            >
              <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
            </svg>
            {property.sqft.toLocaleString("en-IN")} sq ft
          </span>
        </div>

        <p className="gh-blurb">{property.description}</p>

        <div className="gh-rera">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-3.5 shrink-0"
            aria-hidden="true"
          >
            <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3Z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <span>MahaRERA {property.reraNumber || "Verified"}</span>
        </div>

        <div className="gh-acts">
          <button
            type="button"
            className="gh-btn gh-btn-ghost"
            onClick={() => onViewDetails(property)}
          >
            View details
          </button>
          <button
            type="button"
            className="gh-btn gh-btn-cta"
            onClick={() => onBookVisit(property)}
          >
            <span>Book visit</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-3.5"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
