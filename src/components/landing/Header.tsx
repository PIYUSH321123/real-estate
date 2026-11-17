"use client";

import * as React from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/config/site-config";

interface HeaderProps {
  companySlug?: string;
}

export function Header({ companySlug = "gharsetu" }: HeaderProps) {
  const [scrolled, setScrolled] = React.useState(false);
  const crmUrl = `/c/${companySlug}/dashboard`;

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`gh-top ${scrolled ? "scrolled" : ""}`} role="banner">
      <div className="gh-wrap">
        <Link className="gh-logo" href="#top" aria-label="Gharsetu Realty Home">
          <span className="gh-logo-mark" aria-hidden="true">
            <svg
              viewBox="0 0 36 36"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.35"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-8"
            >
              <path d="M18 4L25 8.5V31H11V8.5L18 4Z" />
              <path d="M11 13L5 16.5V31H11" />
              <path d="M25 13L31 16.5V31H25" />
              <path d="M18 4V31" />
            </svg>
          </span>
          <span>
            <b>GHARSETU</b>
            <small>REALTY · PUNE</small>
          </span>
        </Link>

        <nav className="gh-nav" aria-label="Main navigation">
          <a href="#top">Home</a>
          <a href="#homes">Properties</a>
          <a href="#areas">Areas</a>
          <a href="#faq">About</a>
          <a href="#visit">Contact</a>
        </nav>

        <div className="gh-top-actions">
          <a
            className="gh-phone-pill"
            href={`tel:${SITE_CONFIG.primaryPhone}`}
            aria-label={`Call us at ${SITE_CONFIG.primaryPhoneDisplay}`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>{SITE_CONFIG.primaryPhoneDisplay}</span>
          </a>

          <Link
            className="gh-crm-link"
            href={crmUrl}
            aria-label="Open Agent CRM Portal"
          >
            Agent CRM portal
          </Link>
        </div>
      </div>
    </header>
  );
}
