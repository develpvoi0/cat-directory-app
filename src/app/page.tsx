import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/lib/query-client";
import { breedsListOptions } from "@/features/breeds/api/breeds.queries";
import { directorySearchParamsSchema } from "@/features/breeds/schemas/search-params.schema";
import { BreedDirectory } from "@/features/breeds/components/BreedDirectory";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function HomePage({ searchParams }: Props) {
  const { page } = directorySearchParamsSchema.parse(await searchParams);
  const queryClient = getQueryClient();

  // Trae las páginas 1..N en el servidor: un link con ?page=3 llega completo
  await queryClient.prefetchInfiniteQuery({ ...breedsListOptions(), pages: page });

  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-20 pt-10 sm:px-6 sm:pt-16">
      <header className="mb-8">
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Razas de gatos
        </h1>
        <p className="mt-3 max-w-prose text-ink-muted">
          Consulta el origen, el pelaje y el patrón de cada raza.
        </p>
      </header>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <BreedDirectory />
      </HydrationBoundary>
    </main>
  );
}