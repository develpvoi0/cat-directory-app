"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/shared/ui/Button";
import { AlertIcon } from "@/shared/ui/icons";
import { SiteHeader } from "@/shared/ui/SiteHeader";

type Props = { error: Error & { digest?: string }; reset: () => void };

export default function BreedError({ reset }: Props) {
  const router = useRouter();
  const [isRetrying, startTransition] = useTransition();

  return (
    <>
      <SiteHeader />
    <main id="main" className="mx-auto w-full max-w-[1280px] px-5 pb-20 pt-12 sm:px-16">
      <div role="alert" className="mx-auto flex max-w-xl flex-col gap-3 rounded-2xl border border-line bg-surface p-7">
        <AlertIcon className="size-7 text-danger" />
        <h1 className="font-display text-2xl font-bold">No pudimos cargar esta raza</h1>
        <p className="text-[15px] text-ink-muted">
          El servicio de razas no respondió. Puede ser tu conexión o una caída temporal del servicio.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <Button
            variant="primary"
            disabled={isRetrying}
            onClick={() =>
              startTransition(() => {
                router.refresh();
                reset();
              })
            }
          >
            {isRetrying ? "Reintentando…" : "Reintentar ahora"}
          </Button>
          <Link href="/" className="font-bold text-accent underline">
            Volver al directorio
          </Link>
        </div>
      </div>
    </main>
    </>
  );
}
