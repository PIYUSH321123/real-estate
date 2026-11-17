"use client";

import * as React from "react";

export function Reviews() {
  const testimonials = [
    {
      initials: "RS",
      name: "Rahul & Priya Sharma",
      project: "Skyline Heights, Baner",
      quote:
        "The zero brokerage guarantee was completely real. Sameer arranged our doorstep cab pickup and negotiated directly with the developer on our 3 BHK booking.",
    },
    {
      initials: "AD",
      name: "Amit Deshmukh",
      project: "Orchid Villas, Kharadi",
      quote:
        "Having every MahaRERA registration and title document verified before we visited gave our family complete peace of mind throughout the paperwork.",
    },
    {
      initials: "SK",
      name: "Dr. Sneha Kulkarni",
      project: "Green Acres, Wakad",
      quote:
        "We had zero time to drive between sites. Gharsetu pre-filtered three matching projects, took us around on a Saturday morning, and helped with EMI quotes.",
    },
  ];

  return (
    <section className="gh-block" id="reviews" aria-label="Client reviews">
      <div className="gh-head">
        <div>
          <span className="gh-eyebrow">Client reviews</span>
          <h2>What families say</h2>
        </div>
        <p>Verified Pune homebuyers on their site visits and zero-brokerage booking experience.</p>
      </div>

      <div className="gh-reviews">
        {testimonials.map((t) => (
          <div key={t.name} className="gh-review-card">
            <span className="gh-review-av" aria-hidden="true">
              {t.initials}
            </span>
            <b>
              {t.name}, {t.project}
            </b>
            <p>&ldquo;{t.quote}&rdquo;</p>
          </div>
        ))}
      </div>
    </section>
  );
}
