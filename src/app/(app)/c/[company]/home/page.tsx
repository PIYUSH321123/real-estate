"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { Property } from "@/types/real-estate";
import { getPublicProperties } from "@/lib/services/property-service";
import { toast } from "sonner";

// Landing page components matching approved docs/landing-reference.html design
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { SearchCard } from "@/components/landing/SearchCard";
import { TrustBar } from "@/components/landing/TrustBar";
import { Filters, FilterChipKey } from "@/components/landing/Filters";
import { PropertyCard } from "@/components/landing/PropertyCard";
import { Areas } from "@/components/landing/Areas";
import { Steps } from "@/components/landing/Steps";
import { Reviews } from "@/components/landing/Reviews";
import { FAQ } from "@/components/landing/FAQ";
import { VisitForm } from "@/components/landing/VisitForm";
import { VisitModal } from "@/components/landing/VisitModal";
import { Footer } from "@/components/landing/Footer";
import { MobileBar } from "@/components/landing/MobileBar";

const AREAS = ["Baner", "Wakad", "Kharadi", "Hinjewadi", "Hadapsar", "Lonavala"];

export default function GharsetuPublicLandingPage() {
  const params = useParams();
  const companySlug =
    (Array.isArray(params.company) ? params.company[0] : params.company) || "gharsetu";

  const [properties, setProperties] = React.useState<Property[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Filter state
  const [chip, setChip] = React.useState<FilterChipKey>("all");
  const [area, setArea] = React.useState<string>("any");
  const [homeType, setHomeType] = React.useState<string>("any");
  const [budget, setBudget] = React.useState<string>("any");

  // Interactive Saved state
  const [saved, setSaved] = React.useState<Record<string, boolean>>({});

  // Selected property for site visit
  const [selectedVisitPropertyId, setSelectedVisitPropertyId] = React.useState<string>("");

  // Modal state for Site Visit booking card
  const [visitModalOpen, setVisitModalOpen] = React.useState(false);

  // Quick detail modal state
  const [detailModalProperty, setDetailModalProperty] = React.useState<Property | null>(null);

  // Fetch properties from real API or mock service fallback
  React.useEffect(() => {
    async function loadProperties() {
      try {
        const data = await getPublicProperties();
        setProperties(data);
        if (data.length > 0) {
          setSelectedVisitPropertyId(data[0].id);
        }
      } catch (err) {
        console.error("Failed to load properties:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProperties();
  }, []);

  // Filter evaluation logic matching docs/landing-reference.html
  const filteredList = React.useMemo(() => {
    return properties.filter((l) => {
      // 1. Chip status filter
      if (chip === "ready" && l.status !== "Ready") return false;
      if (chip === "uc" && l.status !== "Under construction") return false;
      if (chip === "plot" && l.type !== "Plot") return false;
      if (chip === "commercial" && l.type !== "Commercial") return false;

      // 2. Area locality filter
      if (area !== "any" && l.locality !== area) return false;

      // 3. Home type / BHK filter
      if (homeType !== "any") {
        if (homeType === "Commercial") {
          if (l.type !== "Commercial") return false;
        } else if (homeType === "Plot") {
          if (l.type !== "Plot") return false;
        } else if (homeType === "4 BHK") {
          if (!l.bhk.includes("4 BHK")) return false;
        } else if (!l.bhk.includes(homeType)) {
          return false;
        }
      }

      // 4. Budget filter (in Lakhs)
      const lakh = l.price / 100000;
      if (budget === "lt50" && !(lakh < 50)) return false;
      if (budget === "50-100" && !(lakh >= 50 && lakh <= 100)) return false;
      if (budget === "100-200" && !(lakh > 100 && lakh <= 200)) return false;
      if (budget === "gt200" && !(lakh > 200)) return false;

      return true;
    });
  }, [properties, chip, area, homeType, budget]);

  const handleToggleSave = (id: string, title: string) => {
    setSaved((prev) => {
      const nextState = !prev[id];
      if (nextState) {
        toast.success(`Saved ${title} to your shortlisted homes!`);
      } else {
        toast.info(`Removed ${title} from saved homes.`);
      }
      return { ...prev, [id]: nextState };
    });
  };

  const handleClearFilters = () => {
    setChip("all");
    setArea("any");
    setHomeType("any");
    setBudget("any");
  };

  const handleBookVisit = (property: Property) => {
    setSelectedVisitPropertyId(property.id);
    setVisitModalOpen(true);
  };

  const handleViewDetails = (property: Property) => {
    setDetailModalProperty(property);
  };

  return (
    <>
      {/* 1. Header */}
      <Header companySlug={companySlug} />

      <main id="top">
        {/* 2. Hero */}
        <Hero
          featuredProperty={properties[0] || null}
          propertyCount={properties.length || 6}
          onOpenVisitModal={() => setVisitModalOpen(true)}
        />

        {/* 3. SearchCard (Floating over Hero + Dark Band) & 4. Full-Bleed Obsidian TrustBar */}
        <section className="gh-search-band" aria-label="Property search and trust highlights">
          <div className="gh-wrap">
            <SearchCard
              areas={AREAS}
              area={area}
              setArea={setArea}
              homeType={homeType}
              setHomeType={setHomeType}
              budget={budget}
              setBudget={setBudget}
              onSearch={() => {}}
            />
          </div>
          <div className="gh-trust-section">
            <div className="gh-wrap">
              <TrustBar />
            </div>
          </div>
        </section>

        <div className="gh-wrap">

          {/* 5. Filters & 6. PropertyCards */}
          <section className="gh-block" id="homes" aria-label="Featured properties">
            <Filters
              activeChip={chip}
              onSelectChip={(newChip) => setChip(newChip)}
              totalCount={properties.length}
              filteredCount={filteredList.length}
            />

            {filteredList.length === 0 ? (
              <div className="gh-empty">
                <p>No homes match these filters.</p>
                <p style={{ marginTop: "12px" }}>
                  <button
                    className="gh-btn gh-btn-brand"
                    type="button"
                    onClick={handleClearFilters}
                  >
                    Clear filters
                  </button>
                </p>
              </div>
            ) : (
              <div className="gh-grid">
                {filteredList.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    isSaved={Boolean(saved[property.id])}
                    onToggleSave={handleToggleSave}
                    onViewDetails={handleViewDetails}
                    onBookVisit={handleBookVisit}
                  />
                ))}
              </div>
            )}
          </section>

          {/* 7. Areas */}
          <Areas
            areas={AREAS}
            properties={properties}
            onSelectArea={(selectedArea) => {
              setArea(selectedArea);
              setChip("all");
            }}
          />

          {/* 8. Steps */}
          <Steps />

          {/* 9. Reviews */}
          <Reviews />

          {/* 10. FAQ */}
          <FAQ />
        </div>

        {/* 11. VisitForm (Dark Teal Band Section) */}
        <VisitForm
          properties={properties}
          selectedPropertyId={selectedVisitPropertyId}
          onSelectPropertyId={(id) => setSelectedVisitPropertyId(id)}
        />
      </main>

      {/* 12. Footer */}
      <Footer />

      {/* 13. MobileBar (Fixed on mobile <= 640px) */}
      <MobileBar />

      {/* Property Details Modal */}
      {detailModalProperty && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="detail-title"
        >
          <div className="bg-white dark:bg-[#102120] text-[#0D1F1E] dark:text-[#E7F2F0] rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#D5E2DF] dark:border-[#1F3836] relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setDetailModalProperty(null)}
              className="absolute top-4 right-4 text-[#4A605E] hover:text-[#0D1F1E] dark:hover:text-white"
              aria-label="Close dialog"
            >
              ✕
            </button>

            <span className="text-[11px] font-bold text-[#0B6A62] dark:text-[#3CC4B4] uppercase tracking-wider bg-[#E1EFEC] dark:bg-[#143533] px-2.5 py-0.5 rounded-full">
              {detailModalProperty.status}
            </span>

            <h3 id="detail-title" className="font-extrabold text-2xl mt-2">
              {detailModalProperty.title}
            </h3>

            <div className="text-2xl font-black text-[#0B6A62] dark:text-[#3CC4B4] mt-1">
              {detailModalProperty.priceDisplay}
            </div>

            <p className="text-sm text-[#4A605E] dark:text-[#9DB6B3] mt-3 leading-relaxed">
              {detailModalProperty.description}
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs my-4 p-3 bg-[#F2F7F6] dark:bg-[#0A1514] rounded-xl border border-[#D5E2DF] dark:border-[#1F3836]">
              <div>
                <strong>Configuration:</strong> {detailModalProperty.bhk}
              </div>
              <div>
                <strong>Super Area:</strong> {detailModalProperty.sqft.toLocaleString("en-IN")} sq ft
              </div>
              <div>
                <strong>Locality:</strong> {detailModalProperty.locality}, Pune
              </div>
              <div>
                <strong>Possession:</strong> {detailModalProperty.possessionDate || "Immediate"}
              </div>
              {detailModalProperty.builder && (
                <div>
                  <strong>Developer:</strong> {detailModalProperty.builder}
                </div>
              )}
              <div>
                <strong>MahaRERA:</strong> {detailModalProperty.reraNumber || "Verified"}
              </div>
            </div>

            {detailModalProperty.amenities && detailModalProperty.amenities.length > 0 && (
              <div className="mb-4">
                <h4 className="text-xs font-bold uppercase tracking-wider mb-2 text-[#4A605E] dark:text-[#9DB6B3]">
                  Key Amenities
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {detailModalProperty.amenities.map((a) => (
                    <span
                      key={a}
                      className="text-xs font-medium bg-[#E1EFEC] dark:bg-[#143533] text-[#0A4B45] dark:text-[#A8E6DD] px-2.5 py-1 rounded-lg"
                    >
                      ✓ {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-[#D5E2DF] dark:border-[#1F3836] flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedVisitPropertyId(detailModalProperty.id);
                  setDetailModalProperty(null);
                  setVisitModalOpen(true);
                }}
                className="gh-btn gh-btn-cta flex-1"
              >
                Book a free site visit
              </button>
              <button
                type="button"
                onClick={() => setDetailModalProperty(null)}
                className="gh-btn gh-btn-ghost"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Site Visit Booking Card Modal */}
      <VisitModal
        open={visitModalOpen}
        onClose={() => setVisitModalOpen(false)}
        properties={properties}
        selectedPropertyId={selectedVisitPropertyId}
        onSelectPropertyId={(id) => setSelectedVisitPropertyId(id)}
      />
    </>
  );
}
