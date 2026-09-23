"use client";

import { useBreedsInfinite } from "../hooks/useBreedsInfinite";
import { CoatSwatch } from "./CoatSwatch";

export function BreedDirectory() {
  const { breeds, total, isPending } = useBreedsInfinite();

  if (isPending) return <p className="text-ink-muted">Cargando razas…</p>;

  return (
    <section aria-label="Directorio de razas">
      <p className="mb-4 text-sm text-ink-muted" aria-live="polite">
        {breeds.length} de {total} razas cargadas
      </p>
      <ul className="divide-y divide-line">
        {breeds.map((breed) => (
          <li key={breed.slug} className="flex items-center gap-4 py-3">
            <CoatSwatch slug={breed.slug} pattern={breed.pattern} />
            <span className="font-display text-lg font-semibold">{breed.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}