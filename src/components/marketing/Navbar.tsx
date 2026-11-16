"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MessageSquare, ArrowRight, Building2, ShieldCheck } from "lucide-react";
import { useCompany } from "@/components/marketing/CompanyContext";
import { SITE_CONFIG } from "@/config/site-config";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { company } = useCompany();

  const companySlug = company?.slug && company.slug !== "dashboard" ? company.slug : "gharsetu";

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: `/c/${companySlug}/home` },
    { name: "Properties", href: `/c/${companySlug}/home#properties` },
    { name: "Areas", href: `/c/${companySlug}/home#areas` },
    { name: "About", href: `/c/${companySlug}/home#about` },
    { name: "Contact", href: `/c/${companySlug}/home#contact` },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E3E7E4]"
          : "bg-white border-b border-[#E3E7E4]"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <Link
              href={`/c/${companySlug}/home`}
              className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] rounded-lg"
              aria-label="Gharsetu Realty Home"
            >
              <div className="size-10 rounded-xl bg-[#0F766E] text-white flex items-center justify-center font-bold text-lg shadow-sm shadow-[#0F766E]/20 group-hover:scale-105 transition-transform">
                <Building2 className="size-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg text-[#14211C] tracking-tight">
                    {SITE_CONFIG.brandName}
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-bold text-[#0F766E] bg-[#E3F2EF] px-1.5 py-0.5 rounded-full">
                    <ShieldCheck className="size-3" />
                    RERA
                  </span>
                </div>
                <span className="text-[11px] text-[#5B6B65] font-medium -mt-0.5">
                  Pune Real Estate Advisory
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isHomeActive = pathname === `/c/${companySlug}/home` && link.name === "Home";
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors hover:text-[#0F766E] ${
                    isHomeActive ? "text-[#0F766E] font-bold" : "text-[#3D4C46]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Quick Call */}
            <a
              href={`tel:${SITE_CONFIG.primaryPhone}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#14211C] hover:text-[#0F766E] px-2.5 py-1.5 rounded-lg transition-colors"
              aria-label={`Call us at ${SITE_CONFIG.primaryPhoneDisplay}`}
            >
              <Phone className="size-3.5 text-[#0F766E]" />
              <span>{SITE_CONFIG.primaryPhoneDisplay}</span>
            </a>

            {/* Direct WhatsApp Button */}
            <Button
              onClick={() =>
                window.open(`https://wa.me/${SITE_CONFIG.whatsappPhone}?text=Hi%20Gharsetu!%20I%20am%20looking%20for%20a%20property%20in%20Pune.`, "_blank")
              }
              className="bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold h-9 px-3.5 rounded-lg flex items-center gap-1.5 shadow-xs"
              aria-label="Chat on WhatsApp"
            >
              <MessageSquare className="size-3.5" />
              <span>WhatsApp</span>
            </Button>

            {/* Agent CRM Portal Secondary Link */}
            <Link
              href={`/c/${companySlug}/dashboard`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#5B6B65] hover:text-[#0F766E] border border-[#E3E7E4] hover:border-[#0F766E] px-3 py-1.5 rounded-lg transition-all"
            >
              <span>Agent CRM Portal</span>
              <ArrowRight className="size-3" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={`tel:${SITE_CONFIG.primaryPhone}`}
              className="p-2 rounded-lg text-[#0F766E] hover:bg-[#F0FDFA]"
              aria-label="Direct Phone Call"
            >
              <Phone className="size-4" />
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-[#14211C] hover:bg-[#F6F7F5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-[#E3E7E4] px-5 py-4 space-y-3 shadow-lg">
          <nav aria-label="Mobile Navigation" className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-semibold text-[#14211C] hover:bg-[#F6F7F5] hover:text-[#0F766E]"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-[#EEF1EF] space-y-2.5">
            <Button
              onClick={() => {
                setMobileOpen(false);
                window.open(`https://wa.me/${SITE_CONFIG.whatsappPhone}`, "_blank");
              }}
              className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold h-10 rounded-lg flex items-center justify-center gap-2"
            >
              <MessageSquare className="size-4" />
              <span>Chat on WhatsApp</span>
            </Button>
            <Link
              href={`/c/${companySlug}/dashboard`}
              onClick={() => setMobileOpen(false)}
              className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#5B6B65] hover:text-[#0F766E] py-2 border border-[#E3E7E4] rounded-lg"
            >
              <span>Agent CRM Portal</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
