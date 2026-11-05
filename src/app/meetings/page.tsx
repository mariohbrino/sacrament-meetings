import { Suspense } from "react";

import { MeetingCardPlaceholder } from "@/components/meetings/meeting-card";
import { MeetingsList } from "@/components/meetings/meeting-list";

export default function MeetingsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl grow p-6">
      <main className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Upcoming Meetings</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Suspense fallback={<MeetingCardPlaceholder />}>
            <MeetingsList />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
