"use client";

import * as React from "react";
import { SITE_CONFIG } from "@/config/site-config";

export function Footer() {
  return (
    <footer className="gh-footer" role="contentinfo">
      <div className="gh-wrap">
        <div>
          <b>{SITE_CONFIG.brandName}</b>
          <br />© {new Date().getFullYear()} {SITE_CONFIG.legalEntityName}. All rights reserved.
          <br />
          {SITE_CONFIG.officeAddress.line1}, {SITE_CONFIG.officeAddress.line2},{" "}
          {SITE_CONFIG.officeAddress.city} - {SITE_CONFIG.officeAddress.pincode} ·{" "}
          <a href={`mailto:${SITE_CONFIG.email}`} style={{ textDecoration: "underline" }}>
            {SITE_CONFIG.email}
          </a>
        </div>
        <div>
          MahaRERA Registration:{" "}
          <a
            href={SITE_CONFIG.rera.verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--brand)", fontWeight: 700 }}
          >
            <b>{SITE_CONFIG.rera.number}</b>
          </a>
          <br />
          Phone:{" "}
          <a href={`tel:${SITE_CONFIG.primaryPhone}`} style={{ fontWeight: 600 }}>
            {SITE_CONFIG.primaryPhoneDisplay}
          </a>
        </div>
      </div>
    </footer>
  );
}
