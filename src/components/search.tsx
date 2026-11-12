"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function Search({ focus }: { focus?: boolean }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
      params.delete("page");
      params.delete("limit");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <input
      aria-label="Search"
      className="border-border mb-4 rounded border p-2"
      type="search"
      placeholder="Search..."
      defaultValue={searchParams.get("query")?.toString()}
      onChange={(e) => handleSearch(e.target.value)}
      autoFocus={focus}
    />
  );
}
