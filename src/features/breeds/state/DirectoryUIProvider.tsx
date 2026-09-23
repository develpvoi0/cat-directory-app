"use client";

import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from "react";
import { useDebouncedValue } from "@/shared/hooks/useDebouncedValue";
import { directoryUIReducer, initDirectoryUI, type DirectoryUIState } from "./directory-ui.reducer";

const SEARCH_DEBOUNCE_MS = 300;

type DirectoryUIValue = DirectoryUIState & {
  setInput: (value: string) => void;
  clearSearch: () => void;
};

const DirectoryUIContext = createContext<DirectoryUIValue | null>(null);

type Props = { initialQuery: string; children: ReactNode };

export function DirectoryUIProvider({ initialQuery, children }: Props) {
  const [state, dispatch] = useReducer(directoryUIReducer, initialQuery, initDirectoryUI);
  const debouncedInput = useDebouncedValue(state.input, SEARCH_DEBOUNCE_MS);

  useEffect(() => {
    dispatch({ type: "query/committed", value: debouncedInput });
  }, [debouncedInput]);

  const value = useMemo<DirectoryUIValue>(
    () => ({
      ...state,
      setInput: (input) => dispatch({ type: "input/changed", value: input }),
      clearSearch: () => dispatch({ type: "search/cleared" }),
    }),
    [state],
  );

  return <DirectoryUIContext.Provider value={value}>{children}</DirectoryUIContext.Provider>;
}

export function useDirectoryUI(): DirectoryUIValue {
  const context = useContext(DirectoryUIContext);
  if (!context) throw new Error("useDirectoryUI debe usarse dentro de <DirectoryUIProvider>");
  return context;
}
