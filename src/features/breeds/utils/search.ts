export function foldText(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function matchesQuery(name: string, query: string): boolean {
  return !query || foldText(name).includes(foldText(query));
}

export function splitMatch(name: string, query: string): [string, string, string] {
  const folded = foldText(name);
  const target = foldText(query);
  const index = target ? folded.indexOf(target) : -1;
  if (index < 0 || folded.length !== name.length) return [name, "", ""];
  return [name.slice(0, index), name.slice(index, index + target.length), name.slice(index + target.length)];
}
