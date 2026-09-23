import { SiteHeader } from "@/shared/ui/SiteHeader";
import { DirectoryHeader } from "@/features/breeds/components/DirectoryHeader";
import { BreedListSkeleton } from "@/features/breeds/components/BreedListSkeleton";
import { PatternLegend } from "@/features/breeds/components/PatternLegend";

export default function Loading() {
  return (
    <>
      <SiteHeader />
      <div className="mx-auto grid w-full max-w-[1280px] gap-x-18 px-5 pb-20 pt-8 sm:px-16 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_272px]">
        <main className="min-w-0">
          <DirectoryHeader />
          <div className="mt-9">
            <BreedListSkeleton />
          </div>
        </main>
        <PatternLegend />
      </div>
    </>
  );
}
