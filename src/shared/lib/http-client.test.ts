import { afterEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { fetchJson } from "./http-client";
import { HttpError, isRetryableError } from "./http-error";

const schema = z.object({ fact: z.string() });

function mockFetch(implementation: () => Promise<Response>) {
  vi.stubGlobal("fetch", vi.fn(implementation));
}

async function captureError(promise: Promise<unknown>): Promise<HttpError> {
  try {
    await promise;
  } catch (error) {
    if (error instanceof HttpError) return error;
    throw error;
  }
  throw new Error("Se esperaba un HttpError");
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("fetchJson", () => {
  it("devuelve los datos validados", async () => {
    mockFetch(async () => Response.json({ fact: "Los gatos duermen mucho." }));
    await expect(fetchJson("https://api.test/fact", schema)).resolves.toEqual({ fact: "Los gatos duermen mucho." });
  });

  it("un 503 es un error http reintentable", async () => {
    mockFetch(async () => new Response(null, { status: 503 }));
    const error = await captureError(fetchJson("https://api.test/fact", schema));
    expect(error).toMatchObject({ kind: "http", status: 503 });
    expect(isRetryableError(error)).toBe(true);
  });

  it("un 404 no se reintenta", async () => {
    mockFetch(async () => new Response(null, { status: 404 }));
    const error = await captureError(fetchJson("https://api.test/fact", schema));
    expect(isRetryableError(error)).toBe(false);
  });

  it("una caída de red es reintentable", async () => {
    mockFetch(async () => {
      throw new TypeError("Failed to fetch");
    });
    const error = await captureError(fetchJson("https://api.test/fact", schema));
    expect(error.kind).toBe("network");
    expect(isRetryableError(error)).toBe(true);
  });

  it("una respuesta con forma inesperada es un error de validación definitivo", async () => {
    mockFetch(async () => Response.json({ data: [] }));
    const error = await captureError(fetchJson("https://api.test/fact", schema));
    expect(error.kind).toBe("validation");
    expect(isRetryableError(error)).toBe(false);
  });
});
