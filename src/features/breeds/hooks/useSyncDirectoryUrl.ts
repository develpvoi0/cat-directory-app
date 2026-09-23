import { useEffect } from "react";
import { saveDirectoryUrl } from "../utils/directory-url-storage";

type Params = { query: string; page: number };

export function useSyncDirectoryUrl({ query, page }: Params) {
  useEffect(() => {
    if (page < 1) return;

    const url = new URL(window.location.href);
    if (query) url.searchParams.set("q", query);
    else url.searchParams.delete("q");
    if (page > 1) url.searchParams.set("page", String(page));
    else url.searchParams.delete("page");

    if (url.href !== window.location.href) {
      window.history.replaceState(null, "", url);
    }
    saveDirectoryUrl(url.search);
  }, [query, page]);
}
