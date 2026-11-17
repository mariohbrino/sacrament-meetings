"use client";

import clsx from "clsx";
import { useActionState } from "react";

import { remove } from "@/actions/meeting.action";

export const RemoveButton = ({ id, className }: { id: number; className?: string }) => {
  const [, formAction, pending] = useActionState<void>(() => remove(id), undefined);

  return (
    <form action={formAction} className="relative flex flex-col items-end gap-2">
      <button
        aria-label="Remove meeting"
        type="submit"
        className={clsx(
          "text-foreground disabled:text-foreground/50 cursor-pointer hover:underline disabled:cursor-not-allowed",
          className,
        )}
        disabled={pending}
      >
        {pending ? "Removing..." : "Remove"}
      </button>
    </form>
  );
};
