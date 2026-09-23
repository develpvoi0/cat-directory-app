"use client";

import { useLayoutEffect } from "react";
import type { Breed } from "../schemas/breed.schema";
import { coatTransitionName, completeCoatTransition } from "../utils/view-transition";
import { CoatSwatch } from "./CoatSwatch";

export function DetailSwatch({ slug, pattern }: Pick<Breed, "slug" | "pattern">) {
  useLayoutEffect(() => {
    completeCoatTransition();
  }, []);

  return (
    <div style={{ viewTransitionName: coatTransitionName(slug) }}>
      <CoatSwatch slug={slug} pattern={pattern} size="lg" />
    </div>
  );
}
