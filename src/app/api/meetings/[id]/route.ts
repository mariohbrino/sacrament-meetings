import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { createMeetingModal } from "@/models/meeting.model";
import { database } from "@/services/database.service";

const idSchema = z.string().regex(/^\d+$/).transform(Number).pipe(z.number().int().positive());

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: RouteParams) {
  void request;

  const { id: routeId } = await params;
  const parsedId = idSchema.safeParse(routeId);
  if (!parsedId.success) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const id = parsedId.data;
    const meetingModal = createMeetingModal(database);
    const meeting = await meetingModal.findById(id);

    if (!meeting) {
      return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
    }

    return NextResponse.json(meeting);
  } catch (error) {
    console.error("Error fetching meeting by ID:", error);
    return NextResponse.json({ error: "An error occurred while fetching the meeting" }, { status: 500 });
  }
}
