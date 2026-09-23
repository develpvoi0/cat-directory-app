"use client";

import { useCallback, useEffect, useRef } from "react";
import { Button } from "@/shared/ui/Button";
import { CatSilhouette } from "@/shared/ui/CatSilhouette";
import { useOnlineStatus } from "@/shared/hooks/useOnlineStatus";
import { getErrorMessage } from "@/shared/lib/error-messages";
import { AlertIcon } from "@/shared/ui/icons";
import { useBreedsInfinite } from "../hooks/useBreedsInfinite";
import { useBreedSearch } from "../hooks/useBreedSearch";
import { usePersistedFirstPage } from "../hooks/usePersistedFirstPage";
import { useSyncDirectoryUrl } from "../hooks/useSyncDirectoryUrl";
import { useDirectoryUI } from "../state/DirectoryUIProvider";
import { BreedList } from "./BreedList";
import { BreedListSkeleton } from "./BreedListSkeleton";
import { SearchField } from "./SearchField";

const MAX_ATTEMPTS = 4;

function LoadProgress({ loaded, total, className = "" }: { loaded: number; total: number; className?: string }) {
  const progress = total > 0 ? Math.round((loaded / total) * 100) : 0;
  return (
    <div
      role="progressbar"
      aria-label="Razas cargadas"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={loaded}
      className={`h-1 overflow-hidden rounded-sm bg-line ${className}`}
    >
      <div className="h-full bg-accent transition-[width]" style={{ width: `${progress}%` }} />
    </div>
  );
}

export function BreedDirectory() {
  const {
    breeds, total, firstPage, loadedPages, lastPage, failureCount, hasNextPage, fetchNextPage,
    isFetchingNextPage, isFetchNextPageError, isPending, isError, error, refetch,
  } = useBreedsInfinite();
  const isOnline = useOnlineStatus();
  const { query, clearSearch } = useDirectoryUI();
  const matches = useBreedSearch(breeds, query);
  const sectionRef = useRef<HTMLElement>(null);
  const previousQuery = useRef(query);

  useSyncDirectoryUrl({ query, page: loadedPages });
  usePersistedFirstPage(firstPage);

  useEffect(() => {
    if (previousQuery.current === query) return;
    previousQuery.current = query;
    const section = sectionRef.current;
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY - 16;
    if (window.scrollY > top) window.scrollTo({ top });
  }, [query]);

  const loadMore = useCallback(() => {
    fetchNextPage({ cancelRefetch: false });
  }, [fetchNextPage]);

  if (isPending) {
    return (
      <div className="mt-9">
        <BreedListSkeleton />
      </div>
    );
  }

  if (isError && breeds.length === 0) {
    return (
      <div role="alert" className="mt-9 flex flex-col gap-3 rounded-2xl border border-line bg-surface p-7">
        <AlertIcon className="size-7 text-danger" />
        <p className="font-display text-xl font-bold">No pudimos cargar el directorio</p>
        <p className="text-[15px] text-ink-muted">
          {getErrorMessage(error)} Lo intentamos varias veces antes de mostrarte este aviso.
        </p>
        <Button variant="primary" className="mt-3 self-start" onClick={() => refetch()}>
          Reintentar ahora
        </Button>
      </div>
    );
  }

  const nextPage = loadedPages + 1;
  const matchLabel = matches.length === 1 ? "1 coincidencia" : `${matches.length} coincidencias`;
  const noMatches = Boolean(query) && matches.length === 0;

  return (
    <section ref={sectionRef} aria-label="Directorio de razas" className="mt-9">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <SearchField />
        <div className="flex flex-col gap-2 sm:w-37">
          <p className="flex items-baseline gap-1.5 tabular-nums">
            <span className="font-display text-[22px] font-bold">{breeds.length}</span>
            <span className="text-sm text-ink-muted">de {total} cargadas</span>
          </p>
          <LoadProgress loaded={breeds.length} total={total} />
        </div>
      </div>

      {isError && !isFetchNextPageError && (
        <p role="status" className="mt-4 rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink-muted">
          <strong className="text-ink">No pudimos actualizar la lista.</strong> Mostramos las razas que ya
          teníamos guardadas; se actualizarán en cuanto el servicio responda.
        </p>
      )}

      <p aria-live="polite" className="mt-3.5 min-h-[22px] text-sm text-ink-muted">
        {query && (
          <>
            <strong className="font-bold text-ink">{matchLabel}</strong> en {breeds.length} de {total} razas.
            {hasNextPage && (isOnline ? " Seguimos cargando el resto." : " Buscaremos en el resto al reconectar.")}
          </>
        )}
      </p>

      <div
        aria-hidden="true"
        className="mt-3.5 border-b border-line text-xs font-bold uppercase tracking-[0.09em] text-ink-subtle sm:grid sm:grid-cols-[36px_52px_minmax(0,1fr)_200px_20px] sm:gap-x-5 sm:border-line-strong sm:px-3 sm:pb-2.5"
      >
        <span className="hidden sm:block" />
        <span className="hidden sm:block" />
        <span className="hidden sm:block">Raza</span>
        <span className="hidden sm:block">País</span>
        <span className="hidden sm:block" />
      </div>

      {noMatches && (
        <div className="flex flex-col gap-1.5 border-b border-line px-1 py-10 sm:px-3">
          <p className="font-display text-xl font-semibold">
            {hasNextPage ? `Nada coincide todavía con «${query}»` : `Ninguna raza coincide con «${query}»`}
          </p>
          <p className="text-[15px] text-ink-muted">
            {hasNextPage
              ? `Buscamos en ${breeds.length} de ${total} razas cargadas. Seguimos cargando el resto.`
              : "Revisa el nombre o borra la búsqueda para ver todo el directorio."}
          </p>
          {hasNextPage ? (
            <LoadProgress loaded={breeds.length} total={total} className="mt-4 max-w-72" />
          ) : (
            <Button className="mt-3 self-start" onClick={clearSearch}>
              Borrar búsqueda
            </Button>
          )}
        </div>
      )}

      <BreedList
        breeds={matches}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isFetchNextPageError={isFetchNextPageError}
        nextPage={nextPage}
        query={query}
        isOffline={!isOnline}
        onLoadMore={loadMore}
      />

      <p role="status" className="mt-4 min-h-5 text-sm text-ink-subtle">
        {isFetchingNextPage &&
          (failureCount > 0
            ? `Reintentando la página ${nextPage} · intento ${failureCount + 1} de ${MAX_ATTEMPTS}`
            : `Cargando página ${nextPage} de ${lastPage}…`)}
      </p>

      {!hasNextPage && !query && (
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <div aria-hidden="true" className="flex gap-1.5">
            <CatSilhouette className="size-4 text-line-strong" />
            <CatSilhouette className="size-4 text-accent" />
            <CatSilhouette className="size-4 text-line-strong" />
          </div>
          <p className="font-display text-xl font-bold">Has visto las {breeds.length} razas</p>
          <p className="text-[15px] text-ink-muted">No hay más páginas que cargar.</p>
        </div>
      )}
    </section>
  );
}
