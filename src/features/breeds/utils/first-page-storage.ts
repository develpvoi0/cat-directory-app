import { z } from "zod";
import type { BreedsPage } from "../schemas/breed.schema";

const STORAGE_KEY = "cat-directory:first-page:v1";

const storedBreedSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  country: z.string().nullable(),
  origin: z.string().nullable(),
  coat: z.string().nullable(),
  pattern: z.string().nullable(),
});

const storedFirstPageSchema = z.object({
  savedAt: z.number(),
  page: z.object({
    items: z.array(storedBreedSchema).min(1),
    page: z.literal(1),
    lastPage: z.number(),
    total: z.number(),
    nextPage: z.number().nullable(),
  }),
});

export type StoredFirstPage = z.output<typeof storedFirstPageSchema>;

export function saveFirstPage(page: BreedsPage) {
  if (page.page !== 1) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ savedAt: Date.now(), page }));
  } catch {}
}

export function readFirstPage(): StoredFirstPage | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = storedFirstPageSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}
