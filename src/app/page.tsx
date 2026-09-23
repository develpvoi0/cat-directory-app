import { Suspense } from "react";
import { SiteHeader } from "@/shared/ui/SiteHeader";
import { directorySearchParamsSchema } from "@/features/breeds/schemas/search-params.schema";
import { BreedListSkeleton } from "@/features/breeds/components/BreedListSkeleton";
import { DirectoryHeader } from "@/features/breeds/components/DirectoryHeader";
import { DirectorySection } from "@/features/breeds/components/DirectorySection";
import { PatternLegend } from "@/features/breeds/components/PatternLegend";
import { ReloadButton } from "@/features/breeds/components/ReloadButton";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function HomePage({ searchParams }: Props) {
  const { page, q } = directorySearchParamsSchema.parse(await searchParams);

  return (
    <>
      <SiteHeader actions={<ReloadButton />} />
      <div className="mx-auto grid w-full max-w-[1280px] gap-x-18 px-5 pb-20 pt-8 sm:px-16 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_272px]">
        <main id="main" className="min-w-0">
          <DirectoryHeader pages={page} />
          <Suspense
            fallback={
              <div className="mt-9">
                <BreedListSkeleton />
              </div>
            }
          >
            <DirectorySection pages={page} initialQuery={q} />
          </Suspense>
        </main>
        <PatternLegend />
      </div>
    </>
  );
}
