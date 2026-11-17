import { NextResponse } from "next/server";
import { gharsetuStore } from "@/lib/mock/store";
import { SITE_CONFIG } from "@/config/site-config";

export async function GET() {
  try {
    // Return properties from active store (or Prisma DB when connected)
    const properties = gharsetuStore.properties.map((p) => {
      const slug = p.slug || p.id;
      return {
        ...p,
        slug,
        imageUrl: p.imageUrl || `/properties/${slug}-1.jpg`,
        reraNumber: p.reraNumber || SITE_CONFIG.rera.propertyIds[slug] || SITE_CONFIG.rera.number,
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
