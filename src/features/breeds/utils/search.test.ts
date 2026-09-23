import { describe, expect, it } from "vitest";
import { matchesQuery, splitMatch } from "./search";

describe("búsqueda local", () => {
  it("ignora mayúsculas y tildes", () => {
    expect(matchesQuery("Siamese", "SIA")).toBe(true);
    expect(matchesQuery("Bengalí", "bengali")).toBe(true);
    expect(matchesQuery("Bombay", "sia")).toBe(false);
  });

  it("un query vacío coincide con todo", () => {
    expect(matchesQuery("Abyssinian", "")).toBe(true);
  });

  it("separa el fragmento a resaltar conservando el texto original", () => {
    expect(splitMatch("American Curl", "curl")).toEqual(["American ", "Curl", ""]);
    expect(splitMatch("Bombay", "xyz")).toEqual(["Bombay", "", ""]);
  });
});
