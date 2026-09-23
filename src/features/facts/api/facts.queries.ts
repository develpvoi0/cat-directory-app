import { queryOptions } from "@tanstack/react-query";
import { getRandomFact } from "./facts.repository";

export const factsKeys = {
  all: ["facts"] as const,
  random: (scope: string) => [...factsKeys.all, "random", scope] as const,
};

export const randomFactOptions = (scope: string) =>
  queryOptions({
    queryKey: factsKeys.random(scope),
    queryFn: ({ signal }) => getRandomFact({ signal }),
    staleTime: Infinity,
  });
