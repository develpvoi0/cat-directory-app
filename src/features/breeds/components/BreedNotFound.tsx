"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CatSilhouette } from "@/shared/ui/CatSilhouette";

export function BreedNotFound() {
  const pathname = usePathname();
  const slug = decodeURIComponent(pathname.split("/").filter(Boolean).at(-1) ?? "");

  return (
    <div className="mx-auto mt-12 flex max-w-xl flex-col gap-3 rounded-2xl border border-line bg-surface p-7">
      <CatSilhouette className="size-10 text-line" />
      <h1 className="font-display text-2xl font-bold">
        {slug ? `No encontramos «${slug}»` : "No encontramos esa raza"}
      </h1>
      <p className="text-[15px] text-ink-muted">
        Esta raza no existe en el registro. Revisa el nombre o vuelve al listado.
      </p>
      <Link href="/" className="mt-3 inline-flex min-h-11 items-center self-start font-bold text-accent underline">
        Volver al directorio
      </Link>
    </div>
  );
}
