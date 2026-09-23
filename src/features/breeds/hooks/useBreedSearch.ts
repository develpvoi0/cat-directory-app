import { useMemo } from "react";
import type { Breed } from "../schemas/breed.schema";
import { matchesQuery } from "../utils/search";

export function useBreedSearch(breeds: Breed[], query: string): Breed[] {
  return useMemo(
    () => (query ? breeds.filter((breed) => matchesQuery(breed.name, query)) : breeds),
    [breeds, query],
  );
}
