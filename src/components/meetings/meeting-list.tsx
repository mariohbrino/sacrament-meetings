import { MeetingCard } from "@/components/meetings/meeting-card";
import type { SacramentMeeting } from "@/types/base";
import { getBaseUrl } from "@/utils/base-url.util";

export const MeetingsList = async () => {
  const meetings: SacramentMeeting[] = await fetch(`${await getBaseUrl()}/api/meetings`).then((response) =>
    response.json(),
  );

  return (
    <>
      {meetings.map((meeting: SacramentMeeting) => (
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
