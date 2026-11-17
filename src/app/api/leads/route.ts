import { NextRequest, NextResponse } from "next/server";
import { processWebsiteLead } from "@/lib/services/lead-service";
import { gharsetuStore } from "@/lib/mock/store";

export async function GET() {
  try {
    return NextResponse.json(
      {
        leads: gharsetuStore.leads,
        siteVisits: gharsetuStore.siteVisits,
        followUps: gharsetuStore.followUps,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to load CRM leads & visits:", error);
    return NextResponse.json(
      { error: "Unable to load CRM leads right now." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = processWebsiteLead(body);

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 400 });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Failed to capture website lead:", error);
    return NextResponse.json(
      { error: "Internal server error while processing your inquiry." },
      { status: 500 }
    );
  }
}
