import { MeetingCard } from "@/components/meeting-card";
import type { SacramentMeeting } from "@/types/meeting.type";

export const MeetingsList = async ({
  meetings,
  actions = false,
}: {
  meetings: SacramentMeeting[];
  actions?: boolean;
}) => {
  return (
    <>
      {meetings.map((meeting: SacramentMeeting) => (
        <MeetingCard
          id={meeting.id}
          key={meeting.id}
          date={meeting.date}
          presiding={meeting.presiding}
          conducting={meeting.conducting}
          meetingType={meeting.meetingType}
          link={`/meetings/${meeting.id}`}
          actions={actions}
        />
      ))}
    </>
  );
};
