import { fetchJson } from "@/shared/lib/http-client";
import { API_BASE_URL, BREEDS_PAGE_SIZE } from "@/shared/lib/api-config";
import { breedsPageSchema, type Breed, type BreedsPage } from "../schemas/breed.schema";

type FetchOptions = {
  signal?: AbortSignal;
  revalidate?: number; // segundos, solo aplica en el servidor
  limit?: number;
};

export async function getBreedsPage(
  page: number,
  { signal, revalidate, limit = BREEDS_PAGE_SIZE }: FetchOptions = {},
): Promise<BreedsPage> {
  const url = new URL("/breeds", API_BASE_URL);
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));

  return fetchJson(url.toString(), breedsPageSchema, {
    signal,
    ...(revalidate !== undefined && { next: { revalidate } }),
  });
}

/** Trae todas las razas: la API no tiene endpoint por ID */
export async function getAllBreeds(options: Omit<FetchOptions, "limit"> = {}): Promise<Breed[]> {
  const first = await getBreedsPage(1, { ...options, limit: 100 });
  if (first.lastPage <= 1) return first.items;

  const rest = await Promise.all(
    Array.from({ length: first.lastPage - 1 }, (_, i) =>
      getBreedsPage(i + 2, { ...options, limit: 100 }),
    ),
  );
  return [first, ...rest].flatMap((page) => page.items);
}

export async function getBreedBySlug(slug: string, options?: Omit<FetchOptions, "limit">) {
  const breeds = await getAllBreeds(options);
  return breeds.find((breed) => breed.slug === slug) ?? null;
}