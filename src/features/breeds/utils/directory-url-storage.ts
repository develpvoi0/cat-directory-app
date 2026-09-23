const STORAGE_KEY = "cat-directory:last-url";

export function saveDirectoryUrl(search: string) {
  try {
    sessionStorage.setItem(STORAGE_KEY, `/${search}`);
  } catch {}
}

export function readDirectoryUrl(): string {
  try {
    const value = sessionStorage.getItem(STORAGE_KEY);
    return value?.startsWith("/") && !value.startsWith("//") ? value : "/";
  } catch {
    return "/";
  }
}
