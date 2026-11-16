import React from "react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import { SITE_CONFIG } from "@/config/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gharsetu Realty | MahaRERA Verified Homes in Pune | 0% Brokerage",
  description:
    "Explore MahaRERA verified 2, 3 & 4 BHK apartments, luxury penthouses, and villas in Baner, Wakad, Kharadi, and Hinjewadi with Gharsetu Realty. Free private site visits and zero buyer brokerage.",
  openGraph: {
    title: "Gharsetu Realty - Pune's Most Trusted Real Estate Advisory",
    description:
      "Direct developer pricing, 100% MahaRERA verified properties, and door-to-door escorted site visits in Pune.",
    type: "website",
  },
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
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
    areaServed: ["Baner", "Wakad", "Kharadi", "Hinjewadi", "Bavdhan", "Balewadi", "Pune"],
    priceRange: "₹65 Lakhs - ₹5 Crores",
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F7F5] selection:bg-[#0F766E] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
