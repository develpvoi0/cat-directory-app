import { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { breedsListOptions } from "../api/breeds.queries";

export function useReloadBreeds() {
  const queryClient = useQueryClient();
  const [isReloading, setIsReloading] = useState(false);

  const reload = useCallback(async () => {
    const { queryKey } = breedsListOptions();
    setIsReloading(true);
    queryClient.setQueryData(queryKey, (data) =>
      data ? { pages: data.pages.slice(0, 1), pageParams: data.pageParams.slice(0, 1) } : data,
    );
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });

    try {
      await queryClient.refetchQueries({ queryKey, exact: true });
      return queryClient.getQueryState(queryKey);
    } finally {
      setIsReloading(false);
    }
  }, [queryClient]);

  return { reload, isReloading };
}
