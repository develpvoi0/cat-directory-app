import { useCallback, useMemo } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { breedsListOptions } from "../api/breeds.queries";
import type { Breed } from "../schemas/breed.schema";

export function useBreedsInfinite() {
  const queryClient = useQueryClient();
  const options = breedsListOptions();
  const query = useInfiniteQuery(options);
  const { refetch } = query;

  const breeds = useMemo<Breed[]>(() => {
    const unique = new Map<string, Breed>();
    for (const page of query.data?.pages ?? []) {
      for (const breed of page.items) unique.set(breed.slug, breed);
    }
    return [...unique.values()];
  }, [query.data]);

  const reloadFromStart = useCallback(async () => {
    queryClient.setQueryData(options.queryKey, (data) =>
      data ? { pages: data.pages.slice(0, 1), pageParams: data.pageParams.slice(0, 1) } : data,
    );
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    await refetch();
  }, [queryClient, options.queryKey, refetch]);

  return {
    breeds,
    total: query.data?.pages[0]?.total ?? 0,
    loadedPages: query.data?.pages.length ?? 0,
    lastPage: query.data?.pages[0]?.lastPage ?? 0,
    failureCount: query.failureCount,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    isFetchNextPageError: query.isFetchNextPageError,
    isPending: query.isPending,
    isError: query.isError,
    error: query.error,
    refetch,
    isReloading: query.isRefetching,
    reloadFromStart,
  };
}