"use client";

import * as React from "react";
import { SITE_CONFIG } from "@/config/site-config";

export function MobileBar() {
  return (
    <div className="gh-mbar" role="region" aria-label="Quick contact actions">
      <a
        className="gh-btn gh-btn-ghost"
        href={`tel:${SITE_CONFIG.primaryPhone}`}
        aria-label={`Call Gharsetu Realty at ${SITE_CONFIG.primaryPhoneDisplay}`}
      >
        Call
      </a>
      <a
        className="gh-btn gh-btn-wa"
        href={`https://wa.me/${SITE_CONFIG.whatsappPhone}?text=Hi%20Gharsetu%20Realty!%20I%20would%20like%20to%20book%20a%20site%20visit.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message Gharsetu Realty on WhatsApp"
      >
        WhatsApp
      </a>
    </div>
  );
}
