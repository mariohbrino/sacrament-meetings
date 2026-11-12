import { and, eq, getTableColumns, ilike, or, sql } from "drizzle-orm";

import * as tables from "@/database/schema";
import { database } from "@/services/database.service";
import type { SacramentMeeting } from "@/types/meeting.type";
import type { PaginationResponse } from "@/types/pagination.type";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/utils/pagination.util";

export const getMeetings = async (
  date?: string,
  page = DEFAULT_PAGE,
  query?: string,
  limit = DEFAULT_PAGE_SIZE,
): Promise<PaginationResponse> => {
  const offset = (page - 1) * limit;

  const conditions = [];

  if (query) {
    conditions.push(
      or(
        ilike(tables.meetings.presiding, `%${query}%`),
        ilike(tables.meetings.conducting, `%${query}%`),
        ilike(tables.meetings.meetingType, `%${query}%`),
        sql`${tables.meetings.speakers}::text ilike ${`%${query}%`}`,
      ),
    );
  }

  if (date) {
    conditions.push(eq(tables.meetings.date, date));
  }

  const rows = await database()
    .select({
      ...getTableColumns(tables.meetings),
      total: sql<number>`count(*) over()`.mapWith(Number),
    })
    .from(tables.meetings)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .limit(limit)
    .offset(offset);

  const total = rows[0]?.total ?? 0;

  const data = rows.map(({ total, ...meeting }) => {
    void total;
    return meeting;
  });

  return {
    data,
    total,
    previousPage: page > 1 ? page - 1 : null,
    nextPage: page < Math.ceil(total / limit) ? page + 1 : null,
    totalPages: Math.ceil(total / limit),
  };
};

export const getMeetingById = async (id: number): Promise<SacramentMeeting | undefined> => {
  const result = await database().select().from(tables.meetings).where(eq(tables.meetings.id, id));
  return result[0] ? result[0] : undefined;
};
