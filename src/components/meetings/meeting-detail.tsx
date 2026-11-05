import { z } from "zod";

import { MeetingInfo } from "@/components/meetings/meeting-info";
import { fetchApi } from "@/services/http-client";
import type { SacramentMeeting } from "@/types/base";

const idSchema = z.number().int().positive();

type RouteParams = {
  params: Promise<{ id: string }>;
};

export const MeetingDetail = async ({ params }: RouteParams) => {
  const { id } = await params;
  const meetingId = idSchema.parse(Number(id));
  const meetingDetail: SacramentMeeting = await fetchApi(`api/meetings/${meetingId}`);
  return <MeetingInfo meetingDetail={meetingDetail} />;
};
