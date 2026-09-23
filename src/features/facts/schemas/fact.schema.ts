import { z } from "zod";

export const factSchema = z
  .object({ fact: z.string().trim().min(1), length: z.coerce.number() })
  .transform((raw) => ({ text: raw.fact, length: raw.length }));

export type CatFact = z.output<typeof factSchema>;

/* Datos Curiosos */