import { NextRequest, NextResponse } from "next/server";
import { gharsetuStore } from "@/lib/mock/store";

export async function GET() {
  try {
    return NextResponse.json({ siteVisits: gharsetuStore.siteVisits }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch site visits:", error);
    return NextResponse.json({ error: "Unable to load site visits." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.leadName || !body.propertyTitle) {
      return NextResponse.json(
        { error: "leadName and propertyTitle are required." },
        { status: 400 }
      );
    }

    const created = gharsetuStore.addSiteVisit({
      leadId: body.leadId || `lead-${Date.now()}`,
      leadName: body.leadName,
      leadMobile: body.leadMobile || "+91 98000 00000",
      propertyId: body.propertyId || "skyline",
      propertyTitle: body.propertyTitle,
      locality: body.locality || "Baner",
      date: body.date || "This Saturday",
      time: body.time || "11:00 AM",
      status: body.status || "Confirmed",
      agentName: body.agentName || "Sameer Khan",
      routeOrder: gharsetuStore.siteVisits.length + 1,
    });

    return NextResponse.json({ siteVisit: created }, { status: 201 });
  } catch (error) {
    console.error("Failed to schedule site visit:", error);
    return NextResponse.json(
      { error: "Internal server error while scheduling site visit." },
      { status: 500 }
    );
  }
}
