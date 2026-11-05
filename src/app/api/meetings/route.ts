import { type NextRequest, NextResponse } from "next/server";

import { getMeetings } from "@/services/db";

export async function GET(request: NextRequest) {
  void request;
  const meetings = await getMeetings();
  return NextResponse.json(meetings);
}
