import type { SacramentMeeting } from "@/types/base";

import { meetings } from "@/data/meeting";

export const getMeetings = async (date?: string | null): Promise<SacramentMeeting[]> => {
  if (date) return meetings.filter((meeting) => meeting.date === date);
  return meetings;
};

export const getMeetingById = async (id: number): Promise<SacramentMeeting | null> => {
  return meetings.find((meeting) => meeting.id === id) ?? null;
};

export const getCurrentSunday = async (): Promise<SacramentMeeting | null> => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek);

  const sundayDate = sunday.toISOString().split("T")[0];
  const meeting = meetings.find((meeting) => meeting.date === sundayDate);

  if (!meeting) {
    return null;
  }

  return meeting;
};
