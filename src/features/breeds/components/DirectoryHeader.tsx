import { Suspense } from "react";
import { prefetchDirectory } from "../api/breeds.server";

async function RegisteredCount({ pages }: { pages: number }) {
  const { total } = await prefetchDirectory(pages);
  return total ? <> · {total} razas registradas</> : null;
}

export function DirectoryHeader({ pages }: { pages?: number }) {
  return (
    <header>
      <p className="text-[13px] font-bold uppercase tracking-[0.09em] text-ink-subtle">
        Directorio
        {pages !== undefined && (
          <Suspense fallback={null}>
            <RegisteredCount pages={pages} />
          </Suspense>
        )}
      </p>
      <h1 className="mt-3 font-display text-[42px] font-bold leading-[0.98] tracking-[-0.035em] sm:text-[68px]">
        Razas de gatos
      </h1>
    </header>
  );
}
