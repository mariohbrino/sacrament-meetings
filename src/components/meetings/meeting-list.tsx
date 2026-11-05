import { MeetingCard } from "@/components/meetings/meeting-card";
import { getMeetings } from "@/services/db";

export const MeetingsList = async () => {
  const meetings = await getMeetings();

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
