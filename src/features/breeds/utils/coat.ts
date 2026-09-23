export type PatternFamily =
  | "solid"
  | "tabby"
  | "spotted"
  | "ticked"
  | "colorpoint"
  | "bicolor"
  | "tortie"
  | "mixed";

export type CoatColor = { name: string; base: string; mark: string };

export const COAT_COLORS: CoatColor[] = [
  { name: "Crema", base: "#e6cc9f", mark: "#b88b52" },
  { name: "Rojo", base: "#d38a4a", mark: "#9a5426" },
  { name: "Canela", base: "#a9693f", mark: "#6a3a1d" },
  { name: "Chocolate", base: "#6e4832", mark: "#3b2417" },
  { name: "Seal", base: "#4b3b31", mark: "#1e1611" },
  { name: "Azul", base: "#8995a1", mark: "#525e69" },
  { name: "Lila", base: "#bcaeb2", mark: "#877880" },
  { name: "Plata", base: "#d3d8dc", mark: "#5b636a" },
];

export const PATTERN_LEGEND: { family: PatternFamily; label: string; api: string }[] = [
  { family: "solid", label: "Sólido", api: "Solid" },
  { family: "tabby", label: "Atigrado", api: "Tabby, Mackerel" },
  { family: "spotted", label: "Moteado", api: "Spotted" },
  { family: "ticked", label: "Agutí", api: "Ticked" },
  { family: "colorpoint", label: "Colorpoint", api: "Colorpoint" },
  { family: "bicolor", label: "Bicolor", api: "Bi-color, Van" },
  { family: "tortie", label: "Carey", api: "Tortoiseshell" },
  { family: "mixed", label: "Variado", api: "All, sin dato" },
];

export function patternFamily(pattern: string | null): PatternFamily {
  const p = pattern?.toLowerCase().trim() ?? "";
  if (!p || /^all|various/.test(p)) return "mixed";
  if (p.includes("point")) return "colorpoint";
  if (p.includes("spot")) return "spotted";
  if (p.includes("tick")) return "ticked";
  if (/tabby|mackerel|marbl|stripe/.test(p)) return "tabby";
  if (/tortoise|calico|tortie/.test(p)) return "tortie";
  if (/bi-|bicolor|tri|van|mitted/.test(p)) return "bicolor";
  if (p.includes("solid")) return "solid";
  return "mixed";
}

function hash(value: string): number {
  let h = 5381;
  for (let i = 0; i < value.length; i++) h = ((h << 5) + h + value.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function coatColorFor(key: string): CoatColor {
  return COAT_COLORS[hash(key) % COAT_COLORS.length];
}
