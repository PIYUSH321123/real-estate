"use client";

import * as React from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/config/site-config";

interface HeaderProps {
  companySlug?: string;
}

export function Header({ companySlug = "gharsetu" }: HeaderProps) {
  const crmUrl = `/c/${companySlug}/dashboard`;

  return (
    <header className="gh-top" role="banner">
      <div className="gh-wrap">
        <Link className="gh-logo" href="#top" aria-label="Gharsetu Realty Home">
          <span className="gh-logo-mark" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
            >
              <path d="M4 21V8l8-5 8 5v13" />
              <path d="M9 21v-6h6v6" />
              <path d="M9 11h.01M15 11h.01" />
            </svg>
          </span>
          <span>
            <b>{SITE_CONFIG.brandName}</b>
            <small>Pune real estate advisory</small>
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
            className="gh-phone"
            href={`tel:${SITE_CONFIG.primaryPhone}`}
            aria-label={`Call us at ${SITE_CONFIG.primaryPhoneDisplay}`}
          >
            {SITE_CONFIG.primaryPhoneDisplay}
          </a>
          <a
            className="gh-btn gh-btn-wa"
            href={`https://wa.me/${SITE_CONFIG.whatsappPhone}?text=Hi%20Gharsetu%20Realty!%20I%20am%20looking%20for%20a%20property%20in%20Pune.`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Gharsetu Realty on WhatsApp"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4.5"
              aria-hidden="true"
            >
              <path d="M21 12a9 9 0 0 1-13.4 7.8L3 21l1.3-4.4A9 9 0 1 1 21 12Z" />
            </svg>
            <span>WhatsApp</span>
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
