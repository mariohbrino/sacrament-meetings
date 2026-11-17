import z from "zod";

import type { MeetingType } from "@/types/meeting.type";

const meetingType: MeetingType[] = ["regular", "testimony", "stake", "general"];

export const idSchema = z.coerce
  .number({ error: "Meeting ID must be a valid number" })
  .int({ message: "Meeting ID must be an integer" })
  .refine((value) => value > 0, {
    message: "Meeting ID must be a positive integer",
  });

export const meetingSchema = z.object({
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  meetingType: z.enum(meetingType),
  presiding: z.string().min(1, { message: "Presiding is required" }),
  conducting: z.string().min(1, { message: "Conducting is required" }),
  announcements: z.array(z.string().min(1, { message: "Announcement is required" })).default([]),
  openingHymn: z.object({
    number: z.number().min(1, { message: "Opening hymn is required" }),
    title: z.string().min(1, { message: "Opening hymn title is required" }),
  }),
  openingPrayer: z.string().min(1, { message: "Opening prayer is required" }),
  wardBusiness: z.array(z.string().min(1, { message: "Ward business item is required" })).optional(),
  stakeBusiness: z.boolean().optional(),
  sacramentHymn: z.object({
    number: z.number().min(1, { message: "Sacrament hymn is required" }),
    title: z.string().min(1, { message: "Sacrament hymn title is required" }),
  }),
  speakers: z
    .array(
      z.object({
        name: z.string().min(1, { message: "Speaker name is required" }),
        topic: z.string().min(1, { message: "Speaker topic is required" }),
        type: z.literal("speaker"),
      }),
    )
    .min(1, { message: "At least one speaker is required" }),
  closingHymn: z.object({
    number: z.number().min(1, { message: "Closing hymn is required" }),
    title: z.string().min(1, { message: "Closing hymn title is required" }),
  }),
  closingPrayer: z.string().min(1, { message: "Closing prayer is required" }),
});
