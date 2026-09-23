import type { MetadataRoute } from "next";
import { getAllBreeds } from "@/features/breeds/api/breeds.repository";

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const home: MetadataRoute.Sitemap[number] = { url: base, changeFrequency: "daily", priority: 1 };

  try {
    const breeds = await getAllBreeds({ revalidate });
    return [
      home,
      ...breeds.map((breed) => ({
        url: `${base}/breeds/${breed.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ];
  } catch {
    return [home];
  }
}
