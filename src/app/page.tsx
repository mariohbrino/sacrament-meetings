import Image from "next/image";
import { Suspense } from "react";

import { MeetingCard, MeetingCardPlaceholder } from "@/components/meeting-card";
import { fetchApi } from "@/services/http-client";
import type { SacramentMeeting } from "@/types/base";

const MeetingsList = async () => {
  const meetings: SacramentMeeting[] = await fetchApi("api/meetings");

  return (
    <>
      {meetings.map((meeting) => (
        <MeetingCard
          key={meeting.id}
          date={meeting.date}
          presiding={meeting.presiding}
          conducting={meeting.conducting}
          meetingType={meeting.meetingType}
          link={`/meetings/${meeting.id}`}
        />
      ))}
    </>
  );
};

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-7xl grow">
      <div className="relative mb-4 aspect-1920/958 overflow-hidden">
        <Image
          src="/images/living-water-jesus-christ.jpeg"
          alt="Living Water Jesus Christ"
          fill
          loading="eager"
          sizes="(min-width: 80rem) 80rem, 100vw"
          className="object-cover object-top"
        />
      </div>
      <main className="flex flex-col gap-6 p-6">
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
