import { Suspense } from "react";

import { MeetingCardPlaceholder } from "@/components/meeting-card";
import { MeetingsList } from "@/components/meeting-list";
import Pagination from "@/components/pagination";
import { Search } from "@/components/search";
import type { PaginationResponse } from "@/types/pagination.type";
import { getBaseUrl } from "@/utils/base-url.util";
import { PAGINATION_LIMITS } from "@/utils/pagination.util";
import { paginationSchema } from "@/validations/pagination.validate";

interface PageProps {
  searchParams: Promise<{ page?: string; query?: string; limit?: string }>;
}

const getMeetingData = async (searchParams: Promise<{ page?: string; query?: string; limit?: string }>) => {
  const validated = paginationSchema.safeParse(await searchParams);
  const endpointUrl: string = `${await getBaseUrl()}/api/meetings`;
  const endpointWithParams = new URL(endpointUrl);

  if (validated.success) {
    const { page, query, limit } = validated.data;

    if (page) {
      endpointWithParams.searchParams.set("page", page.toString());
    }

    if (query) {
      endpointWithParams.searchParams.set("query", query);
    }

    if (limit) {
      endpointWithParams.searchParams.set("limit", limit.toString());
    }
  }

  const response = await fetch(endpointWithParams.toString());
  return response;
};

export default async function MeetingsPage({ searchParams }: PageProps) {
  const response = await getMeetingData(searchParams);
  let meetings: PaginationResponse = {
    data: [],
    total: 0,
    totalPages: 0,
    previousPage: null,
    nextPage: null,
  };

  if (response.ok) {
    meetings = await response.json();
  }

  return (
    <div className="mx-auto w-full max-w-7xl grow p-6">
      <main className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Upcoming Meetings</h1>
        <Search focus />
        <Suspense fallback={<MeetingCardPlaceholder />}>
          <div className="flex w-full flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <MeetingsList meetings={meetings.data} />
            </div>
            <Pagination
              perPage={PAGINATION_LIMITS}
              previousPage={meetings.previousPage}
              nextPage={meetings.nextPage}
              totalItems={meetings.data.length}
              totalRecords={meetings.total}
            />
          </div>
        </Suspense>
      </main>
    </div>
  );
}
