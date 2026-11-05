import type { SacramentMeeting } from "@/types/base";

import { meetings } from "@/data/meeting";

export const getMeetings = async (date?: string | null): Promise<SacramentMeeting[]> => {
  if (date) return meetings.filter((meeting) => meeting.date === date);
  return meetings;
};

export const getMeetingById = async (id: number): Promise<SacramentMeeting | null> => {
  return meetings.find((meeting) => meeting.id === id) ?? null;
};
