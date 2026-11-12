import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { getMeetings } from "@/models/meeting.model";
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

  if (date) {
    const queryDate = date.toLocaleDateString("sv-SE");
    const meetings = await getMeetings(queryDate);
    return NextResponse.json(meetings);
  }

  const meetings = await getMeetings(date, page, query, limit);
  return NextResponse.json(meetings);
}
