import { Suspense } from "react";

import { MeetingDetail } from "@/components/meetings/meeting-detail";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export default function MeetingDetailPage({ params }: RouteParams) {
  return (
    <div className="mx-auto w-full max-w-7xl grow p-6">
      <main className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Meeting Detail</h1>
        <Suspense fallback={<div>Loading current meeting...</div>}>
          <MeetingDetail params={params} />
        </Suspense>
      </main>
    </div>
  );
}
