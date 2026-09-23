import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { SiteHeader } from "@/shared/ui/SiteHeader";
import { getAllBreeds, getBreedBySlug } from "@/features/breeds/api/breeds.repository";
import { BreedDetail } from "@/features/breeds/components/BreedDetail";

export const revalidate = 3600;

const loadBreed = cache((slug: string) => getBreedBySlug(slug, { revalidate }));

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const breeds = await getAllBreeds({ revalidate });
    return breeds.map((breed) => ({ slug: breed.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const breed = await loadBreed(slug).catch(() => undefined);

  if (breed === undefined) return { title: "Ficha de raza" };
  if (breed === null) return { title: "Raza no encontrada", robots: { index: false } };

  const origin = breed.country ? ` originaria de ${breed.country}` : "";
  const description = `${breed.name}: raza de gato${origin}. Pelaje ${breed.coat ?? "sin dato"}, patrón ${breed.pattern ?? "sin dato"}.`;

  return {
    title: breed.name,
    description,
    alternates: { canonical: `/breeds/${breed.slug}` },
    openGraph: { title: `${breed.name} | Cat Directory`, description, url: `/breeds/${breed.slug}` },
  };
}

export default async function BreedPage({ params }: Props) {
  const { slug } = await params;
  const breed = await loadBreed(slug);
  if (!breed) notFound();

  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-[1280px] px-5 pb-20 pt-8 sm:px-16 sm:pt-12">
        <BreedDetail breed={breed} />
      </main>
    </>
  );
}
