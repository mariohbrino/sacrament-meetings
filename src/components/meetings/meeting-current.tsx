import { MeetingInfo } from "@/components/meetings/meeting-info";
import { SacramentMeeting } from "@/types/base";
import { getBaseUrl } from "@/utils/base-url.util";

export const CurrentMeeting = async () => {
  const endpointUrl = `${await getBaseUrl()}/api/meetings/current`;
  const meetingDetail: SacramentMeeting = await fetch(endpointUrl).then((response) => response.json());

  if (!meetingDetail) {
    return <p className="text-secondary-foreground text-sm">No meeting found for the current Sunday.</p>;
  }

  return <MeetingInfo meetingDetail={meetingDetail} />;
};
