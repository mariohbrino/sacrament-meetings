"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { DEFAULT_PAGINATION_LIMIT } from "@/utils/pagination.util";

type PaginateProps = {
  perPage: number[];
  previousPage: number | null;
  nextPage: number | null;
  totalItems: number;
  totalRecords: number;
};

const PaginationLink = ({
  value,
  href,
  children,
}: {
  value: number | null;
  href: string;
  children: React.ReactNode;
}) => {
  return value !== null ? (
    <Link
      href={href}
      className="bg-secondary border-border text-secondary-foreground hover:bg-primary/90 hover:text-primary-foreground block rounded-md border-2 px-2 py-1 text-sm"
    >
      {children}
    </Link>
  ) : (
    <span aria-disabled="true" className="border-border block cursor-not-allowed rounded-md border-2 px-2 py-1 text-sm">
      {children}
    </span>
  );
};

export default function Pagination({ perPage, previousPage, nextPage, totalItems, totalRecords }: PaginateProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const getPageHref = (page: number | null) => {
    if (page === null) return "#";
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", event.target.value);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="align-center flex w-full flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <p className="text-sm">
          Showing {totalItems} of {totalRecords} records.
        </p>
        <div>
          <label htmlFor="perPage" className="text-sm">
            Items per page:
          </label>
          <select
            id="perPage"
            className="bg-secondary border-border text-secondary-foreground hover:bg-primary/90 hover:text-primary-foreground ml-2 rounded-md border-2 px-2 py-1 text-sm"
            value={searchParams.get("limit") ?? DEFAULT_PAGINATION_LIMIT}
            onChange={handlePerPageChange}
          >
            {perPage.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex w-full flex-col items-center px-6">
        <nav aria-label="Table Pagination">
          <ul className="flex gap-4">
            <li>
              <PaginationLink value={previousPage} href={getPageHref(previousPage)}>
                Previous
              </PaginationLink>
            </li>
            <li className="bg-secondary border-border text-secondary-foreground rounded-md border-2 px-3 py-1 text-sm">
              {previousPage !== null ? previousPage + 1 : 1}
            </li>
            <li>
              <PaginationLink value={nextPage} href={getPageHref(nextPage)}>
                Next
              </PaginationLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
