import React from "react";
import { SITE_CONFIG } from "@/config/site-config";
import "@/components/landing/landing.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gharsetu Realty | Pune Homes You Can Walk Through This Weekend",
  description:
    "Handpicked 2, 3 and 4 BHK homes in Baner, Wakad, Kharadi and Hinjewadi. Developer pricing, MahaRERA registered projects, 0% buyer brokerage and a free cab to every site visit.",
  openGraph: {
    title: "Gharsetu Realty — MahaRERA Verified Pune Homes (0% Brokerage)",
    description:
      "Direct developer pricing, registered MahaRERA projects, and complimentary doorstep AC cab site visits across Pune.",
    type: "website",
    locale: "en_IN",
    siteName: "Gharsetu Realty",
  },
};

export default function PublicLandingLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: SITE_CONFIG.brandName,
    legalName: SITE_CONFIG.legalEntityName,
    telephone: SITE_CONFIG.primaryPhone,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${SITE_CONFIG.officeAddress.line1}, ${SITE_CONFIG.officeAddress.line2}`,
      addressLocality: SITE_CONFIG.officeAddress.locality,
      addressRegion: SITE_CONFIG.officeAddress.state,
      postalCode: SITE_CONFIG.officeAddress.pincode,
      addressCountry: "IN",
    },
    areaServed: ["Baner", "Wakad", "Kharadi", "Hinjewadi", "Hadapsar", "Lonavala", "Pune"],
    priceRange: "₹48 Lakhs - ₹3.2 Crores",
  };

  return (
    <div className="gh-landing">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </div>
  );
}
