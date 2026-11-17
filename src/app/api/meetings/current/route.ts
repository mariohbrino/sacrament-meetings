import { type NextRequest, NextResponse } from "next/server";

import { createMeetingModal } from "@/models/meeting.model";
import { database } from "@/services/database.service";

const getCurrentSunday = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek);
  return sunday.toLocaleDateString("sv-SE");
};

export async function GET(request: NextRequest) {
  void request;

  try {
    const meetingModal = createMeetingModal(database);
    const meetings = await meetingModal.getMeetings(getCurrentSunday());

    if (meetings.data.length === 0) {
      return NextResponse.json({ error: "No current meeting found" }, { status: 404 });
    }

    return NextResponse.json(meetings.data[0]);
  } catch (error) {
    console.error("Error fetching current meeting:", error);
    return NextResponse.json({ error: "An error occurred while fetching the current meeting" }, { status: 500 });
  }
}
