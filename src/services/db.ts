import type { SacramentMeeting } from "../types/base";

import { meetings } from "../data/meeting";

export const getMeetings = (date?: string | null): SacramentMeeting[] => {
  if (date) return meetings.filter((meeting) => meeting.date === date);
  return meetings;
};

export const getMeetingById = (id: number): SacramentMeeting | null => {
  return meetings.find((meeting) => meeting.id === id) ?? null;
};
