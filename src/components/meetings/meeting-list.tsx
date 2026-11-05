import { MeetingCard } from "@/components/meetings/meeting-card";
import { fetchApi } from "@/services/http-client";
import type { SacramentMeeting } from "@/types/base";

export const MeetingsList = async () => {
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
