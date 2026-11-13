import { sql } from "drizzle-orm";
import { boolean, check, date, jsonb, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

import type { Hymn, MeetingType, SpeakerItem, WardBusinessItem } from "@/types/meeting.type";

export const meetings = pgTable(
  "meetings",
  {
    id: serial("id").primaryKey(),
    date: date("date").notNull().unique(),
    meetingType: varchar("meeting_type", { length: 20 }).$type<MeetingType>().notNull().default("regular"),
    presiding: varchar("presiding", { length: 255 }).notNull(),
    conducting: varchar("conducting", { length: 255 }).notNull(),
    announcements: text("announcements").array().default([]),
    openingHymn: jsonb("opening_hymn").$type<Hymn>().notNull(),
    openingPrayer: varchar("opening_prayer", { length: 255 }).notNull(),
    wardBusiness: jsonb("ward_business").$type<WardBusinessItem[]>().default([]),
    stakeBusiness: boolean("stake_business").default(false),
    sacramentHymn: jsonb("sacrament_hymn").$type<Hymn>().notNull(),
    speakers: jsonb("speakers").$type<SpeakerItem[]>().default([]),
    closingHymn: jsonb("closing_hymn").$type<Hymn>().notNull(),
    closingPrayer: varchar("closing_prayer", { length: 255 }).notNull(),
  },
  (table) => [check("meetings_type_check", sql`${table.meetingType} in ('testimony','regular','stake','general')`)],
);
