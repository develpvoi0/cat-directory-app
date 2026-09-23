import Link from "next/link";
import { SiteHeader } from "@/shared/ui/SiteHeader";
import { CatSilhouette } from "@/shared/ui/CatSilhouette";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-[1280px] px-5 pb-20 pt-12 sm:px-16">
        <div className="mx-auto flex max-w-xl flex-col gap-3 rounded-2xl border border-line bg-surface p-7">
          <CatSilhouette className="size-10 text-line" />
          <h1 className="font-display text-2xl font-bold">Esta página no existe</h1>
          <p className="text-[15px] text-ink-muted">El enlace puede estar incompleto o la página se movió.</p>
          <Link href="/" className="mt-3 inline-flex min-h-11 items-center self-start font-bold text-accent underline">
            Ir al directorio
          </Link>
        </div>
      </main>
    </>
  );
}
