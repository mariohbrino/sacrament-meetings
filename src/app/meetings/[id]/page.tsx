import { Suspense } from "react";
import { z } from "zod";

import { MeetingInfo } from "@/components/meeting-info";
import PrintButton from "@/components/ui/print-button";
import { SacramentMeeting } from "@/types/base";
import { getBaseUrl } from "@/utils/base-url.util";
import { notFound } from "next/navigation";

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

const CurrentMeeting = async ({ params }: RouteParams) => {
  const { id } = await params;
  const meetingDetail = await fetchMeetingById(id);
  return <MeetingInfo meetingDetail={meetingDetail} />;
};

export default function MeetingDetailPage({ params }: RouteParams) {
  return (
    <div className="mx-auto w-full max-w-7xl grow p-6">
      <main className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Meeting Detail</h1>
          <PrintButton />
        </div>
        <Suspense fallback={<div>Loading current meeting...</div>}>
          <CurrentMeeting params={params} />
        </Suspense>
      </main>
    </div>
  );
}
