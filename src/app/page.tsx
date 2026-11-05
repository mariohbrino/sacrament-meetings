import Image from "next/image";
import { Suspense } from "react";

import { MeetingCardPlaceholder } from "@/components/meetings/meeting-card";
import { MeetingsList } from "@/components/meetings/meeting-list";

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
