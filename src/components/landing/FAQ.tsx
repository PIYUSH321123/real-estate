"use client";

import * as React from "react";
import { SITE_CONFIG } from "@/config/site-config";

export function FAQ() {
  return (
    <section className="gh-block" id="faq" aria-label="Frequently asked questions">
      <div className="gh-faq-layout">
        {/* Left Column: Editorial Heading + Direct Concierge Card */}
        <div className="gh-faq-intro">
          <span className="gh-pill-eyebrow">
            <i aria-hidden="true" />
            Questions
          </span>
          <h2>Before you book a visit</h2>
          <p className="gh-faq-sub">
            Clear answers on brokerage, MahaRERA verification, doorstep site visits and home
            loan assistance.
          </p>

          <div className="gh-concierge-box">
            <span className="gh-eyebrow">Direct advisory desk</span>
            <b>Prefer speaking with an advisor?</b>
            <p>
              Call or message our Pune desk between 9:30 AM and 8:00 PM for floor plans and
              builder price sheets.
            </p>
            <div className="gh-concierge-acts">
              <a
                className="gh-btn gh-btn-cta"
                href={`tel:${SITE_CONFIG.primaryPhone}`}
              >
                Call {SITE_CONFIG.primaryPhoneDisplay}
              </a>
              <a
                className="gh-btn gh-btn-ghost"
                href={`https://wa.me/${SITE_CONFIG.whatsappPhone}?text=Hi%20Gharsetu%20Realty!%20I%20have%20a%20question%20before%20booking%20a%20site%20visit.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Accordion */}
        <div className="gh-faq">
          <details open>
            <summary>Do I really pay no brokerage?</summary>
            <p>
              Developers pay our fee, so the price you see is the developer&apos;s price. Ask us
              for the terms in writing before you book.
            </p>
          </details>

          <details>
            <summary>How do I check that a project is RERA registered?</summary>
            <p>
              Every home on this page shows its MahaRERA number. You can verify it yourself on{" "}
              <a
                href={SITE_CONFIG.rera.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--accent)", fontWeight: 600, textDecoration: "underline" }}
              >
                the MahaRERA portal
              </a>
              .
            </p>
          </details>

          <details>
            <summary>What happens after I book a site visit?</summary>
            <p>
              We confirm the slot on WhatsApp, a cab collects you from home, and an advisor
              shows you the project. There is no obligation to buy.
            </p>
          </details>

          <details>
            <summary>Can you help with a home loan?</summary>
            <p>
              We share EMI estimates and introduce you to lenders. You choose the bank and the
              loan terms.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}
