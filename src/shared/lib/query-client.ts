import { QueryClient, environmentManager } from "@tanstack/react-query";
import { isRetryableError } from "./http-error";

const MAX_RETRIES = 3;

/** Aqui generamos un Backoff exponencial (1s, 2s, 4s… tope 8s) con jitter */
export function retryDelay(attempt: number): number {
  const base = Math.min(1000 * 2 ** attempt, 8000);
  return base / 2 + Math.random() * (base / 2);
}


// Aqui hacemos que el cliente NO repita lo que trajo el servidor
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, 
        gcTime: 30 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => isRetryableError(error) && failureCount < MAX_RETRIES,
        retryDelay,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

 // Aqui hacemos uno nuevo por request: nunca compartir caché entre usuarios
export function getQueryClient() {
  if (environmentManager.isServer()) return makeQueryClient();
  return (browserQueryClient ??= makeQueryClient());
}