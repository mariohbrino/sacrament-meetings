import type { MeetingType } from "@/types/base";

export const meetingBadges: Record<MeetingType, { label: string; color: string }> = {
  testimony: { label: "Testimony", color: "bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200" },
  regular: { label: "Regular", color: "bg-green-100 text-green-900 dark:bg-green-950 dark:text-green-200" },
  stake: { label: "Stake", color: "bg-yellow-100 text-yellow-900 dark:bg-yellow-950 dark:text-yellow-200" },
  general: { label: "General", color: "bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-200" },
};
