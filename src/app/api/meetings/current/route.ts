import { type NextRequest, NextResponse } from "next/server";

import { getCurrentSunday } from "@/services/db";

export async function GET(request: NextRequest) {
  void request;
  const meeting = await getCurrentSunday();

  if (!meeting) {
    return NextResponse.json({ error: "No current meeting found" }, { status: 404 });
  }

  return NextResponse.json(meeting);
}
