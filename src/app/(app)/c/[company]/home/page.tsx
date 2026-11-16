"use client";

import * as React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  Building2,
  CheckCircle2,
  Clock,
  Home,
  MapPin,
  MessageSquare,
  Phone,
  Search,
  Sparkles,
  ShieldCheck,
  Percent,
  Users,
  Car,
  Heart,
  Share2,
  ExternalLink,
  ChevronDown,
  Check,
  Calendar,
  X,
  ArrowRight,
  Filter,
  Maximize2,
  Star,
  Compass,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { INITIAL_PROPERTIES } from "@/lib/mock/gharsetu";
import { Property } from "@/types/real-estate";
import { SITE_CONFIG } from "@/config/site-config";
import { submitWebsiteLead } from "@/lib/services/lead-service";
import { toast } from "sonner";

export default function AgencyPublicHomePage() {
  const params = useParams();
  const companySlug =
    (Array.isArray(params.company) ? params.company[0] : params.company) || "gharsetu";

  // --- Lead Form State ---
  const [name, setName] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [bhk, setBhk] = React.useState("3 BHK");
  const [consent, setConsent] = React.useState(true);
  const [honeypot, setHoneypot] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  // --- Callback Modal State ---
  const [callbackModalOpen, setCallbackModalOpen] = React.useState(false);
  const [callbackName, setCallbackName] = React.useState("");
  const [callbackPhone, setCallbackPhone] = React.useState("");
  const [callbackTime, setCallbackTime] = React.useState("Morning (10 AM - 1 PM)");

  // --- Site Visit Modal State ---
  const [siteVisitModalOpen, setSiteVisitModalOpen] = React.useState(false);
  const [selectedPropertyForVisit, setSelectedPropertyForVisit] = React.useState<Property | null>(null);
  const [visitName, setVisitName] = React.useState("");
  const [visitPhone, setVisitPhone] = React.useState("");
  const [visitDate, setVisitDate] = React.useState("This Saturday");

  // --- Property Detail Modal State ---
  const [detailModalOpen, setDetailModalOpen] = React.useState(false);
  const [activeDetailProperty, setActiveDetailProperty] = React.useState<Property | null>(null);

  // --- Saved Properties (Favorites) ---
  const [savedPropertyIds, setSavedPropertyIds] = React.useState<string[]>([]);

  // --- Filters State ---
  const [selectedLocality, setSelectedLocality] = React.useState<string>("All");
  const [selectedBhk, setSelectedBhk] = React.useState<string>("All");
  const [selectedBudget, setSelectedBudget] = React.useState<string>("All");
  const [selectedStatus, setSelectedStatus] = React.useState<string>("All");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  // --- FAQ Accordion State ---
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(0);

  // Toggle favorite property
  const toggleSaveProperty = (propId: string, title: string) => {
    setSavedPropertyIds((prev) => {
      const exists = prev.includes(propId);
      if (exists) {
        toast.info(`Removed ${title} from saved homes`);
        return prev.filter((id) => id !== propId);
      } else {
        toast.success(`Saved ${title} to your shortlisted homes!`);
        return [...prev, propId];
      }
    });
  };

  // Share property via WhatsApp
  const shareProperty = (p: Property) => {
    const text = encodeURIComponent(
      `Check out ${p.title} (${p.bhk}, ${p.priceDisplay}) in ${p.locality}, Pune. MahaRERA: ${p.reraNumber || "Verified"}. Found on Gharsetu Realty.`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  // Handle Hero Quick Lead Form Submit
  const handleHeroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      toast.error("Please agree to receive updates to proceed.");
      return;
    }
    if (!name.trim() || !mobile.trim()) {
      toast.error("Please fill in your name and mobile number.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitWebsiteLead({
        name,
        mobile,
        bhk,
        locality: "Baner / Wakad / Kharadi",
        honeypot,
      });

      if (result.success) {
        setSubmitted(true);
        toast.success("Brochures Dispatched on WhatsApp!", {
          description: `Hi ${name}, our senior advisor Sameer Khan will message floor plans and price sheets directly.`,
        });

        // Open WhatsApp directly with inquiry
        const waMsg = encodeURIComponent(
          `Hi Gharsetu Realty! I am looking for ${bhk} homes in Pune. Please share floor plans and pricing.`
        );
        setTimeout(() => {
          window.open(`https://wa.me/${SITE_CONFIG.whatsappPhone}?text=${waMsg}`, "_blank");
        }, 1200);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("An error occurred. Please try calling us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Callback Request Submit
  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackName || !callbackPhone) return;

    await submitWebsiteLead({
      name: callbackName,
      mobile: callbackPhone,
      notes: `Requested Callback slot: ${callbackTime}`,
    });

    setCallbackModalOpen(false);
    toast.success("Callback Scheduled!", {
      description: `We will call you during ${callbackTime}.`,
    });
    setCallbackName("");
    setCallbackPhone("");
  };

  // Handle Site Visit Booking Submit
  const handleSiteVisitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitName || !visitPhone || !selectedPropertyForVisit) return;

    await submitWebsiteLead({
      name: visitName,
      mobile: visitPhone,
      propertyTitle: selectedPropertyForVisit.title,
      locality: selectedPropertyForVisit.locality,
      notes: `Requested Private Cab Site Visit on ${visitDate}`,
    });

    setSiteVisitModalOpen(false);
    toast.success("Private Site Visit Scheduled!", {
      description: `A senior advisor will confirm AC cab pickup for ${selectedPropertyForVisit.title}.`,
    });
    setVisitName("");
    setVisitPhone("");
  };

  // Filter Properties Logic
  const filteredProperties = React.useMemo(() => {
    return INITIAL_PROPERTIES.filter((p) => {
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesQuery =
          p.title.toLowerCase().includes(query) ||
          p.locality.toLowerCase().includes(query) ||
          p.bhk.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      // Locality
      if (selectedLocality !== "All" && p.locality !== selectedLocality) {
        return false;
      }

      // BHK
      if (selectedBhk !== "All") {
        if (selectedBhk === "4 BHK Villa" && !p.bhk.includes("4 BHK")) return false;
        if (selectedBhk === "Commercial" && p.type !== "Commercial") return false;
        if (selectedBhk === "Plot" && p.type !== "Plot") return false;
        if (selectedBhk !== "4 BHK Villa" && selectedBhk !== "Commercial" && selectedBhk !== "Plot" && !p.bhk.includes(selectedBhk)) return false;
      }

      // Budget
      if (selectedBudget !== "All") {
        if (selectedBudget === "Under ₹1 Cr" && p.price >= 10000000) return false;
        if (selectedBudget === "₹1 - ₹1.5 Cr" && (p.price < 10000000 || p.price > 15000000)) return false;
        if (selectedBudget === "₹1.5 - ₹2.5 Cr" && (p.price < 15000000 || p.price > 25000000)) return false;
        if (selectedBudget === "Above ₹2.5 Cr" && p.price <= 25000000) return false;
      }

      // Status
      if (selectedStatus !== "All") {
        if (selectedStatus === "Ready" && p.status !== "Ready") return false;
        if (selectedStatus === "Under construction" && p.status !== "Under construction") return false;
        if (selectedStatus === "Available" && p.status !== "Available") return false;
      }

      return true;
    });
  }, [searchQuery, selectedLocality, selectedBhk, selectedBudget, selectedStatus]);

  const hasActiveFilters =
    selectedLocality !== "All" ||
    selectedBhk !== "All" ||
    selectedBudget !== "All" ||
    selectedStatus !== "All" ||
    searchQuery.trim().length > 0;

  const clearFilters = () => {
    setSelectedLocality("All");
    setSelectedBhk("All");
    setSelectedBudget("All");
    setSelectedStatus("All");
    setSearchQuery("");
  };

  return (
    <div className="bg-[#F6F7F5] text-[#14211C]">
      {/* ======================================================== */}
      {/* HERO SECTION (Item B) */}
      {/* ======================================================== */}
      <section className="relative min-h-[620px] lg:min-h-[660px] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0B1E1B]">
        {/* Background Architecture SVG Illustration */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/properties/pune-skyline-hero.svg"
            alt="Pune Skyline Architecture"
            fill
            priority
            className="object-cover object-bottom opacity-40 mix-blend-luminosity"
          />
          {/* Dark Contrast Gradient Overlay for Text Contrast >= 4.5:1 */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1E1B]/95 via-[#0F2F2A]/90 to-[#0B1E1B]/98" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          {/* MahaRERA Verifiable Credential Pill */}
          <div className="inline-flex items-center gap-2 bg-[#0F766E]/30 border border-[#2DD4BF]/40 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#5EEAD4] mb-5 shadow-xs">
            <ShieldCheck className="size-4 text-[#2DD4BF]" />
            <span>MahaRERA Reg. {SITE_CONFIG.rera.number}</span>
            <span className="text-[#99F6E4]">·</span>
            <span className="text-white font-bold">{SITE_CONFIG.brokerageClaim.badgeText}</span>
          </div>

          {/* Simple, Plain Language Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-3xl">
            Find Your Verified Dream Home in <span className="text-[#2DD4BF]">Pune</span>
          </h1>

          {/* 1-Line Plain Subheading */}
          <p className="text-sm sm:text-base md:text-lg text-[#CBD5E1] max-w-2xl mt-4 leading-relaxed font-normal">
            Handpicked 2, 3 &amp; 4 BHK apartments in Baner, Wakad, Kharadi, and Hinjewadi with MahaRERA verified titles and 0% buyer brokerage.
          </p>

          {/* 3-Field Quick Ingestion Form */}
          <div className="w-full max-w-2xl bg-white/95 backdrop-blur-md p-5 sm:p-7 rounded-2xl border border-white/20 shadow-2xl mt-8">
            <form onSubmit={handleHeroSubmit} className="space-y-4">
              {/* Honeypot Bot Trap (Hidden) */}
              <input
                type="text"
                name="website_hp"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                aria-hidden="true"
                className="hidden pointer-events-none"
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Full Name */}
                <div className="text-left">
                  <label htmlFor="hero-name" className="block text-[11px] font-bold text-[#3D4C46] mb-1">
                    Your Full Name <span className="text-[#EA580C]">*</span>
                  </label>
                  <Input
                    id="hero-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="bg-[#F6F7F5] border-[#D1D9D5] text-xs h-11 rounded-lg focus-visible:ring-2 focus-visible:ring-[#0F766E]"
                    required
                  />
                </div>

                {/* WhatsApp Mobile */}
                <div className="text-left">
                  <label htmlFor="hero-mobile" className="block text-[11px] font-bold text-[#3D4C46] mb-1">
                    WhatsApp Number <span className="text-[#EA580C]">*</span>
                  </label>
                  <Input
                    id="hero-mobile"
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="+91 98201 44521"
                    className="bg-[#F6F7F5] border-[#D1D9D5] text-xs h-11 rounded-lg focus-visible:ring-2 focus-visible:ring-[#0F766E]"
                    required
                  />
                </div>

                {/* BHK Requirement */}
                <div className="text-left">
                  <label htmlFor="hero-bhk" className="block text-[11px] font-bold text-[#3D4C46] mb-1">
                    Configuration
                  </label>
                  <select
                    id="hero-bhk"
                    value={bhk}
                    onChange={(e) => setBhk(e.target.value)}
                    className="w-full bg-[#F6F7F5] border border-[#D1D9D5] rounded-lg text-xs px-3 h-11 text-[#14211C] font-medium outline-none focus:ring-2 focus:ring-[#0F766E]"
                  >
                    <option value="1 BHK">1 BHK (Hadapsar / Hinjewadi)</option>
                    <option value="2 BHK">2 BHK (Wakad / Tathawade)</option>
                    <option value="3 BHK">3 BHK (Baner / Balewadi)</option>
                    <option value="4 BHK Villa">4 BHK Villa (Kharadi / Bavdhan)</option>
                    <option value="Plot">NA Residential Plot</option>
                  </select>
                </div>
              </div>

              {/* Consent Line */}
              <div className="flex items-center gap-2 pt-1 text-left">
                <input
                  type="checkbox"
                  id="consent-check"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="rounded border-[#D1D9D5] text-[#0F766E] focus:ring-[#0F766E] size-3.5 mt-0.5"
                />
                <label htmlFor="consent-check" className="text-[11px] text-[#5B6B65] select-none cursor-pointer">
                  I agree to receive verified floor plans, pricing sheets, and site visit schedules on WhatsApp/Phone.
                </label>
              </div>

              {/* Contrasting Amber/Tangerine CTA Button (High Visual Pop vs Teal) */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <Button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  className="w-full sm:flex-1 bg-[#EA580C] hover:bg-[#C2410C] text-white text-sm font-black h-12 rounded-xl shadow-lg shadow-[#EA580C]/25 transition-all transform active:scale-98 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="size-4" />
                  <span>
                    {submitted
                      ? "Inquiry Received! Check WhatsApp"
                      : isSubmitting
                      ? "Dispatching Floor Plans..."
                      : "Get Floor Plans & Prices on WhatsApp"}
                  </span>
                </Button>

                {/* Secondary Option: Request a Call Back */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCallbackModalOpen(true)}
                  className="w-full sm:w-auto h-12 px-5 text-xs font-bold text-[#0F766E] border-[#0F766E]/30 hover:bg-[#F0FDFA] rounded-xl flex items-center justify-center gap-1.5"
                >
                  <Phone className="size-3.5" />
                  <span>Request Call Back</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* TRUST BAR BELOW HERO (Item C) */}
      {/* ======================================================== */}
      <section className="bg-white border-b border-[#E3E7E4] py-6 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. MahaRERA */}
            <div className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-[#F6F7F5] transition-colors">
              <div className="size-11 rounded-xl bg-[#E3F2EF] text-[#0F766E] flex items-center justify-center shrink-0">
                <ShieldCheck className="size-6" />
              </div>
              <div>
                <span className="block text-sm font-extrabold text-[#14211C]">MahaRERA Verified</span>
                <span className="text-[11px] text-[#5B6B65]">Reg. {SITE_CONFIG.rera.number}</span>
              </div>
            </div>

            {/* 2. 0% Brokerage */}
            <div className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-[#F6F7F5] transition-colors">
              <div className="size-11 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0">
                <Percent className="size-6" />
              </div>
              <div>
                <span className="block text-sm font-extrabold text-[#14211C]">0% Buyer Brokerage</span>
                <span className="text-[11px] text-[#5B6B65]">Direct developer pricing</span>
              </div>
            </div>

            {/* 3. Families Assisted */}
            <div className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-[#F6F7F5] transition-colors">
              <div className="size-11 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
                <Users className="size-6" />
              </div>
              <div>
                <span className="block text-sm font-extrabold text-[#14211C]">1,200+ Pune Families</span>
                <span className="text-[11px] text-[#5B6B65]">Guided to their dream homes</span>
              </div>
            </div>

            {/* 4. Free Site Visits */}
            <div className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-[#F6F7F5] transition-colors">
              <div className="size-11 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
                <Car className="size-6" />
              </div>
              <div>
                <span className="block text-sm font-extrabold text-[#14211C]">Free AC Cab Visits</span>
                <span className="text-[11px] text-[#5B6B65]">Escorted doorstep tour</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* FEATURED PROPERTIES WITH SEARCH & FILTERS (Items D & E) */}
      {/* ======================================================== */}
      <section id="properties" className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-[#0F766E] uppercase tracking-wider bg-[#E3F2EF] px-3 py-1 rounded-full">
              Direct Developer Inventory
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#14211C] tracking-tight mt-2">
              Featured Property Portfolio
            </h2>
            <p className="text-xs sm:text-sm text-[#5B6B65] mt-1">
              Title-checked, price-locked, and ready for private weekend site visits.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#0F766E] bg-[#E3F2EF] px-3 py-1.5 rounded-lg">
              Showing {filteredProperties.length} of {INITIAL_PROPERTIES.length} verified homes
            </span>
          </div>
        </div>

        {/* Filter Toolbar (Item D) */}
        <div className="bg-white border border-[#E3E7E4] rounded-2xl p-4 sm:p-5 shadow-xs mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="size-3.5 absolute left-3 top-3 text-[#5B6B65]" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search project or locality..."
                className="pl-8 text-xs h-9 bg-[#F6F7F5] border-[#E3E7E4] rounded-lg"
              />
            </div>

            {/* Locality Filter */}
            <div>
              <select
                value={selectedLocality}
                onChange={(e) => setSelectedLocality(e.target.value)}
                className="w-full bg-[#F6F7F5] border border-[#E3E7E4] rounded-lg text-xs px-2.5 h-9 text-[#14211C] outline-none"
              >
                <option value="All">All Localities (Pune)</option>
                <option value="Baner">Baner</option>
                <option value="Wakad">Wakad</option>
                <option value="Kharadi">Kharadi</option>
                <option value="Hinjewadi">Hinjewadi</option>
                <option value="Hadapsar">Hadapsar</option>
                <option value="Lonavala">Lonavala</option>
              </select>
            </div>

            {/* BHK Filter */}
            <div>
              <select
                value={selectedBhk}
                onChange={(e) => setSelectedBhk(e.target.value)}
                className="w-full bg-[#F6F7F5] border border-[#E3E7E4] rounded-lg text-xs px-2.5 h-9 text-[#14211C] outline-none"
              >
                <option value="All">All Configurations</option>
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="4 BHK Villa">4 BHK Villa</option>
                <option value="Commercial">Commercial</option>
                <option value="Plot">Plot</option>
              </select>
            </div>

            {/* Budget Filter */}
            <div>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full bg-[#F6F7F5] border border-[#E3E7E4] rounded-lg text-xs px-2.5 h-9 text-[#14211C] outline-none"
              >
                <option value="All">All Budgets</option>
                <option value="Under ₹1 Cr">Under ₹1 Cr</option>
                <option value="₹1 - ₹1.5 Cr">₹1 - ₹1.5 Cr</option>
                <option value="₹1.5 - ₹2.5 Cr">₹1.5 - ₹2.5 Cr</option>
                <option value="Above ₹2.5 Cr">Above ₹2.5 Cr</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full bg-[#F6F7F5] border border-[#E3E7E4] rounded-lg text-xs px-2.5 h-9 text-[#14211C] outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Ready">Ready to Move</option>
                <option value="Under construction">Under Construction</option>
                <option value="Available">Available (Plots)</option>
              </select>
            </div>
          </div>

          {/* Active Filter Tags & Clear Filters */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between pt-2 border-t border-[#EEF1EF] text-xs">
              <span className="text-[#5B6B65]">Filters applied to portfolio</span>
              <button
                onClick={clearFilters}
                className="text-[#0F766E] font-semibold hover:underline flex items-center gap-1"
              >
                <X className="size-3" />
                <span>Clear all filters</span>
              </button>
            </div>
          )}
        </div>

        {/* Empty State */}
        {filteredProperties.length === 0 ? (
          <div className="bg-white border border-[#E3E7E4] rounded-2xl p-12 text-center max-w-lg mx-auto">
            <Building2 className="size-12 text-[#5B6B65] mx-auto mb-3 opacity-40" />
            <h3 className="text-base font-bold text-[#14211C]">No properties match your criteria</h3>
            <p className="text-xs text-[#5B6B65] mt-1 leading-relaxed">
              We have off-market unlisted inventory with private builder allocations in Baner, Wakad, and Kharadi.
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <Button
                onClick={clearFilters}
                variant="outline"
                className="text-xs h-9 rounded-lg"
              >
                Clear Filters
              </Button>
              <Button
                onClick={() =>
                  window.open(
                    `https://wa.me/${SITE_CONFIG.whatsappPhone}?text=Hi%20Gharsetu!%20I%20am%20looking%20for%20unlisted%20properties%20in%20Pune.`,
                    "_blank"
                  )
                }
                className="bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold h-9 rounded-lg flex items-center gap-1.5"
              >
                <MessageSquare className="size-3.5" />
                <span>Inquire on WhatsApp</span>
              </Button>
            </div>
          </div>
        ) : (
          /* Property Cards Responsive Grid (Item E) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((p) => {
              const isSaved = savedPropertyIds.includes(p.id);

              return (
                <Card
                  key={p.id}
                  className="group bg-white border border-[#E3E7E4] rounded-2xl shadow-xs hover:shadow-md hover:border-[#0F766E] transition-all overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Photo Area */}
                    <div className="relative h-48 w-full bg-[#0F2F2A] overflow-hidden">
                      <Image
                        src={p.imageUrl || "/properties/skyline-heights.svg"}
                        alt={p.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Status Badge */}
                      <div className="absolute top-3 left-3">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md ${
                            p.status === "Ready"
                              ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40"
                              : "bg-teal-950/80 text-teal-300 border border-teal-500/40"
                          }`}
                        >
                          {p.status}
                        </span>
                      </div>

                      {/* Save & Share Quick Icon Buttons */}
                      <div className="absolute top-3 right-3 flex items-center gap-1.5">
                        <button
                          onClick={() => toggleSaveProperty(p.id, p.title)}
                          aria-label={isSaved ? "Remove from saved" : "Save property"}
                          className={`size-8 rounded-full flex items-center justify-center backdrop-blur-md transition-colors ${
                            isSaved
                              ? "bg-rose-500 text-white"
                              : "bg-black/40 text-white hover:bg-black/60"
                          }`}
                        >
                          <Heart className={`size-3.5 ${isSaved ? "fill-white" : ""}`} />
                        </button>
                        <button
                          onClick={() => shareProperty(p)}
                          aria-label="Share property on WhatsApp"
                          className="size-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-md transition-colors"
                        >
                          <Share2 className="size-3.5" />
                        </button>
                      </div>

                      {/* Price Strip at Top/Bottom of Photo */}
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 flex items-end justify-between">
                        <div>
                          <span className="text-[10px] text-gray-300 block uppercase font-medium">All-Inclusive Price</span>
                          <span className="text-xl font-black text-white tracking-tight">{p.priceDisplay}</span>
                        </div>
                        {p.reraNumber && (
                          <div className="flex items-center gap-1 text-[10px] font-semibold text-[#2DD4BF] bg-black/60 px-2 py-0.5 rounded">
                            <ShieldCheck className="size-3" />
                            <span>RERA Verified</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Body & Specs */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-extrabold text-base text-[#14211C] group-hover:text-[#0F766E] transition-colors">
                          {p.title}
                        </h3>
                      </div>

                      {/* 4 Icon Specs (BHK, sqft, locality, possession) */}
                      <div className="grid grid-cols-2 gap-2 text-xs text-[#5B6B65] my-3.5 py-2.5 border-y border-[#EEF1EF]">
                        <div className="flex items-center gap-1.5 font-medium">
                          <Home className="size-3.5 text-[#0F766E] shrink-0" />
                          <span>{p.bhk}</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-medium">
                          <Maximize2 className="size-3.5 text-[#0F766E] shrink-0" />
                          <span>{p.sqft.toLocaleString()} sqft</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-medium">
                          <MapPin className="size-3.5 text-[#0F766E] shrink-0" />
                          <span>{p.locality}, Pune</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-medium">
                          <Clock className="size-3.5 text-[#0F766E] shrink-0" />
                          <span>{p.possessionDate || "Immediate"}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-[#5B6B65] line-clamp-2 leading-relaxed mb-3">
                        {p.description}
                      </p>

                      {/* RERA Registration Tag */}
                      {p.reraNumber && (
                        <div className="text-[11px] text-[#7C938D] font-mono mb-1">
                          MahaRERA: <strong className="text-[#3D4C46]">{p.reraNumber}</strong>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Dual Action CTAs (Item E) */}
                  <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setActiveDetailProperty(p);
                        setDetailModalOpen(true);
                      }}
                      className="text-xs font-bold h-9 rounded-lg border-[#D1D9D5] hover:border-[#0F766E] hover:text-[#0F766E]"
                    >
                      View Details
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedPropertyForVisit(p);
                        setSiteVisitModalOpen(true);
                      }}
                      className="bg-[#0F766E] hover:bg-[#0D655E] text-white text-xs font-bold h-9 rounded-lg shadow-xs"
                    >
                      Book Site Visit
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* ======================================================== */}
      {/* HOW IT WORKS (3 SIMPLE STEPS) (Item F) */}
      {/* ======================================================== */}
      <section id="how-it-works" className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-y border-[#E3E7E4]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#0F766E] uppercase tracking-wider bg-[#E3F2EF] px-3 py-1 rounded-full">
              The Gharsetu Advantage
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#14211C] tracking-tight mt-2">
              How Buying With Gharsetu Works
            </h2>
            <p className="text-xs sm:text-sm text-[#5B6B65] mt-1">
              From discovering your preferred locality to key handover — 100% transparent and zero buyer brokerage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-[#F6F7F5] rounded-2xl p-6 border border-[#E3E7E4] relative">
              <div className="size-10 rounded-xl bg-[#0F766E] text-white flex items-center justify-center font-black text-sm mb-4">
                01
              </div>
              <h3 className="font-extrabold text-base text-[#14211C] mb-2">
                Explore Verified Portfolio
              </h3>
              <p className="text-xs text-[#5B6B65] leading-relaxed">
                Browse title-checked MahaRERA properties with verified floor plans, transparent carpet area specs, and locked direct builder prices.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#F6F7F5] rounded-2xl p-6 border border-[#E3E7E4] relative">
              <div className="size-10 rounded-xl bg-[#0F766E] text-white flex items-center justify-center font-black text-sm mb-4">
                02
              </div>
              <h3 className="font-extrabold text-base text-[#14211C] mb-2">
                Free Doorstep Private Tour
              </h3>
              <p className="text-xs text-[#5B6B65] leading-relaxed">
                We arrange a complimentary private AC cab to pick up your family and escort you directly to sample flats with a senior advisor.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#F6F7F5] rounded-2xl p-6 border border-[#E3E7E4] relative">
              <div className="size-10 rounded-xl bg-[#0F766E] text-white flex items-center justify-center font-black text-sm mb-4">
                03
              </div>
              <h3 className="font-extrabold text-base text-[#14211C] mb-2">
                Negotiate &amp; Zero Brokerage
              </h3>
              <p className="text-xs text-[#5B6B65] leading-relaxed">
                We secure the highest builder discounts, arrange seamless home loan sanctioning, and guide registration without charging you a single rupee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* PUNE PRIME AREAS GUIDE CHIPS (Item F) */}
      {/* ======================================================== */}
      <section id="areas" className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#0F766E] uppercase tracking-wider bg-[#E3F2EF] px-3 py-1 rounded-full">
            Local Micro-Market Insights
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#14211C] tracking-tight mt-2">
            Pune Prime Residential Areas
          </h2>
          <p className="text-xs sm:text-sm text-[#5B6B65] mt-1">
            Explore average capital values and connectivity highlights across western and eastern Pune.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              name: "Baner & Balewadi",
              rate: "₹9,500 / sqft",
              highlight: "High Street cafes, IT proximity & metro line 3",
              propCount: 14,
            },
            {
              name: "Wakad & Tathawade",
              rate: "₹7,800 / sqft",
              highlight: "Expressway connectivity & top international schools",
              propCount: 18,
            },
            {
              name: "Kharadi & Viman Nagar",
              rate: "₹9,200 / sqft",
              highlight: "EON Free Zone, airport proximity & luxury towers",
              propCount: 11,
            },
            {
              name: "Hinjewadi IT Phase 1-3",
              rate: "₹6,800 / sqft",
              highlight: "Walking distance to major IT campuses & rental yields",
              propCount: 22,
            },
          ].map((area) => (
            <div
              key={area.name}
              onClick={() => {
                const localityName = area.name.split(" ")[0];
                setSelectedLocality(localityName);
                const el = document.getElementById("properties");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-white border border-[#E3E7E4] rounded-xl p-5 hover:border-[#0F766E] hover:shadow-sm cursor-pointer transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-extrabold text-sm text-[#14211C]">{area.name}</h4>
                  <Compass className="size-4 text-[#0F766E]" />
                </div>
                <div className="text-xs font-bold text-[#0F766E] mb-2">{area.rate} avg</div>
                <p className="text-[11px] text-[#5B6B65] leading-relaxed">{area.highlight}</p>
              </div>
              <div className="pt-3 mt-3 border-t border-[#EEF1EF] flex items-center justify-between text-[11px] text-[#0F766E] font-semibold">
                <span>View verified listings</span>
                <ArrowRight className="size-3" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* VERIFIED HOMEBUYER REVIEWS (Item F) */}
      {/* ======================================================== */}
      <section id="testimonials" className="bg-[#F0FDFA] py-16 px-4 sm:px-6 lg:px-8 border-y border-[#CCFBF1]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#0F766E] uppercase tracking-wider bg-white px-3 py-1 rounded-full shadow-xs">
              Homebuyer Stories
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#14211C] tracking-tight mt-2">
              Trusted by 1,200+ Pune Families
            </h2>
            <p className="text-xs sm:text-sm text-[#5B6B65] mt-1">
              Read how our zero-brokerage advisory helped buyers find the right home at the best price.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Rahul & Priya Sharma",
                locality: "Baner, Pune",
                project: "Bought 3 BHK in Skyline Heights",
                review:
                  "The zero brokerage guarantee was completely authentic. Sameer negotiated directly with the developer to save us ₹4.5 Lakhs on our booking, and coordinated the doorstep cab for my parents.",
                rating: 5,
              },
              {
                name: "Amit Deshmukh",
                locality: "Kharadi, Pune",
                project: "Bought 4 BHK Villa in Orchid Villas",
                review:
                  "Having all MahaRERA documentation and title clearance verified beforehand gave us peace of mind. Excellent communication on WhatsApp and transparent paperwork guidance.",
                rating: 5,
              },
              {
                name: "Dr. Sneha & Rajesh Kulkarni",
                locality: "Wakad, Pune",
                project: "Bought 2 BHK in Green Acres",
                review:
                  "As doctors, we had zero time to spend driving around sample flats. Gharsetu pre-filtered 3 high-quality projects, picked us up in an AC cab, and helped close home loan approval in 4 days!",
                rating: 5,
              },
            ].map((t) => (
              <Card
                key={t.name}
                className="bg-white p-6 rounded-2xl border border-[#D1D9D5] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 mb-3 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="size-4 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs text-[#3D4C46] leading-relaxed italic mb-4">
                    &ldquo;{t.review}&rdquo;
                  </p>
                </div>
                <div className="pt-3 border-t border-[#EEF1EF] flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-xs text-[#14211C]">{t.name}</h4>
                    <span className="text-[11px] text-[#5B6B65]">{t.project}</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#0F766E] bg-[#E3F2EF] px-2 py-0.5 rounded">
                    Verified Buyer
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* FAQ ACCORDION (Item F) */}
      {/* ======================================================== */}
      <section id="faq" className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-[#0F766E] uppercase tracking-wider bg-[#E3F2EF] px-3 py-1 rounded-full">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#14211C] tracking-tight mt-2">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#5B6B65] mt-1">
            Everything you need to know about buying property with Gharsetu Realty.
          </p>
        </div>

        <div className="space-y-3">
          {[
            {
              q: "How does 0% buyer brokerage work?",
              a: "Gharsetu Realty is an authorized corporate channel partner for Pune's Grade-A developers. Builders compensate us directly from their centralized marketing budgets, which means we charge 0% brokerage and zero consulting fees to homebuyers.",
            },
            {
              q: "Are all properties on Gharsetu MahaRERA approved?",
              a: "Yes. Every single residential and commercial project displayed on our platform holds a valid, verifiable MahaRERA registration number. We verify title clearance and builder track record before presenting any project to clients.",
            },
            {
              q: "How do I arrange a free doorstep private site visit?",
              a: "Simply click 'Book Site Visit' on any property card or message us on WhatsApp. Our advisory desk will arrange a complimentary private AC cab to pick you and your family up from your doorstep at your preferred time slot.",
            },
            {
              q: "Can you assist with home loans and documentation?",
              a: "Yes. Our in-house finance team partners with leading public and private banks (SBI, HDFC, ICICI, Kotak) to offer doorstep loan sanctioning, preferential interest rates, and complete legal agreement drafting support.",
            },
          ].map((item, idx) => {
            const isOpen = openFaqIndex === idx;

            return (
              <div
                key={item.q}
                className="bg-white border border-[#E3E7E4] rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left p-4.5 px-5 flex items-center justify-between gap-4 font-bold text-sm text-[#14211C] hover:text-[#0F766E] transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`size-4 text-[#5B6B65] shrink-0 transition-transform ${
                      isOpen ? "rotate-180 text-[#0F766E]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-xs text-[#5B6B65] leading-relaxed border-t border-[#EEF1EF] pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ======================================================== */}
      {/* FINAL HIGH-CONVERSION CTA BAND (Item F) */}
      {/* ======================================================== */}
      <section className="bg-[#0F2F2A] py-14 px-4 sm:px-6 lg:px-8 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
            Can&apos;t Find What You Are Looking For?
          </h2>
          <p className="text-sm sm:text-base text-[#93A5A0] max-w-xl mx-auto mt-3 leading-relaxed">
            Speak directly with our Senior Pune Property Advisory Team for unlisted builder allocations, pre-launch discounts, and custom search requirements.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Button
              onClick={() =>
                window.open(`https://wa.me/${SITE_CONFIG.whatsappPhone}?text=Hi%20Gharsetu!%20I%20need%20custom%20property%20advisory%20in%20Pune.`, "_blank")
              }
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold h-11 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageSquare className="size-4" />
              <span>Connect on WhatsApp</span>
            </Button>
            <a
              href={`tel:${SITE_CONFIG.primaryPhone}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-bold h-11 px-6 rounded-xl bg-white text-[#14211C] hover:bg-gray-100 transition-colors"
            >
              <Phone className="size-4 text-[#0F766E]" />
              <span>Call Us: {SITE_CONFIG.primaryPhoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* STICKY BOTTOM MOBILE ACTION BAR (Item G) */}
      {/* ======================================================== */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E3E7E4] p-3 flex items-center gap-2.5 shadow-2xl">
        <a
          href={`tel:${SITE_CONFIG.primaryPhone}`}
          className="flex-1 h-11 bg-white border border-[#D1D9D5] text-[#14211C] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 active:bg-gray-100"
        >
          <Phone className="size-4 text-[#0F766E]" />
          <span>Call Now</span>
        </a>
        <Button
          onClick={() =>
            window.open(`https://wa.me/${SITE_CONFIG.whatsappPhone}?text=Hi%20Gharsetu!%20I%20want%20to%20inquire%20about%20Pune%20properties.`, "_blank")
          }
          className="flex-1 h-11 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
        >
          <MessageSquare className="size-4" />
          <span>WhatsApp</span>
        </Button>
      </div>

      {/* ======================================================== */}
      {/* CALLBACK REQUEST MODAL */}
      {/* ======================================================== */}
      {callbackModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E3E7E4] relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setCallbackModalOpen(false)}
              className="absolute top-4 right-4 text-[#5B6B65] hover:text-[#14211C]"
            >
              <X className="size-5" />
            </button>
            <div className="flex items-center gap-2 text-[#0F766E] mb-2">
              <Phone className="size-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Free Callback Request</span>
            </div>
            <h3 className="font-extrabold text-lg text-[#14211C]">Talk to a Pune Real Estate Specialist</h3>
            <p className="text-xs text-[#5B6B65] mt-1 leading-relaxed">
              Leave your details below and we will call you back at your preferred convenience with zero obligation.
            </p>

            <form onSubmit={handleCallbackSubmit} className="space-y-3 mt-4">
              <div>
                <label className="block text-[11px] font-bold text-[#3D4C46] mb-1">Your Full Name</label>
                <Input
                  value={callbackName}
                  onChange={(e) => setCallbackName(e.target.value)}
                  placeholder="e.g. Vikram Mehta"
                  className="text-xs h-10 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#3D4C46] mb-1">Phone Number</label>
                <Input
                  type="tel"
                  value={callbackPhone}
                  onChange={(e) => setCallbackPhone(e.target.value)}
                  placeholder="+91 98201 44521"
                  className="text-xs h-10 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#3D4C46] mb-1">Preferred Time Slot</label>
                <select
                  value={callbackTime}
                  onChange={(e) => setCallbackTime(e.target.value)}
                  className="w-full bg-[#F6F7F5] border border-[#E3E7E4] rounded-lg text-xs px-2.5 h-10 text-[#14211C] outline-none"
                >
                  <option value="Morning (10 AM - 1 PM)">Morning (10 AM - 1 PM)</option>
                  <option value="Afternoon (1 PM - 5 PM)">Afternoon (1 PM - 5 PM)</option>
                  <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
                </select>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full bg-[#0F766E] hover:bg-[#0D655E] text-white text-xs font-bold h-11 rounded-lg"
                >
                  Schedule My Callback
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SITE VISIT BOOKING MODAL */}
      {/* ======================================================== */}
      {siteVisitModalOpen && selectedPropertyForVisit && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E3E7E4] relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setSiteVisitModalOpen(false)}
              className="absolute top-4 right-4 text-[#5B6B65] hover:text-[#14211C]"
            >
              <X className="size-5" />
            </button>
            <div className="flex items-center gap-2 text-[#0F766E] mb-2">
              <Car className="size-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Free AC Cab Site Visit</span>
            </div>
            <h3 className="font-extrabold text-lg text-[#14211C]">
              Visit {selectedPropertyForVisit.title}
            </h3>
            <p className="text-xs text-[#5B6B65] mt-1 leading-relaxed">
              We provide a complimentary doorstep AC cab to escort your family to {selectedPropertyForVisit.locality}.
            </p>

            <form onSubmit={handleSiteVisitSubmit} className="space-y-3 mt-4">
              <div>
                <label className="block text-[11px] font-bold text-[#3D4C46] mb-1">Your Full Name</label>
                <Input
                  value={visitName}
                  onChange={(e) => setVisitName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="text-xs h-10 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#3D4C46] mb-1">WhatsApp Mobile</label>
                <Input
                  type="tel"
                  value={visitPhone}
                  onChange={(e) => setVisitPhone(e.target.value)}
                  placeholder="+91 98201 44521"
                  className="text-xs h-10 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#3D4C46] mb-1">Preferred Visit Day</label>
                <select
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="w-full bg-[#F6F7F5] border border-[#E3E7E4] rounded-lg text-xs px-2.5 h-10 text-[#14211C] outline-none"
                >
                  <option value="This Saturday">This Saturday (Recommended)</option>
                  <option value="This Sunday">This Sunday</option>
                  <option value="Weekday Afternoon">Weekday Afternoon</option>
                  <option value="Immediate Tomorrow">Immediate Tomorrow</option>
                </select>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-black h-11 rounded-lg shadow-sm"
                >
                  Confirm Free Cab Booking
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* PROPERTY DETAILS MODAL */}
      {/* ======================================================== */}
      {detailModalOpen && activeDetailProperty && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#E3E7E4] relative animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setDetailModalOpen(false)}
              className="absolute top-4 right-4 text-[#5B6B65] hover:text-[#14211C]"
            >
              <X className="size-5" />
            </button>

            <span className="text-[10px] font-bold text-[#0F766E] uppercase tracking-wider bg-[#E3F2EF] px-2.5 py-0.5 rounded-full">
              {activeDetailProperty.status}
            </span>
            <h3 className="font-extrabold text-xl text-[#14211C] mt-2">
              {activeDetailProperty.title}
            </h3>
            <div className="text-2xl font-black text-[#0F766E] mt-1">
              {activeDetailProperty.priceDisplay}
            </div>

            <p className="text-xs text-[#5B6B65] mt-3 leading-relaxed">
              {activeDetailProperty.description}
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs text-[#3D4C46] my-4 p-3 bg-[#F6F7F5] rounded-xl border border-[#E3E7E4]">
              <div><strong>Configuration:</strong> {activeDetailProperty.bhk}</div>
              <div><strong>Super Area:</strong> {activeDetailProperty.sqft} sqft</div>
              <div><strong>Locality:</strong> {activeDetailProperty.locality}, Pune</div>
              <div><strong>Possession:</strong> {activeDetailProperty.possessionDate || "Ready"}</div>
              {activeDetailProperty.builder && (
                <div><strong>Developer:</strong> {activeDetailProperty.builder}</div>
              )}
              {activeDetailProperty.reraNumber && (
                <div><strong>MahaRERA:</strong> {activeDetailProperty.reraNumber}</div>
              )}
            </div>

            {/* Amenities list */}
            {activeDetailProperty.amenities && activeDetailProperty.amenities.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-[#14211C] mb-2">Key Amenities</h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeDetailProperty.amenities.map((a) => (
                    <span
                      key={a}
                      className="text-[11px] font-medium bg-[#E3F2EF] text-[#0B4F49] px-2.5 py-1 rounded-lg flex items-center gap-1"
                    >
                      <Check className="size-3 text-[#0F766E]" />
                      <span>{a}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-5 mt-5 border-t border-[#EEF1EF] flex items-center gap-2">
              <Button
                onClick={() => {
                  setDetailModalOpen(false);
                  setSelectedPropertyForVisit(activeDetailProperty);
                  setSiteVisitModalOpen(true);
                }}
                className="flex-1 bg-[#0F766E] hover:bg-[#0D655E] text-white text-xs font-bold h-10 rounded-lg"
              >
                Book Site Visit
              </Button>
              <Button
                onClick={() => {
                  const text = encodeURIComponent(
                    `Hi Gharsetu! Please share the complete PDF brochure and floor plans for ${activeDetailProperty.title} (${activeDetailProperty.bhk}, ${activeDetailProperty.priceDisplay}) in ${activeDetailProperty.locality}.`
                  );
                  window.open(`https://wa.me/${SITE_CONFIG.whatsappPhone}?text=${text}`, "_blank");
                }}
                className="bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold h-10 px-4 rounded-lg flex items-center gap-1.5"
              >
                <MessageSquare className="size-3.5" />
                <span>Brochure</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
