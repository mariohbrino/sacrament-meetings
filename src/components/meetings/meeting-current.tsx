import { connection } from "next/server";

import { MeetingInfo } from "@/components/meetings/meeting-info";
import { getCurrentSunday } from "@/services/db";

export const CurrentMeeting = async () => {
  await connection();
  const currentMeeting = await getCurrentSunday();

  if (!currentMeeting) {
    return <p className="text-secondary-foreground text-sm">No meeting found for the current Sunday.</p>;
  }

  return <MeetingInfo meetingDetail={currentMeeting} />;
};
