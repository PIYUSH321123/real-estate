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
          <span className="gh-pill-eyebrow">
            <i aria-hidden="true" />
            Client reviews
          </span>
          <h2>What Pune families say</h2>
        </div>
        <p>Verified Pune homebuyers on their site visits and zero-brokerage booking experience.</p>
      </div>

      <div className="gh-reviews">
        {testimonials.map((t) => (
          <article key={t.name} className="gh-review-card">
            <div className="gh-review-top">
              <div className="gh-stars" aria-label="5 out of 5 stars">
                {[0, 1, 2, 3, 4].map((star) => (
                  <svg
                    key={star}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-3.5"
                    aria-hidden="true"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="gh-review-quote-mark" aria-hidden="true">
                &ldquo;
              </span>
            </div>

            <p className="gh-review-body">&ldquo;{t.quote}&rdquo;</p>

            <div className="gh-review-footer">
              <span className="gh-review-av" aria-hidden="true">
                {t.initials}
              </span>
              <div>
                <b>{t.name}</b>
                <span>{t.project}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
