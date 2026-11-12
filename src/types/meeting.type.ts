import { meetings } from "@/database/schema";

export type MeetingType = "testimony" | "regular" | "stake" | "general" | "special";

export type SacramentMeeting = typeof meetings.$inferSelect;

export type MeetingResponse = {
  data: SacramentMeeting[];
  previousPage: number | null;
  nextPage: number | null;
  total: number;
  totalPages: number;
};
