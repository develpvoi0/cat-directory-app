import { describe, expect, it } from "vitest";
import { COAT_COLORS, coatColorFor, patternFamily } from "./coat";

describe("patternFamily", () => {
  it.each([
    ["Ticked", "ticked"],
    ["Colorpoint", "colorpoint"],
    ["Spotted/Marbled", "spotted"],
    ["Tabby", "tabby"],
    ["Tortoiseshell", "tortie"],
    ["Bi- or tri-colored", "bicolor"],
    ["Solid", "solid"],
    ["All", "mixed"],
    [null, "mixed"],
  ])("normaliza %s como %s", (pattern, family) => {
    expect(patternFamily(pattern)).toBe(family);
  });
});

describe("coatColorFor", () => {
  it("es determinista para la misma raza", () => {
    expect(coatColorFor("siamese")).toBe(coatColorFor("siamese"));
    expect(COAT_COLORS).toContain(coatColorFor("bengal"));
  });
});
