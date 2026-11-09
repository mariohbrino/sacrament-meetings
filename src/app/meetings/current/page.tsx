import { Suspense } from "react";

import { CurrentMeeting } from "@/components/meetings/meeting-current";
import PrintButton from "@/components/ui/print-button";

export default async function CurrentMeetingDetailPage() {
  return (
    <div className="mx-auto w-full max-w-7xl grow p-6">
      <main className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Current Sunday Meeting Detail</h1>
          <PrintButton />
        </div>
        <Suspense fallback={<div>Loading current meeting...</div>}>
          <CurrentMeeting />
        </Suspense>
      </main>
    </div>
  );
}
