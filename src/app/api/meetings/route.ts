import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { createMeetingModal } from "@/models/meeting.model";
import { database } from "@/services/database.service";
import { paginationSchema } from "@/validations/pagination.validate";

const dateSchema = z.object({ date: z.coerce.date().optional() });

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const schema = paginationSchema.extend(dateSchema.shape);
  const validated = schema.safeParse(Object.fromEntries(searchParams));

  if (!validated.success) {
    return NextResponse.json({ error: "Invalid request parameters", errors: validated.error.issues }, { status: 400 });
  }

  const { page, query, limit, date } = validated.data;

  try {
    const meetingModal = createMeetingModal(database);

    if (date) {
      const queryDate = date.toLocaleDateString("sv-SE");
      const meetings = await meetingModal.getMeetings(queryDate);
      return NextResponse.json(meetings);
    }

    const meetings = await meetingModal.getMeetings(date, page, query, limit);
    return NextResponse.json(meetings);
  } catch (error) {
    console.error("Error fetching meetings:", error);
    return NextResponse.json({ error: "An error occurred while fetching the meetings" }, { status: 500 });
  }
}
