import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/lib/query-client";
import { SiteHeader } from "@/shared/ui/SiteHeader";
import { breedsListOptions } from "@/features/breeds/api/breeds.queries";
import { directorySearchParamsSchema } from "@/features/breeds/schemas/search-params.schema";
import { BreedDirectory } from "@/features/breeds/components/BreedDirectory";
import { DirectoryHeader } from "@/features/breeds/components/DirectoryHeader";
import { PatternLegend } from "@/features/breeds/components/PatternLegend";
import { ReloadButton } from "@/features/breeds/components/ReloadButton";
import { DirectoryUIProvider } from "@/features/breeds/state/DirectoryUIProvider";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function HomePage({ searchParams }: Props) {
  const { page, q } = directorySearchParamsSchema.parse(await searchParams);
  const queryClient = getQueryClient();
  const listOptions = breedsListOptions();

  await queryClient.prefetchInfiniteQuery({
    ...listOptions,
    pages: page,
  });

  const total = queryClient.getQueryData(listOptions.queryKey)?.pages[0]?.total;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SiteHeader actions={<ReloadButton />} />
      <div className="mx-auto grid w-full max-w-[1280px] gap-x-18 px-5 pb-20 pt-8 sm:px-16 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_272px]">
        <main className="min-w-0">
          <DirectoryHeader total={total} />
          <DirectoryUIProvider initialQuery={q}>
            <BreedDirectory />
          </DirectoryUIProvider>
        </main>
        <PatternLegend />
      </div>
    </HydrationBoundary>
  );
}
