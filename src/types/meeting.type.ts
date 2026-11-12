import { meetings } from "@/database/schema";

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

export type MeetingResponse = {
  data: SacramentMeeting[];
  previousPage: number | null;
  nextPage: number | null;
  total: number;
  totalPages: number;
};
