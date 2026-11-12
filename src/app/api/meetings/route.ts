import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { getMeetings } from "@/models/meeting.model";

const dateSchema = z.coerce.date();

export async function GET(request: NextRequest) {
  const date = new URL(request.url).searchParams.get("date");

  const parsedDate = dateSchema.safeParse(date);
  if (!parsedDate.success) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  if (date) {
    const queryDate = parsedDate.data.toISOString().split("T")[0];
    const meetings = await getMeetings(queryDate);
    return NextResponse.json(meetings);
  }

  const meetings = await getMeetings();
  return NextResponse.json(meetings);
}
