export type HttpErrorKind = "network" | "timeout" | "http" | "validation";

export class HttpError extends Error {
    constructor( public readonly kind: HttpErrorKind, message: string, public readonly status?: number, options?:{cause?: unknown}){
        super(message, options);
        this.name = "HttpError"
    }

    /* Como estan pidiendo reintentos vamos a generar un getter que me permita reintetar los fallos de red */
    get isRetryable():boolean {
        if(this.kind === 'network' || this.kind === "timeout") return true;
        if(this.kind === 'http') return this.status === 429 || (this.status ?? 0) >= 500;
        return false
    }
}


export const isRetryableError = (error: unknown): boolean => error instanceof HttpError && error.isRetryable;
