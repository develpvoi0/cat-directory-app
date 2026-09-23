import { CatSilhouette } from "@/shared/ui/CatSilhouette";
import { Skeleton } from "@/shared/ui/Skeleton";

export function BreedRowSkeleton() {
  return (
    <div className="grid h-19.25 grid-cols-[44px_minmax(0,1fr)] items-center gap-x-4 border-b border-line px-1 sm:grid-cols-[36px_52px_minmax(0,1fr)_200px_20px] sm:gap-x-5 sm:px-3">
      <span className="hidden sm:block" />
      <CatSilhouette className="size-11 animate-skeleton text-surface-2 sm:size-13" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3.5 w-44 max-w-full" />
        <Skeleton className="h-2.5 w-60 max-w-full" />
      </div>
      <Skeleton className="hidden h-2.5 w-28 sm:block" />
    </div>
  );
}

export function BreedListSkeleton({ rows = 8, label = "Cargando razas…" }: { rows?: number; label?: string }) {
  return (
    <div role="status">
      <span className="sr-only">{label}</span>
      {Array.from({ length: rows }, (_, i) => <BreedRowSkeleton key={i} />)}
    </div>
  );
}
