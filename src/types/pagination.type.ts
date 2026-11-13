import type { SacramentMeeting } from "@/types/meeting.type";

export type PaginationResponse = {
  data: SacramentMeeting[];
  previousPage: number | null;
  nextPage: number | null;
  total: number;
  totalPages: number;
};
