import { Suspense } from "react";

import { MeetingDetail } from "@/components/meetings/meeting-detail";
import PrintButton from "@/components/ui/print-button";

type RouteParams = {
  params: Promise<{ id: string }>;
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
          <MeetingDetail params={params} />
        </Suspense>
      </main>
    </div>
  );
}
