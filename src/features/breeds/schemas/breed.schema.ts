import { z } from "zod";
import { slugify } from "../utils/slugify";

const optionalText = z.string().nullish().transform((value) => value?.trim() || null);

export const breedSchema = z.object({
    breed: z.string().trim().min(1),
    country: optionalText,
    origin: optionalText,
    coat: optionalText,
    pattern: optionalText,
})
.transform((raw) =>({
    slug: slugify(raw.breed),
    name: raw.breed,
    country: raw.country,
    origin: raw.origin,
    coat: raw.coat,
    pattern: raw.pattern,
}))

export type Breed = z.output<typeof breedSchema>;

/** Aquui evitamos que si item viene mal formado descartamos eso y la app contruye lo demas con lo que tiene a la mano obviando lo que no tenemos*/
const resilientBreedList = z.array(z.unknown()).transform((items) =>
  items.flatMap((item) => {
    const result = breedSchema.safeParse(item);
    if (!result.success) console.warn("[breeds] item descartado:", item);
    return result.success ? [result.data] : [];
  }),
);



/* Por si acaso algunos paginados cambian sus tipos, evitamos que la coercion de tipos rompa la app  */
export const breedsPageSchema = z
  .object({
    current_page: z.coerce.number(),
    last_page: z.coerce.number(),
    total: z.coerce.number(),
    data: resilientBreedList,
  })
  .transform((raw) => ({
    items: raw.data,
    page: raw.current_page,
    lastPage: raw.last_page,
    total: raw.total,
    nextPage: raw.current_page < raw.last_page ? raw.current_page + 1 : null,
  }));

export type BreedsPage = z.output<typeof breedsPageSchema>;