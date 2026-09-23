"use client";

import { useEffect, useRef, type KeyboardEvent } from "react";
import { CloseIcon, SearchIcon } from "@/shared/ui/icons";
import { useDirectoryUI } from "../state/DirectoryUIProvider";

export function SearchField() {
  const { input, setInput, clearSearch } = useDirectoryUI();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const focusOnSlash = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;
      event.preventDefault();
      inputRef.current?.focus();
    };
    window.addEventListener("keydown", focusOnSlash);
    return () => window.removeEventListener("keydown", focusOnSlash);
  }, []);

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape" && input) {
      event.preventDefault();
      clearSearch();
    }
    if (event.key === "ArrowDown") {
      const firstRow = document.querySelector<HTMLElement>('[aria-label="Razas de gatos"] [data-index="0"] a');
      if (firstRow) {
        event.preventDefault();
        firstRow.focus();
      }
    }
  }

  return (
    <div className="flex h-13 min-w-0 flex-1 items-center gap-3 rounded-xl border border-line-strong bg-surface px-4 transition-shadow focus-within:border-accent focus-within:shadow-[0_0_0_3px_var(--accent-soft)]">
      <SearchIcon className="shrink-0 text-ink-subtle" />
      <label htmlFor="breed-search" className="sr-only">
        Buscar raza por nombre
      </label>
      <input
        ref={inputRef}
        id="breed-search"
        type="search"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Buscar por nombre…"
        autoComplete="off"
        spellCheck={false}
        enterKeyHint="search"
        className="h-full min-w-0 flex-1 bg-transparent text-[17px] text-ink outline-none placeholder:text-ink-subtle [&::-webkit-search-cancel-button]:appearance-none"
      />
      {input ? (
        <button
          type="button"
          aria-label="Borrar búsqueda"
          onClick={() => {
            clearSearch();
            inputRef.current?.focus();
          }}
          className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-lg text-ink-subtle hover:bg-surface-2"
        >
          <CloseIcon />
        </button>
      ) : (
        <kbd className="hidden rounded-md border border-line px-[7px] py-0.5 font-sans text-xs text-ink-subtle sm:block">
          /
        </kbd>
      )}
    </div>
  );
}
