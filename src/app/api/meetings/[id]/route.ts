import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const idSchema = z.number().int().positive();

import { getMeetingById } from "@/services/db";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: RouteParams) {
  void request;

  const { id: routeId } = await params;
  const parsedId = idSchema.safeParse(Number(routeId));
  if (!parsedId.success) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const id = parsedId.data;
  const meeting = await getMeetingById(id);

  if (!meeting) {
    return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
  }

  return NextResponse.json(meeting);
}
