import { Property } from "@/types/real-estate";
import { INITIAL_PROPERTIES } from "@/lib/mock/gharsetu";
import { SITE_CONFIG } from "@/config/site-config";

export async function getPublicProperties(): Promise<Property[]> {
  try {
    // If running in browser, try fetching from /api/properties
    if (typeof window !== "undefined") {
      const res = await fetch("/api/properties", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.properties && Array.isArray(data.properties)) {
          return data.properties;
        }
      }
    }
  } catch (err) {
    console.warn("Using fallback properties store:", err);
  }

  // Fallback to INITIAL_PROPERTIES with properly mapped image paths
  return INITIAL_PROPERTIES.map((p) => {
    const slug = p.slug || p.id;
    return {
      ...p,
      slug,
      imageUrl: p.imageUrl || `/properties/${slug}-1.jpg`,
      reraNumber: p.reraNumber || SITE_CONFIG.rera.propertyIds[slug] || SITE_CONFIG.rera.number,
    };
  });
}
