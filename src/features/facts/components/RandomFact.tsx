"use client";

import { useQuery } from "@tanstack/react-query";
import { getErrorMessage } from "@/shared/lib/error-messages";
import { Button } from "@/shared/ui/Button";
import { AlertIcon, RefreshIcon } from "@/shared/ui/icons";
import { Skeleton } from "@/shared/ui/Skeleton";
import { randomFactOptions } from "../api/facts.queries";

export function RandomFact({ scope }: { scope: string }) {
  const { data, error, isError, isFetching, isPaused, failureCount, refetch } = useQuery(randomFactOptions(scope));
  const showError = isError && !isFetching;

  return (
    <section
      aria-labelledby="random-fact-title"
      className="mt-12 grid gap-6 rounded-2xl border border-line bg-surface p-6 sm:p-8 md:grid-cols-[220px_minmax(0,1fr)_auto] md:items-center md:gap-10"
    >
      <div>
        <h2 id="random-fact-title" className="font-display text-2xl font-bold tracking-[-0.02em]">
          ¿Sabías que…?
        </h2>
        <p className="mt-1 text-[13px] text-ink-subtle">Dato aleatorio · /fact</p>
      </div>

      <div aria-live="polite" aria-busy={isFetching} className="min-h-14">
        {isFetching ? (
          <div role="status" className="flex flex-col gap-2.5 pt-1">
            <span className="sr-only">
              {failureCount > 0 ? "Reintentando cargar el dato…" : "Cargando un dato curioso…"}
            </span>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            {failureCount > 0 && (
              <span className="text-sm text-ink-subtle">Reintentando · intento {failureCount + 1}</span>
            )}
          </div>
        ) : showError ? (
          <div role="alert" className="flex items-start gap-3">
            <AlertIcon className="mt-0.5 size-6 shrink-0 text-danger" />
            <p>
              <span className="block font-bold">No pudimos traer un dato curioso.</span>
              <span className="text-[15px] text-ink-muted">{getErrorMessage(error)}</span>
            </p>
          </div>
        ) : (
          <>
            {data && <p className="text-[19px] leading-relaxed">{data.text}</p>}
            {isPaused && (
              <p className="mt-2 text-sm text-ink-subtle">Sin conexión. Traeremos un dato nuevo al reconectar.</p>
            )}
          </>
        )}
      </div>

      <Button onClick={() => refetch()} disabled={isFetching || isPaused} className="justify-self-start">
        <RefreshIcon className={`size-[18px] ${isFetching ? "animate-spin" : ""}`} />
        {showError ? "Reintentar" : "Otro dato"}
      </Button>
    </section>
  );
}
