import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { breedsListOptions } from "../api/breeds.queries";
import type { Breed } from "../schemas/breed.schema";

export function useBreedsInfinite() {
  const query = useInfiniteQuery(breedsListOptions());

  const breeds = useMemo<Breed[]>(() => {
    const unique = new Map<string, Breed>();
    for (const page of query.data?.pages ?? []) {
      for (const breed of page.items) unique.set(breed.slug, breed);
    }
    return [...unique.values()];
  }, [query.data]);

  return {
    breeds,
    total: query.data?.pages[0]?.total ?? 0,
    loadedPages: query.data?.pages.length ?? 0,
    firstPage: query.data?.pages[0],
    lastPage: query.data?.pages[0]?.lastPage ?? 0,
    failureCount: query.failureCount,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    isFetchNextPageError: query.isFetchNextPageError,
    isPending: query.isPending,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
