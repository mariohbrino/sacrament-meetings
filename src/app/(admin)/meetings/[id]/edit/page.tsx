import { notFound } from "next/navigation";
import z from "zod";

import MeetingEditForm from "@/components/meeting-edit-form";
import type { SacramentMeeting } from "@/types/meeting.type";
import { getBaseUrl } from "@/utils/base-url.util";

const idSchema = z.string().regex(/^\d+$/).transform(Number).pipe(z.number().int().positive());

type RouteParams = {
  params: Promise<{ id: string }>;
};

const fetchMeetingById = async (id: string) => {
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
  return meetingDetail;
};

export default async function EditMeetingPage({ params }: RouteParams) {
  const { id } = await params;
  const meeting = await fetchMeetingById(id);

  return (
    <div className="mx-auto flex w-full max-w-7xl grow flex-col items-center p-6">
      <h1 className="mb-2 text-3xl font-bold">Edit Meeting</h1>
      <p className="mb-6 opacity-80">Fill out the form below to update the sacrament meeting.</p>
      <MeetingEditForm meeting={meeting} />
    </div>
  );
}
