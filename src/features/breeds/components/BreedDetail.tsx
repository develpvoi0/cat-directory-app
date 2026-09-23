import { RandomFact } from "@/features/facts/components/RandomFact";
import type { Breed } from "../schemas/breed.schema";
import { BackLink } from "./BackLink";
import { DetailSwatch } from "./DetailSwatch";

export function BreedDetail({ breed }: { breed: Breed }) {
  const facts: [string, string | null][] = [
    ["País", breed.country],
    ["Origen", breed.origin],
    ["Pelaje", breed.coat],
    ["Patrón", breed.pattern],
  ];

  return (
    <>
      <BackLink />
      <article className="mt-8 grid gap-10 md:mt-12 md:grid-cols-[320px_minmax(0,1fr)] md:gap-18">
        <figure className="flex flex-col gap-4">
          <div className="grid aspect-square w-full max-w-80 place-items-center rounded-3xl border border-line bg-surface">
            <DetailSwatch slug={breed.slug} pattern={breed.pattern} />
          </div>
          <figcaption className="text-sm text-ink-subtle">
            Muestra generada a partir del patrón «{breed.pattern ?? "sin dato"}»
          </figcaption>
        </figure>

        <div className="min-w-0">
          <p className="text-[13px] font-bold uppercase tracking-[0.09em] text-ink-subtle">
            Ficha de raza · /breeds/{breed.slug}
          </p>
          <h1 className="mt-3 break-words font-display text-[44px] font-bold leading-[0.95] tracking-[-0.035em] sm:text-[72px]">
            {breed.name}
          </h1>
          <dl className="mt-8 border-t border-line-strong">
            {facts.map(([label, value]) => (
              <div
                key={label}
                className="grid grid-cols-[110px_minmax(0,1fr)] items-center gap-4 border-b border-line py-4 sm:grid-cols-[160px_minmax(0,1fr)]"
              >
                <dt className="text-[13px] font-bold uppercase tracking-[0.09em] text-ink-subtle">{label}</dt>
                <dd className="text-[17px]">{value ?? "Sin dato"}</dd>
              </div>
            ))}
          </dl>
        </div>
      </article>
      <RandomFact scope={breed.slug} />
    </>
  );
}
