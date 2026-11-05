import { meetingBadges } from "@/components/meetings/meeting-badges";
import type { Hymn, SacramentMeeting } from "@/types/base";
import { formatDate } from "@/utils/data-format.util";

type MeetingDetailProps = {
  meetingDetail: SacramentMeeting;
};

const HymnValue = ({ hymn }: { hymn: Hymn }) => (
  <span>
    <span className="text-secondary-foreground">#{hymn.number}</span> {hymn.title}
  </span>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="flex flex-col gap-2">
    <h3 className="text-secondary-foreground text-sm font-semibold tracking-wide uppercase">{title}</h3>
    {children}
  </section>
);

export const MeetingInfo = async ({ meetingDetail }: MeetingDetailProps) => {
  const badge = meetingBadges[meetingDetail.meetingType];
  const {
    date,
    presiding,
    conducting,
    announcements,
    openingHymn,
    openingPrayer,
    wardBusiness,
    stakeBusiness,
    sacramentHymn,
    speakers,
    closingHymn,
    closingPrayer,
  } = meetingDetail;

  return (
    <article className="border-border bg-card text-card-foreground flex flex-col gap-6 rounded-3xl border p-6 shadow-xs">
      <header className="flex items-start justify-between gap-2">
        <h2 className="text-2xl leading-snug font-bold">
          <time dateTime={date}>{formatDate(date)}</time>
        </h2>
        <span className={`rounded-2xl px-3 py-1 text-sm font-semibold whitespace-nowrap ${badge.color}`}>
          {badge.label}
        </span>
      </header>

      <Section title="Leadership">
        <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
          <dt className="text-secondary-foreground">Presiding</dt>
          <dd className="font-medium">{presiding}</dd>
          <dt className="text-secondary-foreground">Conducting</dt>
          <dd className="font-medium">{conducting}</dd>
        </dl>
      </Section>

      {announcements && announcements.length > 0 && (
        <Section title="Announcements">
          <ul className="list-inside list-disc text-sm">
            {announcements.map((announcement) => (
              <li key={announcement}>{announcement}</li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="Opening">
        <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
          <dt className="text-secondary-foreground">Opening Hymn</dt>
          <dd className="font-medium">
            <HymnValue hymn={openingHymn} />
          </dd>
          <dt className="text-secondary-foreground">Opening Prayer</dt>
          <dd className="font-medium">{openingPrayer}</dd>
        </dl>
      </Section>

      <Section title="Business">
        {wardBusiness.length > 0 ? (
          <ul className="list-inside list-disc text-sm">
            {wardBusiness.map((item) => (
              <li key={item.description}>{item.description}</li>
            ))}
          </ul>
        ) : (
          <p className="text-secondary-foreground text-sm">No ward business</p>
        )}
        {stakeBusiness && <p className="text-sm font-medium">Stake business will be conducted</p>}
      </Section>

      <Section title="Sacrament">
        <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
          <dt className="text-secondary-foreground">Sacrament Hymn</dt>
          <dd className="font-medium">
            <HymnValue hymn={sacramentHymn} />
          </dd>
        </dl>
      </Section>

      <Section title="Program">
        <ul className="flex flex-col gap-2 text-sm">
          {speakers.map((speaker) => (
            <li key={`${speaker.name}-${speaker.topic}`} className="flex flex-col">
              <span className="font-medium">
                {speaker.name}
                {speaker.type === "musical-number" && (
                  <span className="text-secondary-foreground"> &middot; Musical Number</span>
                )}
              </span>
              {speaker.topic && <span className="text-secondary-foreground">{speaker.topic}</span>}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Closing">
        <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
          <dt className="text-secondary-foreground">Closing Hymn</dt>
          <dd className="font-medium">
            <HymnValue hymn={closingHymn} />
          </dd>
          <dt className="text-secondary-foreground">Closing Prayer</dt>
          <dd className="font-medium">{closingPrayer}</dd>
        </dl>
      </Section>
    </article>
  );
};
