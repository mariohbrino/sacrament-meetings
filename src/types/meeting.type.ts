import type z from "zod";

import { meetings } from "@/database/schema";
import type { meetingSchema } from "@/validations/meeting.validate";

export type MeetingType = "testimony" | "regular" | "stake" | "general";

export interface Hymn {
  number: number;
  title: string;
}

export interface SpeakerItem {
  name: string;
  topic: string;
  type: "speaker" | "musical-number";
}

export interface WardBusinessItem {
  description: string;
}

export type SacramentMeeting = typeof meetings.$inferSelect;

export type SacramentMeetingField = keyof Omit<SacramentMeeting, "id" | "createdAt" | "updatedAt">;

export type SacramentMeetingState = {
  values?: Partial<z.input<typeof meetingSchema>>;
  message?: string;
  errors?: Partial<Record<SacramentMeetingField, string[]>>;
};
