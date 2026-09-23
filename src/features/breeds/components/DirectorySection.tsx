import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { prefetchDirectory } from "../api/breeds.server";
import { DirectoryUIProvider } from "../state/DirectoryUIProvider";
import { BreedDirectory } from "./BreedDirectory";

type Props = { pages: number; initialQuery: string };

export async function DirectorySection({ pages, initialQuery }: Props) {
  const { queryClient } = await prefetchDirectory(pages);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DirectoryUIProvider initialQuery={initialQuery}>
        <BreedDirectory />
      </DirectoryUIProvider>
    </HydrationBoundary>
  );
}
