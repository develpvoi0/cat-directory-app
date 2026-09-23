import { fetchJson } from "@/shared/lib/http-client";
import { API_BASE_URL } from "@/shared/lib/api-config";
import { factSchema, type CatFact } from "../schemas/fact.schema";

export async function getRandomFact({ signal }: { signal?: AbortSignal } = {}): Promise<CatFact> {
  const url = new URL("/fact", API_BASE_URL);
  url.searchParams.set("max_length", "280"); // evita textos gigantes que rompan el layout
  return fetchJson(url.toString(), factSchema, { signal, cache: "no-store" });
}

/* Aqui el cache no store si el dato es aleatorio es cacheado dejaria de ser aleatorio */