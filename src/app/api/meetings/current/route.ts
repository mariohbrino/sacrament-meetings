import { type NextRequest, NextResponse } from "next/server";

import { getMeetings } from "@/models/meeting.model";

const getCurrentSunday = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek);
  return sunday.toLocaleDateString("sv-SE");
};

export async function GET(request: NextRequest) {
  void request;

  const meetings = await getMeetings(getCurrentSunday());

  if (meetings.data.length === 0) {
    return NextResponse.json({ error: "No current meeting found" }, { status: 404 });
  }

  return NextResponse.json(meetings.data[0]);
}
