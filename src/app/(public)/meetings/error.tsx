"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest: string }; reset: () => void }) {
  useEffect(() => {
    console.error("An uncaught error occurred:", error);
  }, [error]);

  return (
    <div className="border-border bg-background mx-auto mt-16 max-w-xl rounded-lg border p-6 text-center shadow-sm">
      <h1 className="text-foreground text-2xl font-bold">Something went wrong!</h1>
      <p className="text-foreground mt-3">An unexpected error occurred. Please try again later.</p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          onClick={reset}
          className="bg-foreground/10 text-foreground hover:bg-foreground/20 rounded-md px-4 py-2 font-semibold transition"
        >
          Try Again
        </button>
        <Link
          href="/meetings"
          className="border-border text-foreground hover:bg-foreground/10 rounded-md border px-4 py-2 font-semibold transition"
        >
          Go Back to Meetings
        </Link>
      </div>
    </div>
  );
}
