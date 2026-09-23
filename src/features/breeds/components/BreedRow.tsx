"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { ChevronRightIcon } from "@/shared/ui/icons";
import type { Breed } from "../schemas/breed.schema";
import { splitMatch } from "../utils/search";
import { canUseViewTransition, coatTransitionName, navigateWithCoatTransition } from "../utils/view-transition";
import { CoatSwatch } from "./CoatSwatch";

type Props = { breed: Breed; letter?: string; query?: string };

export function BreedRow({ breed, letter = "", query = "" }: Props) {
  const router = useRouter();
  const [before, match, after] = splitMatch(breed.name, query);
  const pattern = breed.pattern ?? "Patrón sin dato";
  const country = breed.country ?? "Origen desconocido";
  const details = [pattern, breed.coat, breed.origin].filter(Boolean).join(" · ");
  const href = `/breeds/${breed.slug}`;

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const swatch = event.currentTarget.querySelector<HTMLElement>("[data-coat]");
    if (!swatch || !canUseViewTransition()) return;
    event.preventDefault();
    navigateWithCoatTransition(swatch, coatTransitionName(breed.slug), () => router.push(href));
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className="grid h-full grid-cols-[44px_minmax(0,1fr)_18px] items-center gap-x-4 px-1 transition-colors hover:bg-surface sm:grid-cols-[36px_52px_minmax(0,1fr)_200px_20px] sm:gap-x-5 sm:px-3"
    >
      <span aria-hidden="true" className="hidden font-display text-2xl font-bold text-accent sm:block">
        {letter}
      </span>
      <span data-coat className="block">
        <CoatSwatch slug={breed.slug} pattern={breed.pattern} />
      </span>
      <span className="flex min-w-0 flex-col gap-[3px]">
        <span className="truncate font-display text-xl font-semibold tracking-[-0.01em]">
          {before}
          {match && <mark className="rounded-[3px] bg-accent-soft text-inherit">{match}</mark>}
          {after}
        </span>
        <span className="hidden truncate text-sm text-ink-muted sm:block">{details}</span>
        <span className="truncate text-sm text-ink-muted sm:hidden">
          {country} · {pattern}
        </span>
      </span>
      <span className="hidden truncate text-[15px] text-ink-muted sm:block">{country}</span>
      <ChevronRightIcon className="size-[18px] text-ink-subtle" />
    </Link>
  );
}
