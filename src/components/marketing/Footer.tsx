"use client";

import * as React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Building2, ShieldCheck, ExternalLink, ArrowRight } from "lucide-react";
import { useCompany } from "@/components/marketing/CompanyContext";
import { SITE_CONFIG } from "@/config/site-config";

export default function Footer() {
  const { company } = useCompany();
  const companySlug = company?.slug && company.slug !== "dashboard" ? company.slug : "gharsetu";

  return (
    <footer className="bg-[#0F2F2A] text-[#93A5A0] pt-16 pb-12 border-t border-[#1B4D45]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand & RERA Credentials */}
          <div className="space-y-4">
            <Link
              href={`/c/${companySlug}/home`}
              className="flex items-center gap-2.5 text-white tracking-tight"
            >
              <div className="size-9 rounded-lg bg-[#0F766E] text-white flex items-center justify-center font-bold">
                <Building2 className="size-5" />
              </div>
              <span className="font-extrabold text-xl text-white">{SITE_CONFIG.brandName}</span>
            </Link>
            <p className="text-xs leading-relaxed text-[#BAC7C3]">
              {SITE_CONFIG.tagline}. Dedicated to helping homebuyers find verified premium homes across Pune with complete transparency and 0% buyer brokerage.
            </p>
            {/* MahaRERA Badge */}
            <div className="bg-[#153D37] border border-[#235850] rounded-xl p-3 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                <ShieldCheck className="size-4 text-[#2DD4BF]" />
                <span>MahaRERA Registered</span>
              </div>
              <p className="text-[11px] text-[#A2B6B0]">
                Agent Reg: <strong className="text-white font-mono">{SITE_CONFIG.rera.number}</strong>
              </p>
              <a
                href={SITE_CONFIG.rera.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[10px] text-[#2DD4BF] hover:underline font-semibold"
              >
                <span>Verify on MahaRERA Portal</span>
                <ExternalLink className="size-2.5" />
              </a>
            </div>
          </div>

          {/* Prime Pune Areas */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Pune Prime Areas
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href={`/c/${companySlug}/home#properties`} className="hover:text-white transition-colors">
                  Baner & Balewadi (₹9,500/sqft avg)
                </Link>
              </li>
              <li>
                <Link href={`/c/${companySlug}/home#properties`} className="hover:text-white transition-colors">
                  Wakad & Tathawade (₹7,800/sqft avg)
                </Link>
              </li>
              <li>
                <Link href={`/c/${companySlug}/home#properties`} className="hover:text-white transition-colors">
                  Kharadi & Viman Nagar (₹9,200/sqft avg)
                </Link>
              </li>
              <li>
                <Link href={`/c/${companySlug}/home#properties`} className="hover:text-white transition-colors">
                  Hinjewadi IT Phase 1-3 (₹6,800/sqft avg)
                </Link>
              </li>
              <li>
                <Link href={`/c/${companySlug}/home#properties`} className="hover:text-white transition-colors">
                  Bavdhan & Kothrud (₹8,900/sqft avg)
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Explore & Resources
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href={`/c/${companySlug}/home#properties`} className="hover:text-white transition-colors">
                  Featured Property Portfolio
                </Link>
              </li>
              <li>
                <Link href={`/c/${companySlug}/home#how-it-works`} className="hover:text-white transition-colors">
                  How 0% Brokerage Works
                </Link>
              </li>
              <li>
                <Link href={`/c/${companySlug}/home#testimonials`} className="hover:text-white transition-colors">
                  Client Reviews & Stories
                </Link>
              </li>
              <li>
                <Link href={`/c/${companySlug}/home#faq`} className="hover:text-white transition-colors">
                  Home Buyer FAQs
                </Link>
              </li>
              <li>
                <Link href={`/c/${companySlug}/home/blogs`} className="hover:text-white transition-colors">
                  Pune Real Estate Market Insights
                </Link>
              </li>
              <li>
                <Link href={`/c/${companySlug}/dashboard`} className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Agent CRM Portal</span>
                  <ArrowRight className="size-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Pune Advisory Desk
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="size-4 shrink-0 text-[#2DD4BF] mt-0.5" />
                <span className="leading-relaxed">
                  {SITE_CONFIG.officeAddress.line1}, {SITE_CONFIG.officeAddress.line2},{" "}
                  {SITE_CONFIG.officeAddress.city} - {SITE_CONFIG.officeAddress.pincode}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-[#2DD4BF]" />
                <a href={`tel:${SITE_CONFIG.primaryPhone}`} className="hover:text-white transition-colors font-medium">
                  {SITE_CONFIG.primaryPhoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-[#2DD4BF]" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-white transition-colors">
                  {SITE_CONFIG.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="border-t border-[#1B4D45] pt-6 space-y-4">
          <p className="text-[11px] leading-relaxed text-[#7C938D]">
            <strong className="text-[#A2B6B0]">Legal Disclaimer:</strong> {SITE_CONFIG.rera.disclaimer} {SITE_CONFIG.brokerageClaim.disclaimer}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7C938D]">
            <span>
              © {new Date().getFullYear()} {SITE_CONFIG.legalEntityName}. All rights reserved.
            </span>
            <div className="flex items-center gap-4 text-[11px]">
              <Link href={`/c/${companySlug}/home`} className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <span>·</span>
              <Link href={`/c/${companySlug}/home`} className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <span>·</span>
              <Link href={`/c/${companySlug}/home`} className="hover:text-white transition-colors">
                RERA Compliance
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
