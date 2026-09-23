import { describe, expect, it } from "vitest";
import { breedsPageSchema } from "./breed.schema";

const page = (data: unknown[], current = 1, last = 5) => ({
  current_page: current,
  last_page: String(last),
  total: 98,
  data,
});

describe("breedsPageSchema", () => {
  it("transforma la respuesta de la API al modelo de dominio", () => {
    const result = breedsPageSchema.parse(
      page([{ breed: "Abyssinian", country: "Ethiopia", origin: "Natural/Standard", coat: "Short", pattern: "Ticked" }]),
    );
    expect(result).toEqual({
      items: [
        {
          slug: "abyssinian",
          name: "Abyssinian",
          country: "Ethiopia",
          origin: "Natural/Standard",
          coat: "Short",
          pattern: "Ticked",
        },
      ],
      page: 1,
      lastPage: 5,
      total: 98,
      nextPage: 2,
    });
  });

  it("convierte textos vacíos en null y descarta items inválidos sin romper la página", () => {
    const result = breedsPageSchema.parse(
      page([{ breed: "Arabian Mau", country: "", origin: "Natural", coat: "Short", pattern: "  " }, { breed: "" }, 42]),
    );
    expect(result.items).toHaveLength(1);
    expect(result.items[0]).toMatchObject({ slug: "arabian-mau", country: null, pattern: null });
  });

  it("marca la última página sin siguiente", () => {
    expect(breedsPageSchema.parse(page([], 5, 5)).nextPage).toBeNull();
  });
});
