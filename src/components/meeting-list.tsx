import { MeetingCard } from "@/components/meeting-card";
import type { SacramentMeeting } from "@/types/base";

export const MeetingsList = async ({ meetings }: { meetings: SacramentMeeting[] }) => {
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
