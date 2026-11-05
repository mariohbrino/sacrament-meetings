import { MeetingInfo } from "@/components/meetings/meeting-info";
import { fetchApi } from "@/services/http-client";
import type { SacramentMeeting } from "@/types/base";

export const CurrentMeeting = async () => {
  const currentMeeting: SacramentMeeting = await fetchApi("/api/meetings/current");
  return <MeetingInfo meetingDetail={currentMeeting} />;
};
