import { NextRequest, NextResponse } from "next/server";
import { submitWebsiteLead } from "@/lib/services/lead-service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await submitWebsiteLead(body);

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
