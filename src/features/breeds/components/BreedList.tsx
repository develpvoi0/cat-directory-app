"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { Button } from "@/shared/ui/Button";
import { AlertIcon, WifiOffIcon } from "@/shared/ui/icons";
import type { Breed } from "../schemas/breed.schema";
import { BreedRow } from "./BreedRow";
import { BreedRowSkeleton } from "./BreedListSkeleton";

const ROW_HEIGHT = 77;
const LOAD_MORE_THRESHOLD = 5;

type Props = {
  breeds: Breed[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isFetchNextPageError: boolean;
  nextPage: number;
  query?: string;
  isOffline?: boolean;
  onLoadMore: () => void;
};

export function BreedList({
  breeds,
  hasNextPage,
  isFetchingNextPage,
  isFetchNextPageError,
  nextPage,
  query = "",
  isOffline = false,
  onLoadMore,
}: Props) {
  const listRef = useRef<HTMLUListElement>(null);
  const [scrollMargin, setScrollMargin] = useState(0);

  //Aqui hacemos distancia desde el inicio de la página hasta la lista
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const update = () =>
      setScrollMargin(Math.round(list.getBoundingClientRect().top + window.scrollY));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(document.body);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const virtualizer = useWindowVirtualizer({
    count: hasNextPage ? breeds.length + 1 : breeds.length,
    estimateSize: () => ROW_HEIGHT,
    overscan: 6,
    scrollMargin,
    initialRect: { width: 0, height: 900 },
    initialOffset: 0,
  });

  const items = virtualizer.getVirtualItems();
  const lastRenderedIndex = items.at(-1)?.index ?? -1;
  const canLoadMore = hasNextPage && !isFetchingNextPage && !isFetchNextPageError && !isOffline;

  useEffect(() => {
    if (canLoadMore && lastRenderedIndex >= breeds.length - LOAD_MORE_THRESHOLD)
      onLoadMore();
  }, [canLoadMore, lastRenderedIndex, breeds.length, onLoadMore]);

  // Flechas, Home y End para moverse entre filas
  function focusRow(index: number, attempts = 5) {
    const link = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${index}"] a`,
    );
    if (link) return link.focus({ preventScroll: true });
    if (attempts > 0)
      requestAnimationFrame(() => focusRow(index, attempts - 1));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    const row = (event.target as HTMLElement).closest<HTMLElement>(
      "[data-index]",
    );
    if (!row) return;
    const index = Number(row.dataset.index);
    const targets: Record<string, number> = {
      ArrowDown: index + 1,
      ArrowUp: index - 1,
      Home: 0,
      End: breeds.length - 1,
    };
    const next = targets[event.key];
    if (next === undefined || next < 0 || next >= breeds.length) return;
    event.preventDefault();
    virtualizer.scrollToIndex(next, { align: "auto" });
    focusRow(next);
  }

  return (
    <ul
      ref={listRef}
      role="list"
      aria-label="Razas de gatos"
      aria-busy={isFetchingNextPage}
      onKeyDown={handleKeyDown}
      className="relative"
      style={{ height: virtualizer.getTotalSize() }}
    >
      {items.map((item) => {
        const style = {
          height: ROW_HEIGHT,
          transform: `translateY(${item.start - virtualizer.options.scrollMargin}px)`,
        };

        if (item.index >= breeds.length) {
          return (
            <li key="loader" className="absolute left-0 top-0 w-full" style={style}>
              {isFetchNextPageError ? (
                <div
                  role="alert"
                  className="flex h-full items-center gap-3 border-b border-line px-1 sm:gap-4 sm:px-3"
                >
                  <AlertIcon className="size-6 shrink-0 text-danger" />
                  <p className="min-w-0 flex-1">
                    <span className="block truncate font-display font-bold">
                      No pudimos cargar la página {nextPage}
                    </span>
                    <span className="block truncate text-sm text-ink-muted">
                      Las razas cargadas siguen disponibles.
                    </span>
                  </p>
                  <Button variant="primary" onClick={onLoadMore}>
                    Reintentar ahora
                  </Button>
                </div>
              ) : isOffline ? (
                <div className="flex h-full items-center py-2">
                  <p className="flex h-full w-full items-center gap-3 rounded-xl border border-dashed border-line-strong px-4 text-sm text-ink-muted">
                    <WifiOffIcon className="size-[18px] shrink-0" />
                    Carga de la página {nextPage} en pausa hasta recuperar la conexión.
                  </p>
                </div>
              ) : (
                <BreedRowSkeleton />
              )}
            </li>
          );
        }

        const breed = breeds[item.index];
        const initial = breed.name.charAt(0).toUpperCase();
        const previousInitial = breeds[item.index - 1]?.name.charAt(0).toUpperCase();
        return (
          <li
            key={breed.slug}
            data-index={item.index}
            aria-posinset={item.index + 1}
            aria-setsize={hasNextPage ? -1 : breeds.length}
            className="absolute left-0 top-0 w-full border-b border-line"
            style={style}
          >
            <BreedRow breed={breed} query={query} letter={initial !== previousInitial ? initial : ""} />
          </li>
        );
      })}
    </ul>
  );
}
