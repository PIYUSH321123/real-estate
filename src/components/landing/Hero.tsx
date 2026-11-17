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

export function Hero({ featuredProperty, propertyCount = 6, onOpenVisitModal }: HeroProps) {
  const f = featuredProperty || {
    id: "skyline",
    title: "Skyline Heights",
    locality: "Baner",
    bhk: "3 BHK",
    sqft: 1280,
    priceDisplay: "₹1.45 Cr",
    imageUrl: "/properties/skyline-1.jpg",
  };

  // Generate procedural skyline silhouette for authentic dusk Pune atmosphere
  const skylineSvg = React.useMemo(() => {
    let s = 7;
    function r() {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    }
    function layer(fill: string, minH: number, maxH: number, minW: number, maxW: number, lit: boolean) {
      let x = -20;
      let g = "";
      while (x < 1460) {
        const w = minW + Math.floor(r() * (maxW - minW));
        const h = minH + Math.floor(r() * (maxH - minH));
        const y = 300 - h;
        g += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" />`;
        if (lit) {
          for (let yy = y + 14; yy < 296; yy += 16) {
            for (let xx = x + 8; xx < x + w - 8; xx += 12) {
              if (r() > 0.72) {
                g += `<rect x="${xx}" y="${yy}" width="4" height="6" rx="1" fill="#FFC477" opacity="${(0.55 + r() * 0.4).toFixed(2)}" />`;
              }
            }
          }
        }
        x += w + (r() > 0.6 ? 6 : 0);
      }
      return g;
    }

    const backLayer = layer("#0A4A47", 60, 170, 34, 70, false);
    const frontLayer = layer("#062726", 30, 120, 40, 90, true);
    return backLayer + frontLayer;
  }, []);

  return (
    <section className="gh-hero" aria-label="Hero section">
      <div className="gh-hero-sun" aria-hidden="true" />
      <svg
        className="gh-skyline"
        viewBox="0 0 1440 300"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: skylineSvg }}
      />
      <div className="gh-wrap gh-hero-grid">
        <div>
          <span className="gh-rera-pill">
            <i aria-hidden="true" />
            MahaRERA Reg. {SITE_CONFIG.rera.number} · {SITE_CONFIG.brokerageClaim.badgeText}
          </span>
          <h1>
            Pune homes you can walk through this <em>weekend</em>.
          </h1>
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
              Book a free site visit
            </button>
            <a className="gh-btn gh-btn-ghost" href="#homes">
              Browse {propertyCount} homes
            </a>
          </div>
        </div>

        {/* Mini Featured Home Preview Card */}
        <aside className="gh-mini" aria-label="Featured property of the day">
          <span className="gh-mini-tag">Featured today</span>
          <div className="gh-mini-row">
            <b>{f.title}</b>
            <b style={{ color: "var(--brand)" }}>{f.priceDisplay}</b>
          </div>
          <small>
            {f.bhk} · {f.locality} · {f.sqft?.toLocaleString("en-IN")} sq ft
          </small>
          <div className="gh-mini-art">
            <Image
              src={f.imageUrl || "/properties/skyline-1.jpg"}
              alt={`Sample preview of ${f.title}`}
              fill
              className="object-cover"
              sizes="340px"
              priority
            />
          </div>
        </aside>
      </div>
    </section>
  );
}
