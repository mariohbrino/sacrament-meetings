import { notFound } from "next/navigation";
import { z } from "zod";

import { MeetingInfo } from "@/components/meetings/meeting-info";
import { SacramentMeeting } from "@/types/base";
import { getBaseUrl } from "@/utils/base-url.util";

const idSchema = z.string().regex(/^\d+$/).transform(Number).pipe(z.number().int().positive());

type RouteParams = {
  params: Promise<{ id: string }>;
};

export const MeetingDetail = async ({ params }: RouteParams) => {
  const { id } = await params;

  const parsedId = idSchema.safeParse(id);
  if (!parsedId.success) {
    notFound();
  }

  const endpointUrl = `${await getBaseUrl()}/api/meetings/${parsedId.data}`;

  const response = await fetch(endpointUrl);
  if (!response.ok) {
    notFound();
  }

  const meetingDetail: SacramentMeeting = await response.json();

  return <MeetingInfo meetingDetail={meetingDetail} />;
};
