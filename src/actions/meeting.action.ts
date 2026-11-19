"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { createMeetingModal } from "@/models/meeting.model";
import { database } from "@/services/database.service";
import { MeetingType, SacramentMeetingState } from "@/types/meeting.type";
import { idSchema, meetingSchema } from "@/validations/meeting.validate";

export const create = async (_prevState: SacramentMeetingState, formData: FormData): Promise<SacramentMeetingState> => {
  const values = {
    date: formData.get("date") as string,
    meetingType: formData.get("meetingType") as MeetingType,
    presiding: formData.get("presiding") as string,
    conducting: formData.get("conducting") as string,
    announcements: (formData.getAll("announcements") as string[]).filter(Boolean),
    openingHymn: {
      number: Number(formData.get("openingHymn")),
      title: formData.get("openingHymnTitle") as string,
    },
    openingPrayer: formData.get("openingPrayer") as string,
    wardBusiness: (formData.getAll("wardBusiness") as string[]).filter(Boolean),
    stakeBusiness: formData.get("stakeBusiness") === "true",
    sacramentHymn: {
      number: Number(formData.get("sacramentHymn")),
      title: formData.get("sacramentHymnTitle") as string,
    },
    speakers: (formData.getAll("speakers") as string[])
      .filter(Boolean)
      .map((name) => ({ name, topic: formData.get(`${name}-topic`) as string, type: "speaker" as const })),
    closingHymn: {
      number: Number(formData.get("closingHymn")),
      title: formData.get("closingHymnTitle") as string,
    },
    closingPrayer: formData.get("closingPrayer") as string,
  };

  const validated = await meetingSchema.safeParseAsync(values);
  if (!validated.success) {
    return {
      errors: z.flattenError(validated.error).fieldErrors,
      message: "Please fix the errors below and try again.",
      values,
    };
  }

  try {
    const meetingModal = createMeetingModal(database);
    const { openingHymn, sacramentHymn, closingHymn, wardBusiness, speakers, stakeBusiness, ...rest } = validated.data;

    await meetingModal.store({
      ...rest,
      openingHymn: { number: openingHymn.number, title: openingHymn.title },
      sacramentHymn: { number: sacramentHymn.number, title: sacramentHymn.title },
      closingHymn: { number: closingHymn.number, title: closingHymn.title },
      wardBusiness: (wardBusiness ?? []).map((description) => ({ description })),
      speakers: speakers.map(({ name, topic }) => ({ name, topic, type: "speaker" as const })),
      stakeBusiness: stakeBusiness ?? false,
    });
  } catch (error) {
    console.log("Error occurred while creating meeting", error);
    throw new Error("Failed to create meeting");
  }

  revalidatePath("/meetings");
  redirect(`/meetings`);
};

export const update = async (
  _prevState: SacramentMeetingState,
  meetingId: number,
  formData: FormData,
): Promise<SacramentMeetingState> => {
  const values = {
    date: formData.get("date") as string,
    meetingType: formData.get("meetingType") as MeetingType,
    presiding: formData.get("presiding") as string,
    conducting: formData.get("conducting") as string,
    announcements: (formData.getAll("announcements") as string[]).filter(Boolean),
    openingHymn: {
      number: Number(formData.get("openingHymn")),
      title: formData.get("openingHymnTitle") as string,
    },
    openingPrayer: formData.get("openingPrayer") as string,
    wardBusiness: (formData.getAll("wardBusiness") as string[]).filter(Boolean),
    stakeBusiness: formData.get("stakeBusiness") === "true",
    sacramentHymn: {
      number: Number(formData.get("sacramentHymn")),
      title: formData.get("sacramentHymnTitle") as string,
    },
    speakers: (formData.getAll("speakers") as string[])
      .filter(Boolean)
      .map((name) => ({ name, topic: formData.get(`${name}-topic`) as string, type: "speaker" as const })),
    closingHymn: {
      number: Number(formData.get("closingHymn")),
      title: formData.get("closingHymnTitle") as string,
    },
    closingPrayer: formData.get("closingPrayer") as string,
  };

  const validated = await meetingSchema.safeParseAsync(values);
  if (!validated.success) {
    return {
      errors: z.flattenError(validated.error).fieldErrors,
      message: "Please fix the errors below and try again.",
      values,
    };
  }

  try {
    const meetingModal = createMeetingModal(database);
    const { openingHymn, sacramentHymn, closingHymn, wardBusiness, speakers, stakeBusiness, ...rest } = validated.data;

    await meetingModal.update(meetingId, {
      ...rest,
      openingHymn: { number: openingHymn.number, title: openingHymn.title },
      sacramentHymn: { number: sacramentHymn.number, title: sacramentHymn.title },
      closingHymn: { number: closingHymn.number, title: closingHymn.title },
      wardBusiness: (wardBusiness ?? []).map((description) => ({ description })),
      speakers: speakers.map(({ name, topic }) => ({ name, topic, type: "speaker" as const })),
      stakeBusiness: stakeBusiness ?? false,
    });
  } catch (error) {
    console.log("Error occurred while updating meeting", error);
    throw new Error("Failed to update meeting");
  }

  revalidatePath("/meetings");
  redirect(`/meetings`);
};

export async function remove(meetingId: number): Promise<void> {
  const validated = await idSchema.safeParseAsync(meetingId);
  if (!validated.success) {
    throw new Error("Invalid meeting ID");
  }

  try {
    const meetingModel = createMeetingModal(database);
    await meetingModel.remove(validated.data);
  } catch (error) {
    console.log("Error occurred while deleting meeting", error);
    throw new Error("Failed to delete meeting");
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}
