import { HttpError } from "./http-error";

export function getErrorMessage(error: unknown): string {
  if (!(error instanceof HttpError)) return "Ocurrió un error inesperado.";

  switch (error.kind) {
    case "network":
      return "No hay conexión con el servidor.";
    case "timeout":
      return "El servidor tardó demasiado en responder.";
    case "validation":
      return "Recibimos datos con un formato inesperado.";
    case "http":
      if (error.status === 404) return "No encontramos lo que buscabas.";
      if (error.status === 429) return "Hicimos demasiadas solicitudes. Espera un momento.";
      return "El servicio de razas no está disponible en este momento.";
  }
}
