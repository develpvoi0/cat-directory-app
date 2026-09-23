import { describe, expect, it } from "vitest";
import { directoryUIReducer, initDirectoryUI } from "./directory-ui.reducer";

describe("directoryUIReducer", () => {
  it("inicializa input y query desde la URL sin espacios sobrantes", () => {
    expect(initDirectoryUI("  sia  ")).toEqual({ input: "sia", query: "sia" });
  });

  it("actualiza el input sin tocar el query confirmado", () => {
    const state = directoryUIReducer({ input: "", query: "" }, { type: "input/changed", value: "sia" });
    expect(state).toEqual({ input: "sia", query: "" });
  });

  it("confirma el query recortado y conserva la referencia si no cambió", () => {
    const initial = { input: " sia ", query: "" };
    const committed = directoryUIReducer(initial, { type: "query/committed", value: " sia " });
    expect(committed.query).toBe("sia");
    expect(directoryUIReducer(committed, { type: "query/committed", value: "sia" })).toBe(committed);
  });

  it("limpia input y query a la vez", () => {
    expect(directoryUIReducer({ input: "sia", query: "sia" }, { type: "search/cleared" })).toEqual({
      input: "",
      query: "",
    });
  });
});
