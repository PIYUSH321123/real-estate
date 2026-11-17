"use client";

import * as React from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/config/site-config";

interface FooterProps {
  companySlug?: string;
}

export function Footer({ companySlug = "gharsetu" }: FooterProps) {
  return (
    <footer className="gh-footer-lux" role="contentinfo">
      <div className="gh-wrap">
        <div className="gh-footer-grid">
          {/* Col 1: Brand & RERA */}
          <div className="gh-footer-brand">
            <Link href="#top" className="gh-footer-logo">
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

            <p className="gh-footer-desc">
              {SITE_CONFIG.tagline}. Handpicked MahaRERA verified residences across Pune with
              direct developer pricing and {SITE_CONFIG.brokerageClaim.badgeText.toLowerCase()}.
            </p>

            <div className="gh-footer-rera">
              <span className="gh-eyebrow" style={{ color: "#E5D4B7" }}>
                MahaRERA Registered Agent
              </span>
              <b>{SITE_CONFIG.rera.number}</b>
              <a
                href={SITE_CONFIG.rera.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Verify on MahaRERA Portal →
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="gh-footer-col">
            <h4>Navigation</h4>
            <ul>
              <li>
                <a href="#top">Home</a>
              </li>
              <li>
                <a href="#homes">Featured Properties</a>
              </li>
              <li>
                <a href="#areas">Pune Neighbourhoods</a>
              </li>
              <li>
                <a href="#reviews">Client Reviews</a>
              </li>
              <li>
                <a href="#faq">Questions &amp; FAQs</a>
              </li>
              <li>
                <Link href={`/c/${companySlug}/dashboard`}>Agent CRM Portal →</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Pune Areas */}
          <div className="gh-footer-col">
            <h4>Pune Areas</h4>
            <ul>
              <li>
                <a href="#areas">Baner</a>
              </li>
              <li>
                <a href="#areas">Wakad</a>
              </li>
              <li>
                <a href="#areas">Kharadi</a>
              </li>
              <li>
                <a href="#areas">Hinjewadi</a>
              </li>
              <li>
                <a href="#areas">Hadapsar</a>
              </li>
              <li>
                <a href="#areas">Lonavala</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Pune Advisory Desk */}
          <div className="gh-footer-col">
            <h4>Advisory Desk</h4>
            <ul className="gh-footer-contact">
              <li>
                <span>
                  {SITE_CONFIG.officeAddress.line1}, {SITE_CONFIG.officeAddress.line2},{" "}
                  {SITE_CONFIG.officeAddress.city} - {SITE_CONFIG.officeAddress.pincode}
                </span>
              </li>
              <li>
                <a href={`tel:${SITE_CONFIG.primaryPhone}`}>
                  {SITE_CONFIG.primaryPhoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#E5D4B7" }}
                >
                  WhatsApp Concierge →
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="gh-footer-bottom">
          <p className="gh-footer-disclaimer">{SITE_CONFIG.rera.disclaimer}</p>
          <div className="gh-footer-copy">
            <span>
              © {new Date().getFullYear()} {SITE_CONFIG.legalEntityName}. All rights reserved.
            </span>
            <span>{SITE_CONFIG.brokerageClaim.fullText}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
