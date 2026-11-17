"use client";

import * as React from "react";
import Image from "next/image";
import { Property } from "@/types/real-estate";
import { SITE_CONFIG } from "@/config/site-config";

interface HeroProps {
  featuredProperty?: Property | null;
  propertyCount?: number;
  onOpenVisitModal?: () => void;
}

export function Hero({ propertyCount = 6, onOpenVisitModal }: HeroProps) {
  return (
    <section className="gh-hero" aria-label="Hero section">
      {/* Full-bleed local architectural hero photo */}
      <div className="gh-hero-bg" aria-hidden="true">
        <Image
          src="/properties/hero-luxury-residence.jpg"
          alt="Luxury modern Pune residence at golden hour"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Soft left-to-right editorial atmospheric veil for crisp dark serif contrast */}
      <div className="gh-hero-veil" aria-hidden="true" />

      <div className="gh-wrap" style={{ position: "relative", zIndex: 2, width: "100%" }}>
        <div className="gh-hero-content">
          <span className="gh-rera-pill">
            <i aria-hidden="true" />
            MahaRERA Reg. {SITE_CONFIG.rera.number} · {SITE_CONFIG.brokerageClaim.badgeText}
          </span>

          <h1>Pune homes you can walk through this weekend.</h1>

          <p className="gh-lede">
            Handpicked 2, 3 and 4 BHK homes in Baner, Wakad, Kharadi and Hinjewadi.
            Developer pricing, registered projects and a free cab to every site visit.
          </p>

          <div className="gh-hero-cta">
            <button
              type="button"
              className="gh-btn gh-btn-cta"
              onClick={onOpenVisitModal}
            >
              <span>Book a free site visit</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>

            <a className="gh-hero-play" href="#homes">
              <span className="gh-hero-play-circle" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-3.5 ml-0.5"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span>Browse {propertyCount} homes</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
