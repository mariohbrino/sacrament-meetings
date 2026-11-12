import { z } from "zod";

import { DEFAULT_PAGINATION_LIMIT } from "@/utils/pagination.util";

export const PAGINATION_LIMITS: number[] = [5, 10, 15];

export const paginationSchema = z.object({
  page: z.coerce
    .number({ error: "Pagination page must be a valid number" })
    .int({ error: "Pagination page must be an integer" })
    .min(1, { error: "Pagination page minimum is 1" })
    .default(1),
  query: z.string({ error: "Invalid term search page parameter" }).default(""),
  limit: z.coerce
    .number({ error: "Invalid limit parameter" })
    .refine((value) => PAGINATION_LIMITS.some((limit) => limit === value), {
      message: `Limit must be one of the following values: ${PAGINATION_LIMITS.join(", ")}`,
    })
    .default(DEFAULT_PAGINATION_LIMIT),
});
