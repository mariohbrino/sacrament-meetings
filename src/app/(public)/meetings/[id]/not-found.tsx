import Link from "next/link";

export default function NotFound() {
  return (
    <div className="border-border bg-background mx-auto mt-16 max-w-xl rounded-lg border p-6 text-center shadow-sm">
      <h1 className="text-foreground text-2xl font-bold">Meeting Not Found</h1>
      <p className="text-foreground mt-3">The meeting you are looking for does not exist.</p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/meetings"
          className="border-border text-foreground hover:bg-foreground/10 rounded-md border px-4 py-2 font-semibold transition"
        >
          Back to Meetings
        </Link>
      </div>
    </div>
  );
}
