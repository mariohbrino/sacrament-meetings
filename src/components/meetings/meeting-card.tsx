import Link from "next/link";

import { meetingBadges } from "@/components/meetings/meeting-badges";
import type { MeetingType } from "@/types/base";
import { formatDate } from "@/utils/data-format.util";

interface MeetingCardProps {
  date: string;
  presiding: string;
  conducting: string;
  meetingType: MeetingType;
  link?: string;
}

export const MeetingCard = ({ date, meetingType, presiding, conducting, link }: MeetingCardProps) => {
  const badge = meetingBadges[meetingType];

  return (
    <article className="group border-border bg-card text-card-foreground hover:bg-secondary hover:shadow-secondary-foreground/25 flex h-full flex-col gap-4 rounded-3xl border p-4 shadow-xs transition hover:shadow-md dark:hover:shadow-white/15">
      <div className="flex items-start justify-between gap-2">
        <time dateTime={date} className="text-lg leading-snug font-bold">
          {formatDate(date)}
        </time>
        <span className={`rounded-2xl px-3 py-1 text-sm font-semibold whitespace-nowrap ${badge.color}`}>
          {badge.label}
        </span>
      </div>
      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
        <dt className="text-secondary-foreground">Presiding</dt>
        <dd className="font-medium">{presiding}</dd>
        <dt className="text-secondary-foreground">Conducting</dt>
        <dd className="font-medium">{conducting}</dd>
      </dl>
      {link && (
        <Link
          href={link}
          className="group focus-visible:ring-ring rounded-3xl focus-visible:ring-2 focus-visible:outline-none"
        >
          View program <span className="inline-block transition-transform group-hover:translate-x-0.5">&rarr;</span>
        </Link>
      )}
    </article>
  );
};

export const MeetingCardPlaceholder = ({ quantity = 6 }: { quantity?: number }) => {
  return (
    <>
      {Array.from({ length: quantity }).map((_, index) => (
        <div
          key={index}
          className="border-border bg-card flex animate-pulse flex-col gap-4 rounded-3xl border p-4 shadow-xs"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="h-7 w-1/2 rounded bg-gray-300"></div>
            <div className="h-7 w-20 rounded-2xl bg-gray-300"></div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="h-5 w-3/4 rounded bg-gray-300"></div>
            <div className="h-5 w-2/3 rounded bg-gray-300"></div>
          </div>
          <div className="h-5 w-1/3 rounded bg-gray-300"></div>
        </div>
      ))}
    </>
  );
};
