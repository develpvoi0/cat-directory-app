import { z } from "zod";

export const MAX_RESTORED_PAGES = 10;

export const directorySearchParamsSchema = z.object({
  q: z.string().trim().max(60).catch(""),
  page: z.coerce
    .number()
    .int()
    .min(1)
    .catch(1)
    .transform((page) => Math.min(page, MAX_RESTORED_PAGES)),
});

export type DirectorySearchParams = z.output<typeof directorySearchParamsSchema>;