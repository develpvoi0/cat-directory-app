import { cache } from "react";
import { getQueryClient } from "@/shared/lib/query-client";
import { breedsListOptions } from "./breeds.queries";

export const prefetchDirectory = cache(async (pages: number) => {
  const queryClient = getQueryClient();
  const listOptions = breedsListOptions();
  await queryClient.prefetchInfiniteQuery({ ...listOptions, pages });
  return {
    queryClient,
    total: queryClient.getQueryData(listOptions.queryKey)?.pages[0]?.total,
  };
});
