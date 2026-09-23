import { SiteHeader } from "@/shared/ui/SiteHeader";
import { BreedNotFound } from "@/features/breeds/components/BreedNotFound";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-[1280px] px-5 pb-20 pt-8 sm:px-16">
        <BreedNotFound />
      </main>
    </>
  );
}
