import { sql } from "drizzle-orm";
import { boolean, check, date, jsonb, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

import type { MeetingType } from "@/types/meeting.type";

export const meetings = pgTable(
  "meetings",
  {
    id: serial("id").primaryKey(),
    date: date("date").notNull().unique(),
    meetingType: varchar("meeting_type", { length: 20 }).$type<MeetingType>().notNull(),
    presiding: varchar("presiding", { length: 255 }).notNull(),
    conducting: varchar("conducting", { length: 255 }).notNull(),
    announcements: text("announcements").array().default([]),
    openingHymn: jsonb("opening_hymn").notNull(),
    openingPrayer: varchar("opening_prayer", { length: 255 }).notNull(),
    wardBusiness: jsonb("ward_business").default([]),
    stakeBusiness: boolean("stake_business").default(false),
    sacramentHymn: jsonb("sacrament_hymn").notNull(),
    speakers: jsonb("speakers").default([]),
    closingHymn: jsonb("closing_hymn").notNull(),
    closingPrayer: varchar("closing_prayer", { length: 255 }).notNull(),
  },
  (table) => [
    check("meetings_type_check", sql`${table.meetingType} in ('testimony','regular','stake','general','special')`),
  ],
);
