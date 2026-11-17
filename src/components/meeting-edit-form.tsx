"use client";

import { useActionState, useState } from "react";

import { update } from "@/actions/meeting.action";
import type { MeetingType, SacramentMeeting, SacramentMeetingField, SacramentMeetingState } from "@/types/meeting.type";

const initialState: SacramentMeetingState = {};

const meetingTypes: MeetingType[] = ["regular", "testimony", "stake", "general"];

const labelClass = "text-foreground mb-2 block text-sm font-medium";
const inputClass =
  "border-border bg-background text-foreground w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20";
const addButtonClass = "text-foreground/70 hover:text-foreground mt-2 text-sm hover:cursor-pointer";
const removeButtonClass = "text-sm text-red-600 hover:text-red-700 hover:cursor-pointer";

export default function MeetingEditForm({ meeting }: { meeting: SacramentMeeting }) {
  const [state, formAction, pending] = useActionState(
    (state: SacramentMeetingState, formData: FormData) => update(state, meeting.id, formData),
    initialState,
  );

  const [announcements, setAnnouncements] = useState<string[]>(meeting.announcements ?? []);
  const [wardBusiness, setWardBusiness] = useState<string[]>(
    (meeting.wardBusiness ?? []).map((item) => item.description),
  );
  const [speakers, setSpeakers] = useState<{ name: string; topic: string }[]>(
    (meeting.speakers ?? []).filter((item) => item.type === "speaker").map(({ name, topic }) => ({ name, topic })),
  );

  const fieldErrors = (field: SacramentMeetingField) => (
    <div id={`${field}-error`} aria-live="polite" aria-atomic="true">
      {state.errors?.[field]?.map((error) => (
        <p key={error} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      ))}
    </div>
  );

  return (
    <form
      action={formAction}
      className="border-border bg-card text-card-foreground flex w-full max-w-3xl flex-col gap-5 rounded-lg border p-6 shadow-sm"
    >
      <div>
        <label htmlFor="date" className={labelClass}>
          Date
        </label>
        <input
          type="date"
          name="date"
          id="date"
          defaultValue={state.values?.date ?? meeting.date}
          aria-describedby="date-error"
          className={inputClass}
        />
        {fieldErrors("date")}
      </div>

      <div>
        <label htmlFor="meetingType" className={labelClass}>
          Meeting Type
        </label>
        <select
          name="meetingType"
          id="meetingType"
          defaultValue={state.values?.meetingType ?? meeting.meetingType}
          aria-describedby="meetingType-error"
          className={inputClass}
        >
          {meetingTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
        {fieldErrors("meetingType")}
      </div>

      <div>
        <label htmlFor="presiding" className={labelClass}>
          Presiding
        </label>
        <input
          type="text"
          name="presiding"
          id="presiding"
          defaultValue={state.values?.presiding ?? meeting.presiding}
          aria-describedby="presiding-error"
          className={inputClass}
        />
        {fieldErrors("presiding")}
      </div>

      <div>
        <label htmlFor="conducting" className={labelClass}>
          Conducting
        </label>
        <input
          type="text"
          name="conducting"
          id="conducting"
          defaultValue={state.values?.conducting ?? meeting.conducting}
          aria-describedby="conducting-error"
          className={inputClass}
        />
        {fieldErrors("conducting")}
      </div>

      <fieldset>
        <legend className={labelClass}>Announcements</legend>
        <div className="flex flex-col gap-2">
          {announcements.map((announcement, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                name="announcements"
                aria-label={`Announcement ${index + 1}`}
                value={announcement}
                onChange={(event) =>
                  setAnnouncements((items) => items.map((item, i) => (i === index ? event.target.value : item)))
                }
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => setAnnouncements((items) => items.filter((_, i) => i !== index))}
                className={removeButtonClass}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => setAnnouncements((items) => [...items, ""])} className={addButtonClass}>
          + Add announcement
        </button>
        {fieldErrors("announcements")}
      </fieldset>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="openingHymn" className={labelClass}>
            Opening Hymn Number
          </label>
          <input
            type="number"
            name="openingHymn"
            id="openingHymn"
            min={1}
            defaultValue={state.values?.openingHymn?.number ?? meeting.openingHymn.number}
            aria-describedby="openingHymn-error"
            className={inputClass}
          />
          {fieldErrors("openingHymn")}
        </div>
        <div>
          <label htmlFor="openingHymnTitle" className={labelClass}>
            Opening Hymn Title
          </label>
          <input
            type="text"
            name="openingHymnTitle"
            id="openingHymnTitle"
            defaultValue={state.values?.openingHymn?.title ?? meeting.openingHymn.title}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="openingPrayer" className={labelClass}>
          Opening Prayer
        </label>
        <input
          type="text"
          name="openingPrayer"
          id="openingPrayer"
          defaultValue={state.values?.openingPrayer ?? meeting.openingPrayer}
          aria-describedby="openingPrayer-error"
          className={inputClass}
        />
        {fieldErrors("openingPrayer")}
      </div>

      <fieldset>
        <legend className={labelClass}>Ward Business</legend>
        <div className="flex flex-col gap-2">
          {wardBusiness.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                name="wardBusiness"
                aria-label={`Ward business ${index + 1}`}
                value={item}
                onChange={(event) =>
                  setWardBusiness((items) => items.map((value, i) => (i === index ? event.target.value : value)))
                }
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => setWardBusiness((items) => items.filter((_, i) => i !== index))}
                className={removeButtonClass}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => setWardBusiness((items) => [...items, ""])} className={addButtonClass}>
          + Add ward business
        </button>
        {fieldErrors("wardBusiness")}
      </fieldset>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="stakeBusiness"
          id="stakeBusiness"
          value="true"
          defaultChecked={state.values?.stakeBusiness ?? meeting.stakeBusiness ?? false}
          className="border-border h-4 w-4 rounded"
        />
        <label htmlFor="stakeBusiness" className="text-foreground text-sm font-medium">
          Stake Business
        </label>
        {fieldErrors("stakeBusiness")}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="sacramentHymn" className={labelClass}>
            Sacrament Hymn Number
          </label>
          <input
            type="number"
            name="sacramentHymn"
            id="sacramentHymn"
            min={1}
            defaultValue={state.values?.sacramentHymn?.number ?? meeting.sacramentHymn.number}
            aria-describedby="sacramentHymn-error"
            className={inputClass}
          />
          {fieldErrors("sacramentHymn")}
        </div>
        <div>
          <label htmlFor="sacramentHymnTitle" className={labelClass}>
            Sacrament Hymn Title
          </label>
          <input
            type="text"
            name="sacramentHymnTitle"
            id="sacramentHymnTitle"
            defaultValue={state.values?.sacramentHymn?.title ?? meeting.sacramentHymn.title}
            className={inputClass}
          />
        </div>
      </div>

      <fieldset>
        <legend className={labelClass}>Speakers</legend>
        <div className="flex flex-col gap-3">
          {speakers.map((speaker, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                name="speakers"
                aria-label={`Speaker ${index + 1} name`}
                placeholder="Name"
                value={speaker.name}
                onChange={(event) =>
                  setSpeakers((items) =>
                    items.map((item, i) => (i === index ? { ...item, name: event.target.value } : item)),
                  )
                }
                className={inputClass}
              />
              {/* The update action looks up each speaker's topic by `${name}-topic` */}
              <input
                type="text"
                name={`${speaker.name}-topic`}
                aria-label={`Speaker ${index + 1} topic`}
                placeholder="Topic"
                value={speaker.topic}
                onChange={(event) =>
                  setSpeakers((items) =>
                    items.map((item, i) => (i === index ? { ...item, topic: event.target.value } : item)),
                  )
                }
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => setSpeakers((items) => items.filter((_, i) => i !== index))}
                className={removeButtonClass}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setSpeakers((items) => [...items, { name: "", topic: "" }])}
          className={addButtonClass}
        >
          + Add speaker
        </button>
        {fieldErrors("speakers")}
      </fieldset>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="closingHymn" className={labelClass}>
            Closing Hymn Number
          </label>
          <input
            type="number"
            name="closingHymn"
            id="closingHymn"
            min={1}
            defaultValue={state.values?.closingHymn?.number ?? meeting.closingHymn.number}
            aria-describedby="closingHymn-error"
            className={inputClass}
          />
          {fieldErrors("closingHymn")}
        </div>
        <div>
          <label htmlFor="closingHymnTitle" className={labelClass}>
            Closing Hymn Title
          </label>
          <input
            type="text"
            name="closingHymnTitle"
            id="closingHymnTitle"
            defaultValue={state.values?.closingHymn?.title ?? meeting.closingHymn.title}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="closingPrayer" className={labelClass}>
          Closing Prayer
        </label>
        <input
          type="text"
          name="closingPrayer"
          id="closingPrayer"
          defaultValue={state.values?.closingPrayer ?? meeting.closingPrayer}
          aria-describedby="closingPrayer-error"
          className={inputClass}
        />
        {fieldErrors("closingPrayer")}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="bg-foreground/10 text-foreground hover:bg-foreground/20 rounded-md px-4 py-2 hover:cursor-pointer disabled:opacity-50"
      >
        {pending ? "Updating..." : "Update"}
      </button>

      {state.message && (
        <p
          aria-live="polite"
          className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300"
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
