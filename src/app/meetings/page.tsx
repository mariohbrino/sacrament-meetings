import { Suspense } from "react";

import { MeetingCardPlaceholder } from "@/components/meeting-card";
import { MeetingsList } from "@/components/meeting-list";
import type { MeetingResponse } from "@/types/meeting.type";
import { getBaseUrl } from "@/utils/base-url.util";

export default async function MeetingsPage() {
  const endpointUrl: string = `${await getBaseUrl()}/api/meetings`;
  const meetings: MeetingResponse = await fetch(endpointUrl).then((response) => response.json());

  return (
    <div className="mx-auto w-full max-w-7xl grow p-6">
      <main className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Upcoming Meetings</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Suspense fallback={<MeetingCardPlaceholder />}>
            <MeetingsList meetings={meetings.data} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
