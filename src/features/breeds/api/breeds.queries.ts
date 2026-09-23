import { infiniteQueryOptions } from "@tanstack/react-query";
import { getBreedsPage } from "./breeds.repository";

export const breedsKeys = {
  all: ["breeds"] as const,
  list: () => [...breedsKeys.all, "list"] as const,
  detail: (slug: string) => [...breedsKeys.all, "detail", slug] as const,
};


export const breedsListOptions = () =>
  infiniteQueryOptions({
    queryKey: breedsKeys.list(),
    queryFn: ({ pageParam, signal }) => getBreedsPage(pageParam, { signal, revalidate: 3600 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });