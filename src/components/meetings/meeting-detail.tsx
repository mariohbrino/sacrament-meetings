import { notFound } from "next/navigation";
import { z } from "zod";

import { MeetingInfo } from "@/components/meetings/meeting-info";
import { getMeetingById } from "@/services/db";

const idSchema = z.number().int().positive();

type RouteParams = {
  params: Promise<{ id: string }>;
};

export const MeetingDetail = async ({ params }: RouteParams) => {
  const { id } = await params;

  const parsedId = idSchema.safeParse(Number(id));
  if (!parsedId.success) notFound();

  const meetingDetail = await getMeetingById(parsedId.data);
  if (!meetingDetail) notFound();

  return <MeetingInfo meetingDetail={meetingDetail} />;
};
