import { redirect } from "next/navigation";

import { MeetingInfo } from "@/components/meetings/meeting-info";
import { SacramentMeeting } from "@/types/base";
import { getBaseUrl } from "@/utils/base-url.util";

export const CurrentMeeting = async () => {
  const endpointUrl = `${await getBaseUrl()}/api/meetings/current`;
  const response = await fetch(endpointUrl);
  if (!response.ok) {
    // return <p className="text-secondary-foreground text-sm">No meeting found for the current Sunday.</p>;
    redirect("/meetings");
  }

  const meetingDetail: SacramentMeeting = await response.json();

  return <MeetingInfo meetingDetail={meetingDetail} />;
};
