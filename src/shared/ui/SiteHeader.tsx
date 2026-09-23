import Link from "next/link";
import type { ReactNode } from "react";
import { CatSilhouette } from "./CatSilhouette";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader({ actions }: { actions?: ReactNode }) {
  return (
    <header className="border-b border-line">
      <a
        href="#main"
        className="sr-only rounded-lg bg-ink px-4 py-2 font-bold text-on-ink focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
      >
        Saltar al contenido
      </a>
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 sm:px-16">
        <Link href="/" className="flex items-center gap-3 rounded-md no-underline">
          <CatSilhouette withEyes className="size-8 text-ink" />
          <span className="font-display text-lg font-bold tracking-[-0.01em]">Catálogo felino</span>
        </Link>
        <div className="flex gap-2">
          {actions}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
