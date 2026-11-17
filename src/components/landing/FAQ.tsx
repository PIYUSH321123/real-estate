"use client";

import * as React from "react";
import { SITE_CONFIG } from "@/config/site-config";

export function FAQ() {
  return (
    <section className="gh-block" id="faq" aria-label="Frequently asked questions">
      <div className="gh-head">
        <div>
          <span className="gh-eyebrow">Questions</span>
          <h2>Before you book a visit</h2>
        </div>
      </div>

      <div className="gh-faq">
        <details>
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
              style={{ color: "var(--brand)", fontWeight: 600 }}
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
    </section>
  );
}
