import { and, desc, eq, getTableColumns, ilike, or, sql } from "drizzle-orm";

import * as tables from "@/database/schema";
import type { Database } from "@/types/database.type";
import type { SacramentMeeting } from "@/types/meeting.type";
import type { PaginationResponse } from "@/types/pagination.type";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/utils/pagination.util";

export const createMeetingModal = (database: Database) => {
  const getMeetings = async (
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

    try {
      const rows = await database()
        .select({
          ...getTableColumns(tables.meetings),
          total: sql<number>`count(*) over()`.mapWith(Number),
        })
        .from(tables.meetings)
        .where(conditions.length > 0 ? and(...conditions) : undefined)
        .orderBy(desc(tables.meetings.date))
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
    } catch (error) {
      console.log("Error occurred while fetching meetings", error);
      throw new Error("Failed to fetch meetings");
    }
  };

  const getMeetingById = async (id: number): Promise<SacramentMeeting | undefined> => {
    try {
      const result = await database().select().from(tables.meetings).where(eq(tables.meetings.id, id));
      return result[0] ? result[0] : undefined;
    } catch (error) {
      console.log("Error occurred while fetching meeting by ID", error);
      throw new Error("Failed to fetch meeting by ID");
    }
  };

  const storeMeeting = async (data: Omit<SacramentMeeting, "id">): Promise<SacramentMeeting> => {
    try {
      const result = await database()
        .insert(tables.meetings)
        .values(data)
        .returning({
          ...getTableColumns(tables.meetings),
        });
      return result[0];
    } catch (error) {
      console.log("Error occurred while creating meeting", error);
      throw new Error("Failed to create meeting");
    }
  };

  const updateMeeting = async (id: number, updates: Partial<SacramentMeeting>): Promise<SacramentMeeting | null> => {
    try {
      const result = await database()
        .update(tables.meetings)
        .set(updates)
        .where(eq(tables.meetings.id, id))
        .returning({
          ...getTableColumns(tables.meetings),
        });
      return result[0] ? result[0] : null;
    } catch (error) {
      console.log("Error occurred while updating meeting", error);
      throw new Error("Failed to update meeting");
    }
  };

  const removeMeeting = async (id: number): Promise<boolean> => {
    try {
      const result = await database().delete(tables.meetings).where(eq(tables.meetings.id, id));
      return (result.rowCount ?? 0) > 0;
    } catch (error) {
      console.log("Error occurred while deleting meeting", error);
      throw new Error("Failed to delete meeting");
    }
  };

  return {
    getMeetings,
    getMeetingById,
    storeMeeting,
    updateMeeting,
    removeMeeting,
  };
};
