import { redirect } from "next/navigation";
import { Suspense } from "react";

import { MeetingInfo } from "@/components/meeting-info";
import PrintButton from "@/components/ui/print-button";
import { SacramentMeeting } from "@/types/base";
import { getBaseUrl } from "@/utils/base-url.util";

const fetchCurrentMeeting = async () => {
  const endpointUrl = `${await getBaseUrl()}/api/meetings/current`;
  const response = await fetch(endpointUrl);
  if (!response.ok) {
    redirect("/meetings");
  }
  return response.json();
};

async function CurrentMeeting() {
  const meetingDetail: SacramentMeeting = await fetchCurrentMeeting();
  return <MeetingInfo meetingDetail={meetingDetail} />;
}

export default function CurrentMeetingDetailPage() {
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
