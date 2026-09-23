import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { breedsListOptions } from "../api/breeds.queries";
import type { BreedsPage } from "../schemas/breed.schema";
import { readFirstPage, saveFirstPage } from "../utils/first-page-storage";

export function usePersistedFirstPage(firstPage: BreedsPage | undefined) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const { queryKey } = breedsListOptions();
    if (queryClient.getQueryData(queryKey)) return;
    const stored = readFirstPage();
    if (!stored) return;
    queryClient.setQueryData(queryKey, { pages: [stored.page], pageParams: [1] }, { updatedAt: stored.savedAt });
  }, [queryClient]);

  useEffect(() => {
    if (firstPage) saveFirstPage(firstPage);
  }, [firstPage]);
}
