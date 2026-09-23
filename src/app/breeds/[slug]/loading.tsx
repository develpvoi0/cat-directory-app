import { SiteHeader } from "@/shared/ui/SiteHeader";
import { CatSilhouette } from "@/shared/ui/CatSilhouette";
import { Skeleton } from "@/shared/ui/Skeleton";

export default function Loading() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-[1280px] px-5 pb-20 pt-8 sm:px-16 sm:pt-12">
        <div role="status" className="flex flex-col">
          <span className="sr-only">Cargando la ficha de la raza…</span>
          <Skeleton className="h-5 w-44" />
          <div className="mt-8 grid gap-10 md:mt-12 md:grid-cols-[320px_minmax(0,1fr)] md:gap-18">
            <div className="grid aspect-square w-full max-w-80 place-items-center rounded-3xl border border-line bg-surface">
              <CatSilhouette className="size-48 animate-skeleton text-surface-2 sm:size-64" />
            </div>
            <div className="flex flex-col gap-4">
              <Skeleton className="h-3 w-52" />
              <Skeleton className="h-16 w-4/5" />
              {Array.from({ length: 4 }, (_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
