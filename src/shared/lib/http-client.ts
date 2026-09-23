// src/shared/lib/http-client.ts
import type { z } from "zod";
import { HttpError } from "./http-error";
import { REQUEST_TIMEOUT_MS } from "./api-config";

type RequestOptions = RequestInit & { timeoutMS?: number };

export async function fetchJson<S extends z.ZodType>(
  url: string,
  schema: S,
  { timeoutMS = REQUEST_TIMEOUT_MS, signal, ...init }: RequestOptions = {},
): Promise<z.output<S>> {
  const timeoutSignal = AbortSignal.timeout(timeoutMS);
  const combinedSignal = signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal;

  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");

  let response: Response;
  try {
    response = await fetch(url, { ...init, headers, signal: combinedSignal });
  } catch (error) {
    if (signal?.aborted) throw error; // cancelación intencional (React Query): no es un fallo
    if (timeoutSignal.aborted) {
      throw new HttpError("timeout", `Sin respuesta tras ${timeoutMS}ms`, undefined, { cause: error });
    }
    throw new HttpError("network", "No se pudo conectar con el servidor", undefined, { cause: error });
  }

  if (!response.ok) {
    throw new HttpError("http", `HTTP ${response.status}`, response.status);
  }

  let json: unknown;
  try {
    json = await response.json();
  } catch (error) {
    throw new HttpError("validation", "La respuesta no es JSON válido", response.status, { cause: error });
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    throw new HttpError("validation", "La respuesta tiene un formato inesperado", response.status, {
      cause: parsed.error,
    });
  }
  return parsed.data;
}