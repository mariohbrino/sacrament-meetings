import Link from "next/link";

import { meetingBadges } from "@/components/meeting-badges";
import { RemoveButton } from "@/components/meeting-remove";
import type { MeetingType } from "@/types/meeting.type";
import { formatDate } from "@/utils/data-format.util";

interface MeetingCardProps {
  id: number;
  date: string;
  presiding: string;
  conducting: string;
  meetingType: MeetingType;
  link: string;
  actions?: boolean;
}

export const MeetingCard = ({
  id,
  date,
  meetingType,
  presiding,
  conducting,
  link,
  actions = false,
}: MeetingCardProps) => {
  const badge = meetingBadges[meetingType];

  return (
    <div className="border-border bg-foreground/10 flex flex-col rounded-4xl border-2 p-0.5">
      <article className="group border-border bg-card text-card-foreground hover:shadow-secondary-foreground/25 dark:hover:shadow-foreground/5 flex h-full flex-col gap-4 rounded-3xl border p-4 shadow-xs transition hover:shadow-md">
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
      {actions && (
        <div className="flex justify-between px-4 py-3">
          <Link href={`${link}/edit`} className="text-foreground hover:underline">
            Edit
          </Link>
          <RemoveButton id={id} />
        </div>
      )}
    </div>
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
