import { NextResponse } from "next/server";
import { gharsetuStore } from "@/lib/mock/store";
import { INITIAL_PROPERTIES } from "@/lib/mock/gharsetu";
import { SITE_CONFIG } from "@/config/site-config";

const LEGACY_IDS = new Set(["prop-1", "prop-2", "prop-3", "prop-4", "prop-5", "prop-6"]);
const SEED_BY_ID = new Map(INITIAL_PROPERTIES.map((p) => [p.id, p]));

export async function GET() {
  try {
    const properties = gharsetuStore.properties
      .filter((p) => p && !LEGACY_IDS.has(p.id))
      .map((p) => {
        const seed = SEED_BY_ID.get(p.id);
        const slug = seed?.slug || p.slug || p.id;
        return {
          ...p,
          slug,
          imageUrl: seed?.imageUrl || p.imageUrl || `/properties/${slug}-1.jpg`,
          reraNumber:
            p.reraNumber ||
            SITE_CONFIG.rera.propertyIds[slug] ||
            SITE_CONFIG.rera.number,
        };
      });

    return NextResponse.json({ properties }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch properties:", error);
    return NextResponse.json(
      { error: "Unable to load properties right now" },
      { status: 500 }
    );
  }
}
