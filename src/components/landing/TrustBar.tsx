"use client";

import * as React from "react";
import { SITE_CONFIG } from "@/config/site-config";

export function TrustBar() {
  return (
    <div className="gh-trust" role="region" aria-label="Key trust credentials">
      {/* 1. MahaRERA */}
      <div className="gh-trust-item">
        <span className="gh-trust-ic" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3Z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </span>
        <p>
          <b>MahaRERA registered</b>
          <span>Reg. {SITE_CONFIG.rera.number}</span>
        </p>
      </div>

      {/* 2. 0% Brokerage */}
      <div className="gh-trust-item">
        <span className="gh-trust-ic" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 5 5 19" />
            <circle cx="7" cy="7" r="2.5" />
            <circle cx="17" cy="17" r="2.5" />
          </svg>
        </span>
        <p>
          <b>{SITE_CONFIG.brokerageClaim.badgeText}</b>
          <span>Direct developer pricing</span>
        </p>
      </div>

      {/* 3. Families Assisted */}
      <div className="gh-trust-item">
        <span className="gh-trust-ic" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="8" r="3.5" />
            <path d="M2.5 20c.6-3.5 3.2-5.5 6.5-5.5s5.9 2 6.5 5.5" />
            <path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.8c1.9.7 3.1 2.4 3.5 5.2" />
          </svg>
        </span>
        <p>
          <b>1,200+ Pune families</b>
          <span>Guided to their homes</span>
        </p>
      </div>

      {/* 4. Free AC Cab Visits */}
      <div className="gh-trust-item">
        <span className="gh-trust-ic" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 15v-3l2-5h14l2 5v3" />
            <path d="M3 15h18v3H3z" />
            <circle cx="7.5" cy="18" r="1.5" />
            <circle cx="16.5" cy="18" r="1.5" />
          </svg>
        </span>
        <p>
          <b>Free AC cab visits</b>
          <span>Doorstep pickup and drop</span>
        </p>
      </div>
    </div>
  );
}
